let tableBody = document.querySelector('tbody');
let createButton = document.getElementById('create');
let calculatorButton = document.getElementById('calc');
let totalPrice = 0;

class Product {
  constructor(name, price, id) {
    this.name = name;
    this.price = price;
    this.id = id;
    this.quantity = 0;
    this.subtotal = 0;
  }
}

let products = [];

let productsCounter = 0;

function addProduct(name, price, id) {
  let product = new Product(name, price, id);
  products.push(product);
  productsCounter++;
  paintProduct(product);
}

function paintProduct(product) {
  let newProduct = document.createElement(`tr`);
  newProduct.setAttribute('class', 'product');
  newProduct.setAttribute('id', `product${product.id}`);
  let trTags =
    `<td>
    <span>${product.name}</span>
  </td>
  <td>
    $<span>${product.price}</span>
  </td>
  <td>
    <label>
      <input type="number" value="0" min="0" id="quantity${product.id}">
    </label>
  </td>
  <td>
    $<span id="subtotal${product.id}">0</span>
  </td>
  <td class="button-container">
    <button class="button button-delete" id="delete${product.id}">Delete</button>
  </td>`;
  newProduct.innerHTML = trTags;
  tableBody.appendChild(newProduct);
  let deleteButton = document.getElementById(`delete${product.id}`);
  deleteButton.onclick = function (btn) {
    btn.preventDefault();
    let rowToDelete = document.getElementById(`product${product.id}`);
    tableBody.removeChild(rowToDelete);
    removeProduct(product.id);
  } 
  document.getElementById('nameInput').value = "";
  document.getElementById('valueInput').value = "";
};

function removeProduct(id) {
  products = products.filter(element => element.id != id);
  console.log(products);
}

createButton.onclick = function (btn) {
  btn.preventDefault();
  let productName = document.getElementById('nameInput').value;
  let productValue = document.getElementById('valueInput').value;
  addProduct(productName, productValue, productsCounter);
}

calculatorButton.onclick = function (btn) {
  btn.preventDefault();
  calculate();
}

function calculate() {
  totalPrice = 0;
  products.forEach(element => {
    element.quantity = document.getElementById(`quantity${element.id}`).value;
    element.subtotal = element.price * element.quantity;
    totalPrice += element.subtotal;
  })
  printSubtotals();
  printTotalPrice(totalPrice);
}

function printSubtotals(){
  products.forEach(element => {
    let rowSubtotal = document.getElementById(`subtotal${element.id}`);
    rowSubtotal.innerHTML = element.price * element.quantity;
  })
}

function printTotalPrice(totalPrice) {
  let total = document.getElementById('total');
  total.innerHTML = totalPrice;
}
