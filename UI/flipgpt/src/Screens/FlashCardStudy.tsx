import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router";

import "../Styles/flashcard.css";
import { FlashCardSet } from "../Types/FlashCardSet";
import Button from "../Components/Button";
import FlashCard from "../Components/FlashCard";
import Icons from "../Components/Icons";
import { RoutesProps } from "react-router-dom";
import Log from "../Log";
import { useCardSets } from "../Hooks/useCardSets";
import { Spinner } from "../Components/Spinner";
import { useUserContext } from "../Context/UserProvider";

import TWILIO_API from "../Context/TwilioAPI";
import { useTwilio } from "../Hooks/useTwilio";

const FlashCardStudy: React.FC = () => {
  const location = useLocation();
  const navigation = useNavigate();
  const { user } = useUserContext();
  const { sendTwilioNotification, onCancel } = useTwilio();
  const {
    state: { cardSets },
    getById,
  } = useCardSets();
  const { setId }: { setId: number } = location.state;

  // const flashCard = useRef<FlashCard>(null);

  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const cardSet: FlashCardSet | null = cardSets[0] ?? null;
  const cards = cardSet?.cards ?? [];
  const title = cardSet?.title ?? "";

  useEffect(() => {
    if (!user) return navigation("/login");
    getById(setId);
  }, []);

  useEffect(() => {
    Log.log(cardSet);
  }, [cardSet]);

  /**
   * Navigate back to the last page
   */
  const goBack = () => {
    navigation(-1);
  };

  /**
   * Send Notification
   */
  const sendTextMsg = () => {
    if (!user) return;
    onCancel((msg?: string) => {
      Log.log(`Error ${msg}`);
    });

    sendTwilioNotification(
<<<<<<< Updated upstream
      `Good Job Finishing Study Set ${title}. We'll remind you to check back and review in a week from now`,
      user.phoneNumber
=======
      `Good Job Finishing Study Set ${cardSet.title}. We'll remind you to check back and review in a week from now`,
      // user.phoneNumber
      `17163469684`
>>>>>>> Stashed changes
    );

    navigation("/");
  };

  return (
    <div className="relative flex flex-col flex-center">
      <Button
        onPress={goBack}
        style={{ position: "absolute", top: "25px", left: "25px" }}
      >
        <Icons name="leftArrow" />
      </Button>
      {cardSet !== null ? (
        <div className="flex flex-col flex-center">
          <div>
            <h1 className="f-white">{title}</h1>
            <h3 className="f-white">
              {index + 1} of {cards.length}
            </h3>
          </div>
          <div style={{ height: 100 }} />
          <div className="width-100 flex flex-row flex-center">
            <Button
              onPress={() => {
                setIndex((val) => val - 1);
                setFlipped(false);
              }}
              disabled={index === 0}
            >
              <Icons name="leftArrow"></Icons>
            </Button>
            <FlashCard
              flipped={flipped}
              toggleFlip={() => setFlipped((val) => !val)}
              front={cards[index].front}
              back={cards[index].back}
            ></FlashCard>
            <Button
              onPress={() => {
                setIndex((val) => val + 1);
                setFlipped(false);
              }}
              disabled={index === cards.length - 1}
            >
              <Icons name="rightArrow"></Icons>
            </Button>
          </div>
          <div style={{ height: 100 }} />
          <div className="flex flex-center" style={{ width: "75%" }}>
            {index === cards.length - 1 && (
              <div className="flex flex-center">
                <Button text="Finished" onPress={sendTextMsg} />
              </div>
            )}
          </div>
        </div>
      ) : (
        <div style={{ height: "40vh" }} className="width-100 flex flex-center ">
          <Spinner />
        </div>
      )}
    </div>
  );
};

export default FlashCardStudy;
