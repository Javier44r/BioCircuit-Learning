const toggle = document.getElementById("chatToggle");
const box = document.getElementById("chatBox");
const closeBtn = document.getElementById("closeChat");
const input = document.getElementById("chatInput");
const send = document.getElementById("chatSend");
const messages = document.getElementById("chatMessages");

toggle.addEventListener("click", () => {
  box.classList.toggle("hidden");
  box.setAttribute("aria-hidden", box.classList.contains("hidden"));
  if (!box.classList.contains("hidden") && messages.children.length === 0) {
    botSay("Hola, soy BioCircuit Helper. Te puedo explicar sobre memristores, IMU, SLAM y más.");
  }
});

closeBtn.addEventListener("click", () => {
  box.classList.add("hidden");
  box.setAttribute("aria-hidden", "true");
});

send.addEventListener("click", sendMsg);
input.addEventListener("keypress", e => {
  if (e.key === "Enter") sendMsg();
});

function append(who, text) {
  const p = document.createElement("p");
  p.className = who;
  p.innerHTML = `<strong>${who === 'user' ? 'Tú' : 'BioCircuit'}:</strong> ${text}`;
  messages.appendChild(p);
  messages.scrollTop = messages.scrollHeight;
}

function botSay(text) {
  append('bot', text);
}

function sendMsg() {
  const txt = input.value.trim();
  if (!txt) return;
  append('user', txt);
  input.value = '';
  setTimeout(() => {
    botSay(getAnswer(txt.toLowerCase()));
  }, 400);
}

function getAnswer(msg) {
  if (msg.includes("hola")) return "¡Hola! Pregúntame lo que quieras sobre hardware bioinspirado.";
  if (msg.includes("memristor")) return "Un memristor es un dispositivo que puede recordar su resistencia en función del pasado eléctrico.";
  if (msg.includes("imu") || msg.includes("acelerómetro")) return "El IMU combina acelerómetro y giroscopio para detectar movimiento y orientación.";
  if (msg.includes("slam")) return "SLAM es la técnica para mapear entornos y localizar dispositivos usando sensores.";
  if (msg.includes("latencia")) return "La latencia baja es clave en dispositivos inmersivos para evitar mareos.";
  if (msg.includes("topología")) return "La topología describe cómo están conectadas las unidades en una red biocircuital.";
  return "Disculpa, no tengo esa información aún. Intenta preguntar por ‘memristor’, ‘IMU’, ‘SLAM’ u ‘otras redes’.";
}
