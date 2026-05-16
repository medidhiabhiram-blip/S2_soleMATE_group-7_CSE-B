const { useState } = React;

const products = {
  volt: { name: 'Volt Runner Pro', price: '₹5,999', color: 'Volt Orange', colorKey: 'orange', photo: '' /* Add image path like: assets/img/your-shoe-photo.png */ },
  shadow: { name: 'Shadow Court X', price: '₹7,499', color: 'Midnight Black', colorKey: 'black', photo: '' },
  cloud: { name: 'Cloud Drift 2', price: '₹4,999', color: 'Cloud White', colorKey: 'white', photo: '' },
  anime: { name: 'Manga Blaze Low', price: '₹6,299', color: 'Anime Orange', colorKey: 'orange', photo: '' },
  metro: { name: 'Wukong Special', price: '₹5,499', color: 'Metro Blue', colorKey: 'blue', photo: '' },
  prime: { name: 'Golden Dunker', price: '₹6,999', color: 'Prime Red', colorKey: 'red', photo: '' }
};

const gradients = {
  orange: 'linear-gradient(135deg,#ff4d00,#ffffff,#111111)',
  black: 'linear-gradient(135deg,#111111,#444444,#ff4d00)',
  white: 'linear-gradient(135deg,#ffffff,#dddddd,#111111)',
  blue: 'linear-gradient(135deg,#1565ff,#ffffff,#111111)',
  red: 'linear-gradient(135deg,#ff1f3d,#ffffff,#111111)'
};

function numberPrice(price) { return Number(String(price).replace(/[^0-9]/g, '')) || 0; }
function rupees(value) { return '₹' + value.toLocaleString('en-IN'); }
function getCheckoutItems() {
  const params = new URLSearchParams(window.location.search);
  if (params.get('from') === 'cart') return JSON.parse(localStorage.getItem('solemateCart') || '[]');
  const key = params.get('shoe') || 'volt';
  const item = products[key] || products.volt;
  return [{
    id: Date.now(),
    key,
    ...item,
    color: params.get('color') || item.color,
    colorKey: params.get('colorKey') || item.colorKey,
    size: params.get('size') || '8',
    quantity: 1,
    price: params.get('price') || item.price,
    basePrice: params.get('basePrice') || item.price,
    upgradePrice: params.get('upgrades') || '₹0',
    sole: params.get('sole') || 'Classic Sole',
    cushion: params.get('cushion') || 'Standard Cushion',
    material: params.get('material') || 'Standard Mesh',
    build: [params.get('sole') || 'Classic Sole', params.get('cushion') || 'Standard Cushion', params.get('material') || 'Standard Mesh'].join(' • ')
  }];
}
function saveOrder(order) {
  const orders = JSON.parse(localStorage.getItem('solemateOrders') || '[]');
  orders.unshift(order);
  localStorage.setItem('solemateOrders', JSON.stringify(orders));
}
function CheckoutApp() {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', address: '', landmark: '', city: '', state: '', pincode: '',
    payment: 'UPI', upiId: '', upiApp: '', cardName: '', cardNumber: '', expiry: '', cvv: '', codNote: ''
  });
  const [placed, setPlaced] = useState(false);
  const [items] = useState(getCheckoutItems());
  const update = event => setForm({ ...form, [event.target.name]: event.target.value });
  const total = items.reduce((sum, item) => sum + numberPrice(item.price) * (item.quantity || 1), 0);
  const itemCount = items.reduce((sum, item) => sum + (item.quantity || 1), 0);
  const submit = event => {
    event.preventDefault();
    const order = {
      id: 'SM' + Date.now(),
      date: new Date().toLocaleString(),
      status: form.payment === 'Cash on Delivery' ? 'COD Confirmed' : (form.payment === 'UPI' ? 'UPI Payment Pending Demo' : 'Paid / Confirmed'),
      payment: form.payment,
      total: rupees(total),
      customer: { name: form.name, email: form.email, phone: form.phone, city: form.city, pincode: form.pincode },
      items
    };
    saveOrder(order);
    const user = JSON.parse(localStorage.getItem('solemateUser') || '{}');
    const customers = JSON.parse(localStorage.getItem('solemateCustomers') || '[]');
    localStorage.setItem('solemateCustomers', JSON.stringify(customers.map(customer => customer.email === user.email ? { ...customer, orders: [order, ...(customer.orders || [])] } : customer)));
    localStorage.removeItem('solemateCart');
    setPlaced(true);
  };

  if (placed) {
    return React.createElement('main', { className: 'checkout-page success-layout' },
      React.createElement('section', { className: 'success-card' },
        React.createElement('div', { className: 'confetti-wrap' },
          React.createElement('span', null), React.createElement('span', null), React.createElement('span', null), React.createElement('span', null), React.createElement('span', null), React.createElement('span', null)
        ),
        React.createElement('div', { className: 'checkmark' }, '✓'),
        React.createElement('h1', null, 'Congrats! Order Placed'),
        React.createElement('p', null, `Thanks ${form.name || 'sneakerhead'}, your ${itemCount} item soleMATE demo order is confirmed.`),
        React.createElement('div', { className: 'placed-preview' },
          items.map(item => React.createElement('div', { className: 'placed-line', key: item.id || item.name },
            React.createElement('div', null,
              React.createElement('strong', null, item.name),
              React.createElement('span', null, `${item.color || 'Selected color'} • UK ${item.size || '8'} • Qty ${item.quantity || 1}${item.build ? ' • ' + item.build : ''}`)
            ),
            React.createElement('em', null, rupees(numberPrice(item.price) * (item.quantity || 1)))
          ))
        ),
        React.createElement('a', { href: '../profile.html' }, 'View My Orders'),
        React.createElement('a', { className: 'light-link', href: '../marketplace.html' }, 'Continue Shopping')
      )
    );
  }

  return React.createElement('main', { className: 'checkout-page' },
    React.createElement('section', { className: 'summary-card' },
      React.createElement('a', { className: 'home-link', href: '../cart.html' }, '← Back to Cart'),
      React.createElement('p', { className: 'tagline' }, 'React checkout'),
      React.createElement('h1', null, 'Complete your sneaker order.'),
      items.length ? items.map(item => React.createElement('article', { className: 'summary-product text-only', key: item.id || item.name },
        React.createElement('div', null,
          React.createElement('h3', null, item.name),
          React.createElement('p', null, `${item.color || 'Selected color'} • UK ${item.size || '8'} • Qty ${item.quantity || 1}${item.build ? ' • ' + item.build : ''}`)
        ),
        React.createElement('strong', null, rupees(numberPrice(item.price) * (item.quantity || 1)))
      )) : React.createElement('div', { className: 'order-line' }, React.createElement('span', null, 'No cart items'), React.createElement('strong', null, '₹0')),
      React.createElement('div', { className: 'order-line' }, React.createElement('span', null, 'Items'), React.createElement('strong', null, String(itemCount))),
      React.createElement('div', { className: 'order-line' }, React.createElement('span', null, 'Delivery'), React.createElement('strong', null, 'Free')),
      React.createElement('div', { className: 'total' }, React.createElement('span', null, 'Total'), React.createElement('strong', null, rupees(total)))
    ),
    React.createElement('section', { className: 'form-card' },
      React.createElement('form', { onSubmit: submit },
        React.createElement('h2', null, 'Delivery Details'),
        React.createElement('div', { className: 'two-col' },
          React.createElement('label', null, 'Full Name', React.createElement('input', { name: 'name', value: form.name, onChange: update, required: true })),
          React.createElement('label', null, 'Phone', React.createElement('input', { name: 'phone', value: form.phone, onChange: update, required: true, pattern: '[0-9]{10}', placeholder: '10 digit number' }))
        ),
        React.createElement('label', null, 'Email', React.createElement('input', { type: 'email', name: 'email', value: form.email, onChange: update, required: true })),
        React.createElement('label', null, 'Address', React.createElement('textarea', { name: 'address', value: form.address, onChange: update, required: true, placeholder: 'House no, street, area' })),
        React.createElement('label', null, 'Landmark / Delivery Note', React.createElement('input', { name: 'landmark', value: form.landmark, onChange: update, placeholder: 'Near college, gate no, etc.' })),
        React.createElement('div', { className: 'three-col' },
          React.createElement('label', null, 'City', React.createElement('input', { name: 'city', value: form.city, onChange: update, required: true })),
          React.createElement('label', null, 'State', React.createElement('input', { name: 'state', value: form.state, onChange: update, required: true })),
          React.createElement('label', null, 'Pincode', React.createElement('input', { name: 'pincode', value: form.pincode, onChange: update, required: true, pattern: '[0-9]{6}' }))
        ),
        React.createElement('h2', { className: 'payment-title' }, 'Payment Details'),
        React.createElement('label', null, 'Payment Method', React.createElement('select', { name: 'payment', value: form.payment, onChange: update },
          React.createElement('option', null, 'UPI'), React.createElement('option', null, 'Card'), React.createElement('option', null, 'Cash on Delivery')
        )),
        form.payment === 'UPI' && React.createElement('div', { className: 'upi-box' },
          React.createElement('strong', null, 'UPI Payment selected'),
          React.createElement('p', null, 'Enter your UPI ID or preferred UPI app. This is a demo checkout, so no real payment will be taken.'),
          React.createElement('div', { className: 'two-col' },
            React.createElement('label', null, 'UPI ID', React.createElement('input', { name: 'upiId', value: form.upiId, onChange: update, required: true, pattern: '[a-zA-Z0-9._-]+@[a-zA-Z]{2,}', placeholder: 'name@upi' })),
            React.createElement('label', null, 'UPI App', React.createElement('select', { name: 'upiApp', value: form.upiApp, onChange: update, required: true },
              React.createElement('option', { value: '' }, 'Select app'),
              React.createElement('option', null, 'PhonePe'),
              React.createElement('option', null, 'Google Pay'),
              React.createElement('option', null, 'Paytm'),
              React.createElement('option', null, 'BHIM')
            ))
          ),
          React.createElement('div', { className: 'upi-preview' },
            React.createElement('div', { className: 'qr-demo' }, 'UPI'),
            React.createElement('span', null, 'Scan/pay screen placeholder')
          )
        ),
        form.payment === 'Card' && React.createElement('div', { className: 'payment-box' },
          React.createElement('label', null, 'Name on Card', React.createElement('input', { name: 'cardName', value: form.cardName, onChange: update, required: true })),
          React.createElement('label', null, 'Card Number', React.createElement('input', { name: 'cardNumber', value: form.cardNumber, onChange: update, required: true, pattern: '[0-9 ]{12,19}', placeholder: '1234 5678 9012 3456' })),
          React.createElement('div', { className: 'two-col' },
            React.createElement('label', null, 'Expiry', React.createElement('input', { name: 'expiry', value: form.expiry, onChange: update, required: true, placeholder: 'MM/YY' })),
            React.createElement('label', null, 'CVV', React.createElement('input', { name: 'cvv', value: form.cvv, onChange: update, required: true, pattern: '[0-9]{3,4}', placeholder: '123' }))
          )
        ),
        form.payment === 'Cash on Delivery' && React.createElement('div', { className: 'cod-box' },
          React.createElement('strong', null, 'Cash on Delivery selected'),
          React.createElement('p', null, 'Pay with cash when your sneakers arrive. Keep exact cash ready for faster delivery.'),
          React.createElement('label', null, 'COD Note', React.createElement('input', { name: 'codNote', value: form.codNote, onChange: update, placeholder: 'Call before delivery / exact cash available' }))
        ),
        React.createElement('button', { type: 'submit', disabled: !items.length }, items.length ? 'Place Order' : 'Cart Empty')
      )
    )
  );
}
ReactDOM.createRoot(document.getElementById('root')).render(React.createElement(CheckoutApp));
