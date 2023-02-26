
let cardSetCache = []; 

// load the initial cache
function readJson() {
    
}


// write the cache to the json file
function writeJson() {

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
    updateCardSet, 
    createCardSet
    // deleteCardSet, 
}

export default card_set_file_dao