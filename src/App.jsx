import NavSearchbar from "./components/NavSearchbar"
import InfoCard from "./components/InfoCard"
// import data from "./data.json"
import React from "react"



export default function App(){

  let [allUsers, setAllUsers] = React.useState([])
  let [allUsersInfo, setAllUsersInfo] = React.useState([])

  const token = "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"

  React.useEffect(() => {
        fetch("https://api.github.com/search/users?q=shasherazi", {header:{Authorization: `Bearer ${token}`,}})
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
    }, []);

    // console.log(allUsersInfo);

  const usersData = allUsersInfo.map((item) => { 
    return(
      <InfoCard 
        key = {item.id}
        img = {item.avatar_url}
        name = {item.login}
        following = {item.following}
        follower = {item.followers}
        repository = {item.public_repos}
      />
    )
  })


  return(

      <div className="container">
        
        <div className="navContainer">
          <h1 className="heading">Github Users</h1> 
          <NavSearchbar />
        </div>

        {usersData}

      </div>
  )
}