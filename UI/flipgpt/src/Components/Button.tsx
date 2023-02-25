import React, { useState } from "react";

import "../Styles/button.css";

type Props = {
  text?: string;
  children?: React.ReactNode;
  onPress?: () => void;
  disabled?: boolean;
  colors?: {
    active: string;
    inactive: string;
  };
};

const Button: React.FC<Props> = ({
  text,
  children,
  onPress,
  disabled,
  colors = {
    inactive: "#e7853e",
    active: "#BD6C32",
  },
}) => {
  const [clicking, setClicking] = useState(false);

  return (
    <div
      onMouseEnter={() => setClicking(true)}
      onMouseLeave={() => setClicking(false)}
      style={{
        backgroundColor: clicking ? colors.active : colors.inactive,
      }}
      className="clickable flex flex-center flex-col button-container"
    >
      {text ? <h2 className="margin-0 f-white fs-20 f-bold">{text}</h2> : null}
    </div>
  );
};

export default Button;