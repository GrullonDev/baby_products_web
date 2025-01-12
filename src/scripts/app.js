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
    let cartItems = 0;

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

    const buyButtons = document.querySelectorAll('.buy-button');
    buyButtons.forEach(button => {
        button.addEventListener('click', () => {
            cartItems++;
            cartCount.textContent = cartItems;
            alert(`Producto añadido al carrito. Total en el carrito: ${cartItems}`);
        });
    });

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
});