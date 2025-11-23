// --- CHATBOT NUEVO ---

const bubble = document.getElementById("chatbot-bubble");
const box = document.getElementById("chatbot-box");
const messages = document.getElementById("chatbot-messages");
const input = document.getElementById("chatbot-input");

// Abrir y cerrar el chat
bubble.onclick = () => {
    box.style.display = box.style.display === "flex" ? "none" : "flex";
    box.style.flexDirection = "column";
};

// Enviar mensaje
input.addEventListener("keypress", function (e) {
    if (e.key === "Enter" && input.value.trim() !== "") {
        addMessage("usuario", input.value);

        // Respuesta automática simple
        setTimeout(() => {
            addMessage("bot", "Estoy aquí para ayudarte 😊");
        }, 500);

        input.value = "";
    }
});

function addMessage(type, text) {
    let msg = document.createElement("div");
    msg.className = type;
    msg.style.marginBottom = "8px";
    msg.style.padding = "6px 10px";
    msg.style.borderRadius = "8px";

    if (type === "usuario") {
        msg.style.background = "#daf1ff";
        msg.style.alignSelf = "flex-end";
    } else {
        msg.style.background = "#eee";
        msg.style.alignSelf = "flex-start";
    }

    msg.innerText = text;
    messages.appendChild(msg);
    messages.scrollTop = messages.scrollHeight;
}
