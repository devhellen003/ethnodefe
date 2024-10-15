const PartnerList = () => {
    const partners = [
      "/assets/addons/imtoken/ming/img/index_partner_0.png",
      "/assets/addons/imtoken/ming/img/index_partner_1.png",
      "/assets/addons/imtoken/ming/img/index_partner_2.png",
      "/assets/addons/imtoken/ming/img/index_partner_3.png",
      "/assets/addons/imtoken/ming/img/index_partner_4.png",
      "/assets/addons/imtoken/ming/img/index_partner_5.png",
      "/assets/addons/imtoken/ming/img/index_partner_6.png",
      "/assets/addons/imtoken/ming/img/index_partner_7.png",
      "/assets/addons/imtoken/ming/img/index_partner_8.png",
      "/assets/addons/imtoken/ming/img/index_partner_9.png",
      "/assets/addons/imtoken/ming/img/index_partner_10.png",
      "/assets/addons/imtoken/ming/img/index_partner_11.png",
      "/assets/addons/imtoken/ming/img/index_partner_12.png",
      "/assets/addons/imtoken/ming/img/index_partner_13.png",
      "/assets/addons/imtoken/ming/img/index_partner_14.png"
    ];
  
    return (
      <div className="partner-list">
        <div className="main-title">
          <div className="main-title-text">Partner</div>
          <div className="main-title-lable">our business partner</div>
        </div>
        <div className="app-list van-grid">
          {partners.map((partner, index) => (
            <div className="van-grid-item" style={{ flexBasis: '33.3333%' }} key={index}>
              <div className="van-grid-item__content van-grid-item__content--center">
                <div className="van-image" style={{ width: '40px' }}>
                  <img src={partner} className="van-image__img" alt={`Partner ${index}`} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default PartnerList;
  