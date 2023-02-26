import React from "react";
import { User } from "../Types/User"; 
import { LoginResponse } from "../Types/LoginResponse";
import { FlashCardSet } from "../Types/FlashCardSet";

export const useCardSetFuncs = () => {

    async function getCardSets(username:string) {
        const response = await fetch("http://localhost:4000/cardSets/"+username, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: null
        }); 
        return await response.json(); 
    }


    async function setLastAccessDate(setID: string) {
        const response = await fetch("http://localhost:4000/cardSets/", {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: "{\"setId\":\""+setID+"\"}"
        }); 
        return await response.json();
    }


    async function createCardSet(cardSet: FlashCardSet) {
        const response = await fetch("http://localhost:4000/cardSets/", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cardSet)
        }); 
        return await response.json(); 
    }



    return {createCardSet, 
        getCardSets, 
        setLastAccessDate, 
        }; 
}





const USER_API = {
     
}