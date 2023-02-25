import React, { useState } from "react";
import Button from "../Components/Button";
import Input from "../Components/Input";

import "../Styles/login.css";

function Login() {
  const [loading, setLoading] = useState(false);
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState("");

  /**
   * Submit the users information to the server to login
   */
  const submit = () => {
    if (!validated()) return;
  };

  /**
   * Validate that the state is properly filled out
   */
  const validated = () => {
    if (userName.length == 0) {
      return false;
    }
    if (password.length == 0) {
      return false;
    }
    return true;
  };

  return (
    <div className="flex flex-center flex-col login-container">
      <div className="flex flex-center flex-col" style={{ marginTop: 20 }}>
        <h1 className="margin-0 f-bolder fs-45 f-white">Getting Started</h1>
        <p className="margin-10 f-bold fs-20 f-white">
          Login or <span className="f-orange">Create Account</span>
        </p>
        <p className="margin-10 f-bold fs-20 f-white">{userName}</p>
      </div>

      <div className="input-boxes">
        <div className="bg-purple margin-vertical-15 width-100">
          <Input
            color="white"
            label="Username"
            placeholder="Username"
            value={userName}
            onChange={setUserName}
          />
        </div>
        <div className="bg-purple margin-vertical-15 width-100">
          <Input
            color="white"
            label="Password"
            placeholder="Password"
            value={password}
            onChange={setPassword}
          />
        </div>
        <Button text="Login" />
      </div>
    </div>
  );
}

export default Login;
