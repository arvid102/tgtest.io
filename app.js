let tg = window.Telegram.WebApp;

tg.expand();

function openNav() {
    document.getElementById("mySidenav").style.width = "100%";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}

// Add event listener to menu button
document.getElementById("menuButton").addEventListener("click", openNav);

// Fetch products from an API or use static data
const products = [
    { id: 1, name: "Product 1", price: 10.99, image: "4.png" },
    { id: 2, name: "Product 2", price: 15.99, image: "14.png" },
    { id: 3, name: "Product 3", price: 12.99, image: "14.png" },
    { id: 4, name: "Product 4", price: 18.99, image: "14.png" },
    { id: 5, name: "Product 5", price: 25.99, image: "14.png" },
    { id: 6, name: "Product 6", price: 5.99, image: "14.png" },
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

function updateCartSummary() {
    const cartElement = document.getElementById('cart');
    const itemCount = cart.length;
    const totalPrice = cart.reduce((sum, item) => sum + item.price, 0).toFixed(2);

    cartElement.innerHTML = `
        <div class="cart-summary">
            <div class="cart-info">
                <span class="item-count">${itemCount} Item${itemCount !== 1 ? 's' : ''}</span>
                <span class="total-price">Total: $${totalPrice}</span>
            </div>
            <div class="cart-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <circle cx="9" cy="21" r="1"></circle>
                    <circle cx="20" cy="21" r="1"></circle>
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                </svg>
            </div>
        </div>
    `;

    // Show or hide the cart summary based on whether there are items in the cart
    cartElement.style.display = itemCount > 0 ? 'block' : 'none';

    // Enable the Main Button when cart is not empty
    if (itemCount > 0) {
        tg.MainButton.text = "Place Order";
        tg.MainButton.show();
    } else {
        tg.MainButton.hide();
    }
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
