
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

//

    // Lắng nghe sự kiện khi nhập vào ô input của Cardholder Name
    const nameInput = document.getElementById('name');
    const cardName = document.querySelector('.card_name');
    nameInput.addEventListener('input', function () {
        cardName.textContent = this.value.trim() || 'Jane Appleseed';
    });

    // Lắng nghe sự kiện khi nhập vào ô input của Card Number
    const cardNumberInput = document.getElementById('cardNumber');
    const cardNumber = document.querySelector('.card_number');
    cardNumberInput.addEventListener('input', function () {
        const value = this.value.trim();
        const formattedValue = formatCardNumber(value);
        cardNumber.textContent = formattedValue || '0000 0000 0000 0000';
    });

    // Hàm để định dạng lại số thẻ theo định dạng "xxxx xxxx xxxx xxxx"
    function formatCardNumber(cardNumber) {
        if (!cardNumber) return '';
        return cardNumber.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim();
    }

    // Lắng nghe sự kiện khi nhập vào ô input của Expiration Date (MM/YY)
    const monthInput = document.getElementById('dateMonth');
    const yearInput = document.getElementById('dateYear');
    const cardDate = document.querySelector('.card_date');
    monthInput.addEventListener('input', function () {
        const month = this.value.trim();
        cardDate.textContent = month ? `${month}/` : '00/';
    });
    yearInput.addEventListener('input', function () {
        // year = year.padStart(2, '0');
        // cardDate.textContent += year;
        const year = this.value.trim();
        cardDate.textContent = year ? `${year}/` : '00/';
        // const year = this.value.trim();
        // cardDate.textContent += year || '00';
    });

    // Lắng nghe sự kiện khi nhập vào ô input của CVC
    const cvcInput = document.getElementById('cvc');
    const cardCVC = document.querySelector('.card_cvc');
    cvcInput.addEventListener('input', function () {
        cardCVC.textContent = this.value.trim() || '000';
    });

    // Lắng nghe sự kiện khi bấm vào nút "Confirm"
    const confirmButton = document.querySelector('.card-form_button');
    confirmButton.addEventListener('click', function (event) {
        event.preventDefault();

        // Lấy dữ liệu từ các ô input
        const name = nameInput.value.trim() || 'Jane Appleseed';
        const cardNum = cardNumberInput.value.trim();
        const formattedCardNum = formatCardNumber(cardNum) || '0000 0000 0000 0000';
        const month = monthInput.value.trim() || '00';
        const year = yearInput.value.trim() || '00';
        const cvc = cvcInput.value.trim() || '000';

        // Hiển thị dữ liệu lên front-card
        cardName.textContent = name;
        cardNumber.textContent = formattedCardNum;
        cardDate.textContent = `${month}/${year}`;
        cardCVC.textContent = cvc;
    });




