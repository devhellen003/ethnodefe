
const Categories = () => {
return (
<div className="infos-panel">
  <div className="infos-panel-line"></div>
  <div className="infos-panel-title">Activity</div>
  <div className="infos-list">
    <p dir="ltr" style={{ marginTop: 0, marginBottom: 0, lineHeight: 1.38, textAlign: 'center' }}>
      <span
        style={{
          fontSize: '13pt',
          fontFamily: 'Comic Sans MS, sans-serif',
          backgroundColor: 'transparent',
          fontWeight: 700,
          verticalAlign: 'baseline',
        }}
      >
        Benefits of Being an Agent
      </span>
    </p>
    <p dir="ltr" style={{ marginTop: 0, marginBottom: 0, lineHeight: 1.38, textAlign: 'center' }}>
      <span
        style={{
          fontSize: '11pt',
          fontFamily: 'Arial, sans-serif',
          color: 'rgb(11, 83, 148)',
          backgroundColor: 'transparent',
          fontWeight: 700,
          verticalAlign: 'baseline',
        }}
      >
        Invitee Level &nbsp; &nbsp; PH/S &nbsp; &nbsp; &nbsp; Total PH/S
      </span>
    </p>
    {[
      { level: 'VIP1', pH: '500 PH/S ≈ 0.5%', bonus: 'Basic + 500 PH/S' },
      { level: 'VIP2', pH: '650 PH/S ≈ 0.65%', bonus: 'Basic + 650 PH/S' },
      { level: 'VIP3', pH: '800 PH/S ≈ 0.8%', bonus: 'Basic + 800 PH/S' },
      { level: 'VIP4', pH: '1,000 PH/S ≈ 1.0%', bonus: 'Basic + 1,000 PH/S' },
      { level: 'VIP5', pH: '1,500 PH/S ≈ 1.5%', bonus: 'Basic + 1,500 PH/S' },
      { level: 'VIP6', pH: '2,000 PH/S ≈ 2.0%', bonus: 'Basic + 2,000 PH/S' },
      { level: 'VIP7', pH: '3,000 PH/S ≈ 3.0%', bonus: 'Basic + 3,000 PH/S' },
    ].map((item, index) => (
      <p
        key={index}
        dir="ltr"
        style={{ textAlign: 'center', marginTop: 0, marginBottom: 0, lineHeight: 1.2 }}
      >
        <span
          style={{
            fontVariantNumeric: 'normal',
            color: 'rgb(66, 66, 66)',
            fontSize: '12px',
          }}
        >
          {item.level}&nbsp; &nbsp; &nbsp; {item.pH}&nbsp; &nbsp; &nbsp; {item.bonus}
        </span>
      </p>
    ))}
    <p
      dir="ltr"
      style={{
        marginTop: 0,
        marginBottom: 0,
        lineHeight: 1.38,
        textAlign: 'center',
      }}
    >
      <span
        style={{
          fontSize: '9pt',
          fontFamily: 'Arial, sans-serif',
          color: 'rgb(56, 118, 29)',
        }}
      >
        <i>*Invitee's VIP level is VIP4, which comes with an additional 1% interest rate bonus for agents</i>
      </span>
    </p>
    <hr />
    <p dir="ltr" style={{ marginTop: 0, marginBottom: 0, lineHeight: 1.38, textAlign: 'center' }}>
      <span
        style={{
          fontSize: '13pt',
          fontFamily: 'Comic Sans MS, sans-serif',
          fontWeight: 700,
        }}
      >
        Daily interest rate levels of income
      </span>
    </p>
    <p dir="ltr" style={{ marginTop: 0, marginBottom: 0, lineHeight: 1.38, textAlign: 'center' }}>
      <span
        style={{
          fontSize: '11pt',
          fontFamily: 'Arial, sans-serif',
          color: 'rgb(11, 83, 148)',
          fontWeight: 700,
        }}
      >
        VIP Level &nbsp; &nbsp; &nbsp; PH/S &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 24/H Income
      </span>
    </p>
    {[
      { level: 'VIP1', usdt: '99 USDT ≈ 2.0%', income: '1.98 USDT' },
      { level: 'VIP2', usdt: '1,500 USDT ≈ 2.5%', income: '37.5 USDT' },
      { level: 'VIP3', usdt: '3,000 USDT ≈ 2.8%', income: '84.0 USDT' },
      { level: 'VIP4', usdt: '5,000 USDT ≈ 3.2%', income: '160.0 USDT' },
      { level: 'VIP5', usdt: '10,000 USDT ≈ 3.8%', income: '380.0 USDT' },
      { level: 'VIP6', usdt: '50,000 USDT ≈ 4.5%', income: '2,250 USDT' },
      { level: 'VIP7', usdt: '100,000 USDT+ ≈ 5.0%', income: '5,000 USDT' },
    ].map((item, index) => (
      <p
        key={index}
        dir="ltr"
        style={{ marginTop: 0, marginBottom: 0, lineHeight: 1.2, textAlign: 'center' }}
      >
        <span
          style={{
            fontSize: '14px',
            fontFamily: 'Arial, sans-serif',
            color: 'rgb(66, 66, 66)',
          }}
        >
          {item.level}&nbsp; &nbsp; &nbsp; &nbsp; {item.usdt} &nbsp; &nbsp; &nbsp; {item.income}
        </span>
      </p>
    ))}
    <p
      dir="ltr"
      style={{
        marginTop: 0,
        marginBottom: 0,
        lineHeight: 1.38,
        textAlign: 'center',
      }}
    >
      <span
        style={{
          fontSize: '9pt',
          fontFamily: 'Arial, sans-serif',
          color: 'rgb(56, 118, 29)',
        }}
      >
        <i>*Nodes distribute dividends based on participants' USDT holdings</i>
      </span>
    </p>
    <hr />
    <p dir="ltr" style={{ marginTop: 0, marginBottom: 0, lineHeight: 1.38, textAlign: 'center' }}>
      <span
        style={{
          fontSize: '13pt',
          fontFamily: 'Comic Sans MS, sans-serif',
          fontWeight: 700,
        }}
      >
        VIP Upgrade Rewards
      </span>
      <img
        src="https://ethadmin689.vip/uploads/20240626/d0456389fed7c58d487cfc4cb9a682a3.jpg"
        alt="VIP Upgrade Rewards"
        style={{ width: '100%' }}
      />
    </p>
  </div>
</div>
)
}


export default Categories;