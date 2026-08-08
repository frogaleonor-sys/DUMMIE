document.addEventListener("DOMContentLoaded", function () {

    const input = document.getElementById("userInput");
    const sendButton = document.getElementById("sendButton");
    const messages = document.getElementById("messages");

    if (!input || !sendButton || !messages) {
        alert("ERROR: ECHO elements not found.");
        return;
    }

    function addMessage(text, type) {

        const message = document.createElement("div");
        message.className =
            type === "user"
                ? "message user-message"
                : "message entity-message";

        message.innerHTML = `
            <span class="message-label">
                ${type === "user" ? "YOU" : "ENTITY"}
            </span>

            <p>${text}</p>
        `;

        messages.appendChild(message);
        messages.scrollTop = messages.scrollHeight;
    }


    function sendMessage() {

        const text = input.value.trim();

        if (!text) {
            return;
        }

        addMessage(text, "user");

        input.value = "";
        input.focus();

        setTimeout(function () {

            addMessage(
                "I heard you. I am still learning...",
                "entity"
            );

        }, 300);
    }


    sendButton.addEventListener(
        "click",
        sendMessage
    );


    input.addEventListener(
        "keydown",
        function (event) {

            if (event.key === "Enter") {
                sendMessage();
            }

        }
    );

});
