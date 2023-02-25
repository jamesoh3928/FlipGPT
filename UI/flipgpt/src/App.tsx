import React from 'react';
import logo from './logo.svg';
import './App.css';
import Homepage from './Homepage';
import { UserDatabase } from './Context/UserDatabase';
import { useEffect } from 'react';
import { User } from './Types/User';
import USER_API from './Context/UserDatabase';
function App() {
  let user: User = { userName: "username_test", 
                       password:"password_test", 
                       phoneNumber: "phone_test", 
                       cardSets: [] };
  useEffect(() => {
    USER_API.addUser(user).then(() => console.log("finished")); 
  }, [])
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <Homepage></Homepage>
    </div>
  );
}

export default App;
