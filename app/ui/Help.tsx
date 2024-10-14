import{Collapse}from'react-vant';   
const HelpCenter = () => {
    return (
      <div className="issue-list">
        <div className="main-title">
          <div className="main-title-text">Help Center</div>
          <div className="main-title-lable">hope it helps you</div>
        </div>
        <div className="issue-list-col">
          <Collapse initExpanded={['1']}>
            < Collapse.Item title = " What is the concept of holding USDT to earn dividends? " name = " 1 " >  
            Holding USDT to earn dividends involves staking or investing your USDT (a stablecoin pegged to the U.S. dollar) in specific platforms or nodes that offer interest-based rewards. By participating, users can earn passive income as platforms distribute dividends based on the amount of USDT held, typically with competitive rates.
            </Collapse.Item>
            < Collapse.Item title = " Where is the company? " name = " 2 " >  
            ETH 2.0 belongs to Ethereum, and Ethereum is not a single centralized company, but a decentralized platform for developing and deploying smart contracts and decentralized applications (Dapp) using blockchain technology. It was created by a global team of developers, researchers, and entrepreneurs. The Ethereum Foundation is a non-profit organization based in Zug, Switzerland, that supports the growth and development of the platform. Although the Foundation provides financial and organizational support to Ethereum, developers and contributors are spread out worldwide and collaborate remotely.
            </Collapse.Item>
            < Collapse.Item title = " Will ETH2.0 admins and creators take my USDT? " name = " 3 " >  
            No, ETH2.0 admins and creators cannot access your USDT. Your USDT remains securely in your personal wallet or in a smart contract, which is governed by blockchain technology. These smart contracts are decentralized and immutable, meaning no one, including admins or creators, can withdraw or manipulate your funds without your explicit permission.
            </Collapse.Item>
          </Collapse>
        </div>
      </div>
    );
  };
  
  export default HelpCenter;
  