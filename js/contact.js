const GOOGLE_SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbyvgTPQxFZdUf4kAga-0unZ8E1fGFJqjtvKIBpmsvZQ04o6XVG41mFj3-eBtlImFPrD/exec";


const contactForm =
    document.getElementById("contactForm");

const formStatus =
    document.getElementById("formStatus");

const submitButton =
    document.getElementById("submitButton");


contactForm.addEventListener(
    "submit",
    async function (event) {

        event.preventDefault();


        const name =
            document
                .getElementById("name")
                .value
                .trim();


        const email =
            document
                .getElementById("email")
                .value
                .trim();


        const message =
            document
                .getElementById("message")
                .value
                .trim();


        if (!name || !email || !message) {

            formStatus.textContent =
                "Please fill all fields.";

            return;
        }


        submitButton.disabled = true;

        submitButton.textContent =
            "Sending...";

        formStatus.textContent =
            "Sending message...";


        try {

            const params =
                new URLSearchParams();


            params.append(
                "action",
                "save"
            );


            params.append(
                "name",
                name
            );


            params.append(
                "email",
                email
            );


            params.append(
                "message",
                message
            );


            const url =
                GOOGLE_SCRIPT_URL +
                "?" +
                params.toString();


            console.log(
                "Sending request to:",
                url
            );


            const response =
                await fetch(
                    url,
                    {
                        method: "GET"
                    }
                );


            console.log(
                "HTTP status:",
                response.status
            );


            const result =
                await response.json();


            console.log(
                "Google Apps Script response:",
                result
            );


            if (result.success === true) {

                formStatus.textContent =
                    "Message sent successfully!";

                contactForm.reset();

            } else {

                throw new Error(
                    result.error ||
                    "Unable to save response."
                );

            }

        } catch (error) {

            console.error(
                "Contact form error:",
                error
            );


            formStatus.textContent =
                "Unable to send message. Please try again.";

        }


        submitButton.disabled = false;

        submitButton.textContent =
            "Send Message";

    }
);