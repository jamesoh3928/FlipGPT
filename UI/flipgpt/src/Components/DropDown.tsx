import React from "react";

import "../Styles/dropdown.css"; 
import { GPTopics } from "../Types/GPTopics";

type Props = {
    values: string[]; 
    value: string; 
    // onValueSelect: (value: string) => void; 
}

const DropDown: React.FC<Props> = (props) => {
    return (
        <select className="dropdown" value={props.value}>
            {props.values.map((op) => (
                <option value={op}>
                    <div className="drop_option">
                        <p>
                            {op}
                        </p>
                    </div>
                </option>
            ))}
        </select>
    );
}


export default DropDown