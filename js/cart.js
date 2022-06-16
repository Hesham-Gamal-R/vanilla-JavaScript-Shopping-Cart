let label = document.getElementById("label");
let shoppingCart = document.getElementById("shopping-cart");

let basket = JSON.parse(localStorage.getItem("Data")) || [];

//Calc all numbers to add in cart
let calculation = () => {
  let total = basket
    .map((element) => element.item)
    .reduce((current, next) => current + next, 0);

  //Set all numbers in the cart Amount
  let cartAmount = document.getElementById("cartAmount");
  cartAmount.innerHTML = total;
};
calculation();

//generateCartItems to render component to show update
let generateCartItems = () => {
  if (basket.length !== 0) {
    return (shoppingCart.innerHTML = basket
      .map((element) => {
        const { id, item } = element;
        let search = shopItemsData.find((element) => element.id === id) || [];
        const { name, price, desc, img } = search;
        return `
      <div class="cart-item" id="label">
        <img src=${img} alt="img" width="100"/>
        <div class="details" id="details">

          <div class="title-price-x" id="title-price-x">
            <h4 class="title-price">
              <p>${name}</p>
              <p class="cart-item-price">$ ${price}</p>
            </h4>

            <i class="bi bi-x-lg" onclick="removeItem(${id})"></i>
          
          </div>
          
          <div class="cart-buttons" id="cart-buttons">
            <div class="buttons">
              <i class="bi bi-dash-lg" onclick="decrement(${id})"></i>
              <div id=${id} class="quantity">${item}</div>
              <i class="bi bi-plus-lg" onclick="increment(${id})"></i>
            </div>
          </div>
          
          <h3>$ ${item * price}</h3>
        </div>
      </div>
      `;
      })
      .join(""));
  } else {
    shoppingCart.innerHTML = "";
    label.innerHTML = `
    <h2>Cart is Empty</h2>
    <a href="index.html">
      <button class="homeBtn">Back Home</button>
    </a>
    `;
  }
};

generateCartItems();

//************************************************************** */

//Set and Save numbers which in the cartAmount to local storage
let setData = () => {
  localStorage.setItem("Data", JSON.stringify(basket));
};

// increment
const increment = (id) => {
  let search = basket.find((item) => item.id === id);
  if (search === undefined) {
    basket.push({ id, item: 1 });
  } else {
    search.item += 1;
  }

  //Rerender component to show update
  generateCartItems();

  // upDate call
  upDate(id);

  // generateCartItems();

  // setData call
  setData();
};

// decrement
const decrement = (id) => {
  let search = basket.find((item) => item.id === id);

  if (search === undefined || search.item === 0) return;
  else {
    search.item -= 1;
  }
  // upDate call
  upDate(id);

  /*
      ** filter elements **
      Delete elements which value = 0 from local storage
      and return elements which value > 0 to local storage
  */
  basket = basket.filter((element) => element.item !== 0);

  //Rerender component to show update
  generateCartItems();

  // setData call
  setData();
};

// upDate
const upDate = (id) => {
  let search = basket.find((item) => item.id === id);
  document.getElementById(id).innerHTML = search.item;

  // calculation call
  calculation();

  //totalAmount call
  totalAmount();
};

//removeItem from cart and local storage
let removeItem = (id) => {
  basket = basket.filter((element) => element.id !== id);

  // calculation call
  calculation();

  //Rerender component to show update
  generateCartItems();

  //totalAmount call
  totalAmount();

  // setData call
  setData();
};

let totalAmount = () => {
  if (basket.length !== 0) {
    let amount = basket
      .map((x) => {
        let { id, item } = x;
        let filterData = shopItemsData.find((x) => x.id === id);
        return filterData.price * item;
      })
      .reduce((x, y) => x + y, 0);

    return (label.innerHTML = `
    <h2>Total Bill : $ ${amount}</h2>
    <button class="checkout">Checkout</button>
    <button onclick="clearCart()" class="removeAll">Clear Cart</button>
    `);
  } else return;
};

totalAmount();

/**
 * ! Used to clear cart, and remove everything from local storage
 */

let clearCart = () => {
  basket = [];

  //Rerender component to show update
  generateCartItems();

  //calculation call
  calculation();

  // setData call
  setData();
};
