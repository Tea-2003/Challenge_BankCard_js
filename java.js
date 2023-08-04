const $form = document.querySelector(".card_form");
const $buttonContinue = document.querySelector("#btn-continue");
const $cardNameInput = document.querySelector("#name");
const $cardNumberInput = document.querySelector("#card-number");
const $cardMonthInput = document.querySelector("#MM");
const $cardYearInput = document.querySelector("#YY");
const $cardCvcInput = document.querySelector("#CVC");
const $showCard = document.querySelector("#occult");
const userName = $form.name.value;
const cardNumber = $form["card-number"].value;
const YY = $form.YY.value;
const MM = $form.MM.value;
const CVC = $form.CVC.value;


let $nameError = document.querySelector("#nameError").style.display = "none";
let $cardNumberError = document.querySelector("#cardNumberError").style.display = "none";
let $MMerror = document.querySelector("#MMerror").style.display = "none";
let $YYerror = document.querySelector("#YYerror").style.display = "none";
let $cvcError = document.querySelector("#cvcError").style.display = "none";
// let $show = document.querySelector("#occult").style.display="none";

function ValidateActInsert() {
  var specialChars = /[^a-zA-Z0-9 ]/g;
  if (document.actorInsert.actInsert.value.match(specialChars)) {
    alert("Only characters A-Z, a-z and 0-9 are allowed!")
    document.actorInsert.actInsert.focus();
    return false;
  }
  return (true);
}
function validateName(userName) {
  if (userName.trim() === "") {
    $nameError = document.querySelector("#nameError").style.display = "block";
    return "This field cannot be blank";
  } else if (userName.length > 50) {
    $nameError = document.querySelector("#nameError").style.display = "block";
    return "Name is too long (maximum 50 characters)";
  } else if (!/^[ a-z]+$/i.test(userName)) {
    $nameError = document.querySelector("#nameError").style.display = "block";
    return "Name can only contain letters and spaces";
  } else {
    $nameError = document.querySelector("#nameError").style.display = "none";
  }
}
let lastValidCardNumber = "0000 0000 0000 0000";
function validateCardNumber(cardNumber) {
  if (cardNumber.trim() === "") {
    document.querySelector('.card_number').textContent = "0000 0000 0000 0000";
    $cardNumberError = document.querySelector("#cardNumberError").style.display = "block";
    return "This field cannot be blank";
  } else if (!/([0-9]{4}\s?){4}/.test(cardNumber)) {
    document.querySelector('.card_number').textContent = lastValidCardNumber;
    $cardNumberError = document.querySelector("#cardNumberError").style.display = "block";
    return "Invalid card number format (use 16 digits with spaces)";
  } else {
    $cardNumberError = document.querySelector("#cardNumberError").style.display = "none";
  }
}


function validateYear(YY) {
  if (YY.trim() === "") {
    $YYerror = document.querySelector("#YYerror").style.display = "block";
    return "error format";
  } else if (!/^[0-9][1-9]$/.test(YY)) {
    if (/^[1-9][0-9]$/.test(YY)) {
      $YYerror = document.querySelector("#YYerror").style.display = "none";
    }
    $YYerror = document.querySelector("#YYerror").style.display = "block";
  } else {
    $YYerror = document.querySelector("#YYerror").style.display = "none";
  }
}


function validateMonth(MM) {
  if (MM.trim() === "") {
    $MMerror = document.querySelector("#MMerror").style.display = "block";
    return "error format";
  }
  if (MM > 12 || MM < 1) {
    $MMerror = document.querySelector("#MMerror").style.display = "block";
    return "error format";
  }
  else {
    $MMerror = document.querySelector("#MMerror").style.display = "none";
  }
}

function validateCVC(CVC) {
  if (CVC.trim() === "") {
    $cvcError = document.querySelector("#cvcError").style.display = "block";
    return "error format";
  } else if (!/^[0-9][0-9][1-9]$/.test(CVC)) {
    if (/^[0-9][1-9][0-9]$/.test(CVC)) {
      $cvcError = document.querySelector("#cvcError").style.display = "none";
    }
    if (/^[1-9][0-9][0-9]$/.test(CVC)) {
      $cvcError = document.querySelector("#cvcError").style.display = "none";
    }
    $cvcError = document.querySelector("#cvcError").style.display = "block";
    return "Invalid CVC format (use 3 digits)";
  } else {
    $cvcError = document.querySelector("#cvcError").style.display = "none";
  }
}

// function validateForm(event) {
//   const $form = document.querySelector(".card_form");
//   const $submittedStatus = document.querySelector(".completion-message");
//   const userName = $cardNameInput.value;
//   const cardNumber = $cardNumberInput.value;
//   const YY = $cardYearInput.value;
//   const MM = $cardMonthInput.value;
//   const CVC = $cardCvcInput.value;

//   const errorName = validateName(userName);
//   const errorCardNumber = validateCardNumber(cardNumber);
//   const errorYear = validateYear(YY);
//   const errorMonth = validateMonth(MM);
//   const errorCVC = validateCVC(CVC);

//   const errors = {
//     name: errorName,
//     "card-number": errorCardNumber,
//     YY: errorYear,
//     MM: errorMonth,
//     CVC: errorCVC,
//   };

//   const noErrors = manageErrors(errors) === 0;
//   if (noErrors) {
//     event.preventDefault();
//   } else {
//     console.log("Form submitted successfully!");
//     $form.classList.add("occult");
//     $submittedStatus.classList.remove("occult");
//     event.preventDefault();
//   }
// }




function validateForm(event) {
  const $submittedStatus = document.querySelector(".completion-message");
  const userName = $form.name.value;
  const cardNumber = $form["card-number"].value;
  const YY = $form.YY.value;
  const MM = $form.MM.value;
  const CVC = $form.CVC.value;

  const errorName = validateName(userName);
  const errorCardNumber = validateCardNumber(cardNumber);
  const errorYear = validateYear(YY);
  const errorMonth = validateMonth(MM);
  const errorCVC = validateCVC(CVC);

  const errors = {
    name: errorName,
    "card-number": errorCardNumber,
    YY: errorYear,
    MM: errorMonth,
    CVC: errorCVC,
  };

  const noErrors = manageErrors(errors) === 0;

  if (noErrors) {
    console.log("Successfully submitted!");
    $form.classList.add('occult'); // Add 'occult' class to hide the form
    $submittedStatus.classList.remove('occult'); // Remove 'occult' class to show the completion message
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
      $form[key].className = "error";
      $nameErrorText.textContent = errors.name;
      $cardNumberErrorText.textContent = errors["card-number"];
      $MMerrorText.textContent = errors.MM;
      $YYerrorText.textContent = errors.YY;
      $cvcErrorText.textContent = errors.CVC;
    } else {
      $form[key].className = "";
    }
  });

  return numberOfErrors;
}


function writeTextCard() {
  const nameFrontCard = document.querySelector(".card_name");
  const numberFrontCard = document.querySelector(".card_number");
  const monthFrontCard = document.querySelector(".MM-date");
  const yearFrontCard = document.querySelector(".YY-date");
  const numberBackCard = document.querySelector(".card_cvc");

  $cardNameInput.addEventListener("input", () => {
    nameFrontCard.innerText = $cardNameInput.value;

    if ($cardNameInput.value === "") {
      nameFrontCard.innerText = "Jane Appleseed";
    }
  });

  $cardNumberInput.addEventListener("input", () => {
    numberFrontCard.innerText = $cardNumberInput.value;

    if ($cardNumberInput.value === "") {
      numberFrontCard.innerText = "0000 0000 0000 0000";
    }
  });

  $cardNumberInput.addEventListener("keyup", function (e) {
    e.target.value = e.target.value
      .replace(/[\s]/g, "")
      .replace(/(.{4})/g, "$1 ")
      .trim();
  });

  $cardMonthInput.addEventListener("input", () => {
    monthFrontCard.innerText = $cardMonthInput.value;

    if ($cardMonthInput.value === "") {
      monthFrontCard.innerText = "00";
    }
  });

  $cardYearInput.addEventListener("input", () => {
    yearFrontCard.innerText = $cardYearInput.value;

    if ($cardYearInput.value === "") {
      yearFrontCard.innerText = "00";
    }
  });

  $cardCvcInput.addEventListener("keyup", () => {
    numberBackCard.innerText = $cardCvcInput.value;

    if ($cardCvcInput.value === "") {
      numberBackCard.innerText = "000";
    }
  });
}

writeTextCard();


$form.onsubmit = validateForm;
$buttonContinue.onclick = function () {
  location.reload();
};


