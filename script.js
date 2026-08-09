// Smart Flipkart Customer Support Assistant
async function sendMessage() {
  const input = document.getElementById("user-input");
  const message = input.value.trim();
  if (!message) return;

  const chatBox = document.getElementById("chat-box");
  chatBox.innerHTML += `<div class="message user"><strong>You:</strong> ${message}</div>`;
  input.value = "";
  input.disabled = true;

  let botReply = "";

  try {
    // Attempt local/custom API endpoint with short timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000);
    
    const response = await fetch("http://localhost:11434/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      signal: controller.signal,
      body: JSON.stringify({
        model: "flipkart-bot",
        prompt: message,
        stream: false
      })
    });
    clearTimeout(timeoutId);

    if (response.ok) {
      const data = await response.json();
      if (data.response) {
        botReply = data.response;
      }
    }
  } catch (err) {
    // Local Ollama server unavailable or blocked by HTTPS mixed content policy
  }

  // Fallback to Intelligent Flipkart Knowledge Base
  if (!botReply) {
    botReply = getFlipkartKnowledgeResponse(message);
  }

  chatBox.innerHTML += `<div class="message bot"><strong>Bot:</strong> ${botReply}</div>`;
  chatBox.scrollTop = chatBox.scrollHeight;
  input.disabled = false;
  input.focus();
}

// Enable sending with Enter key
document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("user-input");
  if (input) {
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") sendMessage();
    });
  }
});

function getFlipkartKnowledgeResponse(query) {
  const q = query.toLowerCase();

  if (q.includes("hello") || q.includes("hi") || q.includes("hey") || q.includes("greetings")) {
    return "Hello! Welcome to Flipkart Customer Support. How can I assist you with your orders, refunds, or account today?";
  }
  if (q.includes("order") && (q.includes("track") || q.includes("where") || q.includes("status"))) {
    return "You can track your order by navigating to <strong>My Orders</strong> section in your Flipkart app or website and clicking on <strong>Track Order</strong>.";
  }
  if (q.includes("cancel")) {
    return "To cancel an order, go to <strong>My Orders</strong>, select the item you wish to cancel, and tap <strong>Cancel Order</strong>. Refunds will be initiated immediately.";
  }
  if (q.includes("return") || q.includes("replace")) {
    return "You can request a return or replacement within the eligible return period by going to <strong>My Orders</strong> $\\rightarrow$ <strong>Return/Replace</strong> and selecting a reason.";
  }
  if (q.includes("refund")) {
    return "Refunds are processed within 2-4 business days to your original payment method (or instantly for Flipkart Pay Later / UPI / Gift Cards) once the item passes quality check.";
  }
  if (q.includes("gift card") || q.includes("voucher")) {
    return "To redeem a Flipkart Gift Card, go to <strong>My Account</strong> $\\rightarrow$ <strong>My Wallet & Cards</strong> $\\rightarrow$ <strong>Add Gift Card</strong>, and enter your Card Number and PIN.";
  }
  if (q.includes("mobile number") || q.includes("phone")) {
    return "You can update your registered mobile number under <strong>My Account</strong> $\\rightarrow$ <strong>Profile Settings</strong> $\\rightarrow$ <strong>Edit Profile</strong>.";
  }
  if (q.includes("delivery") || q.includes("delay") || q.includes("late")) {
    return "We apologize for any delivery delays. You can check the latest real-time status in your <strong>My Orders</strong> tab or contact our delivery agent directly from the order page.";
  }
  if (q.includes("payment") || q.includes("cod") || q.includes("card") || q.includes("upi")) {
    return "Flipkart supports Credit/Debit Cards, Net Banking, UPI, Cash on Delivery (COD), EMI, and Flipkart Pay Later.";
  }
  if (q.includes("customer care") || q.includes("agent") || q.includes("contact") || q.includes("human") || q.includes("number")) {
    return "You can request a call back from Flipkart Support by visiting <strong>Help Centre</strong> in your Flipkart App and selecting <strong>I want to speak to an agent</strong>.";
  }

  return "Thank you for reaching out to Flipkart Support! For assistance with orders, returns, refunds, or payments, please check your <strong>My Orders</strong> section or visit the <strong>Flipkart Help Centre</strong>.";
}
