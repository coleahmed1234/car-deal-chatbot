export default async function handler(req, res) {
  try {
    const apiKey = process.env.OPENAI_API_KEY;
    const userInput = req.body.message;

    // Check if the OpenAI API key is missing
    if (!apiKey) {
      return res.status(500).json({ reply: "Missing OpenAI API key. Make sure it's added in Vercel's environment variables." });
    }

    // Check if the user sent a message
    if (!userInput) {
      return res.status(400).json({ reply: "Missing message input from user." });
    }

    // Prepare messages for the GPT model
    const messages = [
      {
        role: "system",
        content:
          "You are a UK used car expert. The user will paste car listings or describe their budget. Reply with helpful advice in plain English.",
      },
      {
        role: "user",
        content: userInput,
      },
    ];

    // Call OpenAI's API
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages,
      }),
    });

    const data = await response.json();

    if (!data.choices || !data.choices[0]) {
      return res.status(500).json({ reply: "OpenAI returned no result. Check your model and input." });
    }

    const reply = data.choices[0].message.content;
    return res.status(200).json({ reply });

  } catch (error) {
    console.error("Error talking to OpenAI:", error);
    return res.status(500).json({ reply: "An error occurred: " + error.message });
  }
}
