var productNameInput = document.getElementById("productNameInput");
var productPriceInput = document.getElementById("productPriceInput");
var productCategoryInput = document.getElementById("productCategoryInput");
var productDescriptionInput = document.getElementById(
  "productDescriptionInput"
);

var products = [];
if (localStorage.getItem("products") != null) {
  products = JSON.parse(localStorage.getItem("products"));
  displayProduct();
}
var mainIndex = 0;
function addProduct() {
  var product = {
    name: productNameInput.value,
    price: productPriceInput.value,
    category: productCategoryInput.value,
    desc: productDescriptionInput.value,
  };
  if (document.getElementById("btn").innerHTML == "update product") {
    products.splice(mainIndex, 1, product);
    document.getElementById("btn").innerHTML = "Add product";
  } else {
    products.push(product);
  }
  localStorage.setItem("products", JSON.stringify(products));
  displayProduct();
  clearForm();
}

function displayProduct() {
  trs = "";
  for (var i = 0; i < products.length; i++) {
    trs += `
    <tr>
    <td>${i}</td>
    <td>${products[i].name}</td>
    <td>${products[i].price}</td>
    <td>${products[i].category}</td>
    <td>${products[i].desc}</td>
    <td>
      <button onclick="updateProduct(${i})" class="btn btn-outline-warning">Update</button>
    </td>
    <td>
      <button onclick="deleteProduct(${i})" class="btn btn-outline-danger">Delete</button>
    </td>
    </tr>
    `;
  }
  document.getElementById("table-body").innerHTML = trs;
}

function clearForm() {
  productNameInput.value = "";
  productPriceInput.value = "";
  productCategoryInput.value = "";
  productDescriptionInput.value = "";
}

function deleteProduct(index) {
  products.splice(index, 1);
  displayProduct();
  localStorage.setItem("products", JSON.stringify(products));
}

function updateProduct(index) {
  mainIndex = index;
  productNameInput.value = `${products[index].name}`;
  productPriceInput.value = `${products[index].price}`;
  productCategoryInput.value = `${products[index].category}`;
  productDescriptionInput.value = `${products[index].desc}`;

  document.getElementById("btn").innerHTML = "update product";
}

function searchProduct(term) {
  var trs = "";
  for (var i = 0; i < products.length; i++) {
    if (products[i].name.toLowerCase().includes(term.toLowerCase()) == true) {
      trs += `
    <tr>
    <td>${i}</td>
    <td>${products[i].name}</td>
    <td>${products[i].price}</td>
    <td>${products[i].category}</td>
    <td>${products[i].desc}</td>
    <td>
      <button onclick="updateProduct(${i})" class="btn btn-outline-warning">Update</button>
    </td>
    <td>
      <button onclick="deleteProduct(${i})" class="btn btn-outline-danger">Delete</button>
    </td>
    </tr>
    `;
    }
  }
  document.getElementById("table-body").innerHTML = trs;
}
