import React from "react";

export default function LikeList({ likedProfiles }){
    return(
        <div className="liked-user-list-container">
            <h3>Liked Users</h3>
            <ul>
                {likedProfiles.map((item) => {
                    return(
                        // <li>user: {item.name}</li>
                        <li>
                        <img src={item.pfp}/>
                        <span>{item.name}</span>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}