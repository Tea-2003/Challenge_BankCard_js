const $form = document.querySelector(".card_form");
const $buttonContinue = document.querySelector("#btn-continue");
const $cardNameInput = document.querySelector("._input-name");
const $cardNumberInput = document.querySelector("._input-card-number");
const $cardMonthInput = document.querySelector("._input-month");
const $cardYearInput = document.querySelector("._input-year");
const $cardCvcInput = document.querySelector("._input-cvc");
const userName = $form.name.value;
const cardNumber = $form["_input-card-number"].value;
const YY = $form.YY.value;
const MM = $form.MM.value;
const CVC = $form.CVC.value;

function validateName(userName) {
  if (userName.length === 0) {
    return "This field cannot be blank";
  } else if (userName.length > 50) {
    return "This field cannot contain more than 50 characters";
  } else if (!/^[ a-z]+$/i.test(userName)) {
    return "This field can only contain letters";
  } else {
    return "";
  }
}

let lastValidCardNumber = "0000 0000 0000 0000";
function validateCardNumber(cardNumber) {
  if (cardNumber.length === 0) {
    document.querySelector('.card_number').textContent = "0000 0000 0000 0000";
    return "This field cannot be blank";
  } else if (!/([0-9]{4}\s?){4}/.test(cardNumber)) {
    document.querySelector('.card_number').textContent = lastValidCardNumber;
    return "Invalid credit card number";
  } else {
    return "";
  }
}

function validateYear(YY) {
  if (YY.length === 0) {
    return "This field cannot be blank";
  } else if (!/^[0-9][0-9]$/.test(YY)) {
    if (/^[1-9][0-9]$/.test(YY)) {
      return "";
    }
    return "Invalid year format";
  } else {
    return "";
  }
}

function validateMonth(MM) {
  if (MM.length === 0) {
    return "This field cannot be blank";
  } else if (MM > 12) {
    return "Invalid month format";
  } else if (!/^0[0-9]|1[0-2]$/.test(MM)) {
    if (/^[1-9][0-9]$/.test(MM)) {
      return "";
    }
    return "Invalid month format";
  } else {
    return "";
  }
}

function validateCVC(CVC) {
  if (CVC.length === 0) {
    return "This field cannot be blank";
  } else if (!/^[0-9][0-9][1-9]$/.test(CVC)) {
    if (/^[0-9][1-9][0-9]$/.test(CVC)) {
      return "";
    }
    if (/^[1-9][0-9][0-9]$/.test(CVC)) {
      return "";
    }
    return "Invalid CVC format";
  } else {
    return "";
  }
}

function validateForm(event) {
  const $submittedStatus = document.querySelector(".submitted-status");
  const userName = $cardNameInput.value;
  const cardNumber = $cardNumberInput.value;
  const YY = $cardYearInput.value;
  const MM = $cardMonthInput.value;
  const CVC = $cardCvcInput.value;

  const errorName = validateName(userName);
  const errorCardNumber = validateCardNumber(cardNumber);
  const errorYear = validateYear(YY);
  const errorMonth = validateMonth(MM);
  const errorCVC = validateCVC(CVC);

  const errors = {
    name: errorName,
    "card-number": errorCardNumber,
    _input_year: errorYear,
    _input_month: errorMonth,
    _input_cvc: errorCVC,
  };

  const noErrors = manageErrors(errors) === 0;

  if (noErrors) {
    $form.classList.add("occult");
    $submittedStatus.classList.remove("occult");
  }

  event.preventDefault();
}

function manageErrors(errors) {
  const keys = Object.keys(errors);
  let numberOfErrors = 0;
  const $nameErrorText = document.querySelector("#nameError");
  const $cardNumberErrorText = document.querySelector("#cardNumberError");
  const $MMerrorText = document.querySelector("#MMerror");
  const $YYerrorText = document.querySelector("#YYerror");
  const $cvcErrorText = document.querySelector("#cvcError");

  keys.forEach(function (key) {
    const error = errors[key];

    if (error) {
      numberOfErrors++;
      $form[key].classList.add("error");
      if (key === "name") {
        $nameErrorText.textContent = error;
      } else if (key === "card-number") {
        $cardNumberErrorText.textContent = error;
      } else if (key === "_input_year") {
        $YYerrorText.textContent = error;
      } else if (key === "_input_month") {
        $MMerrorText.textContent = error;
      } else if (key === "_input_cvc") {
        $cvcErrorText.textContent = error;
      }
    } else {
      $form[key].classList.remove("error");
    }
  });

  return numberOfErrors;
}

function writeTextCard() {
  const nameFrontCard = document.querySelector(".card_name");
  const numberFrontCard = document.querySelector(".card_number");
  const monthFrontCard = document.querySelector(".card_date .card_month");
  const yearFrontCard = document.querySelector(".card_date .card_year");
  const numberBackCard = document.querySelector(".card_cvc");

  $cardNameInput.addEventListener("input", () => {
    nameFrontCard.textContent = $cardNameInput.value || "Jane Appleseed";
  });

  $cardNumberInput.addEventListener("input", () => {
    numberFrontCard.textContent =
      $cardNumberInput.value || "0000 0000 0000 0000";
  });

  $cardMonthInput.addEventListener("input", () => {
    monthFrontCard.textContent = $cardMonthInput.value || "MM";
  });

  $cardYearInput.addEventListener("input", () => {
    yearFrontCard.textContent = $cardYearInput.value || "YY";
  });

  $cardCvcInput.addEventListener("input", () => {
    numberBackCard.textContent = $cardCvcInput.value || "000";
  });

  $cardNumberInput.addEventListener("keyup", function (e) {
    const input = e.target.value.replace(/\s/g, "").trim();
    if (input.length > 0) {
      const formattedInput = input
        .match(/.{1,4}/g)
        .join(" ")
        .substring(0, 19);
      e.target.value = formattedInput;
      numberFrontCard.textContent = formattedInput;
      lastValidCardNumber = formattedInput;
    } else {
      numberFrontCard.textContent = "0000 0000 0000 0000";
    }
  });
}

writeTextCard();

$form.addEventListener("submit", validateForm);
$buttonContinue.addEventListener("click", function () {
  location.reload();
});
