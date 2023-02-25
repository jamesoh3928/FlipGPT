import express from 'express';
import { ChatGPTUnofficialProxyAPI } from 'chatgpt';
import { oraPromise } from 'ora';
import dotenv from 'dotenv-safe';

dotenv.config();

const app = express();

const api = new ChatGPTUnofficialProxyAPI({
  accessToken: process.env.OPENAI_ACCESS_TOKEN,
  debug: false,
});

app.get('/', async (req, res) => {
  const generateFlashcards = "I want you to act as a flash card generator. I will type notes you will make flashcard out of from, or any topics I will study on. I want you to only respond with front of the flashcards (question), and back of the flashcards (answers). For the answer follow the format (do not printing anything else)\:\n\nQuestion: <some question>\nAnswer: <answer to question>\n\nQuestion: <some question>\nAnswer: <answer to question>\n\ncontinue...\n\nGenerate 10 flashcard each time I ask for it, and when I say \"More\", generate more flashcards with the same topics. For this request, just say \"Okay\" to confirm you understand the request.";
  // const result = await oraPromise(api.sendMessage(prompt), { text: prompt });
  const result = await oraPromise(api.sendMessage(generateFlashcards), { text: generateFlashcards });

  res.send({
    response: result.text,
  });
  console.log(result.text);
});

app.listen(4000, () => {
  console.log('Server started on port 4000');
});