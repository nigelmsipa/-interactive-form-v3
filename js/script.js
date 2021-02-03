/** @format */
/////////////////////////// global VARIABLES
const jobRoleSelect = document.getElementById('title');
const designSelect = document.getElementById('design');
const colorSelect = document.querySelector('#color');

const RegisterforActivities = document.getElementById('activities');
const activityCostHTML = document.getElementById('activities-cost');
const activityCheckBoxes = document.querySelectorAll('#activities input');
let totalCost = 0;

let payment = document.getElementById('payment');
let creditCard = document.querySelector('#credit-card');
let paypal = document.querySelector('#paypal');
let bitcoin = document.querySelector('#bitcoin');
const creditCardBox = document.querySelector('.credit-card-box');

const form = document.getElementById('form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const creditCardNumberInput = document.getElementById('cc-num'); //
const cvvNumberInput = document.getElementById('cvv');
const zipcodeInput = document.getElementById('zip');
const nameError = document.getElementById('name-hint');
const emailError = document.getElementById('email-hint'); //error message for email
const ccError = document.getElementById('cc-hint'); //error message for credit card
const zipError = document.getElementById('zip-hint'); //error message for zip
const cvvError = document.getElementById('cvv-hint'); //error message for cvv
const cvvErrortwo = document.getElementById('cvv-hint-two'); //error message for cvv
///////////////////////////////// onload functions
window.onload = function () {
  //The "Name" field focus attrubute is true onload
  document.getElementById('name').focus();
  //"Job Role" section is hidden onload
  document.getElementById('other-job-role').style.display = 'none';
  // color selection is disabled onload
  colorSelect.disabled = true;
  //   select the credit card to be defual payment method on load
  payment[1].selected = true;
  paypal.style.display = 'none';
  bitcoin.style.display = 'none';
};

///////////////////////////////// job Role selection
jobRoleSelect.addEventListener('change', (e) => {
  //   "Job Role" section is displayed when user selects other
  if (e.target.value === 'other') {
    document.getElementById('other-job-role').style.display = 'block';
  }
  //   "Job Role" section is hidden when user selects anything not other
  if (e.target.value !== 'other') {
    document.getElementById('other-job-role').style.display = 'none';
  }
});

///////////////////////////////// T shirt info
designSelect.addEventListener('change', (e) => {
  //when user selects a design the color option is available

  colorSelect.disabled = false;
  //   T-Shirt Info" section conditionals that determine which options should be selectable
  // NOT DRY I :( I decided to brute force this step and refactor it later

  for (let i = 0; i < colorSelect.length; i++) {
    colorSelect[i].style.display = 'none';
    if (
      e.target.value === 'heart js' &&
      colorSelect[i].getAttribute('data-theme') === 'heart js'
    ) {
      colorSelect[i].style.display = 'block';
    }
    if (
      e.target.value === 'js puns' &&
      colorSelect[i].getAttribute('data-theme') === 'js puns'
    ) {
      colorSelect[i].style.display = 'block';
    }
  }
});

///////////////////////////////// Register for Activities adding totals  *
RegisterforActivities.addEventListener('change', (e) => {
  let clicked = e.target;
  let clickedcost = +clicked.getAttribute('data-cost');
  let clickedType = clicked.getAttribute('data-day-and-time');

  if (clicked.checked) {
    totalCost += clickedcost;
    activityCostHTML.innerHTML = totalCost;
  } else {
    totalCost -= clickedcost;
  }
  activityCostHTML.innerHTML = `<p>$${totalCost}</p>`;

  //prevent user from selecting conflicting events
  for (let i = 0; i < activityCheckBoxes.length; i++) {
    let checkboxType = activityCheckBoxes[i].getAttribute('data-day-and-time');
    if (checkboxType === clickedType && clicked !== activityCheckBoxes[i]) {
      if (clicked.checked) {
        activityCheckBoxes[i].disabled = true;
      } else {
        activityCheckBoxes[i].disabled = false;
      }
    }
  }
});

///////////////////////////////// Payment info section dynamic uI display based on user interaction  *
payment.addEventListener('change', (e) => {
  paypal.style.display = 'none';
  bitcoin.style.display = 'none';
  creditCard.style.display = 'none';

  let clicked = e.target.value;
  if (clicked === 'credit-card') {
    creditCard.style.display = 'block';
  }
  if (clicked === 'paypal') {
    paypal.style.display = 'block';
  }
  if (clicked === 'bitcoin') {
    bitcoin.style.display = 'block';
  }
});

////////////////////////////////////////// form Validation preventing users from submitting falty input  *
form.addEventListener('submit', (e) => {
  //   The "Register for Activities" section must have at least one activity selected.
  const activityError = document.getElementById('activities-hint'); //error message for activities

  function valcheckBox() {
    var isChecked = false;
    for (var i = 0; i < activityCheckBoxes.length; i++) {
      if (activityCheckBoxes[i].checked) {
        isChecked = true;
        activityError.style.display = 'none';
      }
    }
    if (!isChecked) {
      RegisterforActivities.classList.add('not-valid');
      RegisterforActivities.classList.remove('valid');
      e.preventDefault();
      activityError.style.display = 'block';
    } else {
      RegisterforActivities.classList.add('valid');
      RegisterforActivities.classList.remove('not-valid');
    }
  }
  valcheckBox();

  if (nameInput.value.length === 0) {
    nameInput.parentElement.classList.add('not-valid');
    nameInput.parentElement.classList.remove('valid');
    nameError.style.display = 'block';
    e.preventDefault();
  }
  // The "Email Address" field must contain a validly formatted email address.
  let EmailValidation = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    emailInput.value
  );

  if (!EmailValidation) {
    emailInput.parentElement.classList.add('not-valid');

    emailError.style.display = 'block';

    e.preventDefault();
  }
  //   If and only if credit card is the selected payment method:
  if (payment.value === 'credit-card') {
    //   The "Card number" field must contain a 13 - 16 digit credit card number wit
    let creditCardNumberValidation = /^\d{13,16}$/.test(
      creditCardNumberInput.value
    );

    if (!creditCardNumberValidation) {
      e.preventDefault();
      creditCardNumberInput.parentElement.classList.add('not-valid');
      creditCardNumberInput.parentElement.classList.remove('valid');
      ccError.style.display = 'block';
    }

    //   The "Zip code" field must contain a 5 digit number.
    let zipCodeValidation = /^[0-9][0-9][0-9][0-9][0-9]$/.test(
      zipcodeInput.value
    );

    if (!zipCodeValidation) {
      e.preventDefault();
      zipcodeInput.parentElement.classList.add('not-valid');
      zipcodeInput.parentElement.classList.remove('valid');
      zipError.style.display = 'block';
    }

    let cvvValidation = /^[0-9][0-9][0-9]$/.test(cvvNumberInput.value);

    if (!cvvValidation) {
      e.preventDefault();
      cvvNumberInput.parentElement.classList.add('not-valid');
      cvvNumberInput.parentElement.classList.remove('valid');
      cvvError.style.display = 'block';
    }
  }
});
////////////////////////////////////////////////////////// Validation

// live name input validation The "Name" field cannot be blank or empty.
nameInput.addEventListener('keyup', (e) => {
  const nameError = document.getElementById('name-hint'); //error message for name

  if (nameInput.value) {
    nameInput.parentElement.classList.add('valid');
    nameInput.parentElement.classList.remove('not-valid');
    nameError.style.display = 'none';
  }
  if (nameInput.value.length === 0) {
    nameInput.parentElement.classList.add('not-valid');
    nameInput.parentElement.classList.remove('valid');
    nameError.style.display = 'block';
  }
});

// Live emailInput validation The "Email Address" field must contain a validly formatted email address.
emailInput.addEventListener('keyup', (e) => {
  const emailError = document.getElementById('email-hint'); //error message for email

  let EmailValidation = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    emailInput.value
  );
  if (EmailValidation) {
    emailInput.parentElement.classList.add('valid');
    emailInput.parentElement.classList.remove('not-valid');
    emailError.style.display = 'none';
  }
  if (!EmailValidation) {
    emailInput.parentElement.classList.add('not-valid');
    emailInput.parentElement.classList.remove('valid');
    emailError.style.display = 'block';
  }
});

// Live credit card validation
creditCardBox.addEventListener('keyup', (e) => {
  const ccError = document.getElementById('cc-hint'); //error message for credit card
  const zipError = document.getElementById('zip-hint'); //error message for zip
  const cvvError = document.getElementById('cvv-hint'); //error message for cvv

  //   The "Card number" field must contain a 13 - 16 digit credit card number wit
  let creditCardNumberValidation = /^\d{13,16}$/.test(
    creditCardNumberInput.value
  );
  if (creditCardNumberValidation) {
    creditCardNumberInput.parentElement.classList.add('valid');
    creditCardNumberInput.parentElement.classList.remove('not-valid');
    ccError.style.display = 'none';
  }
  if (!creditCardNumberValidation) {
    creditCardNumberInput.parentElement.classList.add('not-valid');
    creditCardNumberInput.parentElement.classList.remove('valid');
    ccError.style.display = 'block';
  }

  //   The "Zip code" field must contain a 5 digit number.
  let zipCodeValidation = /^[0-9][0-9][0-9][0-9][0-9]$/.test(
    zipcodeInput.value
  );
  if (zipCodeValidation) {
    zipcodeInput.parentElement.classList.add('valid');
    zipcodeInput.parentElement.classList.remove('not-valid');
    zipError.style.display = 'none';
  }
  if (!zipCodeValidation) {
    zipcodeInput.parentElement.classList.add('not-valid');
    zipcodeInput.parentElement.classList.remove('valid');
    zipError.style.display = 'block';
  }
  //   The "CVV" field must contain a 3 digit number.
  let cvvValidation = /^[0-9][0-9][0-9]$/.test(cvvNumberInput.value);
  let cvvValidation2 = /^\D/.test(cvvNumberInput.value);
  if (cvvValidation) {
    cvvNumberInput.parentElement.classList.add('valid');
    cvvNumberInput.parentElement.classList.remove('not-valid');
    cvvError.style.display = 'none';
  }
  if (!cvvValidation && !cvvValidation2) {
    cvvNumberInput.parentElement.classList.add('not-valid');
    cvvNumberInput.parentElement.classList.remove('valid');
    cvvError.style.display = 'block';
    cvvErrortwo.style.display = 'none';
  }
  if (!cvvValidation && cvvValidation2) {
    cvvNumberInput.parentElement.classList.add('not-valid');
    cvvNumberInput.parentElement.classList.remove('valid');
    cvvErrortwo.style.display = 'block';
  }
});

///// Accessibility focus

activityCheckBoxes.forEach((element) => {
  element.addEventListener('focus', function () {
    element.parentElement.classList.add('focus');
  });
  element.addEventListener('blur', function () {
    element.parentElement.classList.remove('focus');
  });
});
