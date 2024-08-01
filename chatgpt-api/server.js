// server.js
const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());

// Test endpoint
app.get('/', (req, res) => {
  res.send('ChatGPT API is running!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
// server.js
const API_URL = "https://api.openai.com/v1/chat/completions";
const API_KEY = "YOUR_API_KEY"; // Replace with your actual OpenAI API key

app.post('/chatgpt', async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  try {
    const response = await axios.post(
      API_URL,
      {
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 100,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`,
        },
      }
    );

    const generatedText = response.data.choices[0].message.content;
    res.json({ text: generatedText });
  } catch (error) {
    console.error("Error generating text:", error);
    res.status(500).json({ error: 'Error occurred while generating text' });
  }
});