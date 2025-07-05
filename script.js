let cart =[];
 

document.getElementById("add-item").addEventListener('click',addItems);

function addItems() 
    {
        let item = {
            name: prompt("Enter item name:"),
            price: parseFloat(prompt("Enter item price:")),
            quantity: parseInt(prompt("Enter item quantity:")),
            total: 0 
        };

        if (isNaN(item.price) || isNaN(item.quantity) || item.name.trim() === "") 
        {
            alert("Invalid input. Please enter valid item details.");
            return;
        }
        else
        {
            let Olditem = cart.find(i => i.name === item.name && i.price === item.price);
            if(Olditem)
            {
                Olditem.quantity += item.quantity;
            }
            else
            {
                cart.push(item);
            }
            updateCart();
       
        }
    }

document.getElementById("remove-item").addEventListener('click',removeItems);

function removeItems() 
    {
        let itemName = prompt("Enter the name of the item to remove:");
        let itemIndex = cart.findIndex(item => item.name === itemName);

        if (itemIndex !== -1) 
        {
            cart.splice(itemIndex, 1);
            updateCart();
        } 
        else 
        {
            alert("Item not found in the cart.");
        }
    }


function updateCart() 
{
    let orderTotal=0;
    let cartItems = document.getElementById("cart-items");
    cartItems.innerHTML = "";

    cart.forEach(item => 
        {
           let row = document.createElement("tr");
           row.innerHTML = `
               <td>${item.name}</td>
               <td>${item.price.toFixed(2)}</td>
               <td>${item.quantity}</td>
               <td>₹${(item.price * item.quantity).toFixed(2)}</td>
           `;
           cartItems.appendChild(row);
           orderTotal += item.price * item.quantity;
        });

    document.getElementById("order-total").textContent = `₹${orderTotal.toFixed(2)}`;
}


