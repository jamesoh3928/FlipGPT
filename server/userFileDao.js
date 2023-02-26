
let userCache = new Map(); 

// load the initial cache
function readJson() {
    const fs = require("fs");

    fs.readFile("users.json", (err, jsonString) => {
        if(err){
            console.log("File failed to read: ", err);
            return;
        }
        try{
            const user = JSON.parse(jsonString);
            console.log("Username:", user.username);
        }catch(err){
            console.log("Error parsing JSON string: ", err);
        }
    });
}


// write the cache to the json file
function writeJson() {

}


// get the user from the cache
function userExists(username) {
    userCache.has(username);
}


// get the user from the cache
function getUser(username) {
    return userCache.get(username);
}


// update the user
function updateUser() {

    writeJson(); 
}


// delete the user
function deleteUser() {

}


// create the user 
function createUser() {

}

const user_file_dao = {
    readJson, 
    writeJson, 
    userExists,
    getUser, 
    updateUser, 
    deleteUser, 
    createUser
}

export default user_file_dao