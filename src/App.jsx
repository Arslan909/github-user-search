import React from "react"
import NavSearchbar from "./components/NavSearchbar"
import InfoCard from "./components/InfoCard"
import LikeList from "./components/LikeList"


export default function App() {
  const token = "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"

  const [data, setData] = React.useState('');
  let [allUsers, setAllUsers] = React.useState([])
  let [allUsersInfo, setAllUsersInfo] = React.useState([])
  const [likedProfiles, setLikedProfiles] = React.useState([]);
  const [showList, setList] = React.useState(false)
  const [toggleLikeBtn, settoggleLikeBtn] = React.useState(false);


  const childToParent = (childdata) => {
    setData(childdata);
  }

  function handleLike(likedProfile) {
    const isAlreadyLiked = likedProfiles.find(profile => profile.uName === likedProfile.uName);
    if(!isAlreadyLiked){
      setLikedProfiles(prevLikedProfiles => [...prevLikedProfiles, likedProfile]);

    }
    // settoggleLikeBtn(true);
  }

  function handleRemove(uName) {
    // console.log(id);
    setLikedProfiles(prevLikedProfiles =>
      prevLikedProfiles.filter(profile => profile.uName !== uName)
    );
    // settoggleLikeBtn(false);
  }

  const userName = data
  React.useEffect(() => {

    if (userName) {
      fetch(`https://api.github.com/search/users?q=${userName}`, { header: { Authorization: `Bearer ${token}`, } })
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
            fetch(user.profileLink, { header: { Authorization: `Bearer ${token}`, } })
              .then(res => res.json())
              .then(userInfo => ({

                id: userInfo.id,
                login: userInfo.login,
                name: userInfo.name,
                userLink : userInfo.html_url,
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
    else{
      "no result found!"
    }
  }, [data]);

  const usersData = allUsersInfo.map((item, index) => {
    const isProfileLiked = likedProfiles.some((likedProfile) => likedProfile.uName === item.login);
    return (
      <InfoCard
        key={index}
        img={item.avatar_url}
        uName={item.login}
        name={item.name}
        htmlLink = {item.userLink}
        following={item.following}
        follower={item.followers}
        repository={item.public_repos}
        onLike={handleLike}
        // toggleLikeBtn = {toggleLikeBtn}
        isLiked={isProfileLiked}
        onRemove={(uName) => handleRemove(uName)}
      />
    )
  })
  //  UI component rendering
  return (

    <div className="container">

      <div>
        <button className={`liked-listBtn ${showList ? "liked-listBtn-open" : ""}`} onClick={() => { setList(!showList) }}>{showList ? "<" : ">"}</button>
        <LikeList 
          likedProfiles={likedProfiles} 
          show={showList} 
          onRemove={handleRemove}
          />
      </div>

      <div className="navContainer">
        <h1 className="heading">Github Users</h1>
        <NavSearchbar childToParent={childToParent} />
      </div>

      <div className="bodyContainer">
        {usersData.length > 0 ? usersData : "Search for users on github"}
      </div>


    </div>
  )
}