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
import { Spinner } from "../Components/Spinner";

const TOPICS: GPTopics[] = ["Notes", "Topic"];

const Home = () => {
  const navigation = useNavigate();
  const { user, updateUser } = useUserContext();
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
    if (!validate() || !user) return;
    setLoading(true);

    let response: { flashCards: FlashCard[] } | undefined = undefined;

    if (selectedTopic == "Topic") {
      response = await CHATGPT_API.generateFlashcardTopic(input);
    } else {
      response = await CHATGPT_API.generateFlashcardNotes(input);
    }

    if (!response) return setLoading(false);

    if (response.flashCards.length == 0) {
      Log.log(`Error Server Returned empty list`);
      return setLoading(false);
    }

    /**
     * want to remove
     */
    user.cardSets.push({
      setId: Math.random() * 100,
      title: input,
      cards: response.flashCards,
      dateLastTaken: new Date(),
      username: user.userName,
    });

    await updateUser(user);

    goToFlashCard(response.flashCards);

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
    setSelectedTopic(topic);
    setInput("");
  };

  /**
   * Go to flashcard
   */
  const goToFlashCard = (cards: FlashCard[]) => {
    navigation("/flash-card-study", {
      state: {
        studyTopic: input,
        cards,
      },
    });
  };

  return (
    <div
      style={{ paddingBottom: 50, justifyContent: "space-between" }}
      className="flex flex-center flex-col"
    >
      {selectedTopic == "Topic" ? (
        <h1 className="f-white fs-45">
          What <span className="f-orange">topic</span> would you like to study?
        </h1>
      ) : (
        <h1 className="f-white fs-45">
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

      <Button disabled={loading} onPress={submit}>
        {loading ? <Spinner /> : <Icons name="search" color="white" />}
      </Button>
    </div>
  );
};

export default Home;
