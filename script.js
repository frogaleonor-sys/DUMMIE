document.addEventListener("DOMContentLoaded", function () {

    const locations = document.querySelectorAll(".location");
    const eventBox = document.getElementById("event");
    const signal = document.getElementById("signal");

    /* MAP LOCATIONS */

    locations.forEach(function (location) {

        location.addEventListener("click", function () {

            const name = location.dataset.name;

            eventBox.innerHTML =
                "<div class='panel-title'>LOCATION DETECTED</div>" +
                "<p>TARGET <strong>" + name + "</strong></p>" +
                "<p>STATUS <strong>SCANNING</strong></p>";

            signal.textContent =
                Math.floor(Math.random() * 30 + 65) + "%";

        });

    });


    /* NAVIGATION */

    const buttons =
        document.querySelectorAll("nav button");

    buttons.forEach(function (button) {

        button.addEventListener("click", function () {

            buttons.forEach(function (b) {
                b.classList.remove("active");
            });

            button.classList.add("active");

            const page =
                button.getAttribute("data-page");


            if (page === "world") {

                eventBox.innerHTML =
                    "<div class='panel-title'>SYSTEM MESSAGE</div>" +
                    "<p>No anomalies detected.</p>";

            }


            if (page === "signals") {

                eventBox.innerHTML =
                    "<div class='panel-title'>SIGNAL NETWORK</div>" +
                    "<p>UNKNOWN SIGNAL <strong>DETECTED</strong></p>";

            }


            if (page === "entity") {

                eventBox.innerHTML =
                    "<div class='panel-title'>ENTITY DATABASE</div>" +
                    "<p>KNOWN ENTITIES <strong>0</strong></p>";

            }


            if (page === "archive") {

                eventBox.innerHTML =
                    "<div class='panel-title'>ARCHIVE</div>" +
                    "<p>DISCOVERIES <strong>0</strong></p>";

            }

        });

    });

});
