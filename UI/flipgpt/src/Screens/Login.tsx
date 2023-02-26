import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../Components/Button";
import Input from "../Components/Input";
import USER_API from "../Context/UserDatabase";
import Log from "../Log";

import "../Styles/login.css";
import Images from "../assets/images/Images";
import { useUserContext } from "../Context/UserProvider";
import { Spinner } from "../Components/Spinner";

function Login() {
  const { user, login, onCancel } = useUserContext();
  const navigation = useNavigate();

  const [loading, setLoading] = useState(false);
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    Log.log(user);
    if (user) navigation("/home");
  }, [user]);

  /**
   * Submit the users information to the server to login
   */
  const submit = async () => {
    if (!validated()) return;
    setLoading(true);

    onCancel((msg) => {
      Log.log(`Login Error: ${msg}`);
    });

    await login({ userName, password });

    setLoading(false);
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
    <div>
      <div style={{ zIndex: 0 }}>
        <div className="floating-flash-cards bottom">
          <img src={Images.flashCardUp} alt="flashcards" />
        </div>
        <div className="floating-flash-cards top">
          <img src={Images.flashCardDown} alt="flashcards" />
        </div>
      </div>

      <div className="flex flex-center flex-col login-container">
        <div className="flex flex-center flex-col" style={{ marginTop: 20 }}>
          <h1 className="margin-0 f-bolder fs-45 f-white">Getting Started</h1>

          <p className="margin-10 f-bold fs-20 f-white">
            Login or{" "}
            <Link to={"/signup"} className="link">
              <span className="f-orange">Create Account</span>
            </Link>
          </p>
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
            <Button onPress={submit} text={loading ? undefined : "Login"}>
              <Spinner />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
