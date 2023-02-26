import * as fs from 'fs';

// TODO: add synchronized calls for map
let userCache = new Map(); 
//const fs = require('fs');

// load the initial cache
function readJson() {
    let jsonString = fs.readFileSync("users.json"); 
    let users = JSON.parse(jsonString.toString());
    console.log(users); 
    for(let user of users) {
        userCache.set(user.username, user);
    }
}


// write the cache to the json file
function writeJson() {
    let userList = []; 
    for (let [key, value] of userCache) {
        userList.push(value); 
    }
    // console.log(userList); 
    const jsonString = JSON.stringify(userList);
    console.log(jsonString)
    fs.writeFile('users.json', jsonString, err => {
        if(err){
            console.log("Error writing to file: ", err);
        }
    }); 
}


// get the user from the cache
function userExists(username) {
    return userCache.has(username);
}


// get the user from the cache
function getUser(username) {
    return userCache.get(username);
}


// update the user
function updateUser(user) {
    if(!userExists(user)){
        return;
    }
    const updatedUser = userCache.set(username, user);
    writeJson(); 
    return updatedUser;
}

// TODO
// // delete the user
// function deleteUser(username) {
//     if(userCache.delete(username)){
//         writeJson(); 
//     }
// }


// create the user 
function createUser(user) {
    // const user = {
    //     username: username,
    //     password: password,
    //     phoneNumber: number
    // }
    const newUser = userCache.set(user.username, user);
    writeJson(); 
    return newUser;
}

const user_file_dao = {
    readJson, 
    writeJson, 
    userExists,
    getUser, 
    updateUser, 
    // deleteUser, 
    createUser
}

export default user_file_dao