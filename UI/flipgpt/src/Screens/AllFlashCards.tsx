import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../Components/Button";
import FlashCard from "../Components/FlashCard";
import { useUserContext } from "../Context/UserProvider";
import { FlashCardSet } from "../Types/FlashCardSet";

export const AllFlashCards = () => {
  const navigation = useNavigate();
  const { user } = useUserContext();

  const flashCardSets: FlashCardSet[] = [];

  /**
   * Navigate to the flash card study page for specified card set
   */
  const navigateToCardSet = (setId: number) => {
    navigation("/flash-card-study", {
      state: { setId },
    });
  };

  return (
    <div className="flex flex-center flex-col">
      <h1 className="f-white fs-45">
        My <span className="f-orange">Study</span> Sets
      </h1>
      <div className="margin-vertical-30 flex flex-col flex-center">
        {flashCardSets.length == 0 ? (
          <div>
            <div style={{ height: "200px" }}></div>
            <p className="f-white fs-25 f-bold">No Study Sets Found</p>
            <Link to={"/home"}>
              <Button text="Create New Set" />
            </Link>
          </div>
        ) : (
          flashCardSets.map((set) => (
            <div className="margin-vertical-25">
              <FlashCard
                onPress={() => navigateToCardSet(set.setId)}
                front={set.title}
                back={"Andrew Tate"}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
};
