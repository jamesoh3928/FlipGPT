import React from "react";

import {
  FaUserGraduate,
  FaChevronCircleUp,
  FaChevronCircleLeft,
  FaChevronCircleDown,
  FaChevronCircleRight,
} from "react-icons/fa";
import { IoMdSearch, IoMdLogOut } from "react-icons/io";
import { GiBrickWall } from "react-icons/gi";

type Props = {
  name:
    | "user"
    | "search"
    | "upArrow"
    | "downArrow"
    | "leftArrow"
    | "rightArrow"
    | "logout"
    | "spinner";
  size?: number;
  color?: string;
};

const Icons: React.FC<Props> = ({ name, size = 25, color = "white" }) => {
  const iconMap = {
    user: FaUserGraduate,
    search: IoMdSearch,
    upArrow: FaChevronCircleUp,
    downArrow: FaChevronCircleDown,
    leftArrow: FaChevronCircleLeft,
    rightArrow: FaChevronCircleRight,
    logout: IoMdLogOut,
    spinner: GiBrickWall,
  };

  const SelectedIcon = iconMap[name];

  return (
    <div className="flex flex-center">
      <SelectedIcon color={color} size={size} />
    </div>
  );
};

export default Icons;
