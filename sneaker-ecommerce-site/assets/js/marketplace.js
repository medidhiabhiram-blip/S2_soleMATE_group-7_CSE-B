const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');
if (menuBtn && navLinks) menuBtn.addEventListener('click', () => navLinks.classList.toggle('open'));

const searchInput = document.getElementById('searchInput');
const categoryMenu = document.getElementById('categoryMenu');
const categoryTrigger = document.getElementById('categoryTrigger');
const categoryPanel = document.getElementById('categoryPanel');
const categoryLabel = document.getElementById('categoryLabel');
const categoryButtons = Array.from(document.querySelectorAll('.category-panel button'));
const cards = Array.from(document.querySelectorAll('.product-card'));
let selectedCategory = 'all';

function filterProducts(){
  const query = searchInput.value.toLowerCase().trim();
  cards.forEach(card => {
    const matchesText = card.dataset.name.toLowerCase().includes(query);
    const tags = `${card.dataset.category || ''} ${card.dataset.tags || ''}`.toLowerCase();
    const matchesCategory = selectedCategory === 'all' || tags.split(/\s+/).includes(selectedCategory);
    card.style.display = matchesText && matchesCategory ? 'flex' : 'none';
  });
}

searchInput.addEventListener('input', filterProducts);

categoryTrigger.addEventListener('click', () => {
  const isOpen = categoryMenu.classList.toggle('open');
  categoryTrigger.setAttribute('aria-expanded', String(isOpen));
});

categoryButtons.forEach(button => {
  button.addEventListener('click', () => {
    selectedCategory = button.dataset.category;
    categoryButtons.forEach(item => item.classList.remove('active'));
    button.classList.add('active');
    categoryLabel.textContent = button.textContent;
    categoryMenu.classList.remove('open');
    categoryTrigger.setAttribute('aria-expanded', 'false');
    filterProducts();
  });
});

document.addEventListener('click', event => {
  if (!categoryMenu.contains(event.target)) {
    categoryMenu.classList.remove('open');
    categoryTrigger.setAttribute('aria-expanded', 'false');
  }
});

const storeProducts = {
  volt: { name: 'Volt Runner Pro', price: '₹5,999', color: 'Lavender Court', colorKey: 'lavender', photo: 'assets/img/volt-option1-side.png' },
  shadow: { name: 'Shadow Court X', price: '₹7,499', color: 'Classic Brown', colorKey: 'shadow-classic', photo: 'assets/img/shadow-option1-side.png' },
  cloud: { name: 'Cloud Drift 2', price: '₹4,999', color: 'Cloud White', colorKey: 'white', photo: 'assets/img/market-cloud-drift-2.png' },
  anime: { name: 'Manga Blaze Low', price: '₹6,299', color: 'Anime Orange', colorKey: 'orange', photo: 'assets/img/market-anime-blaze-low.png' },
  metro: { name: 'Wukong Special', price: '₹5,499', color: 'Metro Blue', colorKey: 'blue', photo: 'assets/img/market-metro-sprint.png' },
  prime: { name: 'Golden Dunker', price: '₹6,999', color: 'Prime Red', colorKey: 'red', photo: 'assets/img/market-prime-dunker.png' }
};

document.querySelectorAll('.quick-cart').forEach(button => {
  button.addEventListener('click', () => {
    const key = button.dataset.shoe;
    const item = storeProducts[key];
    const card = button.closest('.product-card');
    const cardName = card?.querySelector('h2')?.textContent?.trim() || item.name;
    const cardPrice = card?.querySelector('.meta strong')?.textContent?.trim() || item.price;
    const cardPhoto = card?.querySelector('.product-image img')?.getAttribute('src') || item.photo;
    const cart = JSON.parse(localStorage.getItem('solemateCart') || '[]');
    cart.push({ id: Date.now(), key, name: cardName, price: cardPrice, color: item.color, colorKey: item.colorKey, photo: cardPhoto, size: '8', quantity: 1 });
    localStorage.setItem('solemateCart', JSON.stringify(cart));
    button.textContent = 'Added ✓';
    setTimeout(() => button.textContent = 'Cart', 900);
  });
});
