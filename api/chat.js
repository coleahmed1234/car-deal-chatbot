export default async function handler(req, res) {
  try {
    const apiKey = process.env.OPENAI_API_KEY;
    const userInput = req.body.message;

    if (!apiKey) {
      return res.status(500).json({ reply: "OpenAI API key is missing in environment variables." });
    }

    if (!userInput) {
      return res.status(400).json({ reply: "You must send a message." });
    }

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

    // Show errors from OpenAI directly
    if (data.error) {
      return res.status(500).json({ reply: `OpenAI error: ${data.error.message}` });
    }

    const reply = data.choices?.[0]?.message?.content || "OpenAI returned no reply.";
    res.status(200).json({ reply });

  } catch (error) {
    console.error("Backend error:", error);
    res.status(500).json({ reply: "Server error: " + error.message });
  }
}
