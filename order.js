document.getElementById('ice-cream-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const flavor = document.getElementById('flavor').value;
  const quantity = parseInt(document.getElementById('quantity').value);
  const day = document.getElementById('day').value;

  const prices = {
    cherry: 7.5,
    strawberry: 5.55,
    mulberry: 4.25,
    grapes: 6.55,
    mango: 8.25,
  };

  const fridayPrice = 3.5;
  const unitPrice = day === 'friday' ? fridayPrice : prices[flavor];
  const totalPrice = unitPrice * quantity;

  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.push({ flavor, quantity, unitPrice, totalPrice });
  localStorage.setItem('cart', JSON.stringify(cart));

  alert('Item added to cart!');
});
