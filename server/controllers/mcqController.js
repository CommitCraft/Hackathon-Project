import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

export const generateMCQ = async (req, res) => {
  const { topics, difficulty } = req.body;

  const apiKey = process.env.GEMINI_API_KEY;
  const baseURL = process.env.GEMINI_BASE_URL;

  console.log("Received Topics:", topics);
  console.log("Received Difficulty:", difficulty);

  if (!apiKey || !baseURL) {
    return res.status(500).json({ error: "Server configuration error." });
  }

  const prompt = `Create 5 multiple-choice questions based on the following topics: ${topics.join(", ")}. The difficulty level is ${difficulty}. Provide the response as a JSON array where each item has a 'question', 'options', and 'answer'. Ensure each question has at least 4 options.`;

  try {
    const response = await axios.post(
      `${baseURL}?key=${apiKey}`,
      {
        contents: [{ parts: [{ text: prompt }] }],
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    const text = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) {
      return res.status(500).json({ error: "No questions were generated by the API." });
    }

    const jsonStart = text.indexOf("[");
    const jsonEnd = text.lastIndexOf("]") + 1;
    const questions = JSON.parse(text.substring(jsonStart, jsonEnd));

    res.status(200).json({ questions });
  } catch (error) {
    console.error("Error generating MCQ:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to generate MCQ" });
  }
};

export const submitAnswers = async (req, res) => {
  const { answers, questions } = req.body;

  try {
    let score = 0;
    const results = questions.map((question, index) => {
      const isCorrect = question.answer === answers[index];
      if (isCorrect) score += 1;
      return { question: question.question, selectedAnswer: answers[index], correctAnswer: question.answer, isCorrect };
    });

    res.status(200).json({ score, results });
  } catch (error) {
    console.error("Error evaluating answers:", error);
    res.status(500).json({ error: "Failed to evaluate answers" });
  }
};
