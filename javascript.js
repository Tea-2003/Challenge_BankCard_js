
// Wait for the DOM to load
document.addEventListener("DOMContentLoaded", function () {
    // Get the form element
    const cardForm = document.querySelector(".card_form");

    // Add event listener for the form submit
    cardForm.addEventListener("submit", function (event) {
        // Prevent the default form submission
        event.preventDefault();

        // Check all input fields for empty values
        const inputFields = cardForm.querySelectorAll(".form-field_input");
        let hasError = false;

        inputFields.forEach(function (input) {
            const formField = input.parentElement;
            const noteInvalidElement = formField.querySelector(".form-field_note-invalid");
            if (input.value.trim() === "") {
                displayError(formField, noteInvalidElement, "Can't be blank.");
                hasError = true;
            } else {
                clearError(formField, noteInvalidElement);
            }
        });

        // If there are errors, prevent form submission
        if (hasError) {
            return false;
        }

        // If no errors, submit the form
        cardForm.submit();
    });

    // Add event listener for input fields on blur
    const inputFields = cardForm.querySelectorAll(".form-field_input");
    inputFields.forEach(function (input) {
        input.addEventListener("blur", function () {
            const formField = input.parentElement;
            const noteInvalidElement = formField.querySelector(".form-field_note-invalid");
            if (input.value.trim() === "") {
                displayError(formField, noteInvalidElement, "Can't be blank.");
            } else {
                clearError(formField, noteInvalidElement);
            }
        });
    });

    // Function to display error message for the input field
    function displayError(formField, noteInvalidElement, message) {
        noteInvalidElement.textContent = message;
        noteInvalidElement.style.color = "red";
        formField.classList.add("error");
    }

    // Function to clear error message for the input field
    function clearError(formField, noteInvalidElement) {
        noteInvalidElement.textContent = "";
        formField.classList.remove("error");
    }
});

