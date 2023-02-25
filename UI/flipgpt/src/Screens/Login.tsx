import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../Components/Button";
import Input from "../Components/Input";
import USER_API from "../Context/UserDatabase";
import Log from "../Log";

import "../Styles/login.css";

function Login() {
  const navigation = useNavigate();

  const [loading, setLoading] = useState(false);
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState("");

  /**
   * Submit the users information to the server to login
   */
  const submit = async () => {
    console.log(`Submiting...`);
    if (!validated()) return;
    setLoading(true);

    Log.log(`Sending Call`);

    let response = await USER_API.login(
      userName,
      password
    );
    Log.log(response);
    
    setLoading(false);
    if(response?.success) {
      navigation("/home");
    }
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
        <div className="margin-vertical-15 ">
          <Input
            color="white"
            label="Username"
            placeholder="Username"
            value={userName}
            onChange={setUserName}
          />
        </div>
        <div className="margin-vertical-15 width-100">
          <Input
            color="white"
            label="Password"
            placeholder="Password"
            value={password}
            onChange={setPassword}
          />
        </div>

        <div className="margin-vertical-25 ">
          <Button onPress={submit} text="Login" />
        </div>
      </div>
    </div>
  );
}

export default Login;
