import React, { useState } from "react";

import "../Styles/dropdown.css";
import Icons from "./Icons";

type Props = {
  values: string[];
  value: string;
  onChange: (val: string) => void;
};

const DropDown: React.FC<Props> = ({ value, values, onChange }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col container">
      <div
        onClick={() => setOpen((val) => !val)}
        className={`clickable dropdown flex relative ${
          open ? `dropdown-open` : ``
        } bg-white`}
      >
        <div className="place-holder-container flex flex-center">
          <p className="dropdown-text fs-20">{value}</p>
        </div>
        <div style={{ flex: 0.3 }} className="flex flex-center bg-orange">
          <Icons name={open ? "upArrow" : "downArrow"} size={25} />
        </div>
      </div>
      <div
        className={`options-container flex flex-col ${
          open ? `open-container` : ``
        }`}
      >
        {values.map((option) => (
          <p
            key={option}
            onClick={() => {
              setOpen(false);
              onChange(option);
            }}
            className="flex flex-center options-text fs-15"
          >
            {option}
          </p>
        ))}
      </div>
    </div>
  );
};

export default DropDown;
