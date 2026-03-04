// CONTROLE DE SEÇÕES
function showSection(sectionId) {
    const sections = document.querySelectorAll("main section");
    sections.forEach(section => {
        section.classList.add("hidden");
        section.classList.remove("active");
    });

    document.getElementById(sectionId).classList.remove("hidden");
    document.getElementById(sectionId).classList.add("active");
}

// PRODUTOS
const products = [
    { id: 1, name: "Biquíni Tropical", price: 129.90, category: "banho", img: "https://images.unsplash.com/photo-1593032465175-481ac7f401a0" },
    { id: 2, name: "Maiô Verão", price: 149.90, category: "banho", img: "https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03" },
    { id: 3, name: "Saída de Praia Floral", price: 99.90, category: "saidas", img: "https://images.unsplash.com/photo-1618354691411-6d3f7c0a64d7" },
    { id: 4, name: "Chinelo Praia", price: 49.90, category: "calcados", img: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519" },
    { id: 5, name: "Óculos de Sol", price: 79.90, category: "acessorios", img: "https://images.unsplash.com/photo-1511499767150-a48a237f0083" }
];

const productGrid = document.getElementById("product-grid");
const cartItems = document.getElementById("cart-items");
const cartCount = document.getElementById("cart-count");
const totalPrice = document.getElementById("total-price");

let cart = [];

// EXIBIR PRODUTOS
function displayProducts(filter) {
    productGrid.innerHTML = "";

    const filtered = filter === "all"
        ? products
        : products.filter(p => p.category === filter);

    filtered.forEach(product => {
        productGrid.innerHTML += `
            <div class="product-card">
                <img src="${product.img}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>R$ ${product.price.toFixed(2)}</p>
                <button class="btn-main" onclick="addToCart(${product.id})">
                    Adicionar
                </button>
            </div>
        `;
    });
}

function filterProducts(category) {
    displayProducts(category);
}

// CARRINHO
function addToCart(id) {
    const product = products.find(p => p.id === id);
    cart.push(product);
    updateCart();
}

function updateCart() {
    cartItems.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
        total += item.price;
        cartItems.innerHTML += `
            <p>${item.name} - R$ ${item.price.toFixed(2)}</p>
        `;
    });

    cartCount.textContent = cart.length;
    totalPrice.textContent = "R$ " + total.toFixed(2);
}

function finalizePurchase() {
    if (cart.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }

    cart = [];
    updateCart();
    showSection("finalizado");
}

// INICIAR
displayProducts("all");