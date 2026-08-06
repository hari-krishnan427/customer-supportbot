const API_URL = "http://localhost:5000/api/chat";

async function sendMessage() {
  const input = document.getElementById("user-input");
  const message = input.value.trim();
  if (!message) return;

  const chatBox = document.getElementById("chat-box");
  chatBox.innerHTML += `<div class="message user"><strong>You:</strong> ${escapeHTML(message)}</div>`;
  input.value = "";
  input.disabled = true;

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: message })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    chatBox.innerHTML += `<div class="message bot"><strong>Flipkart Bot:</strong> ${escapeHTML(data.response)}</div>`;
  } catch (error) {
    console.warn("Backend API unavailable, attempting local fallback...", error);
    chatBox.innerHTML += `<div class="message bot"><strong>Flipkart Bot:</strong> Thank you for your inquiry regarding "${escapeHTML(message)}". Our customer support team is available 24/7 to assist with your order and return queries.</div>`;
  } finally {
    chatBox.scrollTop = chatBox.scrollHeight;
    input.disabled = false;
    input.focus();
  }
}

function escapeHTML(str) {
  return str.replace(/[&<>'"]/g, 
    tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
  );
}

document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("user-input");
  if (input) {
    input.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        sendMessage();
      }
    });
  }
});
