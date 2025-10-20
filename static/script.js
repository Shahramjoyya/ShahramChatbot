const tips = [
    "Try asking about Shahram's experience.",
    "Ask about Shahram's projects.",
    "Ask where Shahram studied.",
    "Ask about Shahram's skills or tools.",
    "Ask about team management."
];

let tipIndex = 0;
setInterval(() => {
    tipIndex = (tipIndex + 1) % tips.length;
    document.getElementById("tip").innerText = tips[tipIndex];
}, 5000);

// Global male voice variable
let maleVoice = null;

// Load voices properly
function loadVoices() {
    const voices = window.speechSynthesis.getVoices();
    maleVoice = voices.find(voice => 
        voice.name.toLowerCase().includes("david") ||  // Windows male voice
        voice.name.toLowerCase().includes("mark") ||   // alternative male voice
        voice.name.toLowerCase().includes("alex")      // Mac male voice
    );
}

// Some browsers fire 'voiceschanged' when voices are ready
window.speechSynthesis.onvoiceschanged = () => {
    loadVoices();
};

// Ask bot
async function askBot() {
    const questionInput = document.getElementById("question");
    const question = questionInput.value;
    if (!question) return;

    appendMessage("user-msg", question);

    const response = await fetch("/ask", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({question})
    });
    const data = await response.json();
    appendMessage("bot-msg", data.answer);
    speak(data.answer);
    questionInput.value = "";
}

// Append messages
function appendMessage(className, message) {
    const chatbox = document.getElementById("chatbox");
    const p = document.createElement("p");
    p.className = className;
    p.innerText = message;
    chatbox.appendChild(p);
    chatbox.scrollTop = chatbox.scrollHeight;
}

// Text-to-speech
function speak(message) {
    const utterance = new SpeechSynthesisUtterance(message);

    // Ensure voices are loaded
    if (!maleVoice) loadVoices();

    if (maleVoice) {
        utterance.voice = maleVoice;
    }

    utterance.pitch = 0.8;   // slightly deeper, more masculine
    utterance.rate = 1;      // normal speed
    window.speechSynthesis.speak(utterance);
}

// Speech-to-text
function startListening() {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'en-US';
    recognition.start();
    recognition.onresult = (event) => {
        const speechResult = event.results[0][0].transcript;
        document.getElementById("question").value = speechResult;
        askBot();
    };
}
