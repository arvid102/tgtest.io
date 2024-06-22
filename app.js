let tg = window.Telegram.WebApp;

tg.expand();

// Fetch products from an API or use static data
const products = [
    { id: 1, name: "Product 1", price: 10.99, image: "https://arvid102.github.io/redstore.io/1.png" },
    { id: 2, name: "Product 2", price: 15.99, image: "https://arvid102.github.io/redstore.io/1.png" },
    // Add more products...
];

const cart = [];

function renderProducts() {
    const productsDiv = document.getElementById('products');
    productsDiv.innerHTML = products.map(product => `
        <div class="product">
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>$${product.price.toFixed(2)}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        </div>
    `).join('');
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    cart.push(product);
    renderCart();
}

function renderCart() {
    const cartDiv = document.getElementById('cart');
    cartDiv.innerHTML = cart.map(item => `
        <div class="cart-item">
            <span>${item.name}</span>
            <span>$${item.price.toFixed(2)}</span>
        </div>
    `).join('');
    
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    cartDiv.innerHTML += `<div class="total">Total: $${total.toFixed(2)}</div>`;
    
    // Enable the Main Button when cart is not empty
    if (cart.length > 0) {
        tg.MainButton.text = "Place Order";
        tg.MainButton.show();
    } else {
        tg.MainButton.hide();
    }
}

tg.MainButton.onClick(() => {
    tg.sendData(JSON.stringify(cart));
});

// Initial render
renderProducts();
renderCart();
