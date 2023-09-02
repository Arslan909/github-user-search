import React from "react";

export default function LikeList({ likedProfiles, show, onRemove }) {
  return (
    <div className={`liked-user-list-container ${show ? "liked-user-list-visible" : ""}`}>
      <h3 className="Liked-Users-h3">Liked Users</h3>
      <ul>
        {likedProfiles.map((item) => (
          <li key={item.id} className="info-container-in-likedList">
            <div className="pfp-container">
              <img alt="user-pfp" className="pfp-image" src={item.pfp} />
            </div>
            <h2 className="user-name" ><a className="user-profile-link" href={item.htmlLink} target="_blank">{item.uName}</a></h2>
            <h5 className="user-name">{item.name}</h5>
            <span className="follower">follower: {item.follower}</span>{" "}
            <span className="following">following: {item.following}</span>
            <p className="repository">repository: {item.repository}</p>
            <button className="remove-from-likedLisr-btn" onClick={() => onRemove(item.uName)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
