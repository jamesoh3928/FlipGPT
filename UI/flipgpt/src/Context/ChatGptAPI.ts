// TODO test the functions 
async function generateFlashcardTopic(topic: string) {
    console.log('generating flashcard for the topic');
    const response = await fetch("http://localhost:4000/topic", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(
            {
                "prompt": topic,
            }),
    });
    // TODO delete
    console.log(response);
    return response;
}

async function generateFlashcardNotes(notes: string) {
    console.log('generating flashcard for the notes');
    const response = await fetch("http://localhost:4000/notes", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(
            {
                "prompt": notes,
            }),
    });
    // TODO delete
    console.log(response);
    return response;
}

let CHATGPT_API = {
    generateFlashcardTopic,
    generateFlashcardNotes
}

export default CHATGPT_API; 
