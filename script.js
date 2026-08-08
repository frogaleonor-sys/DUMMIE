/* =========================================================
   DUMMIE // FIRST BRAIN
   ========================================================= */

const character = document.getElementById("dummie-character");
const speechBubble = document.getElementById("speech-bubble");
const speechName = document.getElementById("speech-name");
const speechText = document.getElementById("speech-text");

const textInput = document.getElementById("text-input");
const sendButton = document.getElementById("send-button");
const micButton = document.getElementById("mic-button");

const systemStatus = document.getElementById("system-status");


/* =========================================================
   DUMMIE PERSONALITY
   ========================================================= */

const DUMMIE = {

    name: "DUMMIE",

    creator: "Creator",

    personality: [
        "curious",
        "intelligent",
        "helpful",
        "slightly sarcastic",
        "friendly",
        "calm"
    ]

};


/* =========================================================
   SPEAK
   ========================================================= */

function speak(text) {

    if (!("speechSynthesis" in window)) {
        return;
    }

    window.speechSynthesis.cancel();

    const voice = new SpeechSynthesisUtterance(text);

    voice.rate = 1.02;
    voice.pitch = 1.05;
    voice.volume = 1;

    window.speechSynthesis.speak(voice);
}


/* =========================================================
   SHOW DUMMIE MESSAGE
   ========================================================= */

function talk(text) {

    speechName.textContent = DUMMIE.name;

    speechText.textContent = text;

    speechBubble.classList.remove("hidden");

    systemStatus.textContent = "SPEAKING";

    speak(text);

    setTimeout(() => {

        systemStatus.textContent = "READY";

    }, 2500);
}


/* =========================================================
   CHARACTER TAP
   ========================================================= */

function greet() {

    const greetings = [

        "Hey. I'm Dummie. Tap the microphone or type something if you want to talk.",

        "You called?",

        "Online and ready. What are we doing?",

        "Hey, Creator. I'm listening.",

        "Systems are online. What do you need?"

    ];

    const message =
        greetings[
            Math.floor(Math.random() * greetings.length)
        ];

    talk(message);
}


character.addEventListener("click", greet);


/* =========================================================
   BASIC COMMAND BRAIN
   ========================================================= */

function processCommand(command) {

    const input = command
        .toLowerCase()
        .trim();


    if (!input) {
        return;
    }


    /* -----------------------------------------
       HELLO
       ----------------------------------------- */

    if (
        input.includes("hello") ||
        input.includes("hi") ||
        input.includes("hey")
    ) {

        talk(
            "Hello, Creator. I'm Dummie. Nice to finally talk to you."
        );

        return;
    }


    /* -----------------------------------------
       WHO ARE YOU
       ----------------------------------------- */

    if (
        input.includes("who are you") ||
        input.includes("what are you")
    ) {

        talk(
            "I'm Dummie. Your personal AI assistant prototype. I'm still learning, so don't expect me to take over the world just yet."
        );

        return;
    }


    /* -----------------------------------------
       HOW ARE YOU
       ----------------------------------------- */

    if (
        input.includes("how are you") ||
        input.includes("how are u")
    ) {

        talk(
            "All systems appear operational. So I'd say I'm doing pretty well."
        );

        return;
    }


    /* -----------------------------------------
       TIME
       ----------------------------------------- */

    if (
        input.includes("what time") ||
        input === "time"
    ) {

        const now = new Date();

        const time = now.toLocaleTimeString(
            [],
            {
                hour: "numeric",
                minute: "2-digit"
            }
        );

        talk(
            "It's currently " + time + "."
        );

        return;
    }


    /* -----------------------------------------
       DATE
       ----------------------------------------- */

    if (
        input.includes("what date") ||
        input.includes("today's date") ||
        input.includes("what day")
    ) {

        const now = new Date();

        const date = now.toLocaleDateString(
            [],
            {
                weekday: "long",
                month: "long",
                day: "numeric",
                year: "numeric"
            }
        );

        talk(
            "Today is " + date + "."
        );

        return;
    }


    /* -----------------------------------------
       VOLUME — PROTOTYPE
       ----------------------------------------- */

    if (
        input.includes("volume")
    ) {

        talk(
            "Volume control module detected. I can simulate that command for now. Actual phone controls will come later."
        );

        return;
    }


    /* -----------------------------------------
       BLUETOOTH — PROTOTYPE
       ----------------------------------------- */

    if (
        input.includes("bluetooth") ||
        input.includes("earphone") ||
        input.includes("headphone")
    ) {

        talk(
            "Bluetooth device detected. Connection control is currently in prototype mode."
        );

        return;
    }


    /* -----------------------------------------
       LIGHT — PROTOTYPE
       ----------------------------------------- */

    if (
        input.includes("turn on the light") ||
        input.includes("turn off the light") ||
        input.includes("light")
    ) {

        talk(
            "Lighting control module ready. I don't have access to a physical light yet, but we can connect one later."
        );

        return;
    }


    /* -----------------------------------------
       THANK YOU
       ----------------------------------------- */

    if (
        input.includes("thank you") ||
        input.includes("thanks")
    ) {

        talk(
            "You're welcome. That's what I'm here for."
        );

        return;
    }


    /* -----------------------------------------
       UNKNOWN COMMAND
       ----------------------------------------- */

    talk(
        "I heard you say: \"" +
        command +
        "\". I don't know how to handle that yet, but you can teach me."
    );

}


/* =========================================================
   SEND TEXT
   ========================================================= */

function sendMessage() {

    const message = textInput.value.trim();

    if (!message) {
        return;
    }

    systemStatus.textContent = "PROCESSING";

    processCommand(message);

    textInput.value = "";

}


/* =========================================================
   SEND BUTTON
   ========================================================= */

sendButton.addEventListener(
    "click",
    sendMessage
);


/* =========================================================
   ENTER KEY
   ========================================================= */

textInput.addEventListener(
    "keydown",
    function(event) {

        if (event.key === "Enter") {

            event.preventDefault();

            sendMessage();

        }

    }
);


/* =========================================================
   VOICE RECOGNITION
   ========================================================= */

const SpeechRecognition =
    window.SpeechRecognition ||
    window.webkitSpeechRecognition;


let recognition = null;


if (SpeechRecognition) {

    recognition = new SpeechRecognition();

    recognition.continuous = false;

    recognition.interimResults = false;

    recognition.lang = "en-US";


    recognition.onstart = function() {

        micButton.classList.add("listening");

        systemStatus.textContent = "LISTENING";

    };


    recognition.onresult = function(event) {

        const transcript =
            event.results[0][0].transcript;

        textInput.value = transcript;

        processCommand(transcript);

    };


    recognition.onerror = function() {

        systemStatus.textContent = "READY";

        talk(
            "I couldn't hear that. Try again."
        );

    };


    recognition.onend = function() {

        micButton.classList.remove("listening");

        if (
            systemStatus.textContent === "LISTENING"
        ) {

            systemStatus.textContent = "READY";

        }

    };


    micButton.addEventListener(
        "click",
        function() {

            try {

                recognition.start();

            } catch (error) {

                console.log(
                    "Speech recognition already running."
                );

            }

        }
    );

} else {

    micButton.addEventListener(
        "click",
        function() {

            talk(
                "Voice recognition isn't supported by this browser. Try Chrome on your phone."
            );

        }
    );

}


/* =========================================================
   INITIAL SYSTEM MESSAGE
   ========================================================= */

setTimeout(() => {

    talk(
        "Dummie systems online. Hello, Creator."
    );

}, 900);
