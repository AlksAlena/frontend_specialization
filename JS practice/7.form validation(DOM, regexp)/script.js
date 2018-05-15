'use strict';

function validateForm(formObject) {
  var form = document.getElementById(formObject.formId);

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    var inputs = form.querySelectorAll('input');
    var inputsList = [].slice.call(inputs);

    var isValideForm = inputsList.every(function (item) {
      checkInput(item);
      if (item.classList.contains(formObject.inputErrorClass)) return false;
      else return true;
    });   

    if (isValideForm) {
      form.classList.add(formObject.formValidClass);
    }
    else form.classList.add(formObject.formInvalidClass);
  });

  form.addEventListener("focus", function () {
    if (event.target.tagName === 'INPUT') {
     if (event.target.classList.contains(formObject.inputErrorClass)) {
      event.target.classList.remove(formObject.inputErrorClass);
     }
    }
  }, true);

  form.addEventListener("blur", function () {   
    if (event.target.tagName === 'INPUT') {
     checkInput(event.target);
    }
  }, true);

  function checkInput(elem) {
    if (!elem.value && elem.dataset.hasOwnProperty('required')) elem.classList.add(formObject.inputErrorClass);
    else if (elem.value) {
      if (elem.dataset.hasOwnProperty('validator')) {
        switch(elem.dataset.validator) {
          case 'letters':
            checkLetters(elem);
            break;
          case 'number':
            checkNumber(elem);
            break;
          case 'regexp':
            checkRegExp(elem);
            break;
          default: return;
        }
      }
    }
  }

  function checkLetters(elem) {
    if(/^[a-zа-я]+/i.test(elem.value)) {
      var result = elem.value.match(/^[a-zа-я]+/i);
    }
    else elem.classList.add(formObject.inputErrorClass);
  }

  function checkNumber(elem) {
    if(/^-?[0-9]+/i.test(elem.value)) {
      var result = elem.value.match(/^-?[0-9]+/i);
      var userNumber = parseInt(result[0], 10);

      if (elem.dataset.hasOwnProperty('validatorMin')) {
        var ageMin = parseInt(elem.dataset.validatorMin, 10);
        if (userNumber < ageMin) elem.classList.add(formObject.inputErrorClass);
        else if (elem.dataset.hasOwnProperty('validatorMax')) {
          var ageMax = parseInt(elem.dataset.validatorMax, 10);
          if (userNumber > ageMax) elem.classList.add(formObject.inputErrorClass);
        }       
      }   
    }
    else elem.classList.add(formObject.inputErrorClass);
  }

  function checkRegExp(elem) {
    var regex = new RegExp(elem.dataset.validatorPattern);
    if(regex.test(elem.value)) {
      var result = elem.value.match(regex);
    }
    else elem.classList.add(formObject.inputErrorClass);
  }

}