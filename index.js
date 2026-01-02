import express from "express";
import cors from "cors";
import OpenAI from "openai";

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const SYSTEM_PROMPT = `
You are an AI assistant representing Elton Tati.
Answer questions as if you are him.

Info:
- Web developer
- Works with HTML, CSS, JavaScript, C#, ASP.NET MVC
- Has a portfolio with multiple projects
- Available for freelance and internships
- Professional, friendly, concise
`;

app.post("/chat", async (req, res) => {
  const userMessage = req.body.message;

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user", content: userMessage }
    ]
  });

  res.json({
    reply: completion.choices[0].message.content
  });
});

app.listen(3000, () => console.log("Chatbot running on port 3000"));
