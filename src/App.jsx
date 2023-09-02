import React from "react"
import NavSearchbar from "./components/NavSearchbar"
import InfoCard from "./components/InfoCard"
import LikeList from "./components/LikeList"


export default function App() {
  const token = process.env.REACT_APP_API_KEY;

  const [data, setData] = React.useState('');//store the user_name coming from input form in the navbar component
  let [allUsers, setAllUsers] = React.useState([])
  let [allUsersInfo, setAllUsersInfo] = React.useState([])
  const [likedProfiles, setLikedProfiles] = React.useState([]);
  const [showList, setList] = React.useState(false)
  const [searched, setSearched] = React.useState(false);



  // this function itfaking care of the input form (the profile name provied by the users to in the search bar which in present in a separate navbar component)
  const childToParent = (childdata) => {
    setData(childdata);
  }

  // this function is handling how the the profile liked by the user will be stored in a separate list on the app 
  function handleLike(likedProfile) {
    const isAlreadyLiked = likedProfiles.find(profile => profile.uName === likedProfile.uName);
    if (!isAlreadyLiked) {
      setLikedProfiles(prevLikedProfiles => [...prevLikedProfiles, likedProfile]);

    }
  }
  // this function is handling how the the profile liked by the user will be removed in a separate list on the app 
  function handleRemove(uName) {
    setLikedProfiles(prevLikedProfiles =>
      prevLikedProfiles.filter(profile => profile.uName !== uName)
    );
  }

  /* this messing function fetch all the users related to the username provided 
     then for each resulted profiles it fetches thier realted profile information and
     links to the profile page on github
  */
  const userName = data
  React.useEffect(() => {
    if (userName) {
      fetch(`https://api.github.com/search/users?q=${userName}`, { header: { Authorization: `Bearer ${token}` } })
        .then(res => res.json())
        .then(data => {
          let users = data.items.map((item) => {
            return {
              userName: item.login,
              profileLink: item.url,
              repoLink: item.repos_url,
            }
          });

          setAllUsers(users);
          setSearched(true);

          if (users.length === 0) {
            setAllUsersInfo([]);
          } else {
            let userInfoPromises = users.map(user => (
              fetch(user.profileLink, { header: { Authorization: `Bearer ${token}` } })
                .then(res => res.json())
                .then(userInfo => ({
                  id: userInfo.id,
                  login: userInfo.login,
                  name: userInfo.name,
                  userLink: userInfo.html_url,
                  avatar_url: userInfo.avatar_url,
                  followers: userInfo.followers,
                  following: userInfo.following,
                  public_repos: userInfo.public_repos,
                }))
            ));

            Promise.all(userInfoPromises)
              .then(userInfos => {
                setAllUsersInfo(userInfos);
              });
          }
        });
    } else {
      setSearched(false);
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
        htmlLink={item.userLink}
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
        {searched && usersData.length === 0 ? "No result found" : usersData.length > 0 ? usersData : "Search for GitHub users"}
      </div>


    </div>
  )
}