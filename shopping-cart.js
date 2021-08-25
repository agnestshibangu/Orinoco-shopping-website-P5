///////////////////// display in cart 

//// set localstorage

// display num of items in cart
let cartNumber = localStorage.getItem('cartNumber');
productNumber = parseInt(cartNumber);
document.getElementById('spanCartNb').innerText = productNumber

displayInCart();

function emptyCart() {
  alert ('thank you for spending your money')
  localStorage.setItem('data', '[]')
  window.location.reload()

}



function displayInCart() {

  let objItem = JSON.parse(localStorage.getItem('data'));
 
  for (var i = 0; i < objItem.length; i++) {
 

  var data = JSON.parse(objItem[i]);
 

  if (data) {
    var cartRow = document.createElement('div');
    var cartItems = document.getElementById('items-container');

    const item = document.getElementById('item-card')
    const templateAdd = document.getElementById('template')
    const cloneAdd = document.importNode(templateAdd.content, true)
    cloneAdd.getElementById('item-name').textContent = data.name
    cloneAdd.getElementById('price').textContent = data.price
    // cloneAdd.getElementById('number').textContent = data.quantity
    cloneAdd.getElementById('img-cart').src = data.imageUrl
    document.getElementById('item').appendChild(cloneAdd)

  
    cartItems.append(item);

       
    var cartItemNames = document.getElementsByClassName('card-title')
    var cartRowtitle = document.getElementsByClassName('item-title')
             if (cartItemNames == cartRowtitle) {
                 alert('Item is already added to the cart')
    
            }

        }

    }

    

}







var removeButtons = document.getElementsByClassName('btn-warning')

for( var i=0; i < removeButtons.length; i++) {
var button = removeButtons[i]
console.log(i)

button.addEventListener('click', function(event) {


  emptyCart()

    // on recupère le nom de l'item //  
    let name = event.target.parentElement.children[1].textContent
    console.log(name)

    let buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove()

    let oldData = JSON.parse(localStorage.getItem('data'));
    console.log(oldData)

    /////////// on enlève l'objet à la liste //////////

    for (var i = oldData.length - 1; i >= 0; i--) {

   
      if ( JSON.parse(oldData[i]).name === name ) { 
          console.log(oldData[i].name) 
          oldData.splice(i, 1);
         }
  
    localStorage.setItem('data', JSON.stringify(oldData))
    console.log(oldData)
    window.location.reload()

        }
    })
}


////////// CART TOTAL /////////

function updateCartTotal() {
  const cartItemsContainer = document.getElementById('items-container')
  const cartRows = cartItemsContainer.getElementsByClassName("item-card")
  var total = 0
  var quantity = 0
  for (var i = 0; i < cartRows.length; i++) {
      var cartRow = cartRows[i]
      var priceElement = cartRow.getElementsByClassName('price')[0]
      var quantityElement = cartRow.getElementsByClassName('quantity')[0]
      var price = parseFloat(priceElement.innerText.replace('€', ''))
      // var quantity = quantityElement.value
      total = total + (price * quantity)
     
  }
 
 
  document.getElementById('box-price').innerText = "TOTAL  € " + total
}


function ready() {
  var removeCartItemButtons = document.getElementsByClassName('btn-warning')
 
  for (var i = 0; i < removeCartItemButtons.length; i++) {
      var btn = removeCartItemButtons[i]
      btn.addEventListener('click', removeCartItem) 
  }
  var quantityInputs = document.getElementsByClassName("quantity")
  for (var i = 0; i < quantityInputs.length; i++) {
      var input = quantityInputs[i]
      input.addEventListener('change', quantityChanged)
  }

}

function removeCartItem(event) {
  var buttonClicked = event.target
  buttonClicked.parentElement.remove()

  updateCartTotal()
  cartNumbers()
}

function cartNumbers() {

 let productNumbers = localStorage.getItem('cartNumber');
    
    productNumbers = parseInt(productNumbers);
   
    if (productNumbers) {
        localStorage.setItem('cartNumber', productNumbers -1);
        document.getElementById('spanCartNb').innerText = productNumbers -1 ;
     
    } 

    console.log('minus one')
}


function quantityChanged(event) {
    var input = event.target
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

    if (!email.value.match(letters) || email.value == null || email.value.length <= 3) {
      alert("error : email value can't be null must and must contain letters only !")   
      e.preventDefault()
   
    }

    if(localStorage.getItem('dataInfo') == null) {
      localStorage.setItem('dataInfo','[]')
     }

      var objInfo = {
        firstName : firstName.value,
        lastName : lastName.value,
        address : NameAd.value,
        city : city.value,
        email : email.value
    }

   // on passe le nouvel objet en string au format JSON
    var newInfo = JSON.stringify(objInfo)

   // on ajoute le nouvel objet au tableau d'item
    var oldInfo = JSON.parse(localStorage.getItem('dataInfo'));
    oldInfo.push(newInfo)

    // on sauvegarde le tableau actualisé
    localStorage.setItem('dataInfo', JSON.stringify(oldInfo))


// on récupère le tableau de produit 
 var products = JSON.parse(localStorage.getItem('data'))

// on le convertie en un tableau de string 
 var productsPost = []
 console.log(products)
 products.forEach(element =>  productsPost.push(JSON.parse(element).id));
 console.log(productsPost)

// on récupère le tableau de contact 
 var parseOldInfo = JSON.parse(localStorage.getItem('dataInfo'))

 // vérification du type de contact = c'est un objet
 console.log(typeof parseOldInfo)

 
 var fullData = {
 contact :  objInfo,
 products : productsPost,
 }

// // var completeData = JSON.stringify(fullData)

 console.log(fullData)
 console.log(typeof(fullData))




   /// fetch post request
   console.log(JSON.stringify(fullData))
   fetch('http://localhost:3000/api/cameras/order', {
     method: 'POST',
     body: JSON.stringify(fullData),
     headers : {"Content-type" : "application/json"},    
     })    
     .then(response => response.json())
     .then(function(data) {       
      
         console.log(data.orderId)
         localStorage.setItem('orderId', data.orderId)
       
                        
     })
    
     .catch((error) => {
         alert(error)
     });

 
    
 });