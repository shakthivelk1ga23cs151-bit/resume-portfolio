/* =========================================================
   ADMIN PANEL
========================================================= */


/* =========================================================
   GOOGLE APPS SCRIPT URL
========================================================= */

// const GOOGLE_SCRIPT_URL =
//     "https://script.google.com/macros/s/AKfycby32DuaPwjqRbakctM1UXVAQS_FbmCReq20dJGrY27nAo_o5vWgcMBugLdBEdmtt7A/exec";


/* =========================================================
   ADMIN LOGIN DETAILS
========================================================= */

const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "admin123";


/* =========================================================
   GET ELEMENTS
========================================================= */

const loginForm =
    document.getElementById("loginForm");

const adminLogin =
    document.getElementById("adminLogin");

const responsesSection =
    document.getElementById("responsesSection");

const responsesList =
    document.getElementById("responsesList");

const loginError =
    document.getElementById("loginError");

const logoutButton =
    document.getElementById("logoutButton");

const adminUsername =
    document.getElementById("adminUsername");

const adminPassword =
    document.getElementById("adminPassword");


/* =========================================================
   DEBUG
========================================================= */

console.log("=================================");
console.log("ADMIN PANEL INITIALIZED");
console.log("=================================");

console.log("loginForm:", loginForm);
console.log("adminLogin:", adminLogin);
console.log("responsesSection:", responsesSection);
console.log("responsesList:", responsesList);
console.log("loginError:", loginError);
console.log("logoutButton:", logoutButton);
console.log("adminUsername:", adminUsername);
console.log("adminPassword:", adminPassword);


/* =========================================================
   ADMIN LOGIN
========================================================= */

if (loginForm) {

    loginForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();

            console.log(
                "Admin login submitted"
            );


            /* -----------------------------------------
               GET USERNAME
            ----------------------------------------- */

            const username =
                adminUsername
                    ? adminUsername.value.trim()
                    : "admin";


            /* -----------------------------------------
               GET PASSWORD
            ----------------------------------------- */

            const password =
                adminPassword
                    ? adminPassword.value
                    : "";


            console.log(
                "Entered username:",
                username
            );


            console.log(
                "Login attempt started"
            );


            /* -----------------------------------------
               CHECK LOGIN
            ----------------------------------------- */

            if (
                username === ADMIN_USERNAME &&
                password === ADMIN_PASSWORD
            ) {

                console.log(
                    "Admin login successful"
                );


                /* -------------------------------------
                   HIDE LOGIN
                ------------------------------------- */

                if (adminLogin) {

                    adminLogin.classList.add(
                        "hidden"
                    );

                }


                /* -------------------------------------
                   SHOW RESPONSES
                ------------------------------------- */

                if (responsesSection) {

                    responsesSection.classList.remove(
                        "hidden"
                    );

                }


                /* -------------------------------------
                   CLEAR INPUTS
                ------------------------------------- */

                if (adminUsername) {

                    adminUsername.value = "";

                }


                if (adminPassword) {

                    adminPassword.value = "";

                }


                /* -------------------------------------
                   CLEAR ERROR
                ------------------------------------- */

                if (loginError) {

                    loginError.textContent = "";

                }


                /* -------------------------------------
                   LOAD RESPONSES
                ------------------------------------- */

                loadResponses();


            } else {

                console.log(
                    "Invalid admin username or password"
                );


                if (loginError) {

                    loginError.textContent =
                        "Invalid username or password.";

                }


                if (adminPassword) {

                    adminPassword.value = "";

                }

            }

        }
    );

}


/* =========================================================
   LOAD GOOGLE SHEETS RESPONSES
========================================================= */

async function loadResponses() {

    console.log(
        "Loading Google Sheets responses..."
    );


    /* -----------------------------------------
       CHECK RESPONSES LIST
    ----------------------------------------- */

    if (!responsesList) {

        console.error(
            "responsesList element not found."
        );

        return;

    }


    /* -----------------------------------------
       LOADING MESSAGE
    ----------------------------------------- */

    responsesList.innerHTML = `
        <p>
            Loading responses...
        </p>
    `;


    try {

        /* -------------------------------------
           GOOGLE APPS SCRIPT URL
        ------------------------------------- */

        const url =
            GOOGLE_SCRIPT_URL +
            "?action=get&timestamp=" +
            Date.now();


        console.log(
            "Fetching:",
            url
        );


        /* -------------------------------------
           FETCH DATA
        ------------------------------------- */

        const response =
            await fetch(url, {
                method: "GET",
                cache: "no-store"
            });


        console.log(
            "Response status:",
            response.status
        );


        /* -------------------------------------
           CHECK HTTP RESPONSE
        ------------------------------------- */

        if (!response.ok) {

            throw new Error(
                "HTTP error: " +
                response.status
            );

        }


        /* -------------------------------------
           CONVERT TO JSON
        ------------------------------------- */

        const data =
            await response.json();


        console.log(
            "Google Apps Script response:",
            data
        );


        /* -------------------------------------
           CHECK ARRAY
        ------------------------------------- */

        if (!Array.isArray(data)) {

            console.error(
                "Expected an array but received:",
                data
            );


            responsesList.innerHTML = `
                <div class="response-card">

                    <h3>
                        Unable to Load Responses
                    </h3>

                    <p class="error-message">
                        Google Sheets returned
                        an unexpected response.
                    </p>

                </div>
            `;

            return;

        }


        /* -------------------------------------
           NO RESPONSES
        ------------------------------------- */

        if (data.length === 0) {

            responsesList.innerHTML = `
                <div class="response-card">

                    <h3>
                        No Responses Yet
                    </h3>

                    <p>
                        No contact form responses
                        have been received yet.
                    </p>

                </div>
            `;

            return;

        }


        /* -------------------------------------
           CLEAR LOADING MESSAGE
        ------------------------------------- */

        responsesList.innerHTML = "";


        /* -------------------------------------
           DISPLAY NEWEST FIRST
        ------------------------------------- */

        data
            .slice()
            .reverse()
            .forEach(
                function (item) {

                    const card =
                        document.createElement(
                            "article"
                        );


                    card.className =
                        "response-card";


                    /* -----------------------------
                       NAME
                    ----------------------------- */

                    const name =
                        escapeHTML(
                            item.Name
                        );


                    /* -----------------------------
                       EMAIL
                    ----------------------------- */

                    const email =
                        escapeHTML(
                            item.Email
                        );


                    /* -----------------------------
                       MESSAGE
                    ----------------------------- */

                    const message =
                        escapeHTML(
                            item.Message
                        );


                    /* -----------------------------
                       TIMESTAMP
                    ----------------------------- */

                    const timestamp =
                        formatTimestamp(
                            item.Timestamp
                        );


                    /* -----------------------------
                       CARD HTML
                    ----------------------------- */

                    card.innerHTML = `

                        <h3>
                            ${name}
                        </h3>

                        <p>
                            <strong>
                                Email:
                            </strong>
                            ${email}
                        </p>

                        <p>
                            <strong>
                                Message:
                            </strong>
                            ${message}
                        </p>

                        <small>
                            Received:
                            ${timestamp}
                        </small>

                    `;


                    /* -----------------------------
                       ADD CARD
                    ----------------------------- */

                    responsesList.appendChild(
                        card
                    );

                }
            );


    } catch (error) {

        console.error(
            "Error loading responses:",
            error
        );


        responsesList.innerHTML = `
            <div class="response-card">

                <h3>
                    Error
                </h3>

                <p class="error-message">
                    Unable to load responses.
                </p>

            </div>
        `;

    }

}


/* =========================================================
   FORMAT TIMESTAMP
========================================================= */

function formatTimestamp(timestamp) {

    if (!timestamp) {

        return "Unknown";

    }


    const date =
        new Date(timestamp);


    if (
        isNaN(
            date.getTime()
        )
    ) {

        return String(timestamp);

    }


    return date.toLocaleString(
        "en-IN",
        {
            dateStyle: "medium",
            timeStyle: "short"
        }
    );

}


/* =========================================================
   ESCAPE HTML
========================================================= */

function escapeHTML(value) {

    const element =
        document.createElement(
            "div"
        );


    element.textContent =
        String(
            value ?? ""
        );


    return element.innerHTML;

}


/* =========================================================
   LOGOUT
========================================================= */

if (logoutButton) {

    logoutButton.addEventListener(
        "click",
        function () {

            console.log(
                "Admin logged out"
            );


            /* -------------------------------------
               HIDE RESPONSES
            ------------------------------------- */

            if (responsesSection) {

                responsesSection.classList.add(
                    "hidden"
                );

            }


            /* -------------------------------------
               SHOW LOGIN
            ------------------------------------- */

            if (adminLogin) {

                adminLogin.classList.remove(
                    "hidden"
                );

            }


            /* -------------------------------------
               CLEAR ERROR
            ------------------------------------- */

            if (loginError) {

                loginError.textContent = "";

            }


            /* -------------------------------------
               CLEAR PASSWORD
            ------------------------------------- */

            if (adminPassword) {

                adminPassword.value = "";

            }


            /* -------------------------------------
               RESET RESPONSES
            ------------------------------------- */

            if (responsesList) {

                responsesList.innerHTML = `
                    <p>
                        Login to load responses.
                    </p>
                `;

            }

        }
    );

}


/* =========================================================
   END ADMIN PANEL
========================================================= */