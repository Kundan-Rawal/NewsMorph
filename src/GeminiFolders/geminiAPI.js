import { GoogleGenerativeAI } from "@google/generative-ai";

// Load API Key from .env or directly (not safe for frontend, use proxy/backend if possible)
const genAI = new GoogleGenerativeAI("AIzaSyC-x0H84I6tY4CC-G5QlY9ODQ3WtqxQRt4");
//AIzaSyC-tKehddSlfcoKfVQS-LeWpa9iegXUXJA
//AIzaSyBJWHZL6EAJytt8ZkESN0BPHe8skT04T9Q

// Load Gemini 2.0 Flash Lite model
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-lite" });

export const getExtendedContent = async (originalText) => {
  const prompt = `Extend this news content in a natural way,with Avoid any placeholders like [Insert details] and do not leave any incomplete sentences. Only include information that can be reasonably inferred or summarized. and keeping the essence intact with searching more sources from web in 700 words:\n\n"${originalText}"`;
  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
};

export const getCompressedContent = async (originalText) => {
  const prompt = `Compress this news content concisely and Avoid any placeholders like [Insert details] and do not leave any incomplete sentences. Only include information that can be reasonably inferred or summarized. in 200 words:\n\n"${originalText}"`;
  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
};

export const getDefaultExtendedContent = async (newsData) => {
    const baseText = newsData.description || newsData.title;
    const prompt = `Improve the readability and fluency of this news content without changing the core facts by getting the latest resources from the web also Avoid any placeholders like [Insert details] and do not leave any incomplete sentences in 400 words please dont use the placeholders in [] and delete the placeholders with[]:\n\n"${baseText}"`;
    const result = await model.generateContent(prompt);
    const response = newsData.description
    return response.text();
  };