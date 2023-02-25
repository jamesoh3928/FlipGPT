import { FlashCardSet } from "./FlashCardSet";

export type User = {
    userName : string; 
    password : string; 
    email : string; 
    cardSets : FlashCardSet[]; 
}