
document.addEventListener("DOMContentLoaded", function () {
    const cardForm = document.querySelector(".card_form");

    cardForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const inputFields = cardForm.querySelectorAll(".form-field_input");
        let hasError = false;
        inputFields.addEventListener("input", function () {
            const inputValue = inputFields.textContent.trim().replace(/\s/g, ""); // Xóa khoảng trắng và lấy giá trị
            if (inputValue === "0".repeat(16)) {
              errorMessage.textContent = "Invalid card number.";
            } else {
              errorMessage.textContent = "";
            }
          });
        inputFields.forEach(function (input) {
            const formField = input.parentElement;
            const noteInvalidElement = formField.querySelector(".form-field_note-invalid");
            const inputValue = input.value.trim();

            if (inputValue === "") {
                displayError(formField, noteInvalidElement, "Can't be blank.");
                hasError = true;
            } else if (inputValue === "0") {
                displayError(formField, noteInvalidElement, "Value cannot be 0.");
                hasError = true;
            } else {
                clearError(formField, noteInvalidElement);
            }

        });

        if (hasError) {
            return false;
        }

        cardForm.submit();
    });

    const inputFields = cardForm.querySelectorAll(".form-field_input");
    inputFields.forEach(function (input) {
        input.addEventListener("blur", function () {
            const formField = input.parentElement;
            const noteInvalidElement = formField.querySelector(".form-field_note-invalid");
            const inputValue = input.value.trim();

            if (inputValue === "") {
                displayError(formField, noteInvalidElement, "Can't be blank.");
            } else if (inputValue === "0") {
                displayError(formField, noteInvalidElement, "Value cannot be 0.");
            } else {
                clearError(formField, noteInvalidElement);
            }
        });
    });

    function displayError(formField, noteInvalidElement, message) {
        noteInvalidElement.textContent = message;
        noteInvalidElement.style.color = "red";
        formField.classList.add("error");
    }

    function clearError(formField, noteInvalidElement) {
        noteInvalidElement.textContent = "";
        formField.classList.remove("error");
    }
});

//

const nameInput = document.getElementById('name');
const cardName = document.querySelector('.card_name');
nameInput.addEventListener('input', function () {
    cardName.textContent = this.value.trim() || 'Jane Appleseed';
});

const cardNumberInput = document.getElementById('cardNumber');
const cardNumber = document.querySelector('.card_number');
cardNumberInput.addEventListener('input', function () {
    const value = this.value.trim();
    const formattedValue = formatCardNumber(value);
    cardNumber.textContent = formattedValue || '0000 0000 0000 0000' ;
});

function formatCardNumber(cardNumber) {
    if (!cardNumber) return '';
    return cardNumber.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim();
}

const monthInput = document.getElementById('dateMonth');
const yearInput = document.getElementById('dateYear');
const cardDate = document.querySelector('.card_date');
monthInput.addEventListener('input', function () {
    const month = this.value.trim();
    cardDate.textContent = month ? `${month}/` : '00';
});
yearInput.addEventListener('input', function () {
    const year = this.value.trim();
    cardDate.textContent = year ? `${year}` : '00';
});

const cvcInput = document.getElementById('cvc');
const cardCVC = document.querySelector('.card_cvc');
cvcInput.addEventListener('input', function () {
    cardCVC.textContent = this.value.trim() || '000';
});

const confirmButton = document.querySelector('.card-form_button');
confirmButton.addEventListener('click', function (event) {
    event.preventDefault();

    const name = nameInput.value.trim() || 'Jane Appleseed';
    const cardNum = cardNumberInput.value.trim();
    const formattedCardNum = formatCardNumber(cardNum) || '0000 0000 0000 0000';
    const month = monthInput.value.trim() || '00';
    const year = yearInput.value.trim() || '00';
    const cvc = cvcInput.value.trim() || '000';


    cardName.textContent = name;
    cardNumber.textContent = formattedCardNum;
    cardDate.textContent = `${month}/${year}`;
    cardCVC.textContent = cvc;
});

function validateForm(event) {
    const $submittedStatus = document.querySelector(".submitted-status");
    const nameInput = document.getElementById("name").value;
    const cardNumberInput = document.getElementById("cardNumber").value;
    const yearInput = document.getElementById("dateYear").value;
    const monthInput = document.getElementById("dateMonth").value;
    const cvcInput = document.getElementById("cvc").value;
  
    const errorName = validateName(nameInput);
    const errorCardNumber = validateCardNumber(cardNumberInput);
    const errorYear = validateYear(yearInput);
    const errorMonth = validateMonth(monthInput);
    const errorCVC = validateCVC(cvcInput);
  
    const errors = {
      name: errorName,
      cardNumber: errorCardNumber,
      YY: errorYear,
      MM: errorMonth,
      CVC: errorCVC,
    };
  
    const noErrors = manageErrors(errors) === 0;
  
    if (noErrors) {
      const form = document.querySelector(".card_form");
      form.classList.add("submitted-status");
      $submittedStatus.classList.remove("submitted-status");
    }
  
    event.preventDefault();
  }




