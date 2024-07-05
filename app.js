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

document.addEventListener('DOMContentLoaded', () => {
    const languageSelector = document.querySelector('.language-selector');
    const selectedLanguage = languageSelector.querySelector('.selected-language');
    const languageOptions = languageSelector.querySelector('.language-options');
    const currentLanguageSpan = languageSelector.querySelector('.current-language');

    selectedLanguage.addEventListener('click', (e) => {
        e.stopPropagation();
        languageOptions.style.display = languageOptions.style.display === 'block' ? 'none' : 'block';
    });

    languageOptions.addEventListener('click', (e) => {
        if (e.target.tagName === 'LI') {
            const selectedLang = e.target.getAttribute('data-lang');
            const selectedText = e.target.textContent;
            
            currentLanguageSpan.textContent = selectedText;

            languageOptions.querySelectorAll('li').forEach(li => {
                li.classList.remove('selected');
            });
            e.target.classList.add('selected');

            languageOptions.style.display = 'none';

            i18n.setLanguage(selectedLang);
        }
    });

    document.addEventListener('click', () => {
        languageOptions.style.display = 'none';
    });
});

// let currentLang = localStorage.getItem('language') || 'en';
// let translations = {};

// async function loadTranslations(lang) {
//   const response = await fetch(`lang/${lang}.json`);
//   translations = await response.json();
//   updatePageContent();
// }

// function updatePageContent() {
//   document.querySelectorAll('[data-i18n]').forEach(element => {
//     const key = element.getAttribute('data-i18n');
//     element.textContent = translations[key] || key;
//   });
// }

// document.getElementById('languageSelector').addEventListener('change', (e) => {
//   currentLang = e.target.value;
//   localStorage.setItem('language', currentLang);
//   loadTranslations(currentLang);
// });

// // Initial load
// loadTranslations(currentLang);

// document.getElementById('languageSelector').value = currentLang;


document.addEventListener("DOMContentLoaded", initializeNavigation);

let products = [];
const cart = [];

// Fetch products from JSON file
fetch('products.json')
    .then(response => response.json())
    .then(data => {
        products = data.products;
        filterProducts();
    })
    .catch(error => console.error('Error loading products:', error));

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
        if (typeof i18n !== 'undefined') {
        i18n.updateContent();
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
        <div class="product" onclick="showProductDetails(${product.id})">
            <img src="${product.image}" alt="${product.name}">
            <div class="product-info">
                <h3>${product.name}</h3>
                <p>€${product.price.toFixed(2)}</p>
                <button onclick="showProductDetails(${product.id})">${i18n.translate('viewMore')}</button>
            </div>
        </div>
    `).join('');
}

function showProductDetails(productId) {
    const product = products.find(p => p.id === productId);
    const modal = document.getElementById('productModal');
    const modalContent = document.getElementById('modalProductDetails');

    modalContent.innerHTML = `
        <span class="close">&times;</span>
        <div class="product-details">
            <div class="product-images-container">
                <div class="main-image">
                    <img src="${product.image}" alt="${product.name}" id="mainProductImage">
                </div>
                <div class="thumbnail-images">
                    <img src="${product.image}" alt="${product.name}" onclick="changeMainImage(this.src)">
                    ${product.additionalImages ? product.additionalImages.map(img => `<img src="${img}" alt="${product.name}" onclick="changeMainImage(this.src)">`).join('') : ''}
                </div>
            </div>
            <div class="product-info">
                <h2>${product.name}</h2>
                <p>${product.description || ''}</p>
                <p>Price: €${product.price.toFixed(2)}</p>
                <p>Category: ${product.category}</p>
                
                ${product.colors ? `
                <div class="product-options">
                    <div class="color-options">
                        <label for="color-select">Color:</label>
                        <select id="color-select">
                            ${product.colors.map(color => `<option value="${color}">${color}</option>`).join('')}
                        </select>
                    </div>
                </div>
                ` : ''}
                
                ${product.sizes ? `
                <div class="product-options">
                    <div class="size-options">
                        <label for="size-select">Size:</label>
                        <select id="size-select">
                            ${product.sizes.map(size => `<option value="${size}">${size}</option>`).join('')}
                        </select>
                    </div>
                </div>
                ` : ''}
                
                <button onclick="addToCartFromModal(${product.id})">Add to Cart</button>
            </div>
        </div>
    `;

    modal.style.display = "block";

    const closeButton = modalContent.querySelector('.close');
    closeButton.onclick = function() {
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}

function addToCartFromModal(productId) {
    const color = document.getElementById('color-select')?.value;
    const size = document.getElementById('size-select')?.value;
    addToCart(productId, color, size);
}

function changeMainImage(src) {
    document.getElementById('mainProductImage').src = src;
}

function addToCart(productId, color, size) {
    const product = products.find(p => p.id === productId);
    const cartItem = {
        ...product,
        color: color,
        size: size,
        quantity: 1
    };
    
    cart.push(cartItem);
    updateCart();
    
    document.getElementById('productModal').style.display = "none";
}

function updateCart() {
    const cartDiv = document.getElementById('cart');
    if (cart.length === 0) {
        cartDiv.innerHTML = "<p>Your cart is empty</p>";
        return;
    }

    const cartItems = cart.reduce((acc, item) => {
        const key = `${item.id}-${item.color}-${item.size}`;
        if (acc[key]) {
            acc[key].quantity += 1;
        } else {
            acc[key] = { ...item, quantity: 1 };
        }
        return acc;
    }, {});

    const total = cart.reduce((sum, item) => sum + item.price, 0);

    cartDiv.innerHTML = `
        ${Object.values(cartItems).map(item => `
            <div class="cart-item">
                <span>${item.name} ${item.color ? `(${item.color})` : ''} ${item.size ? `(${item.size})` : ''} x${item.quantity}</span>
                <span>€${(item.price * item.quantity).toFixed(2)}</span>
            </div>
        `).join('')}
        <div class="cart-total">Total: €${total.toFixed(2)}</div>
    `;

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

document.querySelector('.list-button').addEventListener('click', toggleView);
document.querySelector('.grid-button').addEventListener('click', toggleView);

document.getElementById('products').classList.add('grid-view');

document.getElementById('search').addEventListener('input', filterProducts);
document.getElementById('category').addEventListener('change', filterProducts);
document.getElementById('sort').addEventListener('change', filterProducts);

let usercard = document.getElementById("usercard");
let userName = `${tg.initDataUnsafe.user.first_name} ${tg.initDataUnsafe.user.last_name}`;
usercard.textContent = userName;

