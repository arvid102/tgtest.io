let tg = window.Telegram.WebApp;

tg.expand();

function openNav() {
    document.getElementById("mySidenav").style.width = "100%";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}

function initializeNavigation() {
    const menuButton = document.getElementById("menuButton");
    if (menuButton) {
        menuButton.addEventListener("click", openNav);
    }
}

document.addEventListener("DOMContentLoaded", initializeNavigation);

// Fetch products from an API or use static data
const products = [
    { id: 1, name: "Cyberpunk Rebecca T-Shirt", price: 10.99, image: "images/cyberbunk_rebecca.png", category: "t-shirt" },
    { id: 2, name: "I Love BMW T-Shirt", price: 15.99, image: "images/love_bmw1.png", category: "t-shirt" },
    { id: 3, name: "Gojo T-Shirt", price: 12.99, image: "images/gojo_satoru_nike.png", category: "t-shirt" },
    { id: 4, name: "Just Drift It T-Shirt", price: 18.99, image: "images/just_drift_it.png", category: "t-shirt" },
    { id: 5, name: "Solo Leveling T-Shirt", price: 25.99, image: "images/solo_lvl_0.png", category: "t-shirt" },
    { id: 6, name: "Himiko Toga T-Shirt", price: 5.99, image: "images/himiko_toga.png", category: "t-shirt" },
    { id: 7, name: "GTR Godzila T-Shirt", price: 15.99, image: "images/unisex-basic-softstyle-t-shirt-black-front-66140a7d886f6.png", category: "t-shirt" },
    { id: 8, name: "Nezuko Lightbox", price: 25.99, image: "images/Visual-Night-Lights-LED-Demon-Slayer.jpg", category: "decor" },
    { id: 9, name: "Ghoul Lightbox", price: 24.99, image: "images/Anime-Lightbox-Tokyo-Ghoul2.jpg", category: "decor" },
    { id: 10, name: "Toga T-Shirt", price: 5.99, image: "images/himiko_toga.png", category: "t-shirt" },
    { id: 11, name: "imiko Toga T-Shirt", price: 5.99, image: "images/himiko_toga.png", category: "t-shirt" },
    { id: 12, name: "Display Frame Case", price: 5.99, image: "images/Hot-Sale-1-Set-70-70mm-Black-3D-Floating-Jewelry-Coin-Display-Frame-Holder-Box-Case.jpg_.webp", category: "decor" },
    { id: 13, name: "Toga T-Shirt", price: 10.99, image: "images/himiko_toga.png", category: "t-shirt" },
    { id: 14, name: "MHA T-Shirt", price: 9.99, image: "images/himiko_toga.png", category: "t-shirt" },
    { id: 15, name: "MHA Toga T-Shirt", price: 5.99, image: "images/himiko_toga.png", category: "t-shirt" },
    { id: 16, name: "imi Toga T-Shirt", price: 8.99, image: "images/himiko_toga.png", category: "t-shirt" },
    { id: 17, name: "ko Toga T-Shirt", price: 12.99, image: "images/himiko_toga.png", category: "t-shirt" },
    { id: 18, name: "H Toga T-Shirt", price: 9.99, image: "images/himiko_toga.png", category: "t-shirt" },
    { id: 19, name: "My Toga T-Shirt", price: 6.99, image: "images/himiko_toga.png", category: "t-shirt" },
    { id: 20, name: "My hero Toga T-Shirt", price: 5.99, image: "images/himiko_toga.png", category: "t-shirt" },
    { id: 21, name: "White Toga T-Shirt", price: 10.99, image: "images/himiko_toga.png", category: "t-shirt" },
    { id: 22, name: "mha Toga T-Shirt", price: 17.99, image: "images/himiko_toga.png", category: "t-shirt" },
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

let isGridView = true;

function toggleView() {
    isGridView = !isGridView;
    const listButton = document.querySelector('.list-button');
    const gridButton = document.querySelector('.grid-button');
    const productsDiv = document.getElementById('products');
    
    if (isGridView) {
        gridButton.classList.add('active');
        listButton.classList.remove('active');
        productsDiv.classList.remove('list-view');
        productsDiv.classList.add('grid-view');
    } else {
        listButton.classList.add('active');
        gridButton.classList.remove('active');
        productsDiv.classList.remove('grid-view');
        productsDiv.classList.add('list-view');
    }
    
    filterProducts();
}

function renderProducts(productsToRender) {
    const productsDiv = document.getElementById('products');
    productsDiv.innerHTML = productsToRender.map(product => `
        <div class="product">
            <img src="${product.image}" alt="${product.name}">
            <div class="product-info">
                <h3>${product.name}</h3>
                <p>€${product.price.toFixed(2)}</p>
                <button onclick="addToCart(${product.id})">Add to Cart</button>
            </div>
        </div>
    `).join('');
}

// Add these lines at the end of your existing JavaScript
document.querySelector('.list-button').addEventListener('click', toggleView);
document.querySelector('.grid-button').addEventListener('click', toggleView);

// Initial setup
document.getElementById('products').classList.add('grid-view');

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
