export default async function handler(req, res) {
  const apiKey = process.env.OPENAI_API_KEY;
  const userInput = req.body.message;

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
  const reply = data.choices?.[0]?.message?.content || "Sorry, something went wrong.";

  res.status(200).json({ reply });
}
