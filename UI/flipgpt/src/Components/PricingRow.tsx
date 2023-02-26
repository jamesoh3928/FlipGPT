import React from "react";
import { useNavigate, useNavigation } from "react-router-dom";
import Button from "./Button";

import "../Styles/pricingrow.css";
type Props = {
  title: string;
  price: string; 
  description: string;
};


const PricingRow: React.FC<Props> = (props) => {
    const navigation = useNavigate(); 
    return (
        <div className="pricing-container">
            <h1 className="pricing-title">
                {props.title}
            </h1>
            <h2 className="pricing-price">
                {props.price}
            </h2>
            <p className="per-month-p">every month</p>
            <p className="pricing-description">
                {props.description}
            </p>
            <div className="pricing-enroll">
            <Button onPress={()=>navigation("/signup")} text={"Enroll"}>
                
            </Button>
            </div>
        </div>
  );
};

export default PricingRow;
