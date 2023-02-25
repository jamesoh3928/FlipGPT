import Dexie, { Table } from 'dexie';
import { User } from '../Types/User';

/*************EXAMPLE USAGE***************/
// import USER_API from './Context/UserDatabase';
// let user1: User = {  userName: "username_test", 
//                      password:"password_test", 
//                      phoneNumber: "phone_test", 
//                      cardSets: [] };
// let user2: User = {  userName: "username2_test", 
//                      password:"password2_test", 
//                      phoneNumber: "phone2_test", 
//                      cardSets: [] };
//   USER_API.createUser(user1).then(() => console.log("finished")); 
//   USER_API.createUser(user2).then(() => console.log("finished")); 
//   user1.password = "updated password"; 
//   USER_API.updateUser(user1).then(() => console.log("finished")); 
//   USER_API.getUser(user1.userName).then((user) => console.log("user got "+user?.userName)); 
//   USER_API.deleteUser(user2.userName).then((user) => console.log("deleted ")); 
/************************************/

export class UserDatabase extends Dexie {
  // 'users' is added by dexie when declaring the stores()
  // We just tell the typing system this is the case
  users!: Table<User>; 

  constructor() {
    super('FlipGPTDB');
     
    var db = this.version(1).stores({
      users: 'userName' // Primary key and indexed props
    });

    

  }

  
}


export const db = new UserDatabase();

async function createUser(user: User) {
    try {
        return await db.users.add(user); 
    } catch(error) {
        console.error("add user error "+error); 
    }
}


async function deleteUser(userName: string) {
    try {
        await db.users.delete(userName); 
    } catch(error) {
        console.error("delete user error: "+error); 
    }
}


async function getUser(userName: string) {
    try {
        return await db.users.get(userName); 
    } catch(error) {
        console.error("delete user error: "+error); 
    }
}


async function updateUser(user: User) {
    try {
        return await db.users.update(user.userName, user); 
    } catch(error) {
        console.error("update user error: "+error); 
    }
}


let currentUser: User | null = null; 


const USER_API = {
    createUser, deleteUser, getUser, updateUser, currentUser
}

 
export default USER_API; 
