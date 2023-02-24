// HTML products container
const productsContainer = document.getElementById('products');
const cartContainer = document.getElementById('cart');

// Local storage cart
let cart = JSON.parse(localStorage.getItem('cart'));

// *********************** //
// FUNCTIONS               //
// *********************** //

// Decrease cart single item quantity
function decreaseQuantity(product) {
    product.cartQuantity--;
    let quantity = document.getElementById('quantity')
    quantity.innerText = `Quantity ${product.cartQuantity}`
}

// *********************** //
// JSON PRODUCTS           //
// *********************** //

// Import JSON products
fetch('products.json')
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

                // Add cart item div
                const cartItem = document.createElement('div');
                cartItem.classList.add('cart-item');
                cartContainer.appendChild(cartItem);

                // Add cart item image
                const imageElement = document.createElement('img');
                imageElement.src = product.image;
                cartItem.classList.add('cart-item-image');
                cartItem.appendChild(imageElement);

                // Add cart item quantity button
                let quantity = document.createElement('p')
                quantity.innerText = `Quantity ${product.cartQuantity}`;
                quantity.classList.add('quantity');
                quantity.id = `q${product.id}`;
                cartItem.appendChild(quantity);

                // Add decrease quantity button
                let decreaseQuantityButton = document.createElement('button');
                decreaseQuantityButton.classList.add('decrease-button');
                decreaseQuantityButton.id = product.id;
                decreaseQuantityButton.innerText = 'Decrease quantity'
                cartItem.appendChild(decreaseQuantityButton);

            });
        };

        // ************************ //
        // DECREASE QUANTITY BUTTON //
        // ************************ //

        // Assign decreaseQuantityButton to an array
        let decreaseQuantityButtons = [...document.querySelectorAll('.decrease-button')];

        // Add addEventListner to each decrease button
        decreaseQuantityButtons.forEach(button => {

            button.addEventListener('click', event => {

                // Button id is equal to the product id
                const idToFind = event.target.id;

                // Find product by id
                const product = products.find(prod => prod.id === idToFind);

                decreaseQuantity(product);

            });
        });

        // ****************************************** //
        // ADD TO CART & INCREASE QUANTITY BUTTON     //
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

                    // Set cart
                    cart = [product]
                    localStorage.setItem('cart', JSON.stringify(cart));

                    // Add decrease quantity button
                    let decreaseQuantityButton = document.createElement('button');
                    decreaseQuantityButton.innerText = 'Decrease quantity'
                    cartItem.appendChild(decreaseQuantityButton);

                } else {

                    // If product already exist in cart, increase quantity
                    if (cart.some(search => search.id === product.id)) {

                        // Find item in cart
                        let index = cart.findIndex(search => search.id === product.id);

                        // Update quantity
                        cart[index].cartQuantity++;
                        console.log(cart[index]);
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
                        quantity.innerText = `Quantity ${product.cartQuantity}`;
                        quantity.classList.add('quantity');
                        quantity.id = `q${product.id}`;
                        cartItem.appendChild(quantity);

                        // Add product to cart array
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




