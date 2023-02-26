import React from "react";
import { User } from "../Types/User";
import { LoginResponse } from "../Types/LoginResponse";
import Log from "../Log";

export const useUserFuncs = () => {
  async function getUser(username: string) {
    try {
      const response = await fetch("http://localhost:4000/user/" + username, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: null,
      });
      return await response.json();
    } catch (e: any) {
      Log.log(`Get User Error: ${e.message}`);
      return null;
    }
  }

  async function userExists(username: string) {
    try {
      const response = await fetch(
        "http://localhost:4000/user/exists/" + username,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: null,
        }
      );
      return await response.json();
    } catch (e: any) {
      Log.log(`Get User Error: ${e.message}`);
      return null;
    }
  }

  async function updateUser(user: User) {
    try {
      const response = await fetch("http://localhost:4000/user/", {
        method: "UPDATE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      return await response.json();
    } catch (e: any) {
      Log.log(`Get User Error: ${e.message}`);
      return null;
    }
  }

  async function createUser(user: User) {
    try {
      const response = await fetch("http://localhost:4000/user/", {
        method: "UPDATE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      return await response.json();
    } catch (e: any) {
      Log.log(`Get User Error: ${e.message}`);
      return null;
    }
  }

  async function login(username: string, password: string) {
    let response: LoginResponse = {
      success: false,
      errorMessage: "Login was not run properly",
      user: null,
    };
    try {
      let retUser = await getUser(username);
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
      return response;
    }
  }

  const deleteUser = async (username: string) => {
    try {
    } catch (e: any) {
      Log.log(`Get User Error: ${e.message}`);
      return null;
    }
  };

  return {
    createUser,
    deleteUser,
    getUser,
    updateUser,
    login,
  };
};

const USER_API = {};
