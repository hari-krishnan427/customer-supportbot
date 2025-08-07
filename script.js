
async function sendMessage() {
  const input = document.getElementById("user-input");
  const message = input.value.trim();
  if (!message) return;

  const chatBox = document.getElementById("chat-box");
  chatBox.innerHTML += `<div class="message user"><strong>You:</strong> ${message}</div>`;
  input.value = "";
  input.disabled = true;

  const response = await fetch("https://your-railway-url/api/generate";, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "flipkart-bot",
      prompt: message,
      stream: false
    })
  });

  const data = await response.json();
  chatBox.innerHTML += `<div class="message bot"><strong>Bot:</strong> ${data.response}</div>`;
  chatBox.scrollTop = chatBox.scrollHeight;
  input.disabled = false;
}
