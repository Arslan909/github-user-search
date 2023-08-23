

export default function InfoCard(prop){
    return(
        <div className="info-container">

        <div className="pfp-container">
          <img alt="user-pfp" className="pfp-image"  src={prop.img}/>
        </div>

        <div className="profile-info">
  
          <h3 className="user-name">{prop.name}</h3>
  
        </div>
      </div>
    )
  }