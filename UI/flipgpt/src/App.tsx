import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Homepage from "./Homepage";
import { UserDatabase } from "./Context/UserDatabase";
import { useEffect } from "react";
import { User } from "./Types/User";
import USER_API from "./Context/UserDatabase";

import "./App.css";

import { Outlet, Route, Routes, redirect, Navigate } from "react-router-dom";

import Home from "./Screens/Home";
import Login from "./Screens/Login";
import SignUp from "./Screens/SignUp";
import FlashCardStudy from "./Screens/FlashCardStudy";
import Header from "./Components/Header";
import "./Styles/global.css";
import UserProvider from "./Context/UserProvider";
import { AllFlashCards } from "./Screens/AllFlashCards";

function App() {
  return (
    <UserProvider>
      <div className="app">
        <Header />
        <Routes>
          <Route path="/" element={<Navigate replace to="/login" />}></Route>
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/flash-card-study" element={<FlashCardStudy />} />
          <Route path="/user/:id/cards" element={<AllFlashCards />} />
        </Routes>
      </div>
    </UserProvider>
  );
}

export default App;
