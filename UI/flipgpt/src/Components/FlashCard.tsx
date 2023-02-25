import React, { useState } from "react";

import "../Styles/flashcard.css";

type Props = {
  front: string;
  back: string;
};

const FlashCard: React.FC<Props> = ({ front, back }) => {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      onClick={() => setFlipped((val) => !val)}
      className={`flash-card-container ${flipped ? `flipped` : ``}`}
    >
      <div className={`flash-card-content`}>
        <div className="flash-card front clickable">
          <p className="">{front}</p>
        </div>
        <div className="flash-card back clickable">
          <p className="">{back}</p>
        </div>
      </div>
    </div>
  );
};

export default FlashCard;
