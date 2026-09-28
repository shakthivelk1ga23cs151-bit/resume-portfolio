const menuToggle =
    document.getElementById(
        "menuToggle"
    );


const navLinks =
    document.getElementById(
        "navLinks"
    );


/* ==============================
   MOBILE MENU
================================ */

menuToggle.addEventListener(
    "click",
    function () {

        navLinks.classList.toggle(
            "active"
        );

    }
);


/* ==============================
   CLOSE MOBILE MENU
================================ */

const navigationLinks =
    navLinks.querySelectorAll(
        "a"
    );


navigationLinks.forEach(
    function (link) {

        link.addEventListener(
            "click",
            function () {

                navLinks.classList.remove(
                    "active"
                );

            }
        );

    }
);


/* ==============================
   FOOTER YEAR
================================ */

const currentYear =
    document.getElementById(
        "currentYear"
    );


currentYear.textContent =
    new Date().getFullYear();