import * as fs from "fs";

// TODO: add synchronized calls for map
let userCache = new Map();
//const fs = require('fs');

// load the initial cache
function readJson() {
  let jsonString = fs.readFileSync("users.json");
  let users = JSON.parse(jsonString.toString());
  //   console.log(users);
  for (let user of users) {
    // console.log(user.userName);
    userCache.set(user.userName, user);
  }
  console.log(userCache);
}

// write the cache to the json file
function writeJson() {
  let userList = [];
  for (let [key, value] of userCache) {
    userList.push(value);
  }
  // console.log(userList);
  const jsonString = JSON.stringify(userList);
  console.log(jsonString);
  fs.writeFile("users.json", jsonString, (err) => {
    if (err) {
      console.log("Error writing to file: ", err);
    }
  });
}

// get the user from the cache
function userExists(userName) {
  //   console.log(userCache);
  return userCache.has(userName);
}

// get the user from the cache
function getUser(userName) {
  return userCache.get(userName);
}

// update the user
function updateUser(user) {
  if (!userExists(user.userName)) {
    console.log(`User DNE`);
    console.log(user);
    console.log();
    return null;
  }
  userCache.set(user.userName, user);
  writeJson();
  let updatedUser = userCache.get(user.userName);
  return updatedUser;
}

// TODO
// // delete the user
// function deleteUser(userName) {
//     if(userCache.delete(userName)){
//         writeJson();
//     }
// }

// create the user
function createUser(user) {
  userCache.set(user.userName, user);
  let newUser = getUser(user.userName);
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
  createUser,
};

export default user_file_dao;
