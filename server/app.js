import express from 'express';
import { ChatGPTUnofficialProxyAPI } from 'chatgpt';
import { oraPromise } from 'ora';
import dotenv from 'dotenv-safe';

dotenv.config();

const app = express();

let result = "";

const api = new ChatGPTUnofficialProxyAPI({
  accessToken: process.env.OPENAI_ACCESS_TOKEN,
  debug: false,
});

app.get('/', async (req, res) => {
  console.log(`Request: ${req}`);
  const generateFlashcards = "I want you to act as a flash card generator. I will type notes you will make flashcard out of from, or any topics I will study on. I want you to only respond with front of the flashcards (question), and back of the flashcards (answers). For the answer follow the format (do not printing anything else)\:\n\nQuestion: <some question>\nAnswer: <answer to question>\n\nQuestion: <some question>\nAnswer: <answer to question>\n\ncontinue...\n\nGenerate 10 flashcard each time I ask for it, and when I say \"More\", generate more flashcards with the same topics. For this request, just say \"Okay\" to confirm you understand the request.";
  // const result = await oraPromise(api.sendMessage(prompt), { text: prompt });
  result = await oraPromise(api.sendMessage(generateFlashcards), { text: generateFlashcards });

  res.send({
    response: result.text,
  });
  console.log(result.text);
});

app.get('/topic', async (req, res) => {
  const testTopic = "Rust programming language";
  const topicPrompt = `Topic: ${testTopic}`;
  result = await oraPromise(api.sendMessage(topicPrompt, {
    conversationId: result.conversationId,
    parentMessageId: result.id
  }), { text: topicPrompt });

  // Parse result.text into json format of array of flashcard ({flashcards: [{front:"", back:""}, ...]}){front:"", back:""}]})
  const flashcards = result.text.split("\n\n").map((flashcard) => {
    const [front, back] = flashcard.split("\n");
    return { front: front.substring(10), back: back.substring(8) };
  });

  res.send({
    flashcards,
  });
  console.log(result.text);
});

// TODO: 
// 1. Manipulate data into json format of array of flashcard ({flashcards: [{front:"", back:""}, ...]}){front:"", back:""}]})
// change post request (body)

app.listen(4000, () => {
  console.log('Server started on port 4000');
});