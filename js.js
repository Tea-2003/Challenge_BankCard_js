function continueBtn() {
  location.reload();
  document.querySelector('.completion-message').style.display = 'none'
  document.querySelector('.form').style.display = 'flex'
  
  num_field.value = ''
  name_field.value = ''
  month_field.value = ''
  year_field.value = ''
  cvc_field.value = ''
  
  document.querySelector('.name-warn').style.display = 'none';
  document.querySelector('.number-warn').style.display = 'none';
  document.querySelector('.release-month-year-warn').style.display = 'none';
  document.querySelector('.cvc-warn').style.display = 'none';
  }

  function confirmBtnClick(ev) {

    // Reset error messages
    document.querySelector('.name-warn').style.display = 'none';
    document.querySelector('.number-warn').style.display = 'none';
    document.querySelector('.release-month-year-warn').style.display = 'none';
    document.querySelector('.cvc-warn').style.display = 'none';
    
    // Check name field
    if (name_field.value === '') {
    document.querySelector('.name-warn').style.display = 'initial';
    }
    
    // Check number field
    if (num_field.value === '' || num_field.value.length < 16) {
    document.querySelector('.number-warn').style.display = 'initial';
    } else {
    // Check if the card number is numeric and has 16 digits
    const cardNumber = num_field.value.replace(/\s+/g, ''); // Remove any spaces
    if (isNaN(cardNumber) || cardNumber.length !== 16) {
    document.querySelector('.number-warn').style.display = 'initial';
    }
    }
    
    // Check month field
    const inputMonth = parseInt(month_field.value);
    if (month_field.value === '' || isNaN(inputMonth) || inputMonth < 1 || inputMonth > 12) {
    document.querySelector('.release-month-year-warn').style.display = 'initial';
    } else {
    document.querySelector('.release-month-year-warn').style.display = 'none';
    }
    
    const inputYear = parseInt(year_field.value);
    if (year_field.value === '' || isNaN(inputYear) || inputYear < 1) {
    document.querySelector('.release-month-year-warn').style.display = 'initial';
    } else {
    if (document.querySelector('.release-month-year-warn').style.display !== 'initial') {
    document.querySelector('.release-month-year-warn').style.display = 'none';
    }
    }
    
    // Check CVC field
    if (cvc_field.value === '' || cvc_field.value < 1) {
    document.querySelector('.cvc-warn').style.display = 'initial';
    } else if (cvc_field.value.length < 3) {
    document.querySelector('.cvc-warn').style.display = 'initial';
    }
    
    // Check if all fields are valid, if yes, hide the form and show the completion message
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
    }
    function confirmBtn() {

      document.querySelector('.card_info').style.display = 'none';
      document.querySelector('.completion-message').style.display = 'block';
    }