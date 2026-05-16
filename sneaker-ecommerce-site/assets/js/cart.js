const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');
if (menuBtn && navLinks) menuBtn.addEventListener('click', () => navLinks.classList.toggle('open'));

const gradients = {
  orange: 'linear-gradient(135deg,#ff4d00,#ffffff,#111111)',
  black: 'linear-gradient(135deg,#111111,#444444,#ff4d00)',
  white: 'linear-gradient(135deg,#ffffff,#dddddd,#111111)',
  blue: 'linear-gradient(135deg,#1565ff,#ffffff,#111111)',
  red: 'linear-gradient(135deg,#ff1f3d,#ffffff,#111111)'
};
const cartList = document.getElementById('cartList');
const itemCount = document.getElementById('itemCount');
const subtotal = document.getElementById('subtotal');
const total = document.getElementById('total');
const checkoutBtn = document.getElementById('checkoutBtn');

function getCart() { return JSON.parse(localStorage.getItem('solemateCart') || '[]'); }
function saveCart(cart) { localStorage.setItem('solemateCart', JSON.stringify(cart)); }
function rupees(value) { return '₹' + value.toLocaleString('en-IN'); }
function numberPrice(price) { return Number(String(price).replace(/[^0-9]/g, '')) || 0; }

function renderCart() {
  const cart = getCart();
  cartList.innerHTML = '';
  if (!cart.length) {
    cartList.innerHTML = `<div class="empty-cart"><h2>Your cart is empty.</h2><p>Add shoes from the marketplace or product view page.</p><a href="marketplace.html">Shop Sneakers</a></div>`;
    checkoutBtn.style.pointerEvents = 'none';
    checkoutBtn.style.opacity = '.45';
  } else {
    checkoutBtn.style.pointerEvents = 'auto';
    checkoutBtn.style.opacity = '1';
  }
  let count = 0;
  let sum = 0;
  cart.forEach(item => {
    const qty = item.quantity || 1;
    count += qty;
    sum += numberPrice(item.price) * qty;
    const card = document.createElement('article');
    card.className = 'cart-item';
    const shoeVisual = item.photo
      ? `<div class="cart-shoe"><img src="${item.photo}" alt="${item.name}"></div>`
      : `<div class="cart-shoe image-slot"><span>Add shoe image</span></div>`;
    card.innerHTML = `
      ${shoeVisual}
      <div class="cart-info">
        <h2>${item.name}</h2>
        <p>Color: ${item.color}</p>
        <p>Size: UK ${item.size}</p>
        ${item.build ? `<p>Build: ${item.build}</p>` : ''}
        <div class="quantity-row">
          <button data-action="minus" data-id="${item.id}">−</button>
          <strong>${qty}</strong>
          <button data-action="plus" data-id="${item.id}">+</button>
        </div>
      </div>
      <div>
        <div class="cart-price">${rupees(numberPrice(item.price) * qty)}</div>
        <button class="remove-btn" data-action="remove" data-id="${item.id}">Remove</button>
      </div>`;
    cartList.appendChild(card);
  });
  itemCount.textContent = count;
  subtotal.textContent = rupees(sum);
  total.textContent = rupees(sum);
}

cartList.addEventListener('click', event => {
  const button = event.target.closest('button');
  if (!button) return;
  const id = Number(button.dataset.id);
  const action = button.dataset.action;
  let cart = getCart();
  const item = cart.find(product => product.id === id);
  if (!item) return;
  if (action === 'plus') item.quantity = (item.quantity || 1) + 1;
  if (action === 'minus') item.quantity = Math.max(1, (item.quantity || 1) - 1);
  if (action === 'remove') cart = cart.filter(product => product.id !== id);
  saveCart(cart);
  renderCart();
});

document.getElementById('clearCart').addEventListener('click', () => {
  localStorage.removeItem('solemateCart');
  renderCart();
});

renderCart();
