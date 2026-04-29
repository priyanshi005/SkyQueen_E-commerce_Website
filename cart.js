// 🛒 LOAD CART
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// ➕ ADD TO CART (USED IN ALL PRODUCT PAGES)
function addToCart(name, price, img){

  let existing = cart.find(item => item.name === name);

  if(existing){
    existing.qty += 1;
  } else {
    cart.push({
      name: name,
      price: price,
      img: img,
      qty: 1
    });
  }

  saveCart();
  alert("Added to cart 🛒");
}

// 💾 SAVE CART
function saveCart(){
  localStorage.setItem("cart", JSON.stringify(cart));
}

// ================= CART PAGE LOGIC =================

// only run if cart page exists
if(document.getElementById("items")){

  const itemsDiv = document.getElementById("items");
  const totalDiv = document.getElementById("total");

  function renderCart(){

    let total = 0;
    itemsDiv.innerHTML = "";

    if(cart.length === 0){
      itemsDiv.innerHTML = `<div class="empty">🛒 Cart is empty</div>`;
      totalDiv.innerText = "₹0";
      return;
    }

    cart.forEach((item,index)=>{

      total += item.price * item.qty;

      itemsDiv.innerHTML += `
        <div class="cart-item">
          <img src="${item.img}" 
               onerror="this.src='https://via.placeholder.com/90'">

          <div class="item-info">
            <h3>${item.name}</h3>

            <div class="qty">
              <button onclick="changeQty(${index},-1)">-</button>
              <span>${item.qty}</span>
              <button onclick="changeQty(${index},1)">+</button>
            </div>
          </div>

          <div class="price">₹${item.price * item.qty}</div>

          <button class="remove" onclick="removeItem(${index})">X</button>
        </div>
      `;
    });

    totalDiv.innerText = "₹" + total;
  }

  function changeQty(i,val){
    cart[i].qty += val;

    if(cart[i].qty <= 0){
      cart.splice(i,1);
    }

    saveCart();
    renderCart();
  }

  function removeItem(i){
    cart.splice(i,1);
    saveCart();
    renderCart();
  }

  function checkout(){

    if(cart.length === 0){
      alert("Cart empty ❌");
      return;
    }

    let total = 0;
    cart.forEach(i => total += i.price * i.qty);

    var options = {
        key: "rzp_test_ShgmffSoB7a2f2",
        amount: total * 100,
        currency: "INR",
        name: "Sky Queen",
        description: "Order Payment",

        handler: function (){
          alert("Payment Successful ✅");
          localStorage.removeItem("cart");
          location.reload();
        }
    };

    new Razorpay(options).open();
  }

  // make functions global
  window.changeQty = changeQty;
  window.removeItem = removeItem;
  window.checkout = checkout;

  renderCart();
}