// HTML products container
const productsContainer = document.getElementById('products');
const cartContainer = document.getElementById('cart');

// Load localStorage cart
let cart = JSON.parse(localStorage.getItem('cart'));

if (!cart) {

    // If cart not empty, define cart
    cart = [];
};

// *********************** //
// CLASSES                 //
// *********************** //

// Create and display Cart item
class Product {

    constructor(product) {

        // Assign product ID
        this.id = product.id;

        // Cart Quantity
        this.quantityValue = 0;

        /*
        // Load quantity from localStorage
        loadQuantity () {
            const index = cart.findIndex(search => search.id === this.id);
            this.quantityValue = cart[index].quantity;
        };*/

        // Product item container
        this.productDiv = document.createElement('div');
        this.productDiv.classList.add('product-container');

        // Image
        this.image = document.createElement('img');
        this.image.src = product.image;
        this.image.classList.add('product-image');
        this.productDiv.appendChild(this.image);

        // Name
        this.name = document.createElement('p');
        this.name.innerText = product.name;
        this.name.classList.add('product-name');
        this.productDiv.appendChild(this.name);

        // Price
        this.price = document.createElement('p');
        this.price.innerText = product.price;
        this.price.classList.add('product-price');
        this.productDiv.appendChild(this.price);

        // "Add to cart" button
        this.addToCartBtn = document.createElement('button');
        this.addToCartBtn.innerText = 'Add to cart';
        this.addToCartBtnClass = this.addToCartBtn.classList.add('addToCart-btn');
        this.productDiv.appendChild(this.addToCartBtn);
    };

    newCartItem() {

        // Create Cart item container
        this.cartDiv = document.createElement('div');
        this.cartDiv.classList.add('cart-item-container');

        // Image
        this.cartItemImage = document.createElement('img');
        this.cartItemImage.src = this.image.src;
        this.cartItemImage.classList.add('cart-item-image');
        this.cartDiv.appendChild(this.cartItemImage);

        // Name
        this.cartItemName = document.createElement('p');
        this.cartItemName.innerText = this.name.innerText;
        this.cartItemName.classList.add('cart-item-name');
        this.cartDiv.appendChild(this.cartItemName);

        // Price
        this.cartItemPrice = document.createElement('p');
        this.cartItemPrice.innerText = this.price.innerText;
        this.cartItemPrice.classList.add('carti-item-price');
        this.cartDiv.appendChild(this.cartItemPrice);

        // Display Quantity
        this.quantity = document.createElement('p');
        this.quantity.innerText = `Quantity ${this.quantityValue}`;
        this.cartDiv.appendChild(this.quantity);

        // Display Increase quantity Button
        this.increaseBtn = document.createElement('button');
        this.increaseBtn.innerText = 'Increase quantity';
        this.increaseBtnClass = this.increaseBtn.classList.add('increase-quantity');
        this.cartDiv.appendChild(this.increaseBtn);

        // Display Decrease quantity Button
        this.decreaseBtn = document.createElement('button');
        this.decreaseBtn.innerText = 'Decrease quantity';
        this.decreaseBtnClass = this.decreaseBtn.classList.add('decrease-quantity');
        this.cartDiv.appendChild(this.decreaseBtn);

        // Add elements to DOM
        cartContainer.appendChild(this.cartDiv);

        // Add "increase quantity button" Listener
        this.increaseBtn.addEventListener('click', () => {

            // Increase quantity and update localStorage

            this.quantityValue++;
            const index = cart.findIndex(search => search.id === this.id);
            this.quantityValue = cart[index].quantity;
            localStorage.setItem('cart', JSON.stringify(cart));

            // Update HTML
            this.quantity.innerText = `Quantity ${this.quantityValue}`;
        })

        // Add "decrease quantity button" Listener
        this.decreaseBtn.addEventListener('click', () => {

            // Decrease quantity and update localeStorage
            if (this.quantityValue > 0) {

                this.quantityValue--;
                const index = cart.findIndex(search => search.id === this.id);
                this.quantityValue = cart[index].quantity;
                localStorage.setItem('cart', JSON.stringify(cart));

                // Update HTML
                this.quantity.innerText = `Quantity ${this.quantityValue}`;
            };

        });
    };

    checkCart() {
        if (cart.some(prod => prod.id === this.id)) {

            // Recover cart item and quantity from localStorage 
            const index = cart.findIndex(search => search.id === this.id);
            this.quantityValue = cart[index].quantity;
            this.newCartItem();
        };
    };

    init() {

        // Add elements to DOM
        productsContainer.appendChild(this.productDiv);

        // Add To Cart Listener
        this.addToCartBtn.addEventListener('click', () => {

            // Add item to the cart or increase quantity
            if (cart.some(prod => prod.id === this.id)) {

                this.quantityValue++;
                const index = cart.findIndex(search => search.id === this.id);
                this.quantityValue = cart[index].quantity;
                localStorage.setItem('cart', JSON.stringify(cart));

            } else {

                this.quantityValue++;
                cart.push({ id: this.id, quantity: this.quantityValue });
                this.newCartItem();
                localStorage.setItem('cart', JSON.stringify(cart));
            };
        })
    };
};


// ************************* //
// DISPLAY PRODUCTS AND CART //
// ************************* //

// Import JSON products
fetch('/js/products.json')

    .then(response => {

        // Covert json to js objects
        return response.json();
    })
    .then(json => {

        // Assign Json products to array
        let products = json;

        // *******************//
        // DISPLAY PRODUCTS   //
        // *******************//

        products.forEach(product => {

            const productItem = new Product(product);
            productItem.checkCart();
            productItem.init();
        });
    })
    .catch(error => { console.error('Error during json import:', error); });




