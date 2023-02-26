import React from "react";
import { Link } from "react-router-dom";
import { useUserContext } from "../Context/UserProvider";

import "../Styles/header.css";
import Icons from "./Icons";
type Props = {
  // placehoder?: string;
  // value: string;
  // onChange?: (value: string) => void;
};
const Header: React.FC<Props> = (props) => {
  const { user, signOut } = useUserContext();
  return (
    <div className="flex header-container relative bg-orange">
      <Link className="link" to={"/"}>
        <h1 className="clickable f-45 f-bold f-white">FlipGPT</h1>
      </Link>
      {user ? (
        <div
          onClick={signOut}
          className="clickable"
          style={{ marginLeft: "auto", marginRight: 50 }}
        >
          <Icons size={35} name="logout" />
        </div>
      ) : null}
    </div>
  );
};

export default Header;
