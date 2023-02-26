import Log from "../Log";
import API from "../Types/API";

// TODO test the functions
async function generateFlashcardTopic(topic: string, username: string) {
  console.log("generating flashcard for the topic");
  try {
    const response = await fetch(API + "topic", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: topic,
        username,
      }),
    });
    // TODO delete
    console.log(response);
    return await response.json();
  } catch (e: any) {
    Log.log(`GPT Error: ${e.message}`);
    return null;
  }
}

async function generateFlashcardNotes(notes: string, username: string) {
  console.log("generating flashcard for the notes");
  try {
    const response = await fetch(API + "notes", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: notes,
        username,
      }),
    });
    // TODO delete
    console.log(response);
    return await response.json();
  } catch (e: any) {
    Log.log(`GPT Error: ${e.message}`);
    return null;
  }
}

let CHATGPT_API = {
  generateFlashcardTopic,
  generateFlashcardNotes,
};

export default CHATGPT_API;
