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
    { id: 1, name: "Product 1", price: 10.99, image: "images/love_bmw1.png" },
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
    updateCart();
}

function updateCart() {
    const cartDiv = document.getElementById('cart');
    if (cart.length === 0) {
        cartDiv.innerHTML = "<p>Your cart is empty</p>";
        return;
    }

    const cartItems = cart.reduce((acc, item) => {
        if (acc[item.id]) {
            acc[item.id].quantity += 1;
        } else {
            acc[item.id] = { ...item, quantity: 1 };
        }
        return acc;
    }, {});

    const total = cart.reduce((sum, item) => sum + item.price, 0);

    cartDiv.innerHTML = `
        ${Object.values(cartItems).map(item => `
            <div class="cart-item">
                <span>${item.name} x${item.quantity}</span>
                <span>$${(item.price * item.quantity).toFixed(2)}</span>
            </div>
        `).join('')}
        <div class="cart-total">Total: $${total.toFixed(2)}</div>
    `;

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
