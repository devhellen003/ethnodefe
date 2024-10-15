import { getUserInfo } from '../utils/api';
import { useAccount } from "wagmi";
import { useEffect, useState } from "react"
import { getAgentBenefits, sendMessage } from "../utils/function"
import { depositModal, CopyToClipboard } from "./modalContents"

import  Modal  from '../ui/Modal'

const AccountInfo = () => {
  const { address } = useAccount();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState(
    <div>
    <h2>Hello</h2>
    <p>Nothing to see here.</p>
  </div>);

  const [agentsBenefits, setAgentsBenefits] = useState({
    vipLevel: "0",
    totalPhs: 0,
    dailyInterestRate: 0
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
 

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  let depoModal = depositModal();

  let deposit = () => {
    setModalContent(depoModal);
    openModal();
  }

  let share = () => {
    setModalContent(CopyToClipboard(userInfo.referralCode || "0x"));
    openModal();
  }

  useEffect(() => {
    const getUser = async (address : string) => {
        const user = await getUserInfo(address);
        //console.log(user);
        setUserInfo(user);
      
    };
    if(address){
      getUser(address || "0x");
    }
    setAgentsBenefits(getAgentBenefits(userInfo.address, parseInt(userInfo.referrals)));
  },[address])

    return (
      <>
      {isModalOpen && <Modal content={modalContent} onClose={closeModal} />}
 
        <div className="infos-panel">
          <div className="infos-panel-line"></div>
          <div className="infos-panel-title"> My account </div>
          <div>
                <a href='./deposit'><button
                  className="exchange-btn van-button van-button--default van-button--normal"
                  
                >
                  <div className="van-button__content">
                    <span className="van-button__text"> Deposit </span>
                  </div>
                </button>
                </a>

                <button
                  className="exchange-btn van-button van-button--default van-button--normal"
                  onClick={share}
                >
                  <div className="van-button__content">
                    <span className="van-button__text"> Share </span>
                  </div>
                </button>
          </div>
          

          <div className="infos-list">
            <div className="infos-list-one">
              <div className="infos-list-one-title">Mining Status</div>
              <div className="infos-list-one-value black">
                {userInfo.balance ?? (parseInt(userInfo.balance) > 0) ? "Running" : "Not Running"}</div>
            </div>
            <div className="infos-list-one">
              <div className="infos-list-one-title">Total Output</div>
              <div className="infos-list-one-value black">{`${parseFloat(userInfo.ethprofit).toFixed(4)} ETH`}</div>
            </div>
            <div className="infos-list-one">
              <div className="infos-list-one-title">Wallet Balance</div>
              <div className="infos-list-one-value black">{`${parseFloat(userInfo.balance ?? 0).toFixed(4)} USDT`}</div>
            </div>
            <div className="infos-list-one">
              <div className="infos-list-one-title">Exchangeable</div>
              <div className="infos-list-one-value black">{`${parseFloat(userInfo.ethprofit).toFixed(4)} ETH`}</div>
            </div>
            <div className="infos-list-one">
              <div className="infos-list-one-title">Withdrawable</div>
              <div className="infos-list-one-value black">{`${parseFloat(userInfo.usdtprofit).toFixed(4)} USDT`}</div>
            </div>
            <div className="infos-list-one">
              <div className="infos-list-one-title">Referrals</div>
              <div className="infos-list-one-value black">{`${userInfo.referrals}`}</div>
            </div>
          </div>
        </div>
        <div className="infos-panel">
          <div className="infos-panel-line"></div>
          <div className="infos-panel-title"> My level </div>
          <div className="infos-list">
            <div className="infos-list-one">
              <div className="infos-list-one-title">Level</div>
              <div className="infos-list-one-value black">{`${agentsBenefits.vipLevel}`}</div>
            </div>
            <div className="infos-list-one">
              <div className="infos-list-one-title">Hash rate</div>
              <div className="infos-list-one-value black">
                0+ <span style={{ color: 'rgb(231, 76, 60)' }}>{agentsBenefits.totalPhs}</span> PH/S
              </div>
            </div>
            <div className="infos-list-one">
              <div className="infos-list-one-title">Output interest rate</div>
              <div className="infos-list-one-value black">{agentsBenefits.dailyInterestRate}%</div>
            </div>
            <div className="infos-list-one">
              <div className="infos-list-one-title">Output interest cycle</div>
              <div className="infos-list-one-value black">1440 minutes</div>
            </div>
            <div className="infos-list-one">
              <button 
                className="exchange-btn van-button van-button--default van-button--normal" 
                style={{ width: '100%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
              >
                <div className="van-button__content">
                  <span className="van-button__text"> Level details </span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </>
    );
  };
  
  export default AccountInfo;
  