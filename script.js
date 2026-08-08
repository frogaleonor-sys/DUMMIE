```javascript
/* =========================================================
   DUMMIE AI HUD
   SCRIPT v0.2
   ========================================================= */


/* =========================================================
   GET ELEMENTS
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

const coreArea =
    document.getElementById("core-area");

const statusDot =
    document.getElementById("status-dot");

const hudTime =
    document.getElementById("hud-time");

const hudDate =
    document.getElementById("hud-date");


/* =========================================================
   DUMMIE
   ========================================================= */


const DUMMIE = {

    name: "DUMMIE",

    version: "0.2"

};


let isSpeaking = false;

let isListening = false;


/* =========================================================
   STATUS
   ========================================================= */


function setStatus(status) {

    const value =
        status.toUpperCase();

    systemStatus.textContent =
        value;

    aiStatus.textContent =
        value;

    coreState.textContent =
        value;

}


/* =========================================================
   CLOCK
   ========================================================= */


function updateClock() {

    const now =
        new Date();


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


updateClock();

setInterval(
    updateClock,
    1000
);


/* =========================================================
   VOICE
   ========================================================= */


let selectedVoice = null;


function loadVoices() {

    if (
        !("speechSynthesis" in window)
    ) {

        return;

    }


    const voices =
        window.speechSynthesis
            .getVoices();


    if (!voices.length) {

        return;

    }


    const preferred = [

        "Google US English",

        "Microsoft Jenny",

        "Microsoft Aria",

        "Samantha",

        "Ava"

    ];


    for (
        const name
        of preferred
    ) {

        const voice =
            voices.find(
                item =>
                    item.name
                        .toLowerCase()
                        .includes(
                            name.toLowerCase()
                        )
            );


        if (voice) {

            selectedVoice =
                voice;

            return;

        }

    }


    selectedVoice =
        voices.find(
            voice =>
                voice.lang
                    .toLowerCase()
                    .startsWith("en")
        ) || voices[0];

}


if (
    "speechSynthesis" in window
) {

    loadVoices();

    window.speechSynthesis
        .onvoiceschanged =
        loadVoices;

}


/* =========================================================
   SPEAK
   ========================================================= */


function speak(text) {

    if (
        !("speechSynthesis" in window)
    ) {

        setStatus("READY");

        return;

    }


    window.speechSynthesis.cancel();


    const voice =
        new SpeechSynthesisUtterance(
            text
        );


    if (selectedVoice) {

        voice.voice =
            selectedVoice;

    }


    voice.rate =
        0.94;

    voice.pitch =
        1.02;

    voice.volume =
        1;


    voice.onstart =
        function () {

            isSpeaking =
                true;

            setStatus(
                "SPEAKING"
            );

            coreArea.classList.add(
                "speaking"
            );

            statusDot.style.background =
                "#ff3d61";

            statusDot.style.boxShadow =
                "0 0 9px #ff3d61";

        };


    voice.onend =
        function () {

            isSpeaking =
                false;

            setStatus(
                "READY"
            );

            coreArea.classList.remove(
                "speaking"
            );

            statusDot.style.background =
                "#43ffad";

            statusDot.style.boxShadow =
                "0 0 8px #43ffad";

        };


    voice.onerror =
        function () {

            isSpeaking =
                false;

            setStatus(
                "READY"
            );

            coreArea.classList.remove(
                "speaking"
            );

        };


    window.speechSynthesis
        .speak(voice);

}


/* =========================================================
   TALK
   ========================================================= */


function talk(message) {

    speechName.textContent =
        DUMMIE.name;

    speechText.textContent =
        message;

    speechBubble.style.display =
        "block";

    speak(message);

}


/* =========================================================
   COMMAND BRAIN
   ========================================================= */


function processCommand(command) {

    const input =
        command
            .toLowerCase()
            .trim();


    if (!input) {

        return;

    }


    setStatus(
        "PROCESSING"
    );


    /* HELLO */


    if (
        input === "hi" ||
        input === "hello" ||
        input.includes("hey dummie") ||
        input.includes("hello dummie")
    ) {

        talk(
            "Hello, Creator. I'm listening."
        );

        return;

    }


    /* WHO ARE YOU */


    if (
        input.includes("who are you") ||
        input.includes("what are you")
    ) {

        talk(
            "I'm Dummie, your personal AI assistant prototype. My brain is still under construction, but my systems are online."
        );

        return;

    }


    /* CREATOR */


    if (
        input.includes("who made you") ||
        input.includes("who created you") ||
        input.includes("who is your creator")
    ) {

        talk(
            "You did. At least, that's what my current database says."
        );

        return;

    }


    /* HOW ARE YOU */


    if (
        input.includes("how are you") ||
        input.includes("how are u")
    ) {

        talk(
            "All systems are operational. You haven't broken me yet."
        );

        return;

    }


    /* TIME */


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


    /* DATE */


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


    /* VOLUME */


    if (
        input.includes("volume")
    ) {

        talk(
            "Volume command detected. Phone-level controls aren't connected yet."
        );

        return;

    }


    /* EARPHONES */


    if (
        input.includes("earphone") ||
        input.includes("headphone") ||
        input.includes("bluetooth")
    ) {

        talk(
            "Bluetooth command detected. Device connection isn't connected yet."
        );

        return;

    }


    /* LIGHT */


    if (
        input.includes("light") ||
        input.includes("lamp")
    ) {

        talk(
            "Lighting command detected. Give me a connected device and we'll have something to control."
        );

        return;

    }


    /* SYSTEM STATUS */


    if (
        input.includes("system status") ||
        input.includes("status report") ||
        input === "systems"
    ) {

        talk(
            "Dummie core online. Voice interface active. Command processor operational. External device control is not connected yet."
        );

        return;

    }


    /* THANK YOU */


    if (
        input.includes("thank you") ||
        input.includes("thanks")
    ) {

        talk(
            "You're welcome, Creator."
        );

        return;

    }


    /* UNKNOWN */


    talk(
        "I heard you say: " +
        command +
        ". I don't know how to handle that yet, but you can teach me."
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


    textInput.value =
        "";


    processCommand(
        message
    );

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


let recognition =
    null;


if (SpeechRecognition) {

    recognition =
        new SpeechRecognition();


    recognition.continuous =
        false;

    recognition.interimResults =
        false;

    recognition.lang =
        "en-US";


    recognition.onstart =
        function() {

            isListening =
                true;

            setStatus(
                "LISTENING"
            );

            micButton.classList.add(
                "listening"
            );

            coreArea.classList.add(
                "listening"
            );

        };


    recognition.onresult =
        function(event) {

            const transcript =
                event
                    .results[0][0]
                    .transcript;


            textInput.value =
                transcript;


            processCommand(
                transcript
            );

        };


    recognition.onerror =
        function() {

            isListening =
                false;

            micButton.classList.remove(
                "listening"
            );

            coreArea.classList.remove(
                "listening"
            );

            setStatus(
                "READY"
            );

        };


    recognition.onend =
        function() {

            isListening =
                false;

            micButton.classList.remove(
                "listening"
            );

            coreArea.classList.remove(
                "listening"
            );


            if (!isSpeaking) {

                setStatus(
                    "READY"
                );

            }

        };


    micButton.addEventListener(
        "click",
        function() {

            if (isListening) {

                recognition.stop();

                return;

            }


            try {

                recognition.start();

            } catch(error) {

                console.log(
                    "Microphone already active."
                );

            }

        }
    );


} else {

    micButton.addEventListener(
        "click",
        function() {

            talk(
                "Voice input isn't supported by this browser. Try Chrome on your phone."
            );

        }
    );

}


/* =========================================================
   CORE BUTTON
   ========================================================= */


coreArea.addEventListener(
    "click",
    function() {

        if (isSpeaking) {

            window.speechSynthesis.cancel();

            setStatus(
                "READY"
            );

            return;

        }


        talk(
            "Dummie core online. How can I help?"
        );

    }
);


/* =========================================================
   STARTUP
   ========================================================= */


setStatus(
    "READY"
);


setTimeout(
    function() {

        talk(
            "Dummie systems online. Hello, Creator."
        );

    },
    700
);
```
