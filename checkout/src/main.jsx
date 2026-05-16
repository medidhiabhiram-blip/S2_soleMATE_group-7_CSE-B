import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import './style.css';

const products = {
  volt: { name: 'Volt Runner Pro', price: '₹5,999', color: 'Volt Orange', colorKey: 'orange' },
  shadow: { name: 'Shadow Court X', price: '₹7,499', color: 'Midnight Black', colorKey: 'black' },
  cloud: { name: 'Cloud Drift 2', price: '₹4,999', color: 'Cloud White', colorKey: 'white' },
  anime: { name: 'Manga Blaze Low', price: '₹6,299', color: 'Anime Orange', colorKey: 'orange' },
  metro: { name: 'Wukong Special', price: '₹5,499', color: 'Metro Blue', colorKey: 'blue' },
  prime: { name: 'Golden Dunker', price: '₹6,999', color: 'Prime Red', colorKey: 'red' }
};
const numberPrice = price => Number(String(price).replace(/[^0-9]/g, '')) || 0;
const rupees = value => '₹' + value.toLocaleString('en-IN');
const getCheckoutItems = () => {
  const params = new URLSearchParams(window.location.search);
  if (params.get('from') === 'cart') return JSON.parse(localStorage.getItem('solemateCart') || '[]');
  const key = params.get('shoe') || 'volt';
  const item = products[key] || products.volt;
  return [{ id: Date.now(), key, ...item, size: '8', quantity: 1 }];
};

function CheckoutApp() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', address: '', city: '', payment: 'UPI' });
  const [placed, setPlaced] = useState(false);
  const [items] = useState(getCheckoutItems());
  const update = event => setForm({ ...form, [event.target.name]: event.target.value });
  const total = items.reduce((sum, item) => sum + numberPrice(item.price) * (item.quantity || 1), 0);
  const itemCount = items.reduce((sum, item) => sum + (item.quantity || 1), 0);
  const submit = event => {
    event.preventDefault();
    localStorage.removeItem('solemateCart');
    setPlaced(true);
  };
  if (placed) {
    return <main className="checkout-page"><section className="success-card"><div className="confetti-wrap"><span></span><span></span><span></span><span></span><span></span><span></span></div><div className="success-shoe"></div><div className="checkmark">✓</div><h1>Congrats! Order Placed</h1><p>Thanks {form.name || 'sneakerhead'}, your {itemCount} item soleMATE demo order is confirmed and ready to roll.</p><a href="../marketplace.html">Continue Shopping</a></section></main>;
  }
  return <main className="checkout-page"><section className="summary-card"><a className="home-link" href="../cart.html">← Back to Cart</a><p className="tagline">React checkout</p><h1>Complete your sneaker order.</h1><div className="mini-shoe"></div>{items.length ? items.map(item => <div className="order-line" key={item.id || item.name}><span>{item.name} × {item.quantity || 1}</span><strong>{rupees(numberPrice(item.price) * (item.quantity || 1))}</strong></div>) : <div className="order-line"><span>No cart items</span><strong>₹0</strong></div>}<div className="order-line"><span>Delivery</span><strong>Free</strong></div><div className="total"><span>Total</span><strong>{rupees(total)}</strong></div></section><section className="form-card"><form onSubmit={submit}><h2>Delivery Details</h2><label>Full Name<input name="name" value={form.name} onChange={update} required /></label><label>Email<input type="email" name="email" value={form.email} onChange={update} required /></label><label>Phone<input name="phone" value={form.phone} onChange={update} required /></label><label>Address<textarea name="address" value={form.address} onChange={update} required /></label><label>City<input name="city" value={form.city} onChange={update} required /></label><label>Payment Method<select name="payment" value={form.payment} onChange={update}><option>UPI</option><option>Card</option><option>Cash on Delivery</option></select></label>{form.payment === 'UPI' && <div className="upi-box"><strong>UPI Payment selected</strong><p>Enter a demo UPI ID. No real payment will be taken.</p><label>UPI ID<input name="upiId" value={form.upiId} onChange={update} required placeholder="name@upi" /></label></div>}<button type="submit" disabled={!items.length}>{items.length ? 'Place Order' : 'Cart Empty'}</button></form></section></main>;
}

createRoot(document.getElementById('root')).render(<CheckoutApp />);
