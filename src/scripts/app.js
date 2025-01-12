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
    const paymentDialog = document.getElementById('payment-dialog');
    const closeButton = document.querySelector('.close-button');
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
                    <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                    <p>${item.name}</p>
                    <input type="number" value="${item.quantity}" min="1" class="cart-item-quantity" data-name="${item.name}">
                    <p>$${item.price * item.quantity}</p>
                </div>
            `).join('') + `<div class="cart-total">
                <strong>Total: $${cartItems.reduce((total, item) => total + item.price * item.quantity, 0)}</strong>
            </div>
            <button class="pay-button">Pagar</button>`;

            // Agregar eventos a los inputs de cantidad
            const quantityInputs = document.querySelectorAll('.cart-item-quantity');
            quantityInputs.forEach(input => {
                input.addEventListener('change', (event) => {
                    const name = event.target.getAttribute('data-name');
                    const newQuantity = parseInt(event.target.value);
                    const product = cartItems.find(item => item.name === name);
                    if (product) {
                        product.quantity = newQuantity;
                        updateCart();
                    }
                });
            });

            const payButton = document.querySelector('.pay-button');
            payButton.addEventListener('click', () => {
                paymentDialog.style.display = 'block';
                document.body.style.overflow = 'hidden'; // Evitar scroll
            });
        } else {
            cartDropdown.innerHTML = `<p>Tu carrito de compras está vacío!</p>`;
        }
    }

    closeButton.addEventListener('click', () => {
        paymentDialog.style.display = 'none';
        document.body.style.overflow = 'auto'; // Permitir scroll
    });

    window.addEventListener('click', (event) => {
        if (event.target === paymentDialog) {
            paymentDialog.style.display = 'none';
            document.body.style.overflow = 'auto'; // Permitir scroll
        }
    });

    const paymentForm = document.getElementById('payment-form');
    paymentForm.addEventListener('submit', (event) => {
        event.preventDefault();
        alert('Gracias por su compra, y verlo siempre en nuestro sitio web');
        paymentDialog.style.display = 'none';
        document.body.style.overflow = 'auto'; // Permitir scroll
        cartItems = [];
        updateCart();
    });

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