import React from "react";
import { Link } from "react-router-dom";
import Images from "../assets/images/Images";
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
      <div className="relative ">
        <div className="logo absolute">
          <img src={Images.logo} alt="logo" />
        </div>
        <Link style={{ zIndex: 1 }} className="relative link" to={"/"}>
          <h1 id="brand" className="clickable f-45 f-bold f-white">
            FlipGPT
          </h1>
        </Link>
      </div>
        

      {user ? (
        <div
          style={{ marginLeft: "auto", marginRight: 50 }}
          className="flex flex-row"
        >
          <Link
            to={"/user/cards"}
            className="clickable"
            style={{ marginRight: "25px" }}
          >
            <Icons size={35} name="user" />
          </Link>
          <div onClick={signOut} className="clickable">
            <Icons size={35} name="logout" />
          </div>
        </div>
      ) : (
        <div className="pricing_link">
          <h1>
            <Link to={"/pricing"} className="link">
              <span className="f-white"> Pricing </span>
            </Link>
          </h1>
        </div>
      )}
    </div>
  );
};

export default Header;
