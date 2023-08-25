

export default function InfoCard(prop){
    return(
        <div className="info-container">

        <div className="pfp-container">
          <img alt="user-pfp" className="pfp-image"  src={prop.img}/>
        </div>

        <div className="profile-info">
  
          <h3 className="user-name">{prop.name}</h3>
          <span className="follower">follower: {prop.follower}</span> <span className="following">following: {prop.following}</span>
          <p className="repository">repository: {prop.repository}</p>
  
        </div>
      </div>
    )
  }