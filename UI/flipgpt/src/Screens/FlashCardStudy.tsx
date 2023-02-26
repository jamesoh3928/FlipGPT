import React, { useState } from "react";
import { useLocation } from "react-router";

import "../Styles/flashcard.css";
import { FlashCardSet } from "../Types/FlashCardSet";

type Props = {
    studyTopic?: string,
    cards?: FlashCardSet,
}

const testObj = {studyTopic: "Ricky Trivia", cards: [{front: "front1", back: "back1"}, {front: "front2", back:"back2"}]};

const FlashCardStudy = () => {
    const{state} = useLocation();
    const{studyTopic, cards}: Props = state;
    const[ index, setIndex ] = useState(0);

  return (
    <div>
        <div id="Topic">
            <h1>{ testObj.studyTopic }</h1>
        </div>
        <div>
            <h2>{index+1} of {testObj.cards.length}</h2>
        </div>
        <div>
            
        </div>
    </div>
    );
}

export default FlashCardStudy;
