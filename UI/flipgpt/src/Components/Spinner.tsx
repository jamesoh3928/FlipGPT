import React from "react";
import Icons from "./Icons";

import "../Styles/spinner.css";

type Props = {
  size?: number;
  color?: string;
};

export const Spinner: React.FC<Props> = ({ size, color }) => {
  return (
    <div className="spinning">
      <Icons size={size} color={color} name="spinner" />
    </div>
  );
};
