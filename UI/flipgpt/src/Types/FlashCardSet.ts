import { FlashCard } from "./FlashCard";

export interface FlashCardSet {
    setId : number; 
    title : string; 
    username : string; 
    cards : FlashCard[]; 
    dateLastTaken : Date; 
}