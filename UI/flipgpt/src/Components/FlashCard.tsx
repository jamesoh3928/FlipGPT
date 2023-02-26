import React, { useState } from "react";

import "../Styles/flashcard.css";

type Props = {
  front: string;
  back: string;
  flipped?: boolean;
  toggleFlip?: () => void;
  onPress?: () => void;
};

const FlashCard: React.FC<Props> = ({
  front,
  back,
  onPress,
  flipped,
  toggleFlip,
}) => {
  return (
    <div
      onClick={() => (onPress ? onPress() : toggleFlip && toggleFlip())}
      className={`flash-card-container ${flipped ? `flipped` : ``}`}
    >
      <div className={`flash-card-content`}>
        <div className="flash-card front clickable">
          <h2 className="f-40 f-bold flash-card-text">
            <span />
            {front}
          </h2>
        </div>
        <div className="flash-card back clickable">
          <h2 className="f-40 f-bold flash-card-text">
            <span />
            {back}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default FlashCard;
