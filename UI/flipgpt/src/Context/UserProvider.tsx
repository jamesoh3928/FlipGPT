import React, { useContext, createContext, useState, useRef } from "react";

import { User } from "../Types/User";
import USER_API from "./UserDatabase";

type ContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
  onCancel: (func: (msg?: string) => void) => void;
  login: (options: { userName: string; password: string }) => Promise<void>;
  signOut: () => void;
  create: (options: Omit<User, "cardSets">) => Promise<void>;
  get: (options: { userName: string }) => Promise<User | null>;
  deleteUser: (options: { userName: string }) => Promise<void>;
};

const UserContext = createContext<ContextType>({
  user: null,
  setUser: (user: User | null) => {},
  onCancel: (func: (msg?: string) => void) => {},
  login: async (options: { userName: string; password: string }) => {},
  signOut: () => {},
  create: async (options: Omit<User, "cardSets">) => {},
  get: async (options: { userName: string }) => null,
  deleteUser: async (options: { userName: string }) => {},
});

export const useUserContext = () => useContext(UserContext);

/**
 * TODO: session storage of user
 */

const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const onCancelRef = useRef((msg?: string) => {});
  const [user, setUser] = useState<User | null>(null);

  /**
   * update the on cancel ref
   */
  const onCancel = (func: (msg?: string) => void) => {
    onCancelRef.current = func;
  };

  /**
   * login a specified user
   */
  const login = async (options: { userName: string; password: string }) => {
    let response = await USER_API.login(options.userName, options.password);
    if (response?.success) setUser(response.user);
    else onCancelRef.current(response?.errorMessage);
  };

  /**
   * sign out the current user
   */
  const signOut = () => {
    setUser(null);
  };

  /**
   * create a new user
   */
  const create = async (options: Omit<User, "cardSets">) => {
    let response = await USER_API.createUser({
      ...options,
      cardSets: [],
    });
    if (response?.success) setUser(response.user);
    else onCancelRef.current(response?.errorMessage);
  };

  /**
   * get a specific user
   */
  const get = async (options: { userName: string }) => {
    let user = await USER_API.getUser(options.userName);
    return user;
  };

  /**
   * delete a specific user
   */
  const deleteUser = async (options: { userName: string }) => {
    await USER_API.deleteUser(options.userName);
  };

  const value = {
    user,
    setUser: (user: User | null) => setUser(user),
    onCancel,
    login,
    signOut,
    create,
    get,
    deleteUser,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserProvider;
