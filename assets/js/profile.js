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

const cart = JSON.parse(localStorage.getItem('solemateCart') || '[]');
const orders = JSON.parse(localStorage.getItem('solemateOrders') || '[]');
const user = JSON.parse(localStorage.getItem('solemateUser') || '{}');
const count = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);

document.getElementById('cartCount').textContent = count;
document.getElementById('orderCount').textContent = orders.length;
if (user.name) {
  document.getElementById('profileName').textContent = user.name;
  document.getElementById('savedName').textContent = user.name;
}
if (user.email) document.getElementById('savedEmail').textContent = user.email;

const customersDb = JSON.parse(localStorage.getItem('solemateCustomers') || '[]');
const customerDbCount = document.getElementById('customerDbCount');
const customerId = document.getElementById('customerId');
if (customerDbCount) customerDbCount.textContent = customersDb.length;
if (customerId) customerId.textContent = user.id || 'Guest';

function renderOrders() {
  const ordersList = document.getElementById('ordersList');
  if (!orders.length) {
    ordersList.innerHTML = `
      <article class="empty-orders">
        <h3>No orders yet.</h3>
        <p>Place an order from checkout and it will appear here with size, color and payment type.</p>
        <a href="marketplace.html">Shop Sneakers</a>
      </article>`;
    return;
  }
  ordersList.innerHTML = orders.map(order => `
    <article class="order-card">
      <div class="order-top">
        <div>
          <span>${order.id}</span>
          <h3>${order.status}</h3>
          <p>${order.date}</p>
        </div>
        <strong>${order.total}</strong>
      </div>
      <p class="payment-pill">Payment: ${order.payment}</p>
      <div class="ordered-items">
        ${(order.items || []).map(item => `
          <div class="ordered-item text-only">
            <div>
              <h4>${item.name}</h4>
              <p>${item.color || 'Selected color'} • UK ${item.size || '8'} • Qty ${item.quantity || 1}${item.build ? ' • ' + item.build : ''}</p>
            </div>
          </div>`).join('')}
      </div>
    </article>
  `).join('');
}

renderOrders();


const logoutBtn = document.getElementById('logoutBtn');
if (logoutBtn) {
  logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('solemateUser');
    window.location.href = 'login.html';
  });
}


function renderProfileReviews() {
  const profileReviewsList = document.getElementById('profileReviewsList');
  if (!profileReviewsList) return;
  const currentUser = JSON.parse(localStorage.getItem('solemateUser') || '{}');
  const allReviews = JSON.parse(localStorage.getItem('solemateReviews') || '[]');
  const myReviews = allReviews.filter(review => {
    if (!currentUser.name) return false;
    return review.name === currentUser.name;
  });

  if (!myReviews.length) {
    profileReviewsList.innerHTML = `
      <article class="empty-orders">
        <h3>No reviews yet.</h3>
        <p>Submit a review from any product view page and it will appear here.</p>
        <a href="marketplace.html">Review Sneakers</a>
      </article>`;
    return;
  }

  profileReviewsList.innerHTML = myReviews.map(review => `
    <article class="order-card review-profile-card">
      <div class="order-top">
        <div>
          <span>${review.id}</span>
          <h3>${review.shoeName}</h3>
          <p>${review.date}</p>
        </div>
        <strong>${'★'.repeat(Number(review.rating))}</strong>
      </div>
      <p>${review.text}</p>
    </article>
  `).join('');
}
renderProfileReviews();
