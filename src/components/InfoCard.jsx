import React, { useState } from "react";

export default function InfoCard(prop) {
  const user = prop.uName;
  const token = "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";
  const [repos, setRepos] = useState([]);
  const [showRepos, setShowRepos] = useState(false);

  function fetchRepoData() {
    fetch(`https://api.github.com/users/${user}/repos`, {
      header: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        setRepos(data);
      });
  }

  const toggleRepos = () => {
    setShowRepos(!showRepos);
    if (!repos.length) {
      fetchRepoData();
    }
  };

  return (
    <div className="info-container">
      <div className="pfp-container">
        <img alt="user-pfp" className="pfp-image" src={prop.img} />
      </div>

      <div className="profile-info">
        <h3 className="user-name">{prop.name}</h3>
        <span className="follower">follower: {prop.follower}</span>{" "}
        <span className="following">following: {prop.following}</span>
        <p className="repository">repository: {prop.repository}</p>
        <button onClick={toggleRepos} className="repo-info-toggle">
          {showRepos ? "Hide Repositories" : "Show Repositories"}
        </button>
      </div>

      {showRepos && (
        <div className="repos-modal">
          <div className="repos-modal-content">
            <h3> Repositories</h3>
            <div className="repos-list">
              {repos.map(repo => (
                <div  className="repo-item" key={repo.id}>
                    <p className="repo-name">- {repo.full_name}</p>
                    <a className="repo-url" href={repo.html_url} target="_blank" rel="noopener noreferrer"> {repo.html_url} </a>
                </div>
              ))}

              <button className="close-btn" onClick={toggleRepos}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}