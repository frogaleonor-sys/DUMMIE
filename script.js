document.addEventListener("DOMContentLoaded", () => {

    const quickCards =
        document.querySelectorAll(".quick-card");

    const navButtons =
        document.querySelectorAll(".nav-button");


    /* =========================
       SAMPLE CLASS DATA
       ========================= */

    const classes = [
        {
            time: "7:00 AM",
            name: "Subject 1",
            room: "Room —"
        },
        {
            time: "8:30 AM",
            name: "Subject 2",
            room: "Room —"
        },
        {
            time: "10:00 AM",
            name: "Subject 3",
            room: "Room —"
        }
    ];


    /* =========================
       DISPLAY TODAY'S CLASSES
       ========================= */

    const classContainer =
        document.getElementById("today-classes");


    function showClasses() {

        classContainer.innerHTML = "";


        if (classes.length === 0) {

            classContainer.innerHTML =
                '<div class="empty">' +
                'No classes added yet.' +
                '</div>';

            return;
        }


        classes.forEach(classItem => {

            const item =
                document.createElement("div");

            item.className =
                "class-item";


            item.innerHTML = `
                <div class="class-time">
                    ${classItem.time}
                </div>

                <div class="class-info">

                    <div class="class-name">
                        ${classItem.name}
                    </div>

                    <div class="class-room">
                        ${classItem.room}
                    </div>

                </div>
            `;


            classContainer.appendChild(item);

        });

    }


    showClasses();


    /* =========================
       PAGE ACTION
       ========================= */

    function openPage(page) {

        if (page === "home") {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

            return;
        }


        if (page === "schedule") {

            alert(
                "📅 Schedule\n\n" +
                "Your class schedule will appear here."
            );

            return;
        }


        if (page === "activities") {

            alert(
                "📚 Activities\n\n" +
                "Your activities will appear here."
            );

            return;
        }


        if (page === "deadlines") {

            alert(
                "⏰ Deadlines\n\n" +
                "Your upcoming deadlines will appear here."
            );

            return;
        }


        if (page === "announcements") {

            alert(
                "📢 Announcements\n\n" +
                "Class announcements will appear here."
            );

            return;
        }


        if (page === "more") {

            alert(
                "More features coming soon."
            );

        }

    }


    /* =========================
       QUICK CARDS
       ========================= */

    quickCards.forEach(card => {

        card.addEventListener(
            "click",
            () => {

                const page =
                    card.dataset.page;

                openPage(page);

            }
        );

    });


    /* =========================
       NAVIGATION
       ========================= */

    navButtons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                navButtons.forEach(
                    item => {
                        item.classList.remove(
                            "active"
                        );
                    }
                );


                button.classList.add(
                    "active"
                );


                const page =
                    button.dataset.page;

                openPage(page);

            }
        );

    });

});
