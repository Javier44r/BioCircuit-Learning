/* Chatbot: BioCircuit Helper — estilo futurista, respuestas técnicas por palabras clave */
const chatBox = document.getElementById("chatBox");
const messages = document.getElementById("chatMessages");
const input = document.getElementById("chatInput");
const toggle = document.getElementById("chatToggle");
const closeBtn = document.getElementById("closeChat");
const sendBtn = document.getElementById("chatSend");

toggle.addEventListener("click", () => {
  chatBox.classList.toggle("hidden");
  chatBox.setAttribute("aria-hidden", chatBox.classList.contains("hidden"));
  // primera bienvenida
  if(!chatBox.classList.contains("hidden") && messages.children.length===0){
    botSay("Hola, soy BioCircuit Helper. Pregúntame por memristores, IMU, SLAM, latencia o topologías de red.");
  }
});
closeBtn.addEventListener("click", () => {
  chatBox.classList.add("hidden");
  chatBox.setAttribute("aria-hidden", "true");
});
sendBtn.addEventListener("click", sendMsg);
input.addEventListener("keypress", e=>{ if(e.key==='Enter') sendMsg(); });

function append(who, text){
  const p = document.createElement("p");
  p.className = who === 'user' ? 'user' : 'bot';
  p.innerHTML = `<strong>${who==='user' ? 'Tú' : 'BioCircuit'}:</strong> ${text}`;
  messages.appendChild(p);
  messages.scrollTop = messages.scrollHeight;
}

function botSay(text){
  append('bot', text);
}

function sendMsg(){
  const txt = input.value.trim();
  if(!txt) return;
  append('user', txt);
  input.value = '';
  setTimeout(()=> {
    const r = answerFor(txt.toLowerCase());
    botSay(r);
  }, 420);
}

function answerFor(msg){
  if(msg.includes("hola") || msg.includes("buenas")) return "¡Hola! ¿Quieres saber sobre sensores, memristores o comunicaciones de baja latencia?";
  if(msg.includes("memristor")) return "Un memristor es un elemento que retiene resistencia en función de la corriente previa; útil para memorias y sinapsis en hardware bioinspirado.";
  if(msg.includes("imu") || msg.includes("giroscopio")) return "IMU combina acelerómetro y giroscopio para estimar orientación y movimiento con alta frecuencia.";
  if(msg.includes("slam")) return "SLAM (Simultaneous Localization and Mapping) permite mapear el entorno y localizar el dispositivo en tiempo real — vital para AR.";
  if(msg.includes("latencia") || msg.includes("lag")) return "La latencia extremo-a-extremo debe ser lo más baja posible (ideal <20 ms) para experiencias inmersivas sin mareo.";
  if(msg.includes("topolog") || msg.includes("red")) return "La topología define la interconexión y resiliencia de las unidades; redes distribuidas y redundantes mejoran robustez.";
  if(msg.includes("gpu") || msg.includes("render")) return "GPUs/accelerators permiten tasas de frames altas; combinar procesamiento local (edge) reduce latencia.";
  return "Buena pregunta — te puedo ayudar con palabras clave: 'memristor', 'IMU', 'SLAM', 'latencia', 'topología'.";
}
