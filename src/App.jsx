import NavSearchbar from "./components/NavSearchbar"
import InfoCard from "./components/InfoCard"
import data from "./data.json"



export default function App(){
  const usersData = data.items.map((item) => {
    return(
      <InfoCard 
        key = {item.id}
        img = {item.avatar_url}
        name = {item.login}
      />
    )
  })
  return(

      <div className="container">
        
        <div className="navContainer">
          <h1>Github Users</h1> 
          <NavSearchbar />
        </div>

        {usersData}

      </div>
  )
}