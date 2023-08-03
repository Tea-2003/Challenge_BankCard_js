function confirmBtn() {
    // Lấy giá trị từ các trường thông tin thẻ tín dụng
    const cardholderName = document.getElementById("name").value.trim();
    const cardNumber = document.getElementById("cardNumber").value.trim();
    const expirationMonth = document.getElementById("MM").value.trim();
    const expirationYear = document.getElementById("YY").value.trim();
    const cvc = document.getElementById("CVC").value.trim();
  
    // Kiểm tra xem các trường thông tin có hợp lệ hay không
    if (cardholderName === "") {
      showError("Please enter cardholder name.");
      return;
    }
  
    if (!validateCardNumber(cardNumber)) {
      showError("Invalid card number.");
      return;
    }
  
    if (!validateExpirationDate(expirationMonth, expirationYear)) {
      showError("Invalid expiration date.");
      return;
    }
  
    if (!validateCVC(cvc)) {
      showError("Invalid CVC.");
      return;
    }
  
    // Nếu thông tin thẻ hợp lệ, ẩn form và hiển thị completion-message
    document.querySelector('.form').style.display = 'none';
    document.querySelector('.completion-message').style.display = 'block';
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

  // Hàm hiển thị thông báo lỗi
  function showError(errorMessage) {
    const errorNoteElements = document.querySelectorAll(".form-field_note-invalid");
    errorNoteElements.forEach((element) => {
      element.textContent = errorMessage;
    });
  }
  
  // Hàm kiểm tra tính hợp lệ của số thẻ tín dụng
  function validateCardNumber(cardNumber) {
    const cardNumberPattern = /^[0-9]{16}$/;
    return cardNumberPattern.test(cardNumber);
  }
  
  // Hàm kiểm tra tính hợp lệ của ngày hết hạn
  if (
    name_field.value !== '' &&
    num_field.value.length === 16 &&
    month_field.value !== '' &&
    month_field.value !== '00' &&
    year_field.value !== '' &&
    year_field.value !== '00' &&
    cvc_field.value.length === 3 &&
    cvc_field.value !== '000' &&
    inputMonth >= 1 &&
    inputMonth <= 12 &&
    inputYear > 0
    ) {
    document.querySelector('.form').style.display = 'none';
    document.querySelector('.completion-message').style.display = 'flex';
    
    }
    
  
  // Hàm kiểm tra tính hợp lệ của mã CVC
  function validateCVC(cvc) {
    const cvcPattern = /^[0-9]{3}$/;
    return cvcPattern.test(cvc);
  }
  
  function continueBtn() {
    // Kiểm tra xem các trường thông tin có hợp lệ hay không trước khi chuyển trang
    const cardholderName = document.getElementById("name").value.trim();
    const cardNumber = document.getElementById("cardNumber").value.trim();
    const expirationMonth = document.getElementById("MM").value.trim();
    const expirationYear = document.getElementById("YY").value.trim();
    const cvc = document.getElementById("CVC").value.trim();
  
    if (cardholderName === "" || !validateCardNumber(cardNumber) || !validateExpirationDate(expirationMonth, expirationYear) || !validateCVC(cvc)) {
      // Nếu các thông tin không hợp lệ, hiển thị lỗi và không chuyển trang
      showError("Please fill in all valid card details.");
    } else {
      // Nếu thông tin hợp lệ, chuyển trang và reset các trường thông tin
      location.reload();
      document.querySelector('.completion-message').style.display = 'none';
      document.querySelector('.form').style.display = 'flex';
    }
  }
  