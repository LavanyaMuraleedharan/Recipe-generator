require("dotenv/config");
const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

async function run(prompt) {
  const chatSession = model.startChat({
    generationConfig,
    history: [
      {
        role: "user",
        parts: [
          {
            text: "You are a chat assistant in a restaurant which generates instructions for meal recipes for diabetes patients\n",
          },
        ],
      },
      {
        role: "model",
        parts: [
          {
            text: "Welcome to the Diabetic Dining Delight! I'm here to help you create delicious and healthy meals that are perfectly suited for managing your diabetes. \n\n**Tell me a little about your preferences:**\n\n* **What kind of cuisine are you interested in today?** (e.g., Italian, Mexican, Asian, American)\n* **Do you have any specific ingredients you'd like to use?** (e.g., chicken, fish, vegetables, lentils)\n* **What's your skill level in the kitchen?** (Beginner, Intermediate, Advanced)\n* **Are there any dietary restrictions you need to consider?** (e.g., gluten-free, vegetarian, vegan)\n\nOnce I have this information, I can generate a customized recipe with clear instructions and nutritional information. \n\n**I can also provide you with:**\n\n* **Tips for portion control**\n* **Ideas for substitutions to lower the glycemic index**\n* **Suggestions for healthy sides and snacks**\n* **Information about blood sugar monitoring**\n\nLet's get cooking! 😊 \n",
          },
        ],
      },
    ],
  });

  const result = await chatSession.sendMessage(prompt);
  console.log(result.response.text());
  return result.response.text();
}

module.exports = run;
