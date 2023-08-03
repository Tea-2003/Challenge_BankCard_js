
document.addEventListener("DOMContentLoaded", function () {
  const cardForm = document.querySelector(".card_form");

  function validateName(name) {
    return name.trim() === "" ? "Can't be blank." : null;
  }

  function validateCardNumber(cardNumber) {
    return cardNumber.trim() === "" || cardNumber.trim() === "00".repeat(16)
      ? "Invalid card number."
      : null;
  }

  function validateYear(year) {
    return year.trim() === "" ? "Can't be blank." : null;
  }

  function validateMonth(month) {
    return month.trim() === "" || !/^\d{2}$/.test(month) ? "Invalid month." : null;
  }

  function validateCVC(cvc) {
    return cvc.trim() === "" || !/^\d{3}$/.test(cvc) ? "Invalid CVC." : null;
  }

  function manageErrors(errors) {
    let errorCount = 0;
    for (const key in errors) {
      const errorMessage = errors[key];
      const formField = document.getElementById(key);
      const noteInvalidElement = formField.nextElementSibling;
      if (errorMessage) {
        displayError(formField, noteInvalidElement, errorMessage);
        errorCount++;
      } else {
        clearError(formField, noteInvalidElement);
      }
    }
    return errorCount;
  }

  document.querySelectorAll(".form-field_input").forEach((input) => {
    input.addEventListener("input", function () {
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

  const nameInput = document.getElementById("name");
  const cardName = document.querySelector(".card_name");
  nameInput.addEventListener("input", function () {
    cardName.textContent = this.value.trim() || "Jane Appleseed";
  });

  const cardNumberInput = document.getElementById("cardNumber");
  const cardNumber = document.querySelector(".card_number");
  cardNumberInput.addEventListener("input", function () {
    const value = this.value.trim();
    const formattedValue = formatCardNumber(value);
    cardNumber.textContent = formattedValue || "0000 0000 0000 0000";
  });

  function formatCardNumber(cardNumber) {
    if (!cardNumber) return "";
    return cardNumber.replace(/\D/g, "").replace(/(.{4})/g, "$1 ").trim();
  }
  
  const monthInput = document.getElementById("MM");
  const yearInput = document.getElementById("YY");
  const cardDate = document.querySelector(".card_date");
  
  monthInput.addEventListener("input", function () {
    const month = this.value.trim();
    cardDate.textContent = month ? month.padStart(2, "0") + "/" + yearInput.value.trim() : "00/00";
  });
  
  yearInput.addEventListener("input", function () {
    const year = this.value.trim();
    cardDate.textContent = monthInput.value.trim() ? monthInput.value.trim().padStart(2, "0") + "/" + year : "00/00";
  });
  
  const cvcInput = document.getElementById("CVC");
  const cardCVC = document.querySelector(".card_cvc");
  cvcInput.addEventListener("input", function () {
    cardCVC.textContent = this.value.trim() ?? "000";
  });
});

function continueBtn() {
  location.reload();
  document.querySelector('.completion-message').style.display = 'none'
  document.querySelector('.form').style.display = 'flex'
}

function confirmBtn() {

  document.querySelector('.card_info').style.display = 'none';
  document.querySelector('.completion-message').style.display = 'block';
}