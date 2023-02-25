import React, { useState } from "react";

function Login() {
  const [userName, setUserName] = useState<String>("");
  const [password, setPassword] = useState("");

  return (
    <div className="flex flex-center flex-col">
      <div className="flex flex-center flex-col" style={{ marginTop: 20 }}>
        <h1 className="margin-0 f-bolder fs-45 f-white">Getting Started</h1>
        <p className="margin-10 f-bold fs-20 f-white">
          Login or <span className="f-orange">Create Account</span>
        </p>
      </div>

      <div className="input-boxes"></div>
    </div>
  );
}

export default Login;
