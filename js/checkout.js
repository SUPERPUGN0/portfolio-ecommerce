
// Checkout global variables
const cartContainer = document.getElementById('cart');
const checkoutProducts = document.getElementById('checkout-products')
const amountElement = document.getElementById('amount');

// Load localStorage cart
let cart = JSON.parse(localStorage.getItem('cart'));

let cartAmount = 0;

// Update cart amount
const updateCartAmount = () => {

    amountElement.innerText = `€ ${cartAmount}`;
    localStorage.setItem('cart-amount', cartAmount);
}

// Cart product constructor

class CartItem {
    constructor(product) {

        // Product ID
        this.id = product.id;

        // Product container
        this.cartDiv = document.createElement('div');
        this.cartDiv.classList.add('cart-item-container');

        // Name element
        this.nameElement = document.createElement('p');
        this.name = product.name;
        this.nameElement.innerText = this.name;
        this.cartDiv.appendChild(this.nameElement);

        // Price element
        this.priceElement = document.createElement('p');
        this.price = product.price;
        this.priceElement.innerText = this.price;
        this.cartDiv.appendChild(this.priceElement);

        // Quantity element
        this.quantityElement = document.createElement('p');
        this.quantity = product.quantity;
        this.quantityElement.innerText = this.quantity;
        this.cartDiv.appendChild(this.quantityElement);

        // Image element
        this.imageElement = document.createElement('img');
        this.imageElement.src = product.image;
        this.imageElement.classList.add('cart-item-image');
        this.cartDiv.appendChild(this.imageElement);

        // Increase quantity button
        this.increaseBtn = document.createElement('button');
        this.increaseBtn.innerText = '+';
        this.increaseBtn.classList.add('increase-quantity');
        this.cartDiv.appendChild(this.increaseBtn);

        // Decrease quantity button
        this.decreaseBtn = document.createElement('button');
        this.decreaseBtn.innerText = '-';
        this.decreaseBtn.classList.add('decrease-quantity');
        this.cartDiv.appendChild(this.decreaseBtn);
    }

    // Cart Manager
    cartManager(button) {

        // If product in the cart, save index
        if (cart !== null) {
            this.index = cart.findIndex(search => search.id === this.id);
        };

        switch (button) {

            // Pressing increase button, increase quantity
            case 'increaseBtn':

                this.quantity++;
                cart[this.index].quantity = this.quantity;
                localStorage.setItem('cart', JSON.stringify(cart));

                // Update cart amount
                cartAmount += this.price;
                updateCartAmount();

                // Update HTML
                this.quantityElement.innerText = `Quantity ${this.quantity}`;
                break;

            // Pressing decrease button, decrease quantity
            case 'decreaseBtn':

                this.quantity--;

                // Update cart amount
                cartAmount -= this.price;
                updateCartAmount();

                // If quantity below 1
                if (this.quantity < 1) {

                    cart.splice(this.index, 1);
                    localStorage.setItem('cart', JSON.stringify(cart));
                    cartContainer.removeChild(this.cartDiv);

                    // Save in localStorage
                    localStorage.setItem('cart', JSON.stringify(cart));

                } else {

                    // Update cart item quantity Save in localStorage
                    cart[this.index].quantity = this.quantity;
                    localStorage.setItem('cart', JSON.stringify(cart));
                }

                // Update HTML
                this.quantityElement.innerText = `Quantity ${this.quantity}`;
                break;

            default:
                console.log('Cart Manager check ended')
        }
    };

    // Display items and add listeners
    init() {

        // Add product container to DOM
        cartContainer.appendChild(this.cartDiv);

        // Add "increase quantity button" Listener
        this.increaseBtn.addEventListener('click', () => {

            this.cartManager('increaseBtn');
        })

        // Add "decrease quantity button" Listener
        this.decreaseBtn.addEventListener('click', () => {

            this.cartManager('decreaseBtn');
        });

    }
}


// If cart not empty load cart amount
if (cart !== null) {

    // Display cart products
    cart.forEach(product => {

        const cartItem = new CartItem(product);
        cartAmount += cartItem.price * cartItem.quantity;
        cartItem.init();
    });

    // Update cart
    updateCartAmount();
};

