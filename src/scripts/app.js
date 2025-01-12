// Este archivo contiene el código JavaScript que maneja la interactividad de la página.

document.addEventListener('DOMContentLoaded', () => {
    const products = [
        { name: 'Pañales', price: 20, image: 'assets/images/diapers.jpg' },
        { name: 'Biberón', price: 15, image: 'assets/images/bottle.jpg' },
        { name: 'Chupete', price: 5, image: 'assets/images/pacifier.jpg' },
        { name: 'Cochecito', price: 150, image: 'assets/images/stroller.jpg' },
        { name: 'Juguete', price: 25, image: 'assets/images/toy.jpg' }
    ];

    const productContainer = document.getElementById('product-list');
    const productListContainer = document.querySelector('.product-list');
    const cartCount = document.getElementById('cart-count');
    const cartDropdown = document.querySelector('.cart-dropdown');

    let cartItems = [];

    // Generar dinámicamente los productos en la página
    products.forEach(product => {
        const productCard = document.createElement('li');
        productCard.classList.add('product-card');

        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>Precio: $${product.price}</p>
            <button class="buy-button">Comprar</button>
        `;

        productContainer.appendChild(productCard);

        const productCardClone = productCard.cloneNode(true);
        productListContainer.appendChild(productCardClone);
    });

    // Manejar la acción de comprar productos
    const buyButtons = document.querySelectorAll('.buy-button');
    buyButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            const selectedProduct = products[index];
            const existingProduct = cartItems.find(item => item.name === selectedProduct.name);

            if (existingProduct) {
                existingProduct.quantity += 1;
            } else {
                cartItems.push({ ...selectedProduct, quantity: 1 });
            }

            updateCart();
            alert(`Producto añadido al carrito: ${selectedProduct.name}`);
        });
    });

    // Actualizar el contenido del carrito
    function updateCart() {
        cartCount.textContent = cartItems.reduce((total, item) => total + item.quantity, 0);

        if (cartItems.length > 0) {
            cartDropdown.innerHTML = cartItems.map(item => `
                <div class="cart-item">
                    <p>${item.name} - ${item.quantity} x $${item.price}</p>
                </div>
            `).join('') + `<div class="cart-total">
                <strong>Total: $${cartItems.reduce((total, item) => total + item.price * item.quantity, 0)}</strong>
            </div>`;
        } else {
            cartDropdown.innerHTML = `<p>Tu carrito de compras está vacío!</p>`;
        }
    }

    // Control del slider del carrusel
    const track = document.querySelector('.carousel-track');
    const prevButton = document.querySelector('.carousel-button.prev');
    const nextButton = document.querySelector('.carousel-button.next');
    let currentIndex = 0;
    const itemsToShow = 3;
    const totalItems = products.length;

    prevButton.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            currentIndex = totalItems - itemsToShow;
        }
        track.style.transform = `translateX(-${currentIndex * (100 / itemsToShow)}%)`;
    });

    nextButton.addEventListener('click', () => {
        if (currentIndex < totalItems - itemsToShow) {
            currentIndex++;
        } else {
            currentIndex = 0;
        }
        track.style.transform = `translateX(-${currentIndex * (100 / itemsToShow)}%)`;
    });

    // Mostrar y ocultar el carrito al pasar el mouse (opcional)
    const cartElement = document.querySelector('.cart');
    cartElement.addEventListener('mouseenter', () => {
        cartDropdown.style.display = 'block';
    });

    cartElement.addEventListener('mouseleave', () => {
        cartDropdown.style.display = 'none';
    });

    // Inicializar el contenido del carrito
    updateCart();
});
