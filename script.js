async function sendMessage() {
  const input = document.getElementById("userInput").value;
  if (!input) return;

  const chat = document.getElementById("chat");
  chat.innerHTML += `<p><strong>You:</strong> ${input}</p>`;
  document.getElementById("userInput").value = "Thinking...";

  const response = await fetch("/api/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ message: input })
  });

  const data = await response.json();
  const botReply = data.reply || "Sorry, something went wrong.";
  chat.innerHTML += `<p><strong>Bot:</strong> ${botReply}</p>`;
  document.getElementById("userInput").value = "";
}

// Hook the button to the function (so it's defined when clicked)
document.getElementById("sendButton").addEventListener("click", sendMessage);
