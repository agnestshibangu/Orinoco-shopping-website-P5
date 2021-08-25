///////////////////// display in cart 

//// set localstorage

// display num of items in cart
let cartNumber = localStorage.getItem('cartNumber');
productNumber = parseInt(cartNumber);
document.getElementById('spanCartNb').innerText = productNumber

displayInCart();
cartIsEmptySign();
deleteItem();

// 

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


// DISPLAY IN CART 

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


      //cartItems.append(item);


      let cartItemNames = document.getElementsByClassName('card-title')
      let cartRowtitle = document.getElementsByClassName('item-title')
      if (cartItemNames == cartRowtitle) {
        alert('Item is already added to the cart')

      }

    }

  }



}

// REMOVE ITEM FROM CART

function deleteItem() {

  let removeButtons = document.getElementsByClassName('btn-warning')

  for (let i = 0; i < removeButtons.length; i++) {
    let button = removeButtons[i]
    console.log(i)

    button.addEventListener('click', function (event) {


      // on recupère le nom de l'item //  
      let name = event.target.parentElement.children[1].textContent
      console.log(name)

      let buttonClicked = event.target;
      buttonClicked.parentElement.parentElement.remove()

      let oldData = JSON.parse(localStorage.getItem('data'));
      console.log(oldData)

      /////////// on enlève l'objet à la liste //////////

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

////////// CART TOTAL /////////

function updateCartTotal() {
  const cartItemsContainer = document.getElementById('items-container')
  const cartRows = cartItemsContainer.getElementsByClassName("item-card")
  let total = 0
  let quantity = 1
  for (let i = 0; i < cartRows.length; i++) {
    let cartRow = cartRows[i]
    let priceElement = cartRow.getElementsByClassName('price')[0]
    // quantityElement = cartRow.getElementsByClassName('quantity')[0]
    let price = parseFloat(priceElement.innerText.replace('€', ''))
    //var quantity = quantityElement.value
    total = total + (price * quantity)
  }

  document.getElementById('box-price').innerText = "TOTAL  € " + total
}


function ready() {
  let removeCartItemButtons = document.getElementsByClassName('btn-warning')

  for (let i = 0; i < removeCartItemButtons.length; i++) {
    var btn = removeCartItemButtons[i]
    btn.addEventListener('click', removeCartItem)
  }
  let quantityInputs = document.getElementsByClassName("quantity")
  for (let i = 0; i < quantityInputs.length; i++) {
    let input = quantityInputs[i]
    input.addEventListener('change', quantityChanged)
  }


}

/**
 * Remove cart item...
 * @param {event} event - Un event de click sur un bouton
 */

function removeCartItem(event) {
  let buttonClicked = event.target
  buttonClicked.parentElement.remove()

  updateCartTotal()
  cartNumbers()
}

function cartNumbers() {

  let productNumbers = localStorage.getItem('cartNumber');

  productNumbers = parseInt(productNumbers);

  if (productNumbers) {
    localStorage.setItem('cartNumber', productNumbers - 1);
    document.getElementById('spanCartNb').innerText = productNumbers - 1;

  }

  console.log('minus one')
}


function quantityChanged(event) {
  let input = event.target
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1
  }
  updateCartTotal()

}


updateCartTotal();
ready();

/////////////////////////// SUPPRESS DATA


//////////////////////// validation email ///////////////////



//////////////////////// validation email ///////////////////



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

  // firstName

  if (!firstName.value.match(letters) || firstName.value == null || firstName.value.length <= 3) {
    alert("error : First name value can't be null and must contain letters only !")
    e.preventDefault()
  }

  // // lastName 

  if (!lastName.value.match(letters) || lastName.value == null || lastName.value.length <= 3) {
    alert("error : Last name value can't be null and must contain letters only !")
    e.preventDefault()
  }


  // // Nom de rue 
  if (!NameAd.value.match(letters) || NameAd.value == null || NameAd.value.length <= 3) {
    alert("error : First name value can't be null mus and must contain letters only !")
    e.preventDefault()
  }

  // // Ville
  if (!city.value.match(letters) || city.value == null || city.value.length <= 3) {
    alert("error : City value can't be null must and must contain letters only !")
    e.preventDefault()
  }

  // email 

  if (!email.value.match(emailReg)) {
    alert("error : First name value can't be null and must contain letters only !")
    e.preventDefault()
  }

  // if (localStorage.getItem('data', '[]')) {
  //   alert("error : Your cart is empty !")
  //   e.preventDefault()
  //   return
  // }


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

 

  // on ajoute le nouvel objet au tableau d'item
  localStorage.setItem('dataInfo', JSON.stringify(objInfo))

  var products = JSON.parse(localStorage.getItem('data'))
  console.log(products)

  var productsPost = []
  products.forEach(element => productsPost.push(element.id));
  console.log(productsPost)
  
  var fullData = {
    contact: objInfo,
    products: productsPost,
  }

  console.log(fullData)
  console.log(typeof (fullData))

  


  /// fetch post request
  console.log(JSON.stringify(fullData))
  fetch('http://localhost:3000/api/cameras/order', {
    method: 'POST',
    body: JSON.stringify(fullData),
    headers: { "Content-type": "application/json" },
  })
    .then(response => response.json())
    .then(function (data) {

      console.log(data.orderId)
      localStorage.setItem('orderId', data.orderId)


    })

    .catch((error) => {
      alert(error)
    });



});