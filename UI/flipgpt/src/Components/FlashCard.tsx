import React, { useState } from "react";

import "../Styles/flashcard.css";

type Props = {
  front: string;
  back: string;
  onPress?: () => void;
};

const FlashCard: React.FC<Props> = ({ front, back, onPress }) => {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      onClick={() => (onPress ? onPress() : setFlipped((val) => !val))}
      className={`flash-card-container ${flipped ? `flipped` : ``}`}
    >
      <div className={`flash-card-content`}>
        <div className="flash-card front clickable">
          <p className="flash-card-text">{front}</p>
        </div>
        <div className="flash-card back clickable">
          <p className="flash-card-text">{back}</p>
        </div>
      </div>
    </div>
  );
};

export default FlashCard;
