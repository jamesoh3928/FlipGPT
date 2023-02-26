import React, { useEffect, useState } from "react";
import Input from "../Components/Input";
import { GPTopics } from "../Types/GPTopics";

import "../Styles/home.css";
import Button from "../Components/Button";
import Icons from "../Components/Icons";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../Context/UserProvider";
import DropDown from "../Components/DropDown";
import CHATGPT_API from "../Context/ChatGptAPI";
import Log from "../Log";
import { FlashCard } from "../Types/FlashCard";

const TOPICS: GPTopics[] = ["Notes", "Topic"];

const Home = () => {
  const navigation = useNavigate();
  const { user } = useUserContext();
  const [loading, setLoading] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState<GPTopics>("Topic");

  const [input, setInput] = useState("");

  useEffect(() => {
    if (!user) navigation("/login");
  }, [user]);

  /**
   * Submit the query to the ChatGPT api
   */
  const submit = async () => {
    if (!validate()) return;
    setLoading(true);

    let response: { flashCards: FlashCard[] } | undefined = undefined;

    if (selectedTopic == "Topic") {
      response = await CHATGPT_API.generateFlashcardTopic(input);
    } else {
      response = await CHATGPT_API.generateFlashcardNotes(input);
    }

    // let response = await CHATGPT_API.generateFlashcardNotes(input);

    if (!response) return setLoading(false);

    setLoading(false);
  };

  /**
   * Validate that the length of the notes is not longer than 3000 words
   */
  const validate = () => {
    if (input.length == 0) {
      return false;
    }
    if (selectedTopic == "Topic") return true;

    if (input.length > 3000) return false;

    return true;
  };

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
    navigation("/flash-card-study", {
      state: {
        studyTopic: "Example Topic",
        cards: [
          { front: "front1", back: "back1" },
          { front: "front2", back: "back2" },
        ],
      },
    });
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

      <DropDown
        value={selectedTopic}
        onChange={(val: string) => onSelect(val as GPTopics)}
        values={TOPICS}
      />

      <div className="inputs-container margin-vertical-30 flex flex-row flex-center">
        {selectedTopic == "Topic" ? (
          <Input
            value={input}
            onChange={setInput}
            color={"white"}
            placeholder={"Enter Topic..."}
          />
        ) : (
          <div className="relative notes-container">
            <textarea
              value={input}
              onChange={(ev) => setInput(ev.currentTarget.value)}
              className="fs-20"
            />
          </div>
        )}
      </div>

      <Button
        text={loading ? "Loading..." : undefined}
        disabled={loading}
        onPress={submit}
      >
        <Icons name="search" color="white" />
      </Button>
    </div>
  );
};

export default Home;
