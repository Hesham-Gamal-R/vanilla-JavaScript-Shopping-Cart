const shopItems = document.getElementById("shop-items");
const incrementBtn = document.getElementById("increment");

// Get Data from localStorage
let basket = JSON.parse(localStorage.getItem("Data")) || [];

// GET and Show data
const getData = () => {
  return shopItemsData
    .map((item) => {
      const { id, name, price, desc, img } = item;
      let search = basket.find((item) => item.id === id) || [];
      let result = search.item === undefined ? 0 : search.item;
      return `
              <div id=product-id-${id} class="item" >
                <img src=${img} alt="" width="220" />
                <div class="details">
                  <h2>${name}</h2>
                  <p>${desc}</p>
                  <div class="price-qty">
                    <h3>$ ${price}</h3>
                    <div class="buttons">
                      <i  class="bi bi-dash-lg" onclick="decrement(${id})"></i>
                      <div id="${id}" class="quantity">${result}</div>
                      <i  class="bi bi-plus-lg" onclick="increment(${id})"></i>
                    </div>
                  </div>
                </div>
            </div>
    `;
    })
    .join("");
};

const generateItems = () => {
  return (shopItems.innerHTML = getData());
};
generateItems();

//************************************************************** */

// increment
const increment = (id) => {
  let search = basket.find((item) => item.id === id);
  if (search === undefined) {
    basket.push({ id, item: 1 });
  } else {
    search.item += 1;
  }

  // upDate call
  upDate(id);

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

  // setData call
  setData();
};

// upDate
const upDate = (id) => {
  let search = basket.find((item) => item.id === id);
  document.getElementById(id).innerHTML = search.item;

  // calculation call
  calculation();
};

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

//Set and Save numbers which in the cartAmount to local storage
let setData = () => {
  localStorage.setItem("Data", JSON.stringify(basket));
};
