import React from "react"

export default function NavSearchbar({childToParent}){
  let [userName, setUserName] = React.useState()
  
  function handleUserName(event){
    setUserName(event.target.value)

  }
  function submissionTest(event){
    event.preventDefault()
    // console.log(userName)
    childToParent(userName);
  }

    return(
      <form onSubmit={submissionTest}>
          <div className="NavSearchbar">
            <input 
            type="text"  
            placeholder=" search" 
            className="searcBar"
            onChange={handleUserName}
            />
          </div>
          <button className="search-btn">search</button>
        </form>
    )
  }