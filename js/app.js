const title = $('#title');
const theme = $('#design')
let cost = 0;

$('#name').focus();
$('#other').addClass('hide');
//job title 'other' create text area
title.change(function() {
  let titleValue = title.val();
  if(titleValue === "other") {
    console.log('yes');
    $('#other').removeClass('hide').addClass('show');
    $('#job').focus();
  }
});

//T-shirt design & Options
theme.change(function(){
  $('#color').children().show();
  const design = theme.val();
  if(design === 'js puns') {
    $('.heart').hide();
  }else if(design === 'heart js') {
    $('.pun').hide();
    $('#color option:contains("Tomato")').prop('selected',true);
  }
})

let design = $('#design').val();
$('#colors-js-puns').addClass('hide');
$('#design').change(function() {
  design = $('#design').val();
  console.log(design);
  if(design === 'Select Theme') {
    $('#colors-js-puns').addClass('hide');
  } else {
    $('#colors-js-puns').removeClass('hide');
  }
})
//schedule Options
const main = $("[name='all']");
const frame = $("[name='js-frameworks']");
const libs = $("[name='js-libs']");
const express = $("[name='express']");
const node = $("[name='node']");
const build = $("[name='build-tools']");
const npm = $("[name='npm']");

main.change(function() {
  if(main.is(':checked')) {
    cost += 200;
    showCost()
  } else {
    cost -= 200;
    showCost()
  }
})
frame.change(function() {
  if(frame.is(':checked')) {
    cost += 100;
    express.parent().addClass('not-available');
    express.prop('disabled', true);
    showCost()
  }
  else {
   cost -= 100;
   express.parent().removeClass('not-available');
   express.prop('disabled', false);
   showCost()
 }
})
libs.change(function() {
  if(libs.is(':checked')) {
    cost += 100;
    node.parent().addClass('not-available');
    node.prop('disabled', true);
    showCost()
  } else {
    cost -= 100;
    node.parent().removeClass('not-available');
    node.prop('disabled', false);
    showCost()
  }
})
express.change(function() {
  if(express.is(':checked')) {
    cost += 100;
    frame.parent().addClass('not-available');
    frame.prop('disabled', true);
    showCost()
  } else {
    cost -= 100;
    frame.parent().removeClass('not-available');
    frame.prop('disabled', false);
    showCost()
  }
})
node.change(function() {
  if(node.is(':checked')) {
    cost += 100;
    libs.parent().addClass('not-available');
    libs.prop('disabled', true);
    showCost()
  } else {
    libs.parent().removeClass('not-available');
    libs.prop('disabled', false);
    cost -= 100;
    showCost()
  }
})
build.change(function() {
  if(build.is(':checked')) {
    cost += 100;
    showCost()
  } else {
    cost -= 100;
    showCost()
  }
})
npm.change(function() {
  if(npm.is(':checked')) {
    cost += 100;
    showCost()
    } else {
      cost -= 100;
      showCost()
    }
})

//Total cost
$('.activities').append('<br>');

function showCost() {
  $('.cost').remove();
  $('.activities').append('<h2 class="cost">$' + cost + '</h2>');
}

//Payment method
let paymentSelect = $('#payment')

function hidePayment() {
  $('#credit-card').addClass('hide');
  $('#paypal').addClass('hide');
  $('#bitcoin').addClass('hide');
}

function setPayment() {
  $('#credit-card').removeClass('hide');
  $('option[value="credit card"]').prop('selected',true);
  $('#paypal').addClass('hide');
  $('#bitcoin').addClass('hide');
}

setPayment()
paymentSelect.change(function() {
  hidePayment()
  if(paymentSelect.val() === 'bitcoin') {
    $('#bitcoin').removeClass('hide');
  }else if(paymentSelect.val() === 'paypal') {
    $('#paypal').removeClass('hide');
  }else if(paymentSelect.val() === 'credit card') {
    $('#credit-card').removeClass('hide');
  }
})

//Form submit


 $('#mail').keyup(function() {

  if(isValidEmailAddress($('#mail').val()) === false){
  $('label[for="mail"]').addClass('fail-label');
  }else {
  $('label[for="mail"]').removeClass('fail-label');
  }
})

$('button[type="submit"]').click(function(e) {
  let atLeastOneIsChecked = $('input:checkbox:checked').length > 0;
  let credit = paymentSelect.val();
  if($('#name').val() === '') {
    e.preventDefault();
    $('#name').addClass('fail');
  }else {
    $('#name').removeClass('fail');
  }
  if(isValidEmailAddress($('#mail').val()) === false){
    e.preventDefault();
    $('#mail').addClass('fail');
  }else {
    $('#mail').removeClass('fail');
  }
  if(atLeastOneIsChecked === false) {
    alert("Check At Least 1 Activity");
    e.preventDefault();
  }
  if(credit === 'credit card'){
    if($('#cc-num').val().length < 13 || $('#cc-num').val().length > 16) {
      e.preventDefault();
      $('#cc-num').addClass('fail');
      $('#submit').prepend('<br><p class="error">Check yo cc numba foo, must be between 13 & 16 digits</p>');
    } else {
      $('#cc-num').removeClass('fail');
    }
    if($('#zip').val().length != 5) {
      e.preventDefault();
      $('#zip').addClass('fail');
    } else {
      $('#zip').removeClass('fail');
    }
    if($('#cvv').val().length != 3) {
      e.preventDefault();
      $('#cvv').addClass('fail');
    } else {
      $('#cvv').removeClass('fail');
    }

  }

})

//Email validator used an outside source. There are so many options for email addresses, I didn't want to limit myself to a string with an @ and a . in it.
function isValidEmailAddress(emailAddress) {
    var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
    return pattern.test(emailAddress);
}
