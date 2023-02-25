import React from "react"; 

import "../Styles/input.css"; 
type Props = {
    label? : string; 
    placeholder? : string; 
    value : string; 
    onChange : (value: string) => void; 
}
const Input: React.FC<Props> = (props) => {
    return (
        <div className="login-container">
            <p className="input-label">{props.label}</p>
            <input className="input-input" type="text" placeholder={props.placeholder} value={props.value} onChange={(event) =>props.onChange(event.target.value)} />
        </div>
    );
}
  
export default Input;