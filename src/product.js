let url_product_id = new URLSearchParams(window.location.search);
let _id = url_product_id.get("id");

fetch('http://localhost:3000/api/cameras/' + _id)

    .then((resp) => resp.json())
    .then(function (data) {
        infoProduct(data);
    })

// retreive data
function infoProduct(data) {

    let name = data.name;
    let price = data.price / 100 + '€';
    let description = data.description;
    let imageUrl = data.imageUrl;
    document.getElementById("product-title").innerHTML = name;
    document.getElementById("price").innerHTML = price;
    document.getElementById("imgSrc").src = imageUrl;
    document.getElementById("description").innerHTML = description;

}

// change button appearance when clicked
function shopButtonClicked() {

    let addButtonShop = document.getElementsByClassName('shop-item-button')
    for (let i = 0; i < addButtonShop.length; i++) {
        let button = addButtonShop[i]
        addToCartClicked()
        button.innerHTML = "IN CART"
        button.style.backgroundColor = "#d294e0"

    }
}

// if item is already in the cart, button appearance "in cart"
function inCartButton() {

    let url = window.location;
    let params = (new URL(url)).searchParams;
    let id = params.get('id');

    let oldData = JSON.parse(localStorage.getItem('data')) || [];

    let item = oldData.find(item => item.id === id);

    let addButtonShop = document.getElementsByClassName('shop-item-button')
    for (let i = 0; i < addButtonShop.length; i++) {
        let button = addButtonShop[i]

        if (item) {

            button.innerHTML = "IN CART"
            button.style.backgroundColor = "#d294e0"

        }

    }

}

// function always running to check if the item is in the cart
inCartButton()

// on click, add item to localstorage
function addToCartClicked() {

    const button = event.target;
    let shopItem = button.parentElement;
    let name = document.getElementById('product-title').innerText;
    let price = document.getElementById('price').innerText;
    let imageUrl = document.getElementById('imgSrc').src;
    /// get the item id 
    let url = window.location;
    let params = (new URL(url)).searchParams;
    let id = params.get('id');
    console.log(id)
    /// get the choosen option
    let option = document.getElementById("lense-select").value;
    let quantity = 1;

    let objItem = {
        id: id,
        name: name,
        quantity: quantity,
        price: price,
        description: option,
        imageUrl: imageUrl,
    }

    let oldData = JSON.parse(localStorage.getItem('data')) || [];

    let item = oldData.find(item => item.id === id);

    if (item) {

        alert('item already in cart')

    } else if (item == undefined) {

        oldData.push(objItem)
        console.log(oldData)
        localStorage.setItem('data', JSON.stringify(oldData))

    }

}














