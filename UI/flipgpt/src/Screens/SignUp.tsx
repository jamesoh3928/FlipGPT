import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Images from "../assets/images/Images";
import Button from "../Components/Button";
import Input from "../Components/Input";
import { Spinner } from "../Components/Spinner";
import USER_API from "../Context/UserDatabase";
import { useUserContext } from "../Context/UserProvider";
import Log from "../Log";

function SignUp() {
  const { user, create, onCancel } = useUserContext();
  const navigation = useNavigate();

  const [loading, setLoading] = useState(false);
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

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
      Log.log(`SignUp Error: ${msg}`);
    });

    await create({
      userName,
      password,
      phoneNumber: phone,
    });

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
    if (phone.length == 0) {
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
            Create Account or{" "}
            <Link to={"/login"} className="link">
              <span className="f-orange">Login</span>
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
          <div className="margin-vertical-15 width-100">
            <Input
              color="white"
              label="Phone #"
              placeholder="Phone #"
              value={phone}
              onChange={setPhone}
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

export default SignUp;
