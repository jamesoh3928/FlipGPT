import * as fs from 'fs'; 

let cardSetCache = []; 

// load the initial cache
function readJson() {
    fs.readFile("cardSets.json", (err, jsonString) => {
        if(err) {
            console.log("File failed to read: ", err); 
            return; 
        }
        try {
            cardSetCache = JSON.parse(jsonString); 
        } catch (err) {
            console.log("Error in parsing cardset JSON string: " + err); 
        }
    }); 
}


// write the cache to the json file
function writeJson() {
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


// update the card set
function updateLastDate(cardSetId) {
    for(var cardSet in cardSetCache) {
        if(cardSet.setId === cardSetId) {
            cardSet.updateLastDate = new Date(); // sets the time to now 
        }
    } 
    writeJson(); 
}


// create the card set 
function createCardSet(cardSet) {
    cardSetCache.push(cardSet); 
    return cardSet; 
    writeJson(); 
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
    getCardSets, 
    updateLastDate, 
    createCardSet
    // deleteCardSet, 
};

export default card_set_file_dao; 