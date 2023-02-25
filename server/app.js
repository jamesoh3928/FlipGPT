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

// app.get('/', async (req, res) => {
//   console.log(`Request: ${req}`);
//   const generateFlashcards = "I want you to act as a flash card generator. I will type notes you will make flashcard out of from, or any topics I will study on. I want you to only respond with front of the flashcards (question), and back of the flashcards (answers). Make sure you don't pring anything else. For the answer follow the format (do not printing anything else)\:\n\nQuestion: <some question>\nAnswer: <answer to question>\n\nQuestion: <some question>\nAnswer: <answer to question>\n\ncontinue...\n\nGenerate 10 flashcard each time I ask for it, and when I say \"More\", generate more flashcards with the same topics. For this request, just say \"Okay\" to confirm you understand the request.";
//   // const result = await oraPromise(api.sendMessage(prompt), { text: prompt });
//   result = await oraPromise(api.sendMessage(generateFlashcards), { text: generateFlashcards });

//   res.send({
//     response: result.text,
//   });
//   console.log(result.text);
//   console.log(result);
// });

app.get('/topic', async (req, res) => {
  const generateFlashcards = "I want you to act as a flash card generator. I will type notes you will make flashcard out of from, or any topics I will study on. I want you to only respond with front of the flashcards (question), and back of the flashcards (answers). Make sure you don't pring anything else. For the answer follow the format (do not printing anything else)\:\n\nQuestion: <some question>\nAnswer: <answer to question>\n\nQuestion: <some question>\nAnswer: <answer to question>\n\ncontinue...\n\nGenerate 10 flashcard each time I ask for it, and when I say \"More\", generate more flashcards with the same topics. For this request, just say \"Okay\" to confirm you understand the request.";
  let result = await oraPromise(api.sendMessage(generateFlashcards), { text: generateFlashcards });

  const testTopic = "Rust programming language";
  const topicPrompt = `Topic: ${testTopic}`;
  result = await oraPromise(api.sendMessage(topicPrompt, {
    conversationId: result.conversationId,
    parentMessageId: result.id
  }), { text: topicPrompt });

  // Parse result.text into json format of array of flashcard ({flashcards: [{front:"", back:""}, ...]}){front:"", back:""}]})
  const flashcards = result.text.split("\n\n").map((flashcard) => {
    const [front, back] = flashcard.split("\n");
    return { front: front.substring(12), back: back.substring(10) };
  });

  res.send({
    flashcards,
  });
  console.log(result.text);
  console.log(result);
});

app.get('/notes', async (req, res) => {
  const generateFlashcards = "I want you to act as a flash card generator. I will type notes you will make flashcard out of from, or any topics I will study on. I want you to only respond with front of the flashcards (question), and back of the flashcards (answers). Make sure you don't pring anything else. For the answer follow the format (do not printing anything else)\:\n\nQuestion: <some question>\nAnswer: <answer to question>\n\nQuestion: <some question>\nAnswer: <answer to question>\n\ncontinue...\n\nGenerate 10 flashcard each time I ask for it, and when I say \"More\", generate more flashcards with the same topics. For this request, just say \"Okay\" to confirm you understand the request.";
  let result = await oraPromise(api.sendMessage(generateFlashcards), { text: generateFlashcards });

  const testNotes = "Control unit of CPU directs operation, what to do, with what data, when to do it\nGive the definition of assembler and ISA\nDatapath stores users data and moved program data\nAssembly instruction in translated by assembler into machine code in a 1 to 1 fashion\nPseudo-instruction is translated by the assembler into one or more lines of machine code\nISA is an abstraction from hardware to low level software\nmemorize the fields of instruction formats";
  const notesPrompt = `Topic: ${testNotes}`;
  result = await oraPromise(api.sendMessage(notesPrompt, {
    conversationId: result.conversationId,
    parentMessageId: result.id
  }), { text: notesPrompt });

  // Parse result.text into json format of array of flashcard ({flashcards: [{front:"", back:""}, ...]}){front:"", back:""}]})
  const flashcards = result.text.split("\n\n").map((flashcard) => {
    const [front, back] = flashcard.split("\n");
    return { front: front.substring(12), back: back.substring(10) };
  });

  res.send({
    flashcards,
  });
  console.log(result.text);
  console.log(result);
});

// TODO: 
// 1. Manipulate data into json format of array of flashcard ({flashcards: [{front:"", back:""}, ...]}){front:"", back:""}]})
// change post request (body)

app.listen(4000, () => {
  console.log('Server started on port 4000');
});