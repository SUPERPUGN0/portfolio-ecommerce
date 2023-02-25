// HTML products container
const productsContainer = document.getElementById('products');
const cartContainer = document.getElementById('cart');

// Load localStorage cart
let cart = JSON.parse(localStorage.getItem('cart'));

// *********************** //
// FUNCTIONS               //
// *********************** //

// Load cart from localStorage
const loadCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart'));
    return cart;
}

// Save cart to localStorageproviding cart array
const saveCart = cart => {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Find product providing products array and target. Target must have id property. Returns product obj.
const findProduct = (array, event) => {
    const productId = event.target.id;
    const product = array.find(prod => prod.id === productId);
    return product;
}

// Find product index providing products array and target. Target must have id property. Returns product index.
const findProductIndex = (array, event) => {
    const productId = event.target.id;
    let index = array.findIndex(search => search.id === productId);
    return index;
}

// *********************** //
// CLASSES                 //
// *********************** //

// Create a "decrease quantity" button for cart items and add it to the cart
class DecreaseBtn {

    constructor(productId) {

        this.htmlBtn = document.createElement('button');
        this.htmlBtn.innerText = 'Decrease quantity';
        this.htmlClass = this.htmlBtn.classList.add('decrease-quantity');
        this.id = productId;
    };

    init() {

        // Add button to DOM
        cartContainer.appendChild(this.htmlBtn);
    };

    decrease() {

        // Decrease quantity
        let index = cart.findIndex(search => search.id === this.id);
        cart[index].cartQuantity--;

        // Display updated quantity
        let quantity = document.getElementById(`q${this.id}`);
        quantity.innerText = `Quantity ${cart[index].cartQuantity}`;
    };

    save() {

        // Update localStorage cart
        localStorage.setItem('cart', JSON.stringify(cart));
    };
};




// *********************** //
// JSON PRODUCTS           //
// *********************** //

// Import JSON products
fetch('/js/products.json')
    .then(response => {

        // Covert json to js objects
        return response.json();
    })
    .then(json => {

        // Assign Json products to array
        let products = json;

        // Add products to DOM
        let appendProducts = '';

        products.forEach(product => {
            appendProducts += `<div>
                                <img src="${product.image}" class="product-image">
                                <button class="addToCartButton" data-id="${product.id}">Add to cart</button>
                                </div>`;

        });

        // Add elements to DOM
        productsContainer.innerHTML = appendProducts;

        // *********************** //
        // DISPLAY OLD CART        //
        // *********************** //

        // If cart not empty, display cart items
        if (cart) {
            cart.forEach(product => {

                // Create cart item div
                const cartItem = document.createElement('div');
                cartItem.classList.add('cart-item');
                cartContainer.appendChild(cartItem);

                // Display cart item image
                const imageElement = document.createElement('img');
                imageElement.src = product.image;
                cartItem.classList.add('cart-item-image');
                cartItem.appendChild(imageElement);

                // Display cart item quantity
                let quantity = document.createElement('p')
                quantity.innerText = `Quantity ${product.cartQuantity}`;
                quantity.classList.add('quantity');
                quantity.id = `q${product.id}`;
                cartItem.appendChild(quantity);

                // Display decrease quantity button
                const decreaseBtn = new DecreaseBtn(product.id);
                decreaseBtn.init();

                // Create listener
                decreaseBtn.htmlBtn.addEventListener('click', () => {

                    // Decrease quantity
                    decreaseBtn.decrease();

                    // Save to localStorage
                    decreaseBtn.save();
                })

            });
        };

        // ****************************************** //
        // ADD TO CART BTN & INCREASE QUANTITY BTN    //
        // ****************************************** //

        // Assign addToCartButtons to an array
        let addToCartButtons = [...document.querySelectorAll('.addToCartButton')];

        // Add addEventListner to each button
        addToCartButtons.forEach(button => {

            button.addEventListener('click', (event) => {

                // Button id is equal to the product id
                const idToFind = +event.target.dataset.id;

                // Find product to add to cart
                const product = products.find(prod => prod.id === idToFind);

                // If cart not exist in localStorage, add product to cart
                if (!cart) {

                    // Add cart item div
                    const cartItem = document.createElement('div');
                    cartItem.classList.add('cart-item');
                    cartContainer.appendChild(cartItem);

                    // Add cart item image
                    const imageElement = document.createElement('img');
                    imageElement.src = product.image;
                    cartItem.classList.add('cart-item-image');
                    cartItem.appendChild(imageElement);

                    // Add cart item quantity
                    let quantity = document.createElement('p')
                    quantity.innerText = `Quantity ${product.cartQuantity = 1}`
                    quantity.classList.add('quantity');
                    quantity.id = `q${product.id}`;
                    cartItem.appendChild(quantity);

                    // Add decrease quantity button
                    let decreaseQuantityButton = document.createElement('button');
                    decreaseQuantityButton.innerText = 'Decrease quantity'
                    cartItem.appendChild(decreaseQuantityButton);

                    // Set cart and save to localStorage
                    cart = [product]
                    localStorage.setItem('cart', JSON.stringify(cart));

                } else {

                    // If product already exist in cart, increase quantity
                    if (cart.some(search => search.id === product.id)) {

                        // Find item in cart
                        let index = cart.findIndex(search => search.id === product.id);

                        // Update quantity
                        cart[index].cartQuantity++;
                        let quantity = document.getElementById(`q${product.id}`);
                        quantity.innerText = `Quantity ${cart[index].cartQuantity}`;

                        // Save new cart in localStorage
                        localStorage.setItem('cart', JSON.stringify(cart));

                    } else /* Cart not empty but item not found */ {

                        // Add cart item div
                        const cartItem = document.createElement('div');
                        cartItem.classList.add('cart-item');
                        cartContainer.appendChild(cartItem);

                        // Add cart item image
                        const imageElement = document.createElement('img');
                        imageElement.src = product.image;
                        cartItem.classList.add('cart-item-image');
                        cartItem.appendChild(imageElement);

                        // Add cart item quantity
                        const quantity = document.createElement('p')
                        quantity.innerText = `Quantity ${product.cartQuantity = 1}`;
                        quantity.classList.add('quantity');
                        quantity.id = `q${product.id}`;
                        cartItem.appendChild(quantity);

                        // Add product to cart array and save to localStorage
                        cart.push(product);
                        localStorage.setItem('cart', JSON.stringify(cart));

                    }
                }
            })
        });
    })
    .catch(error => {
        console.error('Error during json import:', error);
    });




