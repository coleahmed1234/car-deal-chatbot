async function sendMessage() {
  const inputField = document.getElementById("userInput");
  const input = inputField.value.trim();
  if (!input) return;

  const chat = document.getElementById("chat");
  chat.innerHTML += `<p><strong>You:</strong> ${input}</p>`;
  inputField.value = "Thinking...";

  try {
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
    inputField.value = "";
  } catch (err) {
    chat.innerHTML += `<p><strong>Bot:</strong> Error: ${err.message}</p>`;
    inputField.value = "";
  }
}

// Make sure the button triggers the function
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("sendButton").addEventListener("click", sendMessage);
});
