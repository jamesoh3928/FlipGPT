import React from "react";

import "../Styles/pricingrow.css";
type Props = {
  title: string;
  price: string; 
  description: string;
};
const PricingRow: React.FC<Props> = (props) => {
  return (
    <div className="pricing-container">
      <p className="pricing-title">
        {props.title}
      </p>
      <p className="pricing-price">
        {props.price}
      </p>
      <p>per month</p>
      <p className="pricing-description">
        {props.description}
      </p>
      
    </div>
  );
};

export default PricingRow;
