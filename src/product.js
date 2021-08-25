let url_product_id = new URLSearchParams(window.location.search);
let _id = url_product_id.get("id");

fetch('http://localhost:3000/api/cameras/'+ _id)
// fetch('http://localhost:3000/api/cameras/5be1ef211c9d44000030b062')


.then((resp) => resp.json())
.then(function (data) {
    infoProduct(data);

    
})

// display num of items in cart
let cartNumber = localStorage.getItem('cartNumber');
productNumber = parseInt(cartNumber);
document.getElementById('spanCartNb').innerText = productNumber

function infoProduct(data) {

    var name = data.name; 
    var price = data.price/100 + '€';
    var description = data.description;
    var imageUrl = data.imageUrl;

    document.getElementById("product-title").innerHTML = name;
    document.getElementById("price").innerHTML = price;
    document.getElementById("imgSrc").src = imageUrl;
    document.getElementById("description").innerHTML = description;
    
    }


    function shopButtonClicked() {
        var addButtonShop = document.getElementsByClassName('shop-item-button')
        for (var i = 0; i < addButtonShop.length; i++) {
       
        var button = addButtonShop[i]
    
        addToCartClicked()
        button.innerHTML = "IN CART"
        button.style.backgroundColor = "yellow"

        }
   }



 

   
    function addToCartClicked() {

    
       console.log('button SHOP clicked');
       alert("You've added 1 item to the cart ")

       
       const button = event.target;
       var shopItem = button.parentElement;
       var name = document.getElementById('product-title').innerText;
       var price = document.getElementById('price').innerText;
       var imageUrl = document.getElementById('imgSrc').src;
       /// get the item id 
       var url = window.location;
       let params = (new URL(url)).searchParams; 
       let id = params.get('id'); 
       console.log(id)
       /// get the choosen option
       var option = document.getElementById("lense-select").value;
       var quantity = 1;

       var objItem = {
         id : id,
         name : name, 
         quantity : quantity,
         price : price, 
         description : option,
         imageUrl : imageUrl, 
        }

      // on passe l'objet en string 
      const newData = JSON.stringify(objItem)  
       
      // on recupère la liste d'items qui est stockée dans le localstorage
      let oldData = JSON.parse(localStorage.getItem('data')) || [];


      console.log(oldData)
      
      var item = oldData.find(item => item.id === id);
    
      if (item) {

          alert ('item already in cart')

      } else if (item == undefined) {

        oldData.push(newData)
        console.log(oldData)
        localStorage.setItem('data', JSON.stringify(oldData))
    }

}








function cartNumbers() {
    
   let productNumbers = localStorage.getItem('cartNumber');
   
   productNumbers = parseInt(productNumbers);
  

   if (productNumbers) {
       localStorage.setItem('cartNumber', productNumbers +1);
       document.getElementById('spanCartNb').innerText = productNumbers +1 ;
    
   } else {
       localStorage.setItem('cartNumber', 1);
       document.getElementById('spanCartNb').innerText = 1;
   }
//    console.log(productNumbers);
   
}









