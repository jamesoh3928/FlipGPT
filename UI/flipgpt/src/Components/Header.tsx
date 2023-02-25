import React from "react";
import { Link } from "react-router-dom";

import "../Styles/header.css";
type Props = {
  // placehoder?: string;
  // value: string;
  // onChange?: (value: string) => void;
};
const Header: React.FC<Props> = (props) => {
  return (
    <div className="header-container bg-orange">
      <Link className="link" to={"/"}>
        <h1 className="clickable f-45 f-bold f-white">FlipGPT</h1>
      </Link>
    </div>
  );
};

export default Header;
