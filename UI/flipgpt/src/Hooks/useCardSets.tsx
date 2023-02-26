import React, { useRef, useState } from "react";
import Log from "../Log";
import { FlashCardSet } from "../Types/FlashCardSet";

export const useCardSets = () => {
  const onCancelRef = useRef((msg?: string) => {});
  const [cardSets, setCardSets] = useState<FlashCardSet[]>([]);

  /**
   * set the on cancel ref for when an error occurs
   */
  const onCancel = (func: (msg?: string) => {}) => {
    onCancelRef.current = func;
  };

  /**
   * get the card sets by username
   */
  const getByUserName = (userName: string) => {
    try {
      fetch(``)
        .then((response) => response.json())
        .then((json) => setCardSets(json));
    } catch (e: any) {
      Log.log(`GetByUserName Error - ${e.message}`);
      return null;
    }
  };

  /**
   * get the card sets by id
   */
  const getById = (setId: string) => {
    try {
      fetch(``)
        .then((response) => response.json())
        .then((json) => setCardSets(json));
    } catch (e: any) {
      Log.log(`GetByUserName Error - ${e.message}`);
      return null;
    }
  };

  return {
    state: {
      cardSets,
    },
    getByUserName,
    getById,
    onCancel,
  };
};
