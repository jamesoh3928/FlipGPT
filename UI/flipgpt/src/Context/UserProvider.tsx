import React, { useContext, createContext, useState, useRef } from "react";
import { useUserFuncs } from "../Hooks/useUserFuncs";
import Log from "../Log";

import { User } from "../Types/User";

type ContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
  onCancel: (func: (msg?: string) => void) => void;
  login: (options: { userName: string; password: string }) => Promise<void>;
  signOut: () => void;
  updateUser: (user: User) => Promise<void>;
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
  updateUser: async (user: User) => {},
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
  const userFuncs = useUserFuncs();
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
    let response = await userFuncs.login(options.userName, options.password);
    Log.log(response);
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
  const create = async (options: User) => {
    let response = await userFuncs.createUser(options);
    if (response) setUser(response);
    else onCancelRef.current();
  };

  /**
   * update the current user
   */
  const updateUser = async (user: User) => {
    await userFuncs.updateUser(user);
    setUser(user);
  };

  /**
   * get a specific user
   */
  const get = async (options: { userName: string }) => {
    let user = await userFuncs.getUser(options.userName);
    return user;
  };

  /**
   * delete a specific user
   */
  const deleteUser = async (options: { userName: string }) => {
    await userFuncs.deleteUser(options.userName);
  };

  const value = {
    user,
    setUser: (user: User | null) => setUser(user),
    onCancel,
    login,
    signOut,
    create,
    updateUser,
    get,
    deleteUser,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserProvider;
