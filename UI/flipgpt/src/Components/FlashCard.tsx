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
          <p className="f-30 f-bold flash-card-text">{front}</p>
        </div>
        <div className="flash-card back clickable">
          <p className="f-30 f-bold flash-card-text">{back}</p>
        </div>
      </div>
    </div>
  );
};

export default FlashCard;
