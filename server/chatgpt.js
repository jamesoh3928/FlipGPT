const express = require('express');
const dotenv = require('dotenv-safe');
const { ChatGPTUnofficialProxyAPI } = require('chatgpt');
const { oraPromise } = require('ora');

dotenv.config();

const app = express();

const api = new ChatGPTUnofficialProxyAPI({
  accessToken: process.env.OPENAI_ACCESS_TOKEN,
  debug: false,
});

app.get('/poem', async (req, res) => {
  const prompt = 'Write a poem about cats.';
  const result = await oraPromise(api.sendMessage(prompt), { text: prompt });
  
  const prompt2 = 'Can you make it cuter and shorter?';
  const result2 = await oraPromise(
    api.sendMessage(prompt2, { conversationId: result.conversationId, parentMessageId: result.id }),
    { text: prompt2 }
  );
  
  const prompt3 = 'Now write it in French.';
  const result3 = await oraPromise(
    api.sendMessage(prompt3, { conversationId: result.conversationId, parentMessageId: result2.id }),
    { text: prompt3 }
  );

  const prompt4 = 'What were we talking about again?';
  const result4 = await oraPromise(
    api.sendMessage(prompt4, { conversationId: result.conversationId, parentMessageId: result3.id }),
    { text: prompt4 }
  );

  res.send({
    prompt1: prompt,
    response1: result.text,
    prompt2: prompt2,
    response2: result2.text,
    prompt3: prompt3,
    response3: result3.text,
    prompt4: prompt4,
    response4: result4.text,
  });
});

app.listen(4000, () => {
  console.log('Server started on port 4000');
});