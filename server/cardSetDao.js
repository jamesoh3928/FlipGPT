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
    userSets = []; 
    for(var cardSet in cardSetCache) {
        if(cardSet.username === username) {
            userSets.push(cardSet); 
        }
    }
    return userSets; 
}

// get 1 card set
function getCardSet(setId) {
    for(var cardSet in cardSetCache) {
        if(cardSet.setId === setId) {
            return cardSet; 
        }
    }
    return null; 
}


// update the card set
function updateLastDate(cardSetId) {
    for(var cardSet in cardSetCache) {
        if(cardSet.setId === cardSetId) {
            cardSet.updateLastDate = new Date(); // sets the time to now 
            writeJson();
            return cardSet;
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