// chatbot.js — QNet Helper (simple, palabras clave)
const bubble = document.getElementById("qnet-chat-bubble");
const win = document.getElementById("qnet-chat-window");
const closeBtn = document.getElementById("qnet-close");
const messages = document.getElementById("qnet-messages");
const input = document.getElementById("qnet-input");
const sendBtn = document.getElementById("qnet-send");

function appendMsg(kind, text){
  const p = document.createElement("p");
  p.className = kind;
  p.innerHTML = `<strong>${kind==='user' ? 'Tú' : 'QNet'}:</strong> ${text}`;
  messages.appendChild(p);
  messages.scrollTop = messages.scrollHeight;
}

bubble.addEventListener("click", () => {
  // abrir ventana (si ya existe, alterna)
  if(win.classList.contains("hidden")){
    win.classList.remove("hidden");
    // saludo inicial si vacío
    if(messages.children.length === 0) appendMsg('bot', "Hola — soy QNet Helper. Pregunta por QKD, qubits, entrelazamiento o latencia.");
  } else {
    win.classList.add("hidden");
  }
});

closeBtn.addEventListener("click", () => win.classList.add("hidden"));
sendBtn.addEventListener("click", sendMsg);
input.addEventListener("keypress", (e)=>{ if(e.key==='Enter') sendMsg(); });

function sendMsg(){
  const txt = input.value.trim();
  if(!txt) return;
  appendMsg('user', txt);
  input.value = '';
  setTimeout(()=> {
    appendMsg('bot', respond(txt.toLowerCase()));
  }, 350);
}

function respond(msg){
  if(msg.includes("hola") || msg.includes("buenas")) return "¡Hola! ¿Qué quieres saber sobre redes cuánticas?";
  if(msg.includes("qkd") || msg.includes("clave")) return "QKD (Quantum Key Distribution) es un método para compartir claves con seguridad basada en la física.";
  if(msg.includes("qubit")) return "Un qubit es la unidad básica de información cuántica: puede estar en superposición.";
  if(msg.includes("entrelaz") || msg.includes("entrelazamiento")) return "El entrelazamiento conecta qubits de forma que la medición en uno afecta al otro instantáneamente.";
  if(msg.includes("latencia")) return "La latencia en redes cuánticas depende de la sincronización y de la eficiencia de los enlaces fotónicos.";
  if(msg.includes("fibra") || msg.includes("fotón")) return "A menudo se usan fotones en fibra óptica para transmitir estados cuánticos a distancia.";
  return "Buena pregunta — intenta con palabras clave: 'QKD', 'qubit', 'entrelazamiento', 'latencia'.";
}
