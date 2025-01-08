const { OpenAIApi, Configuration } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY, // Your OpenAI API key
});

const openai = new OpenAIApi(configuration);

/**
 * Generate test cases using OpenAI GPT model.
 * @param {string} description - Problem description for test case generation.
 * @returns {Promise<Array>} - Generated test cases as an array of objects.
 */
const generateTestCases = async (description) => {
  try {
    const prompt = `Generate 3 test cases for the following programming problem description. Provide each test case in the format:
    { "input": "...", "output": "..." }

    Problem description:
    ${description}`;

    const response = await openai.createChatCompletion({
      model: "gpt-4", // Use GPT-4 or the model of your choice
      messages: [{ role: "user", content: prompt }],
      max_tokens: 300,
      temperature: 0.7,
    });

    // Parse the response text into JSON
    const testCases = JSON.parse(response.data.choices[0].message.content.trim());

    return testCases;
  } catch (error) {
    console.error("Error generating AI test cases:", error.message);
    throw new Error("Failed to generate AI test cases.");
  }
};

module.exports = { generateTestCases };
