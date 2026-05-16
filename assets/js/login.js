const loginForm = document.getElementById('loginForm');
const loginTab = document.getElementById('loginTab');
const signupTab = document.getElementById('signupTab');
const switchBtn = document.getElementById('switchBtn');
const formTitle = document.getElementById('formTitle');
const formText = document.getElementById('formText');
const modeLabel = document.getElementById('modeLabel');
const submitBtn = document.getElementById('submitBtn');
const switchCopy = document.getElementById('switchCopy');
const nameField = document.getElementById('nameField');
const confirmField = document.getElementById('confirmField');
const nameInput = document.getElementById('nameInput');
const emailInput = document.getElementById('emailInput');
const passwordInput = document.getElementById('passwordInput');
const confirmInput = document.getElementById('confirmInput');
const loginToast = document.getElementById('loginToast');

let mode = 'login';

function setMode(nextMode) {
  mode = nextMode;
  const isSignup = mode === 'signup';
  loginTab.classList.toggle('active', !isSignup);
  signupTab.classList.toggle('active', isSignup);
  nameField.classList.toggle('show', isSignup);
  confirmField.classList.toggle('show', isSignup);
  nameInput.required = isSignup;
  confirmInput.required = isSignup;
  modeLabel.textContent = isSignup ? 'Create account' : 'Member login';
  formTitle.textContent = isSignup ? 'Join soleMATE' : 'Welcome back';
  formText.textContent = isSignup
    ? 'Create your soleMATE account to save your sneaker profile, cart and orders on this browser.'
    : 'Login to enter the soleMATE sneaker store and track your cart, checkout and orders.';
  submitBtn.textContent = isSignup ? 'Sign Up' : 'Login';
  switchCopy.innerHTML = isSignup
    ? 'Already have an account? <button type="button" id="switchBtn">Login here</button>'
    : 'New to soleMATE? <button type="button" id="switchBtn">Create an account</button>';
  document.getElementById('switchBtn').addEventListener('click', () => setMode(isSignup ? 'login' : 'signup'));
}

function showToast(message) {
  loginToast.textContent = message;
  loginToast.classList.add('show');
}

loginTab.addEventListener('click', () => setMode('login'));
signupTab.addEventListener('click', () => setMode('signup'));
switchBtn.addEventListener('click', () => setMode('signup'));

loginForm.addEventListener('submit', event => {
  event.preventDefault();
  const email = emailInput.value.trim().toLowerCase();
  const password = passwordInput.value;
  const customers = JSON.parse(localStorage.getItem('solemateCustomers') || '[]');

  if (mode === 'signup') {
    if (passwordInput.value !== confirmInput.value) {
      alert('Passwords do not match.');
      return;
    }
    if (customers.some(customer => customer.email === email)) {
      alert('This email already exists. Please login.');
      setMode('login');
      return;
    }
    const newCustomer = {
      id: 'CUST' + Date.now(),
      name: nameInput.value.trim() || 'soleMATE User',
      email,
      password,
      joinedAt: new Date().toLocaleString(),
      orders: []
    };
    customers.push(newCustomer);
    localStorage.setItem('solemateCustomers', JSON.stringify(customers));
    localStorage.setItem('solemateUser', JSON.stringify({
      id: newCustomer.id,
      name: newCustomer.name,
      email: newCustomer.email,
      signedAt: new Date().toLocaleString()
    }));
    submitBtn.disabled = true;
    submitBtn.style.opacity = '0.75';
    showToast('Sign up successful!');
    setTimeout(() => { window.location.href = 'home.html'; }, 1150);
    return;
  }

  const existing = customers.find(customer => customer.email === email);
  if (existing && existing.password !== password) {
    alert('Wrong password.');
    return;
  }
  const user = existing ? {
    id: existing.id,
    name: existing.name,
    email: existing.email,
    signedAt: new Date().toLocaleString()
  } : {
    id: 'GUEST' + Date.now(),
    name: email.split('@')[0] || 'soleMATE User',
    email,
    signedAt: new Date().toLocaleString()
  };
  localStorage.setItem('solemateUser', JSON.stringify(user));
  submitBtn.disabled = true;
  submitBtn.style.opacity = '0.75';
  showToast('Login successful!');
  setTimeout(() => { window.location.href = 'home.html'; }, 1150);
});

setMode('login');
