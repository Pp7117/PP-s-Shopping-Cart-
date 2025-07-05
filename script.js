let cart = [];

document.getElementById("add-item").addEventListener('click', addItems);
document.getElementById("remove-item").addEventListener('click', removeItems);

function addItems()
 {
  const name = document.getElementById("item-name").value.trim();
  const price = parseFloat(document.getElementById("item-price").value);
  const quantity = parseInt(document.getElementById("item-qty").value);

  if (!name || isNaN(price) || isNaN(quantity) || price <= 0 || quantity <= 0) {
    alert("Please enter valid item details.");
    return;
  }

  const existing = cart.find(item => item.name.toLowerCase() === name.toLowerCase() && item.price === price);

  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({ name, price, quantity });
  }

  updateCart();
  clearInputs();
}

function removeItems() {
  const name = document.getElementById("item-name").value.trim();

  if (!name) {
    alert("Please enter the item name to remove.");
    return;
  }

  const index = cart.findIndex(item => item.name.toLowerCase() === name.toLowerCase());

  if (index !== -1) {
    cart.splice(index, 1);
    updateCart();
    clearInputs();
  } else {
    alert("Item not found in the cart.");
  }
}

function updateCart() {
  const cartItems = document.getElementById("cart-items");
  cartItems.innerHTML = "";
  let total = 0;

  cart.forEach(item => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td data-label="Item Name">${item.name}</td>
      <td data-label="Price (₹)">₹${item.price.toFixed(2)}</td>
      <td data-label="Quantity">${item.quantity}</td>
      <td data-label="Total (₹)">₹${(item.price * item.quantity).toFixed(2)}</td>
    `;
    cartItems.appendChild(row);
    total += item.price * item.quantity;
  });

  document.getElementById("order-total").textContent = `₹${total.toFixed(2)}`;
}

function clearInputs() {
  document.getElementById("item-name").value = "";
  document.getElementById("item-price").value = "";
  document.getElementById("item-qty").value = "";
}
