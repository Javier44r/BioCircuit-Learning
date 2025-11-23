/* BioCircuit Learning — script.js
   - Elige N preguntas aleatorias (sin repetir) y presenta el quiz
   - Muestra detalle al final (respuestas correctas)
*/

const BANK = [
  { q:"¿Qué es un memristor en hardware bioinspirado?", opts:["Un elemento de memoria resistiva", "Un tipo de microprocesador tradicional", "Una cámara especial"], a:0 },
  { q:"¿Qué función tiene un IMU en dispositivos inmersivos?", opts:["Detectar orientación y movimiento", "Aumentar la resolución", "Conectar a internet"], a:0 },
  { q:"¿Qué es SLAM en el contexto de AR?", opts:["Mapeo y localización simultánea", "Un sensor de audio", "Un tipo de lente"], a:0 },
  { q:"¿Por qué es valioso el diseño bioinspirado?", opts:["Aumenta la eficiencia energética y la adaptabilidad", "Reduce la conectividad", "Aumenta el peso"], a:0 },
  { q:"¿Cuál es un reto del hardware bioinspirado?", opts:["Fabricación a escala y fiabilidad", "Fácil reciclaje", "Interfaz de usuario simple"], a:0 },
  { q:"¿Qué papel juega la topología de red en biocircuitos?", opts:["Determina cómo se comunican las unidades y la robustez", "Solo el color del dispositivo", "No tiene importancia"], a:0 },
  { q:"¿Qué conectividad ayuda a colaboración remota en sistemas inmersivos?", opts:["Baja latencia (ej. 5G/edge)", "WiFi lento", "Bluetooth clásico"], a:0 },
  { q:"¿Cuál componente ayuda al procesamiento local y reduce latencia?", opts:["Edge/embedded processors", "Monitores extra", "Cables más largos"], a:0 },
  { q:"¿Qué significa 'neuroplasticidad' aplicada en hardware?", opts:["Capacidad de adaptar conexiones y pesos", "La fragilidad del dispositivo", "Que consume más energía"], a:0 },
  { q:"¿Qué sensor es habitual para mapear profundidad en AR?", opts:["Sensor de profundidad (ToF/IR)", "Micrófono", "Antena GPS"], a:0 },
  { q:"¿Qué es foveated rendering (renderizado foveado)?", opts:["Renderizar con más detalle donde mira el usuario", "Aumentar brillo total", "Reducir batería"], a:0 },
  { q:"¿Por qué se usan GPUs dedicadas en sistemas inmersivos?", opts:["Renderizar gráficos complejos a alta tasa de frames", "Para sonido", "Para medir temperatura"], a:0 }
];

let selected = [], current = 0, score = 0, studentName = "";

// util: escoger n preguntas sin repeticion
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
  const startBtn = document.getElementById("startBtn");
  startBtn.addEventListener("click", startQuiz);
  document.getElementById("nextBtn").addEventListener("click", onNext);
  document.getElementById("retryBtn").addEventListener("click", resetAll);
  // chat controls (bindings exist in chatbot.js)
});

function startQuiz(){
  const nameInput = document.getElementById("studentName");
  const nQ = parseInt(document.getElementById("numQ").value, 10) || 10;
  if(!nameInput.value.trim()){ alert("Por favor escribe tu nombre."); nameInput.focus(); return;}
  studentName = nameInput.value.trim();
  selected = pickN(BANK, nQ);
  current = 0; score = 0;
  document.getElementById("qTotal").innerText = selected.length;
  document.getElementById("startPanel").classList.add("hidden");
  document.getElementById("quizPanel").classList.remove("hidden");
  renderQuestion();
}

function renderQuestion(){
  const q = selected[current];
  document.getElementById("qIndex").innerText = current+1;
  document.getElementById("qText").innerText = q.q;
  const options = document.getElementById("options");
  options.innerHTML = "";
  q.opts.forEach((opt, i) => {
    const btn = document.createElement("button");
    btn.textContent = opt;
    btn.addEventListener("click", () => choose(i, btn));
    options.appendChild(btn);
  });
}

function choose(i, btn){
  // bloquear botones
  const btns = document.querySelectorAll("#options button");
  btns.forEach(b => b.disabled = true);
  const q = selected[current];
  if(i === q.a){
    score++;
    btn.classList.add("correct");
  } else {
    btn.classList.add("wrong");
    btns[q.a].classList.add("correct");
  }
}

function onNext(){
  // validar que se haya contestado (algún botón disabled)
  const btns = document.querySelectorAll("#options button");
  const answered = Array.from(btns).some(b => b.disabled);
  if(!answered){ alert("Selecciona una respuesta antes de continuar."); return; }
  current++;
  if(current >= selected.length) showResult();
  else renderQuestion();
}

function showResult(){
  document.getElementById("quizPanel").classList.add("hidden");
  document.getElementById("resultPanel").classList.remove("hidden");
  document.getElementById("scoreText").innerText = `Estudiante: ${studentName} — Aciertos: ${score} / ${selected.length}`;
  const breakdown = document.getElementById("breakdown");
  breakdown.innerHTML = "";
  selected.forEach((q, idx) => {
    const d = document.createElement("div");
    d.className = "detail";
    d.innerHTML = `<strong>${idx+1}. ${q.q}</strong><div class="muted">Respuesta correcta:</div> <div>${q.opts[q.a]}</div>`;
    breakdown.appendChild(d);
  });
}

function resetAll(){
  document.getElementById("resultPanel").classList.add("hidden");
  document.getElementById("startPanel").classList.remove("hidden");
  document.getElementById("studentName").value = "";
  document.getElementById("quizPanel").classList.add("hidden");
}
