let tg = window.Telegram.WebApp;

tg.expand();

function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}

// This function should be called when the DOM is fully loaded
function initializeNavigation() {
    document.getElementById("menuButton").addEventListener("click", openNav);
}

// Call initializeNavigation when the DOM is loaded
document.addEventListener("DOMContentLoaded", initializeNavigation);

// Fetch products from an API or use static data
const products = [
    { id: 1, name: "Cyberpunk Rebecca T-Shirt", price: 10.99, image: "images/cyberbunk_rebecca.png", category: "t-shirt" },
    { id: 2, name: "I Love BMW T-Shirt", price: 15.99, image: "images/love_bmw1.png", category: "t-shirt" },
    { id: 3, name: "Gojo T-Shirt", price: 12.99, image: "images/gojo_satoru_nike.png", category: "t-shirt" },
    { id: 4, name: "Just Drift It T-Shirt", price: 18.99, image: "images/just_drift_it.png", category: "t-shirt" },
    { id: 5, name: "Solo Leveling T-Shirt", price: 25.99, image: "images/solo_lvl_0.png", category: "t-shirt" },
    { id: 6, name: "Himiko Toga T-Shirt", price: 5.99, image: "images/himiko_toga.png", category: "t-shirt" },
    // Add more products...
];

const cart = [];

function filterProducts() {
    const searchTerm = document.getElementById('search').value.toLowerCase();
    const category = document.getElementById('category').value;
    const sortBy = document.getElementById('sort').value;

    let filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(searchTerm) &&
        (category === '' || product.category === category)
    );

    if (sortBy === 'name') {
        filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'price-asc') {
        filteredProducts.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
        filteredProducts.sort((a, b) => b.price - a.price);
    }

    renderProducts(filteredProducts);
}

function renderProducts(productsToRender) {
    const productsDiv = document.getElementById('products');
    productsDiv.innerHTML = productsToRender.map(product => `
        <div class="product">
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>€${product.price.toFixed(2)}</p>
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
                <span>€${(item.price * item.quantity).toFixed(2)}</span>
            </div>
        `).join('')}
        <div class="cart-total">Total: €${total.toFixed(2)}</div>
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
filterProducts();

// Add event listeners
document.getElementById('search').addEventListener('input', filterProducts);
document.getElementById('category').addEventListener('change', filterProducts);
document.getElementById('sort').addEventListener('change', filterProducts);
