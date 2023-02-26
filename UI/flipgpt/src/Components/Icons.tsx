import React from "react";

import { FaUserGraduate } from "react-icons/fa";
import { IoMdSearch } from "react-icons/io";

type Props = {
  name: "user" | "search";
  size?: number;
  color?: string;
};

const Icons: React.FC<Props> = ({ name, size = 25, color = "white" }) => {
  const iconMap = {
    user: FaUserGraduate,
    search: IoMdSearch,
  };

  const SelectedIcon = iconMap[name];

  return (
    <div className="flex flex-center">
      <SelectedIcon color={color} size={size} />
    </div>
  );
};

export default Icons;
