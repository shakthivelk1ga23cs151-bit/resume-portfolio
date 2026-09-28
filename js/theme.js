/* =========================================================
   DARK / LIGHT MODE
========================================================= */

const themeToggle =
    document.getElementById(
        "themeToggle"
    );


function updateThemeIcon() {

    if (!themeToggle) {
        return;
    }


    const darkMode =
        document.body.classList.contains(
            "dark"
        );


    themeToggle.textContent =
        darkMode
            ? "☀️"
            : "🌙";

}


if (themeToggle) {

    themeToggle.addEventListener(
        "click",
        function () {

            document.body.classList.toggle(
                "dark"
            );


            const isDark =
                document.body.classList.contains(
                    "dark"
                );


            localStorage.setItem(
                "darkMode",
                isDark
            );


            updateThemeIcon();

        }
    );

}


const savedTheme =
    localStorage.getItem(
        "darkMode"
    );


if (
    savedTheme === "true"
) {

    document.body.classList.add(
        "dark"
    );

}


updateThemeIcon();