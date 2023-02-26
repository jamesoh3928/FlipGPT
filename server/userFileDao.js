
let userCache = new Map(); 

// load the initial cache
function readJson() {
    
}


// write the cache to the json file
function writeJson() {

}


// get the user from the cache
function userExists(username) {
    userCache.has(username)
}


// get the user from the cache
function getUser() {
    
}


// update the user
function updateUser() {

    writeJson(); 
}


// delete the user
function deleteUser() {

    writeJson(); 
}


// create the user 
function createUser() {

    writeJson(); 
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