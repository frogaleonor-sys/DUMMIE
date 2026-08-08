const locations =
    document.querySelectorAll(".location");

const eventBox =
    document.getElementById("event");

const signal =
    document.getElementById("signal");


locations.forEach(location => {

    location.addEventListener(
        "click",
        () => {

            const name =
                location.dataset.name;

            eventBox.innerHTML = `
                <div class="panel-title">
                    LOCATION DETECTED
                </div>

                <p>
                    TARGET
                    <strong>${name}</strong>
                </p>

                <p>
                    STATUS
                    <strong>SCANNING</strong>
                </p>
            `;

            signal.textContent =
                Math.floor(
                    Math.random() * 30 + 65
                ) + "%";

        }

    );

});


document
    .querySelectorAll("nav button")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                document
                    .querySelectorAll("nav button")
                    .forEach(
                        b =>
                            b.classList.remove(
                                "active"
                            )
                    );

                button.classList.add(
                    "active"
                );

                const page =
                    button.dataset.page;

                if (page === "signals") {

                    eventBox.innerHTML = `
                        <div class="panel-title">
                            SIGNAL NETWORK
                        </div>

                        <p>
                            UNKNOWN SIGNAL
                            <strong>DETECTED</strong>
                        </p>
                    `;

                }

                if (page === "entity") {

                    eventBox.innerHTML = `
                        <div class="panel-title">
                            ENTITY DATABASE
                        </div>

                        <p>
                            KNOWN ENTITIES
                            <strong>0</strong>
                        </p>
                    `;

                }

                if (page === "archive") {

                    eventBox.innerHTML = `
                        <div class="panel-title">
                            ARCHIVE
                        </div>

                        <p>
                            DISCOVERIES
                            <strong>0</strong>
                        </p>
                    `;

                }

                if (page === "world") {

                    eventBox.innerHTML = `
                        <div class="panel-title">
                            SYSTEM MESSAGE
                        </div>

                        <p>
                            No anomalies detected.
                        </p>
                    `;

                }

            }

        );

    });
