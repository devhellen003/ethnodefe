const Footer = () => {
    return (
      <div className="footer">
        <div className="header-option-icon" style={{ zIndex: 2 }}>
          <img src="/images/d0ae8ce5d18432880686d1ac114826ca.png" alt="ETH2.0 Icon" />
          <div className="header-option-icon-title"> ㅤETH2.0 </div>
        </div>
        <button 
          className="van-button van-button--default van-button--normal" 
          style={{ color: 'white', background: 'rgb(33, 59, 82)', borderColor: 'rgb(33, 59, 82)' }}
        >
          <div className="van-button__content">
            <span className="van-button__text">Official Website</span>
          </div>
        </button>
      </div>
    );
  };
  
  export default Footer;
  