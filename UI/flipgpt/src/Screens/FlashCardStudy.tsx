import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";

import "../Styles/flashcard.css";
import { FlashCardSet } from "../Types/FlashCardSet";
import Button from "../Components/Button";
import FlashCard from "../Components/FlashCard";
import Icons from "../Components/Icons";
import { RoutesProps } from "react-router-dom";
import Log from "../Log";
import { useCardSets } from "../Hooks/useCardSets";
import { Spinner } from "../Components/Spinner";

type Props = {
  studyTopic?: string;
  cards?: FlashCardSet;
};

const testObj = {
  title: "Operating System",
  flashcards: [
    {
      front: "What is an Operating System?",
      back: "An Operating System (OS) is a software program that manages the hardware and software resources of a computer system.",
    },
    {
      front: "What are the functions of an Operating System?",
      back: "The functions of an Operating System include managing computer hardware resources, providing a user interface, managing and executing software applications, and providing security and protection.",
    },
    {
      front: "What are the types of Operating Systems?",
      back: "The types of Operating Systems are Single-user, Multi-user, Multi-tasking, and Real-time Operating Systems.",
    },
    {
      front: "What is a process in an Operating System?",
      back: "A process is a program in execution. It is a unit of work within the Operating System that can be scheduled for execution, interrupted, and resumed.",
    },
    {
      front: "What is a thread in an Operating System?",
      back: "A thread is a lightweight process that exists within a process and shares its resources. Threads can execute concurrently within a process.",
    },
    {
      front: "What is virtual memory in an Operating System?",
      back: "Virtual memory is a technique that allows an Operating System to use more memory than is physically available by temporarily transferring pages of data from RAM to disk storage.",
    },
    {
      front: "What is a file system in an Operating System?",
      back: "A file system is a method used by Operating Systems to store, organize, and access files on a disk or other storage device.",
    },
    {
      front: "What is a device driver in an Operating System?",
      back: "A device driver is a software program that allows the Operating System to communicate with hardware devices such as printers, scanners, and network cards.",
    },
    {
      front: "What is a shell in an Operating System?",
      back: "A shell is a user interface that allows users to interact with the Operating System by entering commands and receiving output.",
    },
    {
      front: "What is a kernel in an Operating System?",
      back: "A kernel is the core component of an Operating System that manages the system's resources, provides services to other programs, and enforces security and protection.",
    },
  ],
};

const FlashCardStudy: React.FC<RoutesProps> = (props) => {
  const location = useLocation();
  const {
    state: { cardSets },
    getByUserName,
    getById,
  } = useCardSets();
  const { setId }: { setId: number } = location.state;
  // const { studyTopic, cards }: Props = state;
  const [index, setIndex] = useState(0);
  const cardSet: FlashCardSet | null = cardSets[0] ?? null;

  useEffect(() => {
    Log.log(`Calling get by id ${setId}`);
    getById(setId);
    // Log.log(location.pathname, false);
    // Log.log(location.state);
  }, []);

  useEffect(() => {
    Log.log(`Card Set`, false);
    Log.log(cardSet);
  }, [cardSet]);

  return (
    <div className="flex flex-col flex-center">
      {cardSet !== null ? (
        <div>
          <div id="Topic">
            <h1>{cardSet.title}</h1>
          </div>
          <div className="width-100 flex flex-center">
            <FlashCard
              front={cardSet.cards[index].front}
              back={cardSet.cards[index].back}
            ></FlashCard>
          </div>

          <div
            className="flex flex-center"
            style={{ justifyContent: "space-evenly", width: "50%" }}
          >
            {/* TODO: Set flip to front when button is clicked */}
            <Button
              onPress={() => setIndex((val) => val - 1)}
              disabled={index === 0}
            >
              <Icons name="leftArrow"></Icons>
            </Button>
            <h2>
              {index + 1} of {testObj["flashcards"].length}
            </h2>
            <Button
              onPress={() => setIndex((val) => val + 1)}
              disabled={index === testObj["flashcards"].length - 1}
            >
              <Icons name="rightArrow"></Icons>
            </Button>
          </div>
        </div>
      ) : (
        <div className="width-100 flex flex-center ">
          <Spinner />
        </div>
      )}
    </div>
  );
};

export default FlashCardStudy;
