

function emptyCart() {
    localStorage.setItem('data', '[]')
  }

emptyCart();

var products = localStorage.getItem('data')
console.log(products)

var oldInfo = localStorage.getItem('dataInfo')
console.log(oldInfo)


var fullData = {
contact : oldInfo,
products : products
}

console.log(fullData)
console.log(JSON.stringify(fullData))

var orderId = localStorage.getItem('orderId')
console.log(orderId)

document.getElementById("orderId").innerText = orderId;

var totalValidationPage = JSON.parse(localStorage.getItem('total'))
document.getElementById("totalValidationPage").innerText = totalValidationPage;

