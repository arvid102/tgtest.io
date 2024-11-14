async function getStripePublicKey() {
  try {
    const response = await fetch('https://api.github.com/repos/arvid102/tgtest.io/contents/stripe-public-key.json');
    const data = await response.json();
    const content = atob(data.content);
    return JSON.parse(content).key;
  } catch (error) {
    console.error('Error fetching Stripe public key:', error);
    return null;
  }
}

let stripePublicKey;

getStripePublicKey().then(key => {
  stripePublicKey = key;
  const stripe = Stripe(stripePublicKey);

  let tg = window.Telegram.WebApp;

  tg.expand();
  tg.ready();

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

  let products = [];
  const cart = [];

  fetch('https://api.github.com/repos/arvid102/tgtest.io/contents/products.json')
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
    productsDiv.innerHTML = productsToRender.map(product => 
      `<div class="product" onclick="showProductDetails(${product.id})">
        <img src="${product.image}" alt="${product.name}">
        <div class="product-info">
          <h3>${product.name}</h3>
          <p>€${product.price.toFixed(2)}</p>
          <button onclick="addToCart(${product.id}); event.stopPropagation();">Add to Cart</button>
        </div>
      </div>`
    ).join('');
  }

  function showProductDetails(productId) {
    // Implementation omitted for brevity
  }

  function addToCartFromModal(productId) {
    // Implementation omitted for brevity
  }

  function addToCartWithOptions(productId) {
    // Implementation omitted for brevity
  }

  function changeMainImage(src) {
    // Implementation omitted for brevity
  }

  function addToCart(productId, color, size) {
    // Implementation omitted for brevity
  }

  function updateCart() {
    // Implementation omitted for brevity
  }

  tg.MainButton.onClick(async () => {
    const backendUrl = 'https://your-ngrok-url.ngrok.io';

    const orderData = {
      items: cart.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        color: item.color,
        size: item.size
      })),
      total: cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
    };

    try {
      const response = await fetch(`${backendUrl}/create-checkout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      const data = await response.json();
      
      if (data.status === 'success' && data.sessionId) {
        await stripe.redirectToCheckout({ sessionId: data.sessionId });
      } else {
        console.error('Failed to create checkout session:', data.message);
        alert('Failed to create checkout session. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    }
  });
