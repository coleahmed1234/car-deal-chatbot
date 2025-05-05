async function sendMessage() {
  const input = document.getElementById("userInput").value;
  if (!input) return;

  const chat = document.getElementById("chat");
  chat.innerHTML += `<p><strong>You:</strong> ${input}</p>`;

  document.getElementById("userInput").value = "Thinking...";

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer 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"
    },
    body: JSON.stringify({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are a UK used car expert. The user will paste car listings or describe their budget. Reply with helpful advice in plain English."
        },
        {
          role: "user",
          content: input
        }
      ]
    })
  });

  const data = await response.json();
  const botReply = data.choices?.[0]?.message?.content || "Sorry, something went wrong.";
  chat.innerHTML += `<p><strong>Bot:</strong> ${botReply}</p>`;
  document.getElementById("userInput").value = "";
}
