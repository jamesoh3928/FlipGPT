import React, { useState } from "react";
import FlashCard from "../Components/FlashCard";
import Input from "../Components/Input";
import { GPTopics } from "../Types/GPTopics";

import "../Styles/home.css";
import Button from "../Components/Button";

const Home = () => {
  const [selectedTopic, setSelectedTopic] = useState<GPTopics>("Topic");

  const [input, setInput] = useState("");

  return (
    <div
      style={{ paddingBottom: 50, justifyContent: "space-between" }}
      className="flex flex-center flex-col"
    >
      {selectedTopic == "Topic" ? (
        <h1 className="f-white">
          What <span className="f-orange">topic</span> would you like to study?
        </h1>
      ) : (
        <h1 className="f-white">
          Make cards out of your <span className="f-orange">personal</span>{" "}
          notes
        </h1>
      )}

      <div className="inputs-container margin-vertical-15 flex flex-row ">
        <Input
          value={input}
          onChange={setInput}
          color={"white"}
          placeholder={"Enter Topic..."}
        />
      </div>

      <Button text="Search..."></Button>
    </div>
  );
};

export default Home;
