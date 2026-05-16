const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');
if (menuBtn && navLinks) menuBtn.addEventListener('click', () => navLinks.classList.toggle('open'));

const products = {
  volt: {
    name: 'Volt Runner Pro',
    desc: 'A light runner with energy-return sole, soft ankle padding and breathable knit upper.',
    price: '₹5,999',
    options: [
      { key: 'lavender', label: 'Lavender Court', thumb: 'assets/img/volt-option1-side.png', side: 'assets/img/volt-option1-side.png', top: 'assets/img/volt-option1-top.png' },
      { key: 'anime', label: 'Anime Storm', thumb: 'assets/img/volt-option2-side.png', side: 'assets/img/volt-option2-side.png', top: 'assets/img/volt-option2-top.png' },
      { key: 'gold', label: 'Hall of Fame', thumb: 'assets/img/volt-option3-side.png', side: 'assets/img/volt-option3-side.png', top: 'assets/img/volt-option3-top.png' }
    ]
  },
  shadow: {
    name: 'Shadow Court X',
    desc: 'High-top court sneaker with padded ankle, strong grip and night-black panels.',
    price: '₹7,499',
    options: [
      { key: 'shadow-classic', label: 'Classic Brown', thumb: 'assets/img/shadow-option1-side.png', side: 'assets/img/shadow-option1-side.png', top: 'assets/img/shadow-option1-top.png' },
      { key: 'shadow-formula', label: 'Formula Blue', thumb: 'assets/img/shadow-option2-side.png', side: 'assets/img/shadow-option2-side.png', top: 'assets/img/shadow-option2-top.png' },
      { key: 'shadow-hero', label: 'Hero Brown', thumb: 'assets/img/shadow-option3-side.png', side: 'assets/img/shadow-option3-side.png', top: 'assets/img/shadow-option3-top.png' }
    ]
  },
  cloud: {
    name: 'Cloud Drift 2',
    desc: 'Minimal everyday sneaker with soft foam, clean panels and premium comfort.',
    price: '₹4,999',
    options: [
      { key: 'cloud-white', label: 'Cloud White', thumb: 'assets/img/market-cloud-drift-2.png', side: 'assets/img/market-cloud-drift-2.png', top: 'assets/img/market-cloud-drift-2.png' },
      { key: 'cloud-white-2', label: 'Soft White', thumb: 'assets/img/market-cloud-drift-2.png', side: 'assets/img/market-cloud-drift-2.png', top: 'assets/img/market-cloud-drift-2.png' },
      { key: 'cloud-white-3', label: 'Clean White', thumb: 'assets/img/market-cloud-drift-2.png', side: 'assets/img/market-cloud-drift-2.png', top: 'assets/img/market-cloud-drift-2.png' }
    ]
  },
  anime: {
    name: 'Manga Blaze Low',
    desc: 'Manga-inspired sneaker with illustrated overlays and bright streetwear energy.',
    price: '₹6,299',
    options: [
      { key: 'anime-orange', label: 'Anime Orange', thumb: 'assets/img/market-anime-blaze-low.png', side: 'assets/img/market-anime-blaze-low.png', top: 'assets/img/market-anime-blaze-low.png' },
      { key: 'anime-purple', label: 'Anime Purple', thumb: 'assets/img/market-anime-blaze-low.png', side: 'assets/img/market-anime-blaze-low.png', top: 'assets/img/market-anime-blaze-low.png' },
      { key: 'anime-special', label: 'Anime Special', thumb: 'assets/img/market-anime-blaze-low.png', side: 'assets/img/market-anime-blaze-low.png', top: 'assets/img/market-anime-blaze-low.png' }
    ]
  },
  metro: {
    name: 'Wukong Special',
    desc: 'Black-and-gold statement sneaker with premium detailing and streetwear energy.',
    price: '₹5,499',
    options: [
      { key: 'metro-blue', label: 'Metro Blue', thumb: 'assets/img/market-metro-sprint.png', side: 'assets/img/market-metro-sprint.png', top: 'assets/img/market-metro-sprint.png' },
      { key: 'metro-blue-2', label: 'Street Blue', thumb: 'assets/img/market-metro-sprint.png', side: 'assets/img/market-metro-sprint.png', top: 'assets/img/market-metro-sprint.png' },
      { key: 'metro-blue-3', label: 'Sprint Blue', thumb: 'assets/img/market-metro-sprint.png', side: 'assets/img/market-metro-sprint.png', top: 'assets/img/market-metro-sprint.png' }
    ]
  },
  prime: {
    name: 'Golden Dunker',
    desc: 'Golden court-ready sneaker with bounce cushioning and a wide stable base.',
    price: '₹6,999',
    options: [
      { key: 'prime-red', label: 'Prime Red', thumb: 'assets/img/market-prime-dunker.png', side: 'assets/img/market-prime-dunker.png', top: 'assets/img/market-prime-dunker.png' },
      { key: 'prime-red-2', label: 'Court Red', thumb: 'assets/img/market-prime-dunker.png', side: 'assets/img/market-prime-dunker.png', top: 'assets/img/market-prime-dunker.png' },
      { key: 'prime-red-3', label: 'Dunker Red', thumb: 'assets/img/market-prime-dunker.png', side: 'assets/img/market-prime-dunker.png', top: 'assets/img/market-prime-dunker.png' }
    ]
  }
};

function numberPrice(price) {
  return Number(String(price).replace(/[^0-9]/g, '')) || 0;
}
function rupees(value) {
  return '₹' + value.toLocaleString('en-IN');
}

const params = new URLSearchParams(window.location.search);
const shoeKey = params.get('shoe') || 'volt';
const product = products[shoeKey] || products.volt;
let selectedSize = '8';
let currentView = 'side';
let selectedOptionIndex = 0;
let buildOptions = {
  sole: { label: 'Classic Sole', extra: 0 },
  cushion: { label: 'Standard Cushion', extra: 0 },
  material: { label: 'Standard Mesh', extra: 0 }
};

const mainShoeImg = document.getElementById('mainShoeImg');
const selectedColorLabel = document.getElementById('selectedColor');
const colorOptionsWrap = document.getElementById('colorOptions');
const buyNow = document.getElementById('buyNow');
const basePriceText = document.getElementById('basePriceText');
const upgradePriceText = document.getElementById('upgradePriceText');
const productPrice = document.getElementById('productPrice');

document.getElementById('productTitle').textContent = product.name;
document.getElementById('productDesc').textContent = product.desc;

function basePrice() {
  return numberPrice(product.price);
}
function upgradeTotal() {
  return Object.values(buildOptions).reduce((sum, item) => sum + Number(item.extra || 0), 0);
}
function finalPriceNumber() {
  return basePrice() + upgradeTotal();
}
function finalPriceText() {
  return rupees(finalPriceNumber());
}
function selectedBuildText() {
  return `${buildOptions.sole.label} • ${buildOptions.cushion.label} • ${buildOptions.material.label}`;
}
function updatePriceUI() {
  productPrice.textContent = finalPriceText();
  if (basePriceText) basePriceText.textContent = rupees(basePrice());
  if (upgradePriceText) upgradePriceText.textContent = rupees(upgradeTotal());
}
function getSelectedOption() {
  return product.options[selectedOptionIndex] || product.options[0];
}
function renderColorOptions() {
  colorOptionsWrap.innerHTML = '';
  product.options.slice(0, 3).forEach((option, index) => {
    const button = document.createElement('button');
    button.className = `thumb image-slot${index === selectedOptionIndex ? ' active' : ''}`;
    button.type = 'button';
    button.innerHTML = `<img src="${option.thumb}" alt="${option.label}"><span>${option.label}</span>`;
    button.addEventListener('click', () => {
      selectedOptionIndex = index;
      renderColorOptions();
      updateSelectedView();
      updateBuyLink();
    });
    colorOptionsWrap.appendChild(button);
  });
}
function updateSelectedView() {
  const option = getSelectedOption();
  const image = currentView === 'top' ? option.top : option.side;
  mainShoeImg.src = image;
  mainShoeImg.alt = `${product.name} ${option.label} ${currentView} view`;
  selectedColorLabel.textContent = option.label;
}
function updateBuyLink() {
  const option = getSelectedOption();
  const query = new URLSearchParams({
    shoe: shoeKey,
    color: option.label,
    colorKey: option.key,
    size: selectedSize,
    price: finalPriceText(),
    basePrice: rupees(basePrice()),
    upgrades: rupees(upgradeTotal()),
    sole: buildOptions.sole.label,
    cushion: buildOptions.cushion.label,
    material: buildOptions.material.label
  });
  buyNow.href = `checkout/index.html?${query.toString()}`;
}
function updateAll() {
  updatePriceUI();
  updateBuyLink();
}
renderColorOptions();
updateSelectedView();
updateAll();

document.querySelectorAll('.view-tab').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.view-tab').forEach(item => item.classList.remove('active'));
    button.classList.add('active');
    currentView = button.dataset.view === 'top' ? 'top' : 'side';
    document.getElementById('mainShoe').classList.toggle('top-view', currentView === 'top');
    document.getElementById('mainShoe').classList.toggle('side-view', currentView !== 'top');
    updateSelectedView();
  });
});
document.querySelectorAll('.size-box button').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.size-box button').forEach(item => item.classList.remove('active'));
    button.classList.add('active');
    selectedSize = button.textContent.trim();
    updateBuyLink();
  });
});
document.querySelectorAll('.build-option').forEach(button => {
  button.addEventListener('click', () => {
    const type = button.dataset.optionType;
    document.querySelectorAll(`.build-option[data-option-type="${type}"]`).forEach(item => item.classList.remove('active'));
    button.classList.add('active');
    buildOptions[type] = { label: button.dataset.label, extra: Number(button.dataset.extra || 0) };
    updateAll();
  });
});
function getCart() {
  return JSON.parse(localStorage.getItem('solemateCart') || '[]');
}
function saveCart(cart) {
  localStorage.setItem('solemateCart', JSON.stringify(cart));
}
document.getElementById('cartBtn').addEventListener('click', () => {
  const option = getSelectedOption();
  const cart = getCart();
  cart.push({
    id: Date.now(),
    key: shoeKey,
    name: product.name,
    price: finalPriceText(),
    basePrice: rupees(basePrice()),
    upgradePrice: rupees(upgradeTotal()),
    color: option.label,
    colorKey: option.key,
    size: selectedSize,
    quantity: 1,
    photo: option.side || option.thumb || '',
    sole: buildOptions.sole.label,
    cushion: buildOptions.cushion.label,
    material: buildOptions.material.label,
    build: selectedBuildText()
  });
  saveCart(cart);
  window.location.href = 'cart.html';
});


// Product review database using localStorage
const reviewForm = document.getElementById('reviewForm');
const productReviews = document.getElementById('productReviews');
const reviewName = document.getElementById('reviewName');
const reviewRating = document.getElementById('reviewRating');
const reviewText = document.getElementById('reviewText');

function getReviews() {
  return JSON.parse(localStorage.getItem('solemateReviews') || '[]');
}
function saveReviews(reviews) {
  localStorage.setItem('solemateReviews', JSON.stringify(reviews));
}
function stars(count) {
  return '★'.repeat(Number(count)) + '☆'.repeat(5 - Number(count));
}
function renderProductReviews() {
  if (!productReviews) return;
  const reviews = getReviews().filter(review => review.shoeKey === shoeKey);
  if (!reviews.length) {
    productReviews.innerHTML = '<div class="empty-review">No reviews yet. Be the first to review this sneaker.</div>';
    return;
  }
  productReviews.innerHTML = reviews.map(review => `
    <article class="review-card">
      <strong>${review.name}</strong>
      <span>${stars(review.rating)}</span>
      <p>${review.text}</p>
      <small>${review.date}</small>
    </article>
  `).join('');
}
if (reviewForm) {
  const user = JSON.parse(localStorage.getItem('solemateUser') || '{}');
  if (user.name && reviewName) reviewName.value = user.name;

  reviewForm.addEventListener('submit', event => {
    event.preventDefault();
    const review = {
      id: 'REV' + Date.now(),
      shoeKey,
      shoeName: product.name,
      name: reviewName.value.trim(),
      rating: reviewRating.value,
      text: reviewText.value.trim(),
      date: new Date().toLocaleString()
    };
    const reviews = getReviews();
    reviews.unshift(review);
    saveReviews(reviews);

    const currentUser = JSON.parse(localStorage.getItem('solemateUser') || '{}');
    if (currentUser.email) {
      const customers = JSON.parse(localStorage.getItem('solemateCustomers') || '[]');
      const updatedCustomers = customers.map(customer => {
        if (customer.email === currentUser.email) {
          return { ...customer, reviews: [review, ...(customer.reviews || [])] };
        }
        return customer;
      });
      localStorage.setItem('solemateCustomers', JSON.stringify(updatedCustomers));
    }

    reviewText.value = '';
    renderProductReviews();
  });

  renderProductReviews();
}
