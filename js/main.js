// INSERIRE INDICE

let actualView = 'card';

// DOM products container
let productsContainer = document.getElementById('products');

// DOM cart container and quantity amount
const cartContainer = document.getElementById('cart');
const amountElement = document.getElementById('amount');
let cartAmount = 0;

// Load localStorage cart
let cart = JSON.parse(localStorage.getItem('cart'));

// If cart not empty load cart amount
if (cart !== null) {

    // Convert local Storage cart amount to number type
    cartAmount = parseInt(localStorage.getItem('cart-amount'));
};

// Load HTML cart amount
amountElement.innerText = cartAmount;

// Update cart amount
const updateCartAmount = () => {

    amountElement.innerText = `€ ${cartAmount}`;
    localStorage.setItem('cart-amount', cartAmount);
}

/////// VIEW/HIDE CART /////////


//const cartView = document.getElementById('see-cart');
const cartView = document.querySelectorAll('.cart-button');
let actualCartView = 'close';

const mediaQuery = window.matchMedia("(max-width: 870px)");

cartView.forEach(button => {

    // View/hide cart
    button.addEventListener('click', () => {

        if (mediaQuery.matches) {

            if (actualCartView === 'close') {

                cartContainer.style.left = '20vw';
                actualCartView = 'open';

            } else {

                cartContainer.style.left = '100vw';
                actualCartView = 'close';
            }

        } else {

            if (actualCartView === 'close') {

                cartContainer.style.left = '80vw';
                actualCartView = 'open';

            } else {

                cartContainer.style.left = '100vw';
                actualCartView = 'close';
            }
        }
    })
});

/////// PAGINATION /////////

const previous = document.getElementById('pag1');
const next = document.getElementById('pag2');

let actualPage = 1;
let leftMargin = 0;

previous.addEventListener('click', () => {

    if (actualPage > 1) {
        actualPage--;
        leftMargin += 100;
        productsContainer.style.marginLeft = `${leftMargin}vw`
    }

})

pag2.addEventListener('click', () => {

    if (actualPage < 2) {
        actualPage++;
        leftMargin -= 100;
        productsContainer.style.marginLeft = `${leftMargin}vw`
    }
})

/////// PRODUCTS /////////

// Create product item and cart item
class Product {

    constructor(product) {

        // Assign product ID
        this.id = product.id;

        // Cart index
        this.index = undefined;

        // Cart Quantity
        this.quantityValue = 0;

        // Product item container
        this.productDiv = document.createElement('div');
        this.productDiv.classList.add('product-container');

        // Image
        this.image = document.createElement('img');
        this.image.src = product.image;
        this.image.classList.add('product-image');
        this.productDiv.appendChild(this.image);

        // Name
        this.productName = product.name
        this.name = document.createElement('p');
        this.name.innerText = this.productName;
        this.name.classList.add('product-name');
        this.productDiv.appendChild(this.name);

        // Price
        this.priceAmount = product.price;
        this.price = document.createElement('p');
        this.price.innerText = `€ ${this.priceAmount}`;
        this.price.classList.add('product-price');
        this.productDiv.appendChild(this.price);

        // "Add to cart" button
        this.addToCartBtn = document.createElement('button');
        this.addToCartBtn.innerText = 'Add to cart';
        this.addToCartBtnClass = this.addToCartBtn.classList.add('addToCart-btn');
        this.productDiv.appendChild(this.addToCartBtn);
    };

    // Cart Manager
    cartManager(button) {

        // If product in the cart, save index
        if (cart !== null) {
            this.index = cart.findIndex(search => search.id === this.id);
        };

        switch (button) {

            // First page loading. If cart not empty, load item and quantity
            case 'start':

                if (cart && this.index > -1) {

                    // Load quantityValue
                    this.quantityValue = cart[this.index].quantity;

                    // Create cart item
                    this.newCartItem();
                };
                break;

            // Pressing addToCart button, if cart empty, add item to the cart
            case 'addToCartBtn':

                if (cart === null) {

                    cart = [];
                    this.quantityValue++;
                    cart.push({ id: this.id, quantity: this.quantityValue, name: this.productName, price: this.priceAmount, image: this.image.src });
                    localStorage.setItem('cart', JSON.stringify(cart));

                    // Update cart amount
                    cartAmount += this.priceAmount;
                    updateCartAmount();

                    // Create cart item
                    this.newCartItem();

                    // Update HTML
                    this.quantity.innerText = `Quantity ${this.quantityValue}`;

                    // Pressing addToCart button, if item exist in cart, display it
                } else if (this.index > -1) {

                    this.quantityValue++;
                    cart[this.index].quantity = this.quantityValue;
                    localStorage.setItem('cart', JSON.stringify(cart));

                    // Update cart amount
                    cartAmount += this.priceAmount;
                    updateCartAmount();

                    // Update HTML
                    this.quantity.innerText = `Quantity ${this.quantityValue}`;

                    // Pressing addToCart button, if cart not empty and item doeasn't exist, add item to the cart
                } else {

                    this.quantityValue++;
                    cart.push({ id: this.id, quantity: this.quantityValue, name: this.productName, price: this.priceAmount, image: this.image.src });
                    localStorage.setItem('cart', JSON.stringify(cart));

                    // Update cart amount
                    cartAmount += this.priceAmount;
                    updateCartAmount();

                    // Create cart item
                    this.newCartItem();

                    // Update HTML
                    this.quantity.innerText = `Quantity ${this.quantityValue}`;
                }
                break;

            // Pressing increase button, increase quantity
            case 'increaseBtn':

                this.quantityValue++;
                cart[this.index].quantity = this.quantityValue;
                localStorage.setItem('cart', JSON.stringify(cart));

                // Update cart amount
                cartAmount += this.priceAmount;
                updateCartAmount();

                // Update HTML
                this.quantity.innerText = `Quantity ${this.quantityValue}`;
                break;

            // Pressing decrease button, decrease quantity
            case 'decreaseBtn':

                this.quantityValue--;

                // Update cart amount
                cartAmount -= this.priceAmount;
                updateCartAmount();

                // If quantity below 1
                if (this.quantityValue < 1) {

                    cart.splice(this.index, 1);
                    localStorage.setItem('cart', JSON.stringify(cart));
                    cartContainer.removeChild(this.cartDiv);

                    // Save in localStorage
                    localStorage.setItem('cart', JSON.stringify(cart));

                } else {

                    // Update cart item quantity Save in localStorage
                    cart[this.index].quantity = this.quantityValue;
                    localStorage.setItem('cart', JSON.stringify(cart));
                }

                // Update HTML
                this.quantity.innerText = `Quantity ${this.quantityValue}`;
                break;

            default:
                console.log('Cart Manager check ended')
        }
    };

    // Display cart item
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
        this.increaseBtn.innerText = '+';
        this.increaseBtn.classList.add('increase-quantity');
        this.cartDiv.appendChild(this.increaseBtn);

        // Display Decrease quantity Button
        this.decreaseBtn = document.createElement('button');
        this.decreaseBtn.innerText = '-';
        this.decreaseBtn.classList.add('decrease-quantity');
        this.cartDiv.appendChild(this.decreaseBtn);

        // Add elements to DOM
        cartContainer.appendChild(this.cartDiv);

        // Add "increase quantity button" Listener
        this.increaseBtn.addEventListener('click', () => {

            this.cartManager('increaseBtn');
        })

        // Add "decrease quantity button" Listener
        this.decreaseBtn.addEventListener('click', () => {

            this.cartManager('decreaseBtn');
        });
    };

    // Display product
    init() {

        // Add elements to DOM
        productsContainer.appendChild(this.productDiv);

        if (actualView === 'list') {

            this.productDiv.style.flexDirection = 'row';

        } else {

            this.productDiv.style.flexDirection = 'column';
        };

        // Add To Cart Listener
        this.addToCartBtn.addEventListener('click', () => {

            this.cartManager('addToCartBtn');
        })
    };
};


// ************************* //
// DISPLAY PRODUCTS AND CART //
// ************************* //

// Import JSON products
fetch('./portoflio-ecommerce/js/products.json')

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
            productItem.init();
            productItem.cartManager('start');
        });

        /////// SEARCHBAR /////////

        const searchbar = document.getElementById('searchbar');
        const searchbarSubmit = document.getElementById('searchbar-submit');
        const deleteSearchBtn = document.getElementById('delete-search-btn');


        const search = () => {

            // Select actual displayed products
            let selectProducts = document.querySelectorAll('.product-container');

            selectProducts.forEach(product => {

                productsContainer.removeChild(product);
            })

            // Save searched term
            let searchTerm = searchbar.value;

            // Save matched product
            let matchedProducts = [];

            // Find for products that match the searched term
            matchedProducts = products.filter(product => product.name.includes(searchTerm));

            // Display found products
            if (matchedProducts.length > 0) {

                // Generate and display product div
                matchedProducts.forEach(product => {

                    const foundItem = new Product(product);
                    foundItem.init();
                });

            } else {

                // Erease input text
                searchbar.value = '';

                window.alert('No products found');

                products.forEach(product => {
                    const defaultProduct = new Product(product);
                    defaultProduct.init();
                })
            }


        }

        // Function implemented but not required
        searchbarSubmit.addEventListener('click', () => {

            search();
        });

        // Function implemented but not required
        searchbar.addEventListener('keydown', (event) => {

            if (event.code === 'Enter') {

                search();
            };

        })

        searchbar.addEventListener('input', () => {

            search();
        });

        // Remove searched item and display default products
        deleteSearchBtn.addEventListener('click', () => {

            // Select actual displayed products
            let selectProducts = document.querySelectorAll('.product-container');

            selectProducts.forEach(product => {

                productsContainer.removeChild(product);
            })

            products.forEach(product => {
                const defaultProduct = new Product(product);
                defaultProduct.init();
            })

            // Erease input text
            searchbar.value = '';
        })

        /////// PRODUCTS VIEW BUTTON /////////

        let productDivs = document.querySelectorAll('.product-container');
        const changeView = document.getElementById('change-view');

        // Change view button
        changeView.addEventListener('click', () => {

            // Load products div
            productDivs = document.querySelectorAll('.product-container');

            if (actualView === 'card') {

                productsContainer.style.gridTemplateRows = '1fr 1fr 1fr 1fr 1fr 1fr';
                productsContainer.style.gridTemplateColumns = '1fr 1fr';

                productDivs.forEach(product => {

                    product.style.flexDirection = 'row';
                    product.style.height = '100px';
                    product.style.justifyContent = 'space-evenly';
                })

                actualView = 'list';

            } else {

                productsContainer.style.gridTemplateRows = '1fr 1fr ';
                productsContainer.style.gridTemplateColumns = '1fr 1fr 1fr 1fr 1fr 1fr';

                productDivs.forEach(product => {

                    product.style.flexDirection = 'column';
                    product.style.height = '50%';
                    product.style.justifyContent = 'space-evenly';
                })

                actualView = 'card';
            }
        })
    })
    .catch(error => { console.error('Error during json import:', error); });



