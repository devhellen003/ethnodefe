import { useState } from 'react';
import { Tabs, Button } from 'react-vant';


import Categories from "./Categories";
import Activities from "./Activities";
import HelpCenter from "./Help";
import PartnerList from "./Partners"
import AccountInfo from "./Accounts"
import ExchangeInfo from "./Exchanges"

const Pool = () => {
  const [active, setActive] = useState('mining');

  return (
    <div className="infos">
      <Tabs active={active} onChange={(name) => setActive(name)} type="capsule" color="#1d5786">
        <Tabs.TabPane key="mining" title="Mining Pool">
            <div className="info-panel1">
              <div className="infos-panel">
                <div className="infos-panel-line"></div>
                <div className="infos-panel-title">Pool data</div>
                <div className="infos-list">
                  <div className="infos-list-one">
                    <div className="infos-list-one-title">Total Output</div>
                    <div className="infos-list-one-value">7072284 ETH</div>
                  </div>
                  <div className="infos-list-one">
                    <div className="infos-list-one-title">Valid Node</div>
                    <div className="infos-list-one-value">137491</div>
                  </div>
                  <div className="infos-list-one">
                    <div className="infos-list-one-title">Participant</div>
                    <div className="infos-list-one-value">4597926</div>
                  </div>
                  <div className="infos-list-one">
                    <div className="infos-list-one-title">User Revenue</div>
                    <div className="infos-list-one-value">202499569 USD</div>
                  </div>
                </div>
              </div>
            </div>
            
          <Categories />
          <Activities />
          <HelpCenter />
          <PartnerList />

        </Tabs.TabPane>

        <Tabs.TabPane key="account" title="Account">
          
          <AccountInfo />
          <ExchangeInfo />

        </Tabs.TabPane>
      </Tabs>
    </div>
  );
};

export default Pool;
