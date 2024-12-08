const cartContainer = document.getElementById('cart-container');
const printButton = document.getElementById('print-receipt');
const resetButton = document.getElementById('reset-cart');

// Retrieve the cart from localStorage (or create an empty cart if no data exists)
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function calculateTotal(cart) {
  let total = 0;
  cart.forEach(item => {
    total += item.totalPrice;
  });

  // Apply a 30% discount if the total exceeds RM30
  if (total > 30) {
    total -= total * 0.30;
    return { total, discountApplied: true };
  }

  return { total, discountApplied: false };
}

function displayCart(cart) {
  if (cart.length === 0) {
    cartContainer.innerHTML = '<p>Your cart is empty. Add items on the order page!</p>';
  } else {
    let { total, discountApplied } = calculateTotal(cart);
    const list = document.createElement('ul');

    cart.forEach((item, index) => {
      const listItem = document.createElement('li');
      listItem.innerHTML = `
        <strong>Flavor:</strong> ${item.flavor.charAt(0).toUpperCase() + item.flavor.slice(1)}<br>
        <strong>Quantity:</strong> ${item.quantity}<br>
        <strong>Unit Price:</strong> RM${item.unitPrice.toFixed(2)}<br>
        <strong>Total:</strong> RM${item.totalPrice.toFixed(2)}
      `;
      list.appendChild(listItem);
    });

    const totalAmount = document.createElement('p');
    totalAmount.innerHTML = `<strong>Total Price:</strong> RM${total.toFixed(2)}`;

    if (discountApplied) {
      const discountMessage = document.createElement('p');
      discountMessage.innerHTML = '<strong>30% Discount Applied!</strong>';
      cartContainer.appendChild(discountMessage);
    }

    cartContainer.innerHTML = '';
    cartContainer.appendChild(list);
    cartContainer.appendChild(totalAmount);
  }
}

displayCart(cart);

// Add reset functionality
resetButton.addEventListener('click', () => {
  if (confirm('Are you sure you want to reset the cart? This action cannot be undone.')) {
    localStorage.removeItem('cart'); // Clear cart data
    alert('The cart has been reset.');
    window.location.reload(); // Reload the page to reflect changes
  }
});

// Add print functionality
printButton.addEventListener('click', () => {
  const { total, discountApplied } = calculateTotal(cart);
  const cartHTML = cart.map(item => `
    <li>
      <strong>Flavor:</strong> ${item.flavor.charAt(0).toUpperCase() + item.flavor.slice(1)}<br>
      <strong>Quantity:</strong> ${item.quantity}<br>
      <strong>Unit Price:</strong> RM${item.unitPrice.toFixed(2)}<br>
      <strong>Total:</strong> RM${item.totalPrice.toFixed(2)}
    </li>
  `).join('');

  const printContent = `
    <html>
      <head>
        <title>Receipt - Your Cafe</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 20px; padding: 0; }
          h1 { text-align: center; }
          .receipt { margin: 20px 0; }
          ul { list-style-type: none; padding: 0; }
          ul li { border-bottom: 1px solid #ddd; padding: 10px 0; }
          p { font-size: 1.2em; text-align: right; margin-top: 20px; }
        </style>
      </head>
      <body>
        <h1>Rexy Cafe - Receipt</h1>
        <div class="receipt">
          <ul>
            ${cartHTML}
          </ul>
          <p><strong>Total Price:</strong> RM${total.toFixed(2)}</p>
          ${discountApplied ? '<p><strong>30% Discount Applied!</strong></p>' : ''}
        </div>
      </body>
    </html>
  `;

  const printWindow = window.open('', '', 'width=800,height=600');
  printWindow.document.open();
  printWindow.document.write(printContent);
  printWindow.document.close();
  printWindow.print();
});
