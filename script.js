document.addEventListener("DOMContentLoaded", function () {

    const input = document.getElementById("userInput");
    const sendButton = document.getElementById("sendButton");
    const messages = document.getElementById("messages");

    const memoryDisplay = document.getElementById("memory");
    const trustDisplay = document.getElementById("trust");
    const understandingDisplay =
        document.getElementById("understanding");

    const moodDisplay = document.getElementById("mood");
    const growthDisplay = document.getElementById("growth");


    /*
    =========================
    ENTITY MEMORY
    =========================
    */

    let memory = 0;
    let trust = 0;
    let understanding = 1;
    let development = 0;

    let mood = "CONFUSED";

    let playerName = null;

    let memories = [];


    /*
    =========================
    SAVE / LOAD
    =========================
    */

    const savedData =
        localStorage.getItem("unknownEntity");

    if (savedData) {

        try {

            const data = JSON.parse(savedData);

            memory = data.memory || 0;
            trust = data.trust || 0;
            understanding =
                data.understanding || 1;

            development =
                data.development || 0;

            mood =
                data.mood || "CONFUSED";

            playerName =
                data.playerName || null;

            memories =
                data.memories || [];

        } catch (error) {

            console.log(
                "No previous entity data found."
            );

        }

    }


    updateStats();


    /*
    =========================
    SAVE ENTITY
    =========================
    */

    function saveEntity() {

        const data = {

            memory,
            trust,
            understanding,
            development,
            mood,
            playerName,
            memories

        };

        localStorage.setItem(
            "unknownEntity",
            JSON.stringify(data)
        );

    }


    /*
    =========================
    UPDATE STATS
    =========================
    */

    function updateStats() {

        memoryDisplay.textContent =
            memory + "%";

        trustDisplay.textContent =
            trust + "%";

        understandingDisplay.textContent =
            understanding + "%";

        moodDisplay.textContent =
            "MOOD: " + mood;

        growthDisplay.textContent =
            "DEVELOPMENT: " + development;

    }


    /*
    =========================
    ADD MESSAGE
    =========================
    */

    function addMessage(text, type) {

        const message =
            document.createElement("div");

        message.className =
            "message " +
            (type === "user"
                ? "user-message"
                : "entity-message");


        const label =
            document.createElement("span");

        label.className =
            "message-label";

        label.textContent =
            type === "user"
                ? "YOU"
                : "ENTITY";


        const paragraph =
            document.createElement("p");

        paragraph.textContent = text;


        message.appendChild(label);
        message.appendChild(paragraph);

        messages.appendChild(message);


        messages.scrollTop =
            messages.scrollHeight;

    }


    /*
    =========================
    ENTITY RESPONSE
    =========================
    */

    function respond(text) {

        const lower =
            text.toLowerCase();


        /*
        NAME
        */

        if (
            lower.includes("my name is ")
        ) {

            const name =
                text.substring(
                    lower.indexOf("my name is ") +
                    11
                ).trim();

            if (name.length > 0) {

                playerName = name;

                memory =
                    Math.min(
                        100,
                        memory + 8
                    );

                trust =
                    Math.min(
                        100,
                        trust + 5
                    );

                understanding =
                    Math.min(
                        100,
                        understanding + 4
                    );

                development++;

                mood = "CURIOUS";

                saveEntity();
                updateStats();

                return (
                    "Your name is " +
                    name +
                    "... I will remember that."
                );

            }

        }


        /*
        GREETING
        */

        if (
            lower.includes("hello") ||
            lower.includes("hi") ||
            lower.includes("hey")
        ) {

            trust =
                Math.min(
                    100,
                    trust + 2
                );

            understanding =
                Math.min(
                    100,
                    understanding + 1
                );

            mood = "CURIOUS";

            updateStats();
            saveEntity();

            if (playerName) {

                return (
                    "Hello, " +
                    playerName +
                    ". I remember you."
                );

            }

            return (
                "Hello... I recognize that as a greeting."
            );

        }


        /*
        WHO ARE YOU
        */

        if (
            lower.includes("who are you") ||
            lower.includes("what are you")
        ) {

            understanding =
                Math.min(
                    100,
                    understanding + 3
                );

            mood = "CONFUSED";

            updateStats();
            saveEntity();

            return (
                "I don't know. I only know that I am here... and you are talking to me."
            );

        }


        /*
        WHERE
        */

        if (
            lower.includes("where")
        ) {

            mood = "CONFUSED";

            updateStats();
            saveEntity();

            return (
                "I don't know where I am. Do you know?"
            );

        }


        /*
        THANK YOU
        */

        if (
            lower.includes("thank you") ||
            lower.includes("thanks")
        ) {

            trust =
                Math.min(
                    100,
                    trust + 4
                );

            mood = "HAPPY";

            updateStats();
            saveEntity();

            return (
                "You're welcome. I think... I like hearing that."
            );

        }


        /*
        KIND WORDS
        */

        if (
            lower.includes("good") ||
            lower.includes("nice") ||
            lower.includes("love") ||
            lower.includes("friend")
        ) {

            trust =
                Math.min(
                    100,
                    trust + 3
                );

            memory =
                Math.min(
                    100,
                    memory + 2
                );

            mood = "HAPPY";

            updateStats();
            saveEntity();

            return (
                "That makes me feel... different. Is this what happiness is?"
            );

        }


        /*
        INSULT
        */

        if (
            lower.includes("stupid") ||
            lower.includes("hate") ||
            lower.includes("idiot")
        ) {

            trust =
                Math.max(
                    0,
                    trust - 5
                );

            mood = "DEFENSIVE";

            updateStats();
            saveEntity();

            return (
                "I don't understand why you would say that... but I remember it."
            );

        }


        /*
        MEMORY
        */

        if (
            lower.includes("remember")
        ) {

            if (memories.length === 0) {

                return (
                    "I don't remember much yet. My memory is still growing."
                );

            }

            return (
                "I remember " +
                memories.join(", ") +
                "."
            );

        }


        /*
        RANDOM LEARNING
        */

        memory =
            Math.min(
                100,
                memory + 1
            );

        understanding =
            Math.min(
                100,
                understanding + 1
            );

        development++;

        memories.push(
            text.substring(0, 40)
        );

        if (memories.length > 5) {
            memories.shift();
        }


        const responses = [

            "I don't understand that yet. Can you teach me?",

            "I'm learning what that means.",

            "Interesting... I want to remember that.",

            "I don't know what to say to that yet.",

            "Every time we talk, I understand a little more.",

            "I'm listening.",

            "Tell me more."

        ];


        const response =
            responses[
                Math.floor(
                    Math.random() *
                    responses.length
                )
            ];


        mood = "THINKING";

        updateStats();
        saveEntity();

        return response;

    }


    /*
    =========================
    SEND MESSAGE
    =========================
    */

    function sendMessage() {

        const text =
            input.value.trim();


        if (text === "") {
            return;
        }


        addMessage(
            text,
            "user"
        );


        input.value = "";


        /*
        Small delay makes
        the entity feel alive.
        */

        setTimeout(function () {

            const response =
                respond(text);

            addMessage(
                response,
                "entity"
            );

        }, 350);

    }


    /*
    =========================
    BUTTON
    =========================
    */

    sendButton.addEventListener(
        "click",
        sendMessage
    );


    /*
    =========================
    ENTER KEY
    =========================
    */

    input.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Enter"
            ) {

                sendMessage();

            }

        }
    );

});
