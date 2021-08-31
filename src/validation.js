emptyCart();

function emptyCart() {
    localStorage.setItem('data', '[]')
  }

var products = localStorage.getItem('data')
var oldInfo = localStorage.getItem('dataInfo')

var fullData = {
contact : oldInfo,
products : products
}

// display orderId from API
var orderId = localStorage.getItem('orderId')
document.getElementById("orderId").innerText = orderId;

// display total 
var totalValidationPage = JSON.parse(localStorage.getItem('total'))
document.getElementById("totalValidationPage").innerText = totalValidationPage;

