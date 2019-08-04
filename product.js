var clothes = [];
var shoes = [];
(function getjson(){
    var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		console.log("Loading...")
		if (this.readyState == 4 && this.status == 200) {
		        var myData = JSON.parse(this.responseText);
                     clothes = myData[0].dataClothes;
                     shoes = myData[1].dataShoes; 					 
			}
		if(this.status==404)
		{
			window.alert("server error");
		}
	};
	xmlhttp.open("GET", "https://api.myjson.com/bins/19mszx", true);
	xmlhttp.send();
})();
// uncomment below both arrays if json is not fetched
/*clothes = [
{index: 0,name: "Denim Jeans" ,price: 700 ,category: "clothes",quantity: 1},
{index: 1,name: "T Shirt" ,price: 850, category: "clothes",quantity: 1},
{index: 2,name: "Formal Shirt" ,price: 800, category: "clothes",quantity: 1},
{index: 3,name: "Track Pant" ,price: 900, category: "clothes",quantity: 1},
{index: 4,name: "Formal Pants" ,price: 850, category: "clothes",quantity: 1},
{index: 5,name: "Denim Jacket" ,price: 700, category: "clothes",quantity: 1}
]; 
 shoes = [
{index: 0,name: "Adidas" ,price: 800, category: "shoes",quantity: 1},
{index: 1,name: "Reebok" ,price: 850, category: "shoes",quantity: 1},
{index: 2,name: "Nike" ,price: 900, category: "shoes",quantity: 1},
{index: 3,name: "Sparx" ,price: 750, category: "shoes",quantity: 1},
{index: 4,name: "Khadims" ,price: 800, category: "shoes",quantity: 1},
{index: 5,name: "Bata" ,price: 850, category: "shoes",quantity: 1}
];*/
 if(sessionStorage.getItem('currUserName')) {
    document.getElementById('loginhref').innerHTML = sessionStorage.getItem('currUserName');
  } 
 function logout(){
	sessionStorage.clear();
    window.location = 'loginsignup.html'
 }
 function itemsInCart(){
	document.getElementById("itemsInCart").innerHTML = cart.length;
	
 }
 var cart=[];
 function addToCart(index,category){
   if(sessionStorage.getItem('currUserName')){	 
     var addRemove = document.getElementById(`btn-${category}-${index}`).innerHTML;
     if(addRemove == "Add to Cart"){
        if(category == 'shoes'){
          cart.push(shoes[index]);
        }
        if(category == 'clothes'){
          cart.push(clothes[index]);
        }
        document.getElementById(`btn-${category}-${index}`).innerHTML = "Remove From Cart";
     }
     else {
          for(let i in cart){
              if(cart[i].index == index && cart[i].category == category){
                   cart.splice(i,1);
                   break;
              }
          }
          document.getElementById(`btn-${category}-${index}`).innerHTML = "Add to Cart";
     }
     itemsInCart();
     openNav();
   }
   else {
     window.alert("You need to login to add items to cart");
   }
 }

function openNav(openClose) {
  if(openClose == "open" && cart.length>0)
  document.getElementById("mySidenav").style.width = "500px";
  else if(openClose == "open")
	   window.alert("no items in cart");
  document.getElementById("mySidenavProduct").innerHTML = "";
  var Html = '';
  for(let x=0; x<cart.length;x++){
      let data = `<div class="cart-item">
         <div style="text-align: center;">${cart[x].name}</div>
         <div class="product" style="">
         <img src="product2.jpg" alt="xyz" style="width:100%">
         </div>
         <div style="padding: 5px;">
         <div>
         <label for="Quantity">Quantity</label>
         <input id='${x}' type="number" min="1" value='${cart[x].quantity}' onchange="changeQuantity(id)" name="Quantity">
         </div>
         <div>
         <label for="Price">Price of 1</label>
         <input type="number" value='${cart[x].price}' name="Price" disabled>
         </div>
         <div><button id="btn-${x}" onclick="removeFromCart(${x},${cart[x].index},'${cart[x].category}')"> Remove From Cart</button></div>
         </div>
         <a href="javascript:void(0)" class="closebtn" onclick="removeFromCart(${x},${cart[x].index},'${cart[x].category}')">&times;</a>
         </div>`
     Html+= data; 
 }
 document.getElementById("mySidenavProduct").innerHTML += Html; 
 calculateTotal();
 itemsInCart();
}

 function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
 }

 function changeQuantity(id){
    cart[id].quantity = document.getElementById(id).value;
    calculateTotal();
 }
 function calculateTotal(){
   var amount = 0;
   for(let x in cart){
       amount+= cart[x].price * cart[x].quantity;
   }
   document.getElementById("checkoutAmount").innerHTML = amount;
 }

function removeFromCart(id,id1,category){
    cart.splice(id,1);
    openNav();
    itemsInCart();
    document.getElementById(`btn-${category}-${id1}`).innerHTML = "Add to Cart";
}

 function scrollcloth() {
    var elmnt = document.getElementsByClassName("clothes");
    elmnt[0].scrollIntoView();
 }

 function scrollshoe(){
    var elmnt = document.getElementsByClassName("shoes");
    elmnt[0].scrollIntoView();
 }