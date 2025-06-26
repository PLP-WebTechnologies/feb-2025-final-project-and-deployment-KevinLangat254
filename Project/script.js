// Product Data
const products = [
    {
        id: 1,
        name: "MacBook Pro 14",
        price: 1999,
        category: "laptops",
        image: "images/MacBook.jpg",
        description: "Powerful laptop with M2 Pro chip"
    },
    {
        id: 2,
        name: "iPhone 14 Pro",
        price: 999,
        category: "phones",
        image: "images/iPhone-14-Pro-Max-Purple.jpg",
        description: "Latest iPhone with Dynamic Island"
    },
    {
        id: 3,
        name: "Samsung Galaxy S23",
        price: 799,
        category: "phones",
        image: "images/Samsung.jpg",
        description: "Android flagship with great camera"
    },
    {
        id: 4,
        name: "Dell XPS 15",
        price: 1499,
        category: "laptops",
        image: "images/Dell.png",
        description: "Beautiful display with powerful specs"
    },
    {
        id: 5,
        name: "AirPods Pro",
        price: 249,
        category: "accessories",
        image: "images/Airpods.jpeg",
        description: "Noise cancelling wireless earbuds"
    },
    {
        id: 6,
        name: "Apple Watch Series 8",
        price: 399,
        category: "accessories",
        image: "images/Apple_watch.jpeg",
        description: "Track your health and fitness"
    },
    {
        id: 7,
        name: "iPad Pro",
        price: 799,
        category: "laptops",
        image: "images/Ipad pro.jpeg",
        description: "Powerful tablet with M2 chip"
    },
    {
        id: 8,
        name: "Sony WH-1000XM5",
        price: 399,
        category: "accessories",
        image: "images/Sony WH-1000XM5.jpg",
        description: "Industry leading noise cancellation"
    }
];

// DOM Elements
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navMenu = document.querySelector('nav ul');
const cartCount = document.getElementById('cart-count');
const featuredProductsContainer = document.getElementById('featured-products');
const allProductsContainer = document.getElementById('all-products');
const categoryFilter = document.getElementById('category-filter');
const sortBy = document.getElementById('sort-by');
const cartItemsContainer = document.getElementById('cart-items');
const subtotalElement = document.getElementById('subtotal');
const totalElement = document.getElementById('total');
const newsletterForm = document.getElementById('newsletter-form');

// Cart State
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('show');
        });
    }

    // Load products based on current page
    if (featuredProductsContainer) {
        displayFeaturedProducts();
    }

    if (allProductsContainer) {
        displayAllProducts();
        setupFilters();
    }

    if (cartItemsContainer) {
        displayCartItems();
        setupCartEventListeners();
    }

    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input').value;
            alert(`Thank you for subscribing with ${email}!`);
            this.reset();
        });
    }

    updateCartCount();
});

// Display featured products on home page
function displayFeaturedProducts() {
    // Get 4 random featured products
    const featuredProducts = [...products].sort(() => 0.5 - Math.random()).slice(0, 4);
    
    featuredProductsContainer.innerHTML = featuredProducts.map(product => `
        <div class="product-card">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-info">
                <span class="product-category">${product.category}</span>
                <h3>${product.name}</h3>
                <p class="product-price">$${product.price.toFixed(2)}</p>
                <p>${product.description}</p>
                <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
            </div>
        </div>
    `).join('');

    setupAddToCartButtons();
}

// Display all products on products page
function displayAllProducts(filteredProducts = products) {
    allProductsContainer.innerHTML = filteredProducts.map(product => `
        <div class="product-card">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-info">
                <span class="product-category">${product.category}</span>
                <h3>${product.name}</h3>
                <p class="product-price">$${product.price.toFixed(2)}</p>
                <p>${product.description}</p>
                <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
            </div>
        </div>
    `).join('');

    setupAddToCartButtons();
}

// Setup filters and sorting
function setupFilters() {
    categoryFilter.addEventListener('change', filterProducts);
    sortBy.addEventListener('change', filterProducts);
}

function filterProducts() {
    const category = categoryFilter.value;
    const sortValue = sortBy.value;
    
    let filteredProducts = [...products];
    
    // Filter by category
    if (category !== 'all') {
        filteredProducts = filteredProducts.filter(product => product.category === category);
    }
    
    // Sort products
    switch(sortValue) {
        case 'price-asc':
            filteredProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-desc':
            filteredProducts.sort((a, b) => b.price - a.price);
            break;
        case 'name-asc':
            filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
            break;
        default:
            // Default sorting (by ID)
            filteredProducts.sort((a, b) => a.id - b.id);
    }
    
    displayAllProducts(filteredProducts);
}

// Cart functionality
function setupAddToCartButtons() {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productId = parseInt(this.getAttribute('data-id'));
            addToCart(productId);
        });
    });
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    
    // Check if product is already in cart
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    updateCart();
    showAddToCartNotification(product.name);
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}

function updateCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    
    if (cartItemsContainer) {
        displayCartItems();
    }
}

function updateCartCount() {
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    if (cartCount) {
        cartCount.textContent = totalItems;
    }
    
    // Update all cart counts in case there are multiple in the DOM
    document.querySelectorAll('#cart-count').forEach(el => {
        el.textContent = totalItems;
    });
}

function displayCartItems() {
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-cart-message">Your cart is empty</p>';
        subtotalElement.textContent = '$0.00';
        totalElement.textContent = '$5.99';
        return;
    }
    
    cartItemsContainer.innerHTML = cart.map(item => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}" class="cart-item-image">
            <div class="cart-item-details">
                <h3>${item.name}</h3>
                <p class="cart-item-price">$${item.price.toFixed(2)}</p>
                <div class="cart-item-quantity">
                    <button class="decrease-quantity" data-id="${item.id}">-</button>
                    <span>${item.quantity}</span>
                    <button class="increase-quantity" data-id="${item.id}">+</button>
                </div>
            </div>
            <div class="cart-item-actions">
                <button class="remove-item" data-id="${item.id}">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
    `).join('');
    
    calculateTotals();
    setupCartEventListeners();
}

function setupCartEventListeners() {
    // Remove item buttons
    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', function() {
            const productId = parseInt(this.getAttribute('data-id'));
            removeFromCart(productId);
        });
    });
    
    // Increase quantity buttons
    document.querySelectorAll('.increase-quantity').forEach(button => {
        button.addEventListener('click', function() {
            const productId = parseInt(this.getAttribute('data-id'));
            const item = cart.find(item => item.id === productId);
            if (item) {
                item.quantity += 1;
                updateCart();
            }
        });
    });
    
    // Decrease quantity buttons
    document.querySelectorAll('.decrease-quantity').forEach(button => {
        button.addEventListener('click', function() {
            const productId = parseInt(this.getAttribute('data-id'));
            const item = cart.find(item => item.id === productId);
            if (item) {
                if (item.quantity > 1) {
                    item.quantity -= 1;
                } else {
                    removeFromCart(productId);
                }
                updateCart();
            }
        });
    });
}

function calculateTotals() {
    const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    const shipping = 5.99;
    const total = subtotal + shipping;
    
    subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
    totalElement.textContent = `$${total.toFixed(2)}`;
}

function showAddToCartNotification(productName) {
    const notification = document.createElement('div');
    notification.className = 'add-to-cart-notification';
    notification.innerHTML = `
        <p>${productName} added to cart!</p>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

