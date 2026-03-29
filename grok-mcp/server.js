const express = require('express');
const { OpenAI } = require('openai');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const client = new OpenAI({
  apiKey: process.env.XAI_API_KEY,
  baseURL: 'https://api.x.ai/v1',
});

app.get('/', (req, res) => {
  res.json({ status: 'Grok MCP Server running', version: '1.0' });
});

app.post('/chat', async (req, res) => {
  try {
    const { messages, model = 'grok-beta' } = req.body;
    
    const completion = await client.chat.completions.create({
      model: model,
      messages: messages,
      temperature: 0.7,
      max_tokens: 1500,
    });

    res.json({
      content: completion.choices[0].message.content,
      model: completion.model,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`🚀 Grok MCP Server running on http://localhost:${port}`);
  console.log(`Ready for Claude Desktop connection.`);
});
