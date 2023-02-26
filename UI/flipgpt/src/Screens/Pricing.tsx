import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../Components/Button";
import Input from "../Components/Input";
import USER_API from "../Context/UserDatabase";
import Log from "../Log";
import Images from "../assets/images/Images";
import PricingRow from "../Components/PricingRow"; 

import "../Styles/pricing.css";

function Pricing() {
  const navigation = useNavigate();



  return (
    <div>
      <div style={{ zIndex: 0 }}>
        <div className="floating-flash-cards bottom">
          <img src={Images.flashCardUp} alt="flashcards" />
        </div>
        <div className="floating-flash-cards top">
          <img src={Images.flashCardDown} alt="flashcards" />
        </div>
      </div>

      <div className="flex flex-center flex-col login-container">
        <div className="flex flex-center flex-col" style={{ marginTop: 20 }}>
          <h1 className="margin-0 f-bolder fs-45 f-white">Pricing</h1>

          <p className="margin-10 f-bold fs-20 f-white">
            {" "} 
            <Link to={"/signup"} className="link">
              <span className="f-orange">Create Account </span>
            </Link>
             to get notified when we go live!
          </p>
        </div>

        <div className="pricing-boxes">
          <div className="margin-vertical-15 ">
            <PricingRow title="Standard" price="$0" description="Generate 1 set of flashcards per day." /> 
          </div>
          <div className="margin-vertical-15 width-100">
            <PricingRow title="Student" price="$14.99" description="Generate unlimited flashcard sets per day." /> 
          </div>
          <div className="margin-vertical-15 width-100">
            <PricingRow title="Enterprise" price="$149.99" description="Generate unlimited flashcard sets per day, up to 15 total users." /> 
          </div>
          
        </div>
      </div>
    </div>
  );
}

export default Pricing;
