import fetch from 'node-fetch';
import fs from 'fs/promises';

let user_name = "Arslan9";

function fetchUser() {
    fetch(`https://api.github.com/search/users?q=${user_name}`)
    .then(response => response.json())
    .then(function(data) {
        if (data.message === "Not Found") {
            console.log("User not found");
            return false;
        } else {
            // console.log("data imported");
            return fs.writeFile('data.json', JSON.stringify(data, null, 2));
        }
    });
}

fetchUser();
