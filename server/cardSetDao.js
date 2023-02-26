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


// create the card set and return the id of new set
function createCardSet(cards, username) {
    if (!checkCardsetNumber(username)) {
        return null; 
    }
    let setId = getUniqueId()
    let cardSet = {
        setId,
        username: username,
        cards,
    }
    cardSetCache.push(cardSet); 
    writeJson(); 
    return setId; 
}


function checkCardsetNumber(username) {
    let count = 0; 
    for(let i = 0; i < cardSetCache.length; i++) {
        if(cardSetCache[i].username == username) {
            count++; 
        }
    }
    return count < 3;
}

function getUniqueId() {
    return newId = cardSetCache[cardSetCache.length - 1].setId + 1;
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