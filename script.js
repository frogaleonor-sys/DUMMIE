```javascript
/* =========================================================
   DUMMIE // AI HUD
   SCRIPT v0.2
   ========================================================= */


/* =========================================================
   ELEMENTS
   ========================================================= */

const speechBubble =
    document.getElementById("speech-bubble");

const speechName =
    document.getElementById("speech-name");

const speechText =
    document.getElementById("speech-text");

const textInput =
    document.getElementById("text-input");

const sendButton =
    document.getElementById("send-button");

const micButton =
    document.getElementById("mic-button");

const systemStatus =
    document.getElementById("system-status");

const aiStatus =
    document.getElementById("ai-status");

const coreState =
    document.getElementById("core-state");

const hudTime =
    document.getElementById("hud-time");

const hudDate =
    document.getElementById("hud-date");

const statusDot =
    document.getElementById("status-dot");

const coreArea =
    document.querySelector(".core-area");


/* =========================================================
   DUMMIE CONFIGURATION
   ========================================================= */

const DUMMIE = {

    name: "DUMMIE",

    version: "0.2",

    creator: "Creator",

    personality: {

        friendly: true,

        curious: true,

        sarcastic: true,

        helpful: true,

        calm: true

    }

};


/* =========================================================
   SYSTEM STATE
   ========================================================= */

let isSpeaking = false;

let isListening = false;


/* =========================================================
   SYSTEM STATUS
   ========================================================= */

function setStatus(status) {

    systemStatus.textContent =
        status.toUpperCase();

    aiStatus.textContent =
        status.toUpperCase();

    coreState.textContent =
        status.toUpperCase();

}


/* =========================================================
   TIME
   ========================================================= */

function updateClock() {

    const now = new Date();

    hudTime.textContent =
        now.toLocaleTimeString(
            [],
            {
                hour: "2-digit",
                minute: "2-digit"
            }
        );

    hudDate.textContent =
        now.toLocaleDateString(
            [],
            {
                month: "short",
                day: "numeric"
            }
        );

}


/* Update every second */

updateClock();

setInterval(
    updateClock,
    1000
);


/* =========================================================
   VOICE SELECTION
   ========================================================= */

let selectedVoice = null;


function loadVoice() {

    if (
        !("speechSynthesis" in window)
    ) {
        return;
    }

    const voices =
        window.speechSynthesis.getVoices();

    if (!voices.length) {
        return;
    }


    /*
       Try to find a natural English voice.
    */

    const preferredNames = [

        "Google US English",

        "Microsoft Jenny",

        "Microsoft Aria",

        "Samantha",

        "Karen",

        "Ava",

        "Google UK English Female"

    ];


    for (
        const preferred
        of preferredNames
    ) {

        const found =
            voices.find(
                voice =>
                    voice.name
                        .toLowerCase()
                        .includes(
                            preferred.toLowerCase()
                        )
            );

        if (found) {

            selectedVoice = found;

            return;

        }

    }


    /*
       Fallback to any English voice.
    */

    selectedVoice =
        voices.find(
            voice =>
                voice.lang &&
                voice.lang
                    .toLowerCase()
                    .startsWith("en")
        ) || voices[0];

}


if (
    "speechSynthesis" in window
) {

    loadVoice();

    window.speechSynthesis
        .onvoiceschanged =
        loadVoice;

}


/* =========================================================
   SPEECH
   ========================================================= */

function speak(text) {

    if (
        !("speechSynthesis" in window)
    ) {

        return;

    }


    /*
       Stop previous speech.
    */

    window.speechSynthesis.cancel();


    const utterance =
        new SpeechSynthesisUtterance(
            text
        );


    if (selectedVoice) {

        utterance.voice =
            selectedVoice;

    }


    /*
       Slightly more natural
       than the default browser voice.
    */

    utterance.rate = 0.96;

    utterance.pitch = 1.03;

    utterance.volume = 1;


    utterance.onstart =
        function () {

            isSpeaking = true;

            setStatus("SPEAKING");

            statusDot.style.background =
                "#ff3d61";

            statusDot.style.boxShadow =
                "0 0 9px #ff3d61";

            coreArea.classList.add(
                "speaking"
            );

        };


    utterance.onend =
        function () {

            isSpeaking = false;

            setStatus("READY");

            statusDot.style.background =
                "#43ffad";

            statusDot.style.boxShadow =
                "0 0 7px #43ffad";

            coreArea.classList.remove(
                "speaking"
            );

        };


    window.speechSynthesis.speak(
        utterance
    );

}


/* =========================================================
   DUMMIE RESPONSE
   ========================================================= */

function talk(text) {

    speechName.textContent =
        DUMMIE.name;

    speechText.textContent =
        text;

    speechBubble.style.opacity =
        "1";

    setStatus("SPEAKING");

    speak(text);

}


/* =========================================================
   RANDOM RESPONSE
   ========================================================= */

function randomResponse(
    responses
) {

    return responses[
        Math.floor(
            Math.random() *
            responses.length
        )
    ];

}


/* =========================================================
   COMMAND PROCESSOR
   ========================================================= */

function processCommand(
    command
) {

    const input =
        command
            .toLowerCase()
            .trim();


    if (!input) {

        return;

    }


    setStatus("PROCESSING");


    /* =====================================================
       HELLO
       ===================================================== */

    if (
        input === "hi" ||
        input === "hello" ||
        input.includes("hey dummie") ||
        input.includes("hello dummie")
    ) {

        talk(
            randomResponse([

                "Hello, Creator.",

                "Hey. I'm listening.",

                "Hello. All systems are ready.",

                "Hey, Creator. What are we working on?"

            ])
        );

        return;

    }


    /* =====================================================
       WHO ARE YOU
       ===================================================== */

    if (
        input.includes("who are you") ||
        input.includes("what are you")
    ) {

        talk(
            "I'm Dummie, your personal AI assistant prototype. My brain is still under construction, but my systems are online."
        );

        return;

    }


    /* =====================================================
       CREATOR
       ===================================================== */

    if (
        input.includes("who is your creator") ||
        input.includes("who made you") ||
        input.includes("who created you")
    ) {

        talk(
            "You did. At least, according to my current database."
        );

        return;

    }


    /* =====================================================
       HOW ARE YOU
       ===================================================== */

    if (
        input.includes("how are you") ||
        input.includes("how are u")
    ) {

        talk(
            randomResponse([

                "All systems are operational.",

                "I'm functioning within acceptable parameters.",

                "Pretty good. You haven't broken me yet.",

                "Systems stable. Personality questionable."

            ])
        );

        return;

    }


    /* =====================================================
       TIME
       ===================================================== */

    if (
        input === "time" ||
        input.includes("what time") ||
        input.includes("current time")
    ) {

        const now =
            new Date();

        const time =
            now.toLocaleTimeString(
                [],
                {
                    hour: "numeric",
                    minute: "2-digit"
                }
            );

        talk(
            "It's currently " +
            time +
            "."
        );

        return;

    }


    /* =====================================================
       DATE
       ===================================================== */

    if (
        input.includes("what date") ||
        input.includes("what day is it") ||
        input.includes("today's date")
    ) {

        const now =
            new Date();

        const date =
            now.toLocaleDateString(
                [],
                {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                    year: "numeric"
                }
            );

        talk(
            "Today is " +
            date +
            "."
        );

        return;

    }


    /* =====================================================
       VOLUME
       ===================================================== */

    if (
        input.includes("volume")
    ) {

        talk(
            "I detected a volume command. Device control isn't connected yet, but the command system is ready for it."
        );

        return;

    }


    /* =====================================================
       EARPHONES / BLUETOOTH
       ===================================================== */

    if (
        input.includes("earphone") ||
        input.includes("headphone") ||
        input.includes("bluetooth")
    ) {

        talk(
            "Bluetooth control module detected. Device connection is currently in prototype mode."
        );

        return;

    }


    /* =====================================================
       LIGHT
       ===================================================== */

    if (
        input.includes("light") ||
        input.includes("lamp")
    ) {

        talk(
            "Lighting control detected. Give me a connected device and we'll have something to control."
        );

        return;

    }


    /* =====================================================
       SYSTEM STATUS
       ===================================================== */

    if (
        input.includes("system status") ||
        input.includes("status report") ||
        input.includes("systems")
    ) {

        talk(
            "Dummie core online. Voice interface active. Command processor operational. External device control is not connected yet."
        );

        return;

    }


    /* =====================================================
       THANK YOU
       ===================================================== */

    if (
        input.includes("thank you") ||
        input.includes("thanks")
    ) {

        talk(
            randomResponse([

                "You're welcome.",

                "Anytime, Creator.",

                "That's what I'm here for.",

                "No problem."

            ])
        );

        return;

    }


    /* =====================================================
       UNKNOWN COMMAND
       ===================================================== */

    talk(
        "I heard you say: " +
        command +
        ". I don't know how to handle that yet. My command database is still growing."
    );

}


/* =========================================================
   SEND MESSAGE
   ========================================================= */

function sendMessage() {

    const message =
        textInput.value.trim();


    if (!message) {

        return;

    }


    processCommand(
        message
    );


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
    function (event) {

        if (
            event.key === "Enter"
        ) {

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

    recognition =
        new SpeechRecognition();


    recognition.continuous =
        false;

    recognition.interimResults =
        false;

    recognition.lang =
        "en-US";


    /* ---------------------------------------------
       LISTENING START
       --------------------------------------------- */

    recognition.onstart =
        function () {

            isListening = true;

            setStatus("LISTENING");

            micButton.classList.add(
                "listening"
            );

            coreArea.classList.add(
                "listening"
            );

        };


    /* ---------------------------------------------
       RESULT
       --------------------------------------------- */

    recognition.onresult =
        function (event) {

            const transcript =
                event.results[0][0]
                    .transcript;

            textInput.value =
                transcript;

            processCommand(
                transcript
            );

        };


    /* ---------------------------------------------
       ERROR
       --------------------------------------------- */

    recognition.onerror =
        function () {

            isListening = false;

            micButton.classList.remove(
                "listening"
            );

            coreArea.classList.remove(
                "listening"
            );

            setStatus("READY");

            talk(
                "I couldn't hear that. Try again."
            );

        };


    /* ---------------------------------------------
       END
       --------------------------------------------- */

    recognition.onend =
        function () {

            isListening = false;

            micButton.classList.remove(
                "listening"
            );

            coreArea.classList.remove(
                "listening"
            );

            if (!isSpeaking) {

                setStatus("READY");

            }

        };


    /* ---------------------------------------------
       MICROPHONE BUTTON
       --------------------------------------------- */

    micButton.addEventListener(
        "click",
        function () {

            if (isListening) {

                recognition.stop();

                return;

            }


            try {

                recognition.start();

            } catch (error) {

                console.log(
                    "Recognition already active."
                );

            }

        }
    );


} else {

    /*
       Browser doesn't support
       speech recognition.
    */

    micButton.addEventListener(
        "click",
        function () {

            talk(
                "Voice input isn't supported by this browser. Try Chrome or another browser with speech recognition."
            );

        }
    );

}


/* =========================================================
   CORE INTERACTION
   ========================================================= */

coreArea.addEventListener(
    "click",
    function () {

        if (isSpeaking) {

            window.speechSynthesis.cancel();

            setStatus("READY");

            return;

        }


        talk(
            "Dummie core online. How can I help?"
        );

    }
);


/* =========================================================
   INITIALIZATION
   ========================================================= */

setStatus("READY");

setTimeout(
    function () {

        talk(
            "Dummie systems online. Hello, Creator."
        );

    },
    900
);
```
