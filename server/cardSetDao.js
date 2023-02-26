import * as fs from 'fs'; 

let cardSetCache = []; 

// load the initial cache
function readJson() {
    let jsonString = fs.readFileSync("cardSets.json"); 
    cardSetCache = JSON.parse(jsonString.toString()); 
}


// write the cache to the json file
function writeJson() {
    let jsonString = JSON.stringify(cardSetCache); 
    fs.writeFile("cardSets.json", jsonString, err => {
        if(err) {
            console.log("Error writing to cardset file: ", err); 
        }
    }); 
}


// get the card set from the cache
function getCardSets(username) {
    let userSets = []; 
    for(let i = 0; i < cardSetCache.length; i++) {
        if(cardSetCache[i].username == username) {
            userSets.push(cardSetCache[i]);  
        }
    }
    return userSets; 
}

// get 1 card set
function getCardSet(setId) {
    for(let i = 0; i < cardSetCache.length; i++) {
        if(cardSetCache[i].setId == setId) {
            console.log("found set id"); 
            return cardSetCache[i]; 
        }
    }
    return null; 
}


// update the card set
function updateLastDate(cardSetId) {
    for(let i = 0; i < cardSetCache.length; i++) {
        if(cardSetCache[i].setId == cardSetId) {
            cardSetCache[i].dateLastTaken = new Date(); // sets the time to now 
            writeJson();
            return cardSetCache[i];
        }
    }
    return null; 
}


// create the card set 
function createCardSet(cardSet) {
    cardSetCache.push(cardSet); 
    writeJson(); 
    return cardSet; 
}


// TODO
// delete the card set
// function deleteCardSet() {
//     // delete here
//     writeJson(); 
// }


const card_set_file_dao = {
    readJson, 
    writeJson, 
    getCardSet, 
    getCardSets, 
    updateLastDate, 
    createCardSet
    // deleteCardSet, 
};

export default card_set_file_dao; 