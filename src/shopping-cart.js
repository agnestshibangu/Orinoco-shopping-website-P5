displayInCart();
cartIsEmptySign();
deleteItem();
updateCartTotal();

// if cart is empty display "empty cart" panel in html
function cartIsEmptySign() {

  let x = document.getElementById("pop-up-cart-empty")
  let cart = JSON.parse(localStorage.getItem('data'))
  console.log(cart.length)
  console.log(cart)

  if ((cart == undefined) || (cart.length == 0)) {
    x.style.display = "block"
  } else {
    x.style.display = "none";
  }
}

// display items in cart
function displayInCart() {

  let objItem = JSON.parse(localStorage.getItem('data'));

  for (let i = 0; i < objItem.length; i++) {
    let data = objItem[i];

    if (data) {
      const templateAdd = document.getElementById('template')
      const cloneAdd = document.importNode(templateAdd.content, true)
      cloneAdd.getElementById('item-name').textContent = data.name
      cloneAdd.getElementById('price').textContent = data.price
      cloneAdd.getElementById('img-cart').src = data.imageUrl
      document.getElementById('item').appendChild(cloneAdd)

      let cartItemNames = document.getElementsByClassName('card-title')
      let cartRowtitle = document.getElementsByClassName('item-title')
      if (cartItemNames == cartRowtitle) {
        alert('Item is already added to the cart')

      }

    }

  }

}

// remove item from html and localStorage
function deleteItem() {

  let removeButtons = document.getElementsByClassName('btn-warning')

  for (let i = 0; i < removeButtons.length; i++) {
    let button = removeButtons[i]
    console.log(i)

    button.addEventListener('click', function (event) {

      let name = event.target.parentElement.children[1].textContent

      let buttonClicked = event.target;
      buttonClicked.parentElement.parentElement.remove()

      let oldData = JSON.parse(localStorage.getItem('data'));

      for (let i = oldData.length - 1; i >= 0; i--) {


        if (oldData[i].name === name) {
          console.log(oldData[i].name)
          oldData.splice(i, 1);
        }

        localStorage.setItem('data', JSON.stringify(oldData))
        window.location.reload()

      }

      updateCartTotal();


    })
  }

}

// update cart total
function updateCartTotal() {
  const cartItemsContainer = document.getElementById('items-container')
  const cartRows = cartItemsContainer.getElementsByClassName("item-card")
  let total = 0
  let quantity = 1
  for (let i = 0; i < cartRows.length; i++) {
    let cartRow = cartRows[i]
    let priceElement = cartRow.getElementsByClassName('price')[0]
    let price = parseFloat(priceElement.innerText.replace('€', ''))
    total = total + (price * quantity)
  }

  document.getElementById('box-price').innerText = "TOTAL  € " + total
  totalPriceLocalStorage()
}

// return updated cart total in localStorage
function totalPriceLocalStorage() {
  let total = document.getElementById('box-price').innerText
  let totalArray = []
  totalArray.push(total)
  localStorage.setItem('total', JSON.stringify(totalArray))
}



////////////// FORM //////////////


const titre = document.getElementById("titreH3")
const firstName = document.getElementById('firstName')
const lastName = document.getElementById('LastName')
const NameAd = document.getElementById('NameAd')
const city = document.getElementById('city')
const email = document.getElementById('email')
const form = document.getElementById('form')


form.addEventListener('submit', async (e) => {

  let emailReg = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+[a-zA-Z0-9-]+)/
  var letters = /^[A-Za-z]+$/;
  var numbers = /^[0-9]+$/;


  if (!firstName.value.match(letters) || firstName.value == null || firstName.value.length <= 3) {
    alert("error : First name value can't be null and must contain letters only !")
    e.preventDefault()
  }


  if (!lastName.value.match(letters) || lastName.value == null || lastName.value.length <= 3) {
    alert("error : Last name value can't be null and must contain letters only !")
    e.preventDefault()
  }


  if (!NameAd.value.match(letters) || NameAd.value == null || NameAd.value.length <= 3) {
    alert("error : First name value can't be null mus and must contain letters only !")
    e.preventDefault()
  }

  
  if (!city.value.match(letters) || city.value == null || city.value.length <= 3) {
    alert("error : City value can't be null must and must contain letters only !")
    e.preventDefault()
  }


  if (!email.value.match(emailReg)) {
    alert("error : First name value can't be null and must contain letters only !")
    e.preventDefault()
  }


  if (localStorage.getItem('dataInfo') == null) {
    localStorage.setItem('dataInfo', '[]')
  }

  var objInfo = {
    firstName: firstName.value,
    lastName: lastName.value,
    address: NameAd.value,
    city: city.value,
    email: email.value
  }


  localStorage.setItem('dataInfo', JSON.stringify(objInfo))

  var products = JSON.parse(localStorage.getItem('data'))

  var productsPost = []
  products.forEach(element => productsPost.push(element.id));

  var fullData = {
    contact: objInfo,
    products: productsPost,
  }



  /// fetch post request
  fetch('http://localhost:3000/api/cameras/order', {
    method: 'POST',
    body: JSON.stringify(fullData),
    headers: { "Content-type": "application/json" },
  })
  .then(response => response.json())
  .then(function (data) {

  localStorage.setItem('orderId', data.orderId)

 })

  .catch((error) => {
    alert(error)
  });

});