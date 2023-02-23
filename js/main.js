// Variables

const cartButton = document.querySelector('.cartButton');
const closeCartButton = document.querySelector('.closeToCartButton');
const clearCartButton = document.querySelector('.clearToCartButton');
const onPageCart = document.querySelector('.onPageCart');
const cartItemsCounter = document.getElementById('cartItemsCounter');
const cartTotalAmount = document.getElementById('cartTotalAmount');
const singleCartItem = document.querySelector('.cartItem ');
const productsContainer = document.getElementById('productsContainer');

// Array that contains all cart items
let cart = [];
// buttons
// let buttonsDOM = [];

// Import products
class Products {
    async getProducts() {
        try {
            let result = await fetch(' products.json');
            let products = await result.json();
            return products;
        } catch (error) {
            console.log(error);
        }
    }
}

// Display products
class UI {
    displayProducts(products) {
        let result = '';
        products.forEach(singleProduct => {
            result += `
            <div class="product">
                <img src=${singleProduct.image} alt="">
                <p>${singleProduct.name}</p>
                <p>Price € ${singleProduct.price}</p>
                <button class="addToCartButton" data-id=${singleProduct.id}>Add me pls</button>
            </div>
            `
        });
        productsContainer.innerHTML = result;
    }
    getAddToCartButtons() {
        const addToCartButtons = [...document.querySelectorAll('.addToCartButton')];
        //buttonsDOM = addToCartButtons;
        addToCartButtons.forEach(button => {
            let id = button.dataset.id;
            let itemInCart = cart.find(cartItem => cartItem.id === id);
            if (itemInCart) {
                button.innerText = 'Good choise!';
                button.disabled = true;
            }
            button.addEventListener('click', (event) => {
                event.target.innerText = 'Good choise!';
                event.target.disabled = true;
                // get product from local storage
                let cartItem = { ...Storage.getProduct(id), quantity: 1 };
                // add product to the cart
                cart = [...cart, cartItem];
                // save cart in local storage
                Storage.saveCart(cart);
                // set cart values

                // display cart item
            })
        });
    };
};

// Local storage
class Storage {
    static saveProducts(products) {
        localStorage.setItem('products', JSON.stringify(products));
    }
    static getProduct(id) {
        let products = JSON.parse(localStorage.getItem('products'));
        return products.find(product => product.id === id);
    }
    static saveCart(cart) {
        localStorage.setItem('cart', JSON.stringify(cart))
    };
};

// When content are loaded, put it in on the HTML
document.addEventListener('DOMContentLoaded', () => {
    const ui = new UI();
    const products = new Products();

    // Import products from JSON
    products.getProducts().then(products => {
        ui.displayProducts(products);
        Storage.saveProducts(products);
    }).then(() => {
        ui.getAddToCartButtons();
    })
});
