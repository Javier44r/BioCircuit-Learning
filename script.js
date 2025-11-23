/* QNet Learning - script.js
   Cuestionario: selecciona preguntas aleatorias y muestra resultados
*/

const BANK = [
  { q:"¿Qué es el entrelazamiento cuántico?", opts:["Conexión instantánea entre qubits","Un tipo de fibra óptica","Un protocolo de red"], a:0 },
  { q:"¿Qué elemento protege la información en una red cuántica?", opts:["Distribución cuántica de claves (QKD)","VPN clásica","Firewall"], a:0 },
  { q:"¿Qué es un qubit?", opts:["Unidad básica de información cuántica","Un microcontrolador","Un cable"], a:0 },
  { q:"¿Qué ventaja tiene una red cuántica?", opts:["Seguridad basada en la física","Mayor consumo energético","Mayor latencia"], a:0 },
  { q:"¿Qué medio suele usarse para transmitir qubits a distancia?", opts:["Fibra óptica y fotones","Cobre clásico","Ondas de rádio de baja frecuencia"], a:0 },
  { q:"¿Qué es teleportación cuántica (en redes)?", opts:["Transferencia de estado cuántico entre qubits entrelazados","Enviar objetos físicamente","Cifrar datos con contraseña"], a:0 },
  { q:"¿Qué reto técnico es crítico en redes cuánticas?", opts:["Corrección de errores cuánticos","Peso del cableado","Poca memoria RAM"], a:0 },
  { q:"¿Por qué es importante la sincronización en QNet?", opts:["Porque los estados cuánticos son frágiles en tiempo","Para aumentar la pantalla","Para cambiar color"], a:0 },
  { q:"¿Qué es QKD?", opts:["Quantum Key Distribution (distribución de claves cuánticas)","Quick Key Delivery","Quality Key Data"], a:0 },
  { q:"¿Qué usa una red híbrida clásica-cuántica?", opts:["Canales clásicos y canales cuánticos simultáneos","Solo cable coaxial","Solo Wi-Fi"], a:0 },
  { q:"¿Qué ocurre si mides un qubit sin cuidado?", opts:["El estado se colapsa y se pierde la información cuántica","Se duplica","",""], a:0 },
  { q:"¿Cuál es una aplicación futura de redes cuánticas?", opts:["Computación distribuida ultra-segura","Descarga más rápida","Refrigeración"], a:0 }
];

let selected = [], current = 0, score = 0, studentName = "";

// elegir n preguntas aleatorias sin repetición
function pickN(bank, n){
  const copy = bank.slice();
  const out = [];
  while(out.length < n && copy.length){
    const i = Math.floor(Math.random() * copy.length);
    out.push(copy.splice(i,1)[0]);
  }
  return out;
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("startBtn").addEventListener("click", startQuiz);
  document.getElementById("nextBtn").addEventListener("click", onNext);
  document.getElementById("retryBtn").addEventListener("click", resetAll);
});

function startQuiz(){
  const name = document.getElementById("studentName").value.trim();
  const nQ = parseInt(document.getElementById("numQ").value,10) || 10;
  if(!name){ alert("Escribe tu nombre"); return; }
  studentName = name;
  selected = pickN(BANK, nQ);
  current = 0; score = 0;
  document.getElementById("startPanel").classList.add("hidden");
  document.getElementById("quizPanel").classList.remove("hidden");
  document.getElementById("qTotal").innerText = selected.length;
  renderQuestion();
}

function renderQuestion(){
  const q = selected[current];
  document.getElementById("qIndex").innerText = current+1;
  document.getElementById("qText").innerText = q.q;
  const opts = document.getElementById("options");
  opts.innerHTML = "";
  q.opts.forEach((opt, i) => {
    if(!opt) return;
    const btn = document.createElement("button");
    btn.textContent = opt;
    btn.addEventListener("click", ()=> choose(i, btn));
    opts.appendChild(btn);
  });
}

function choose(i, btn){
  const q = selected[current];
  const buttons = document.querySelectorAll("#options button");
  buttons.forEach(b => b.disabled = true);
  if(i === q.a){ score++; btn.classList.add("correct"); }
  else { btn.classList.add("wrong"); buttons[q.a].classList.add("correct"); }
}

function onNext(){
  const buttons = document.querySelectorAll("#options button");
  const answered = Array.from(buttons).some(b=>b.disabled);
  if(!answered){ alert("Selecciona una respuesta antes de continuar."); return; }
  current++;
  if(current >= selected.length) finishQuiz();
  else renderQuestion();
}

function finishQuiz(){
  document.getElementById("quizPanel").classList.add("hidden");
  const r = document.getElementById("resultPanel");
  r.classList.remove("hidden");
  document.getElementById("scoreText").innerText = `Estudiante: ${studentName} — Aciertos: ${score} / ${selected.length}`;
  const breakdown = document.getElementById("breakdown");
  breakdown.innerHTML = "";
  selected.forEach((q, idx)=> {
    const d = document.createElement("div");
    d.className = "detail";
    d.innerHTML = `<strong>${idx+1}. ${q.q}</strong><div class="muted">Respuesta correcta:</div> ${q.opts[q.a]}`;
    breakdown.appendChild(d);
  });
}

function resetAll(){
  document.getElementById("resultPanel").classList.add("hidden");
  document.getElementById("startPanel").classList.remove("hidden");
  document.getElementById("studentName").value = "";
  document.getElementById("quizPanel").classList.add("hidden");
      }
