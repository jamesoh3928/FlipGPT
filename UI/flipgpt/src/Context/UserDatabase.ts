import Dexie, { Table } from 'dexie';
import { User } from '../Types/User';

console.log("running"); 

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
export async function addUser(user:User) {
    try {
        await db.users.add(user); 

    }catch(error){
        console.error("an error occurred when trying to add a friend"); 
    }
}

const USER_API = {
    addUser, 
}
 
export default USER_API; 



// add user ( user )
// get user ( username )
// update user ( user )
// delete user ( username )

