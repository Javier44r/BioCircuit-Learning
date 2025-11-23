const BANK = [
  { q:"¿Qué es un memristor en hardware bioinspirado?", opts:["Memoria resistiva", "Microprocesador clásico", "Sensor óptico"], a:0 },
  { q:"¿Qué función cumple un IMU?", opts:["Detectar movimiento y orientación", "Capturar imágenes", "Regular temperatura"], a:0 },
  { q:"¿Qué significa SLAM?", opts:["Simultaneous Localization And Mapping", "Sonar Local And Map", "Imagen en 3D"], a:0 },
  { q:"¿Por qué es valioso diseñar hardware bioinspirado?", opts:["Mejor eficiencia energética", "Menor resistencia mecánica", "Más peso"], a:0 },
  { q:"Uno de los retos de hardware bioinspirado es:", opts:["Producción en masa", "Interfaz complicada", "Falta de color"], a:0 },
  { q:"En redes biocircuitales, la topología sirve para:", opts:["Comunicar unidades", "Decoración", "Aumentar tamaño"], a:0 },
  { q:"La conexión 5G en dispositivos inmersivos ayuda por:", opts:["Baja latencia", "Mucho ancho de banda", "Mucho peso"], a:0 },
  { q:"Procesar localmente en hardware bioinspirado ayuda a:", opts:["Reducir latencia", "Aumentar el tamaño", "Eliminar sensores"], a:0 },
  { q:"Neuroplasticidad en hardware significa:", opts:["Adaptar conexiones", "Romper el circuito", "Consumir más energía"], a:0 },
  { q:"Sensor ToF en AR/VR mide:", opts:["Distancia/profundidad", "Velocidad", "Color"], a:0 }
];

let questions = [], index = 0, score = 0, name = "";

function pickRandom(arr, n) {
  const copy = arr.slice();
  const out = [];
  while (out.length < n && copy.length > 0) {
    const i = Math.floor(Math.random() * copy.length);
    out.push(copy.splice(i, 1)[0]);
  }
  return out;
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("startBtn").addEventListener("click", startQuiz);
  document.getElementById("nextBtn").addEventListener("click", nextQ);
  document.getElementById("retryBtn").addEventListener("click", resetQuiz);
});

function startQuiz() {
  const input = document.getElementById("studentName");
  const nQ = parseInt(document.getElementById("numQ").value, 10);
  if (!input.value.trim()) {
    alert("Por favor escribe tu nombre");
    return;
  }
  name = input.value.trim();
  questions = pickRandom(BANK, nQ);
  index = 0;
  score = 0;
  document.getElementById("startPanel").classList.add("hidden");
  document.getElementById("quizPanel").classList.remove("hidden");
  document.getElementById("qTotal").textContent = questions.length;
  showQ();
}

function showQ() {
  const q = questions[index];
  document.getElementById("qIndex").textContent = index + 1;
  document.getElementById("qText").textContent = q.q;
  const optsDiv = document.getElementById("options");
  optsDiv.innerHTML = "";
  q.opts.forEach((opt, i) => {
    const btn = document.createElement("button");
    btn.textContent = opt;
    btn.onclick = () => select(i, btn);
    optsDiv.appendChild(btn);
  });
}

function select(i, btn) {
  const q = questions[index];
  const btns = document.querySelectorAll("#options button");
  btns.forEach(b => b.disabled = true);

  if (i === q.a) {
    score++;
    btn.classList.add("correct");
  } else {
    btn.classList.add("wrong");
    btns[q.a].classList.add("correct");
  }
}

function nextQ() {
  const btns = document.querySelectorAll("#options button");
  if (Array.from(btns).every(b => !b.disabled)) {
    alert("Selecciona una respuesta antes de continuar");
    return;
  }
  index++;
  if (index >= questions.length) {
    finish();
  } else {
    showQ();
  }
}

function finish() {
  document.getElementById("quizPanel").classList.add("hidden");
  const result = document.getElementById("resultPanel");
  result.classList.remove("hidden");
  document.getElementById("scoreText").textContent = `Estudiante: ${name}, aciertos: ${score} / ${questions.length}`;
  const breakdown = document.getElementById("breakdown");
  breakdown.innerHTML = "";
  questions.forEach((q, i) => {
    const div = document.createElement("div");
    div.className = "detail";
    div.innerHTML = `<strong>${i + 1}. ${q.q}</strong><br><em>Respuesta correcta:</em> ${q.opts[q.a]}`;
    breakdown.appendChild(div);
  });
}

function resetQuiz() {
  document.getElementById("resultPanel").classList.add("hidden");
  document.getElementById("startPanel").classList.remove("hidden");
  document.getElementById("studentName").value = "";
}
