import express from "express";
import bodyParser from "body-parser";
import cors from "cors"; // Enable CORS
import { GoogleGenerativeAI } from "@google/generative-ai";

const app = express();
const port = 3001;

const apiKey = "AIzaSyCBrstp3tCSkElRYHwBUbOyXSk9oecfFXU";

const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-pro", // Ensure that this model is correct
});

// Enable CORS so the React app (likely on localhost:3000) can communicate with this server
app.use(cors({
  origin: 'http://localhost:5173', // React frontend port
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
}));

app.use(bodyParser.json());
app.use(express.static("public"));

// Chat route
app.post("/ask", async (req, res) => {
  const userPrompt = req.body.prompt;

  try {
    // Start the chat session with the specified model and history
    const chatSession = model.startChat({
      generationConfig: {
        temperature: 1,
        topP: 0.95,
        topK: 64,
        maxOutputTokens: 8192,
        responseMimeType: "text/plain",
      },
      history: [
        {
          role: "user",
          parts: [{ text: "You are an assistant that helps with alumni mentoring platform queries." }],
        },
      ],
    });

    // Send the user's message to the AI model
    const result = await chatSession.sendMessage(userPrompt);

    // Retrieve and send back the AI's response
    const aiResponse = result.text();  // Assuming `text()` is the correct method
    res.json({ response: aiResponse });
  } catch (error) {
    console.error("Error fetching AI response:", error);
    res.status(500).send("Error fetching response.");
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
