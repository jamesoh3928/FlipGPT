import React from "react";
import { User } from "../Types/User"; 
import { LoginResponse } from "../Types/LoginResponse";

export const useUserFuncs = () => {

    async function getUser(username:string) {
        const response = await fetch("http://localhost:4000/user/"+username, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: null
        }); 
        return response; 
    }


    async function userExists(username:string) {
        const response = await fetch("http://localhost:4000/user/exists/"+username, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: null
        }); 
        return response; 
    }


    async function updateUser(user: User) {
        const response = await fetch("http://localhost:4000/user/", {
            method: 'UPDATE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        }); 
        return response;
    }


    async function createUser(user: User) {
        const response = await fetch("http://localhost:4000/user/", {
            method: 'UPDATE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        }); 
        return response; 
    }


    async function login(username: string, password: string) {
        let response: LoginResponse = {
            success: false,
            errorMessage: "Login was not run properly",
            user: null,
          };
          try {
            let retUserf = await getUser(username);
            if (retUser === null) {
              response.success = false;
              response.errorMessage = "Username does not exist.";
              response.user = null;
              return response;
            }
            if (retUser.password !== password) {
              response.success = false;
              response.errorMessage = "Password is incorrect.";
              response.user = null;
              return response;
            }
            response.success = true;
            response.errorMessage = "Login success!";
            response.user = retUser;
            // currentUser = retUser;
            return response;
          } catch (error) {
            console.error("login error " + error);
          }
    }

    return {createUser, 
        deleteUser, 
        getUser, 
        updateUser,
        login}; 
}





const USER_API = {
     
}