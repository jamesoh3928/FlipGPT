import * as fs from 'fs';

// TODO: add synchronized calls for map
let userCache = new Map(); 
//const fs = require('fs');

// load the initial cache
function readJson() {

    fs.readFile("users.json", (err, jsonString) => {
        if(err){
            console.log("File failed to read: ", err);
            return;
        }
        try{
            for(user in JSON.parse(jsonString)){
                userCache.set(user.username, user);
            }
        }catch(err){
            console.log("Error parsing JSON string: ", err);
        }
    });
}


// write the cache to the json file
function writeJson() {
    let userList = []; 
    for(user in userCache){
        userList.push(user);
    }
    const jsonString = JSON.stringify(userList);
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
function createUser(username, password, number) {
    const user = {
        username: username,
        password: password,
        phoneNumber: number
    }
    const newUser = userCache.set(username, user);
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