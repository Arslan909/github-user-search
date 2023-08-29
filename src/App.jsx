import React from "react"
import NavSearchbar from "./components/NavSearchbar"
import InfoCard from "./components/InfoCard"
import LikeList from "./components/LikeList"


export default function App(){
  const token = "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"

  const [data, setData] = React.useState('');
  let [allUsers, setAllUsers] = React.useState([])
  let [allUsersInfo, setAllUsersInfo] = React.useState([])
  const [likedProfiles, setLikedProfiles] = React.useState([]);
  const [showList, setList] = React.useState(false)
  
  
  const childToParent = (childdata) => {
    setData(childdata);
  }

  function handleLike(likedProfile) {
    setLikedProfiles(prevLikedProfiles => [...prevLikedProfiles, likedProfile]);
  }
  
  const userName = data
  React.useEffect(() => {

    if(userName){
        fetch(`https://api.github.com/search/users?q=${userName}`, {header:{Authorization: `Bearer ${token}`,}})
        .then(res => res.json())
        .then(data => {
          let users = data.items.map((item) => {
            return {
              userName: item.login,
              profileLink: item.url,
              repoLink: item.repos_url,
            }
          })

          setAllUsers(users);

          // Fetch user info for each user
          let userInfoPromises = users.map(user => (
              fetch(user.profileLink, {header:{Authorization: `Bearer ${token}`,}})
              .then(res => res.json())
              .then(userInfo => ({
                
                id: userInfo.id,
                login: userInfo.login,
                name:userInfo.name,
                avatar_url: userInfo.avatar_url,
                followers: userInfo.followers,
                following: userInfo.following,
                public_repos: userInfo.public_repos,

              }))
          ));
    
          Promise.all(userInfoPromises)
            .then(userInfos => {
              setAllUsersInfo(userInfos);
            })
          })
      }
  }, [data]);

  const usersData = allUsersInfo.map((item, index) => { 
    return(
      <InfoCard 
        key = {index}
        img = {item.avatar_url}
        uName = {item.login}
        name = {item.name}
        following = {item.following}
        follower = {item.followers}
        repository = {item.public_repos}
        onLike={handleLike}
      />
    )
  })
//  UI component rendering
  return(

      <div className="container">
        
        <div className="navContainer">
          <h1 className="heading">Github Users</h1> 
          <NavSearchbar childToParent={childToParent}/>
        </div>

        <div className="bodyContainer">
          {usersData.length > 0 ? usersData : "Search for users on github"}
        </div>

        <button onClick={()=>{setList(!showList)}}>show liked</button>
        {showList && <LikeList likedProfiles={likedProfiles} />}

      </div>
  )
}