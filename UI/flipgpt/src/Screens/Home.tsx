import React, { useEffect, useState } from "react";
import FlashCard from "../Components/FlashCard";
import Input from "../Components/Input";
import { GPTopics } from "../Types/GPTopics";

import "../Styles/home.css";
import Button from "../Components/Button";
import Icons from "../Components/Icons";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../Context/UserProvider";

const Home = () => {
  const navigation = useNavigate();
  const { user } = useUserContext();
  const [selectedTopic, setSelectedTopic] = useState<GPTopics>("Topic");

  const [input, setInput] = useState("");

  useEffect(() => {
    if (!user) navigation("/login");
  }, [user]);

  /**
   * Select a topic
   */
  const onSelect = (topic: GPTopics) => {
    setSelectedTopic((value) => (value == "Notes" ? "Topic" : "Notes"));
    setInput("");
  };

  /**
   * Go to flashcard
   */
  const goToFlashCard = () => {
    navigation("/flash-card-study");
  };

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
        {selectedTopic == "Topic" ? (
          <Input
            value={input}
            onChange={setInput}
            color={"white"}
            placeholder={"Enter Topic..."}
          />
        ) : (
          <div className="relative">
            <textarea
              value={input}
              onChange={(ev) => setInput(ev.currentTarget.value)}
              className="fs-20"
            />
          </div>
        )}
      </div>

      <Button onPress={goToFlashCard}>
        <Icons name="search" color="white" />
      </Button>
    </div>
  );
};

export default Home;
