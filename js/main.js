// Select the HTML element where the products will be inserted.
const productsContainer = document.getElementById('productsContainer');

// Select the HTML element where the mini cart's products will be inserted.
const miniCart = document.getElementById('miniCart');

// Retrieve the product data from the JSON file
fetch('products.json')
    .then(response => response.json())
    .then(products => {

        // Create an HTML element for each product and add it to the container element.
        products.forEach(product => {

            // Create a product container to put in image and other properties
            const productElement = document.createElement('div');
            productElement.className = 'product';

            // Create product name element
            const productName = document.createElement('h3');
            productName.innerText = product.name;
            productElement.appendChild(productName);

            // Create product quantity element
            const productQuantity = document.createElement('p');
            productQuantity.innerText = `Quantity: ${product.quantity}`;
            productElement.appendChild(productQuantity);

            // Create product's image element
            const productImage = document.createElement('img');
            productImage.src = product.image;
            productElement.appendChild(productImage);

            // Create product addToCart button
            const addToCartButton = document.createElement('button');
            addToCartButton.innerText = 'add to cart';
            addToCartButton.setAttribute('data-id', product.id);
            productElement.appendChild(addToCartButton);

            // Create removeFromCart button
            const removeFromCartButton = document.createElement('button');
            removeFromCartButton.innerText = 'remove from cart';

            // Create cart element
            const cartElement = document.createElement('div');
            cartElement.className = 'cartElement';
            const cartElementImg = document.createElement('img');
            cartElementImg.src = product.image;
            cartElement.appendChild(cartElementImg);


            // Create addToCartButton listener
            addToCartButton.addEventListener('click', function () {

                // Add product to mini cart HTML container
                miniCart.appendChild(cartElement)

                // Append removeFromCart button
                cartElement.appendChild(removeFromCartButton);

                function reduceQuantity(event) {
                    // work in progress
                    event.target.dataset.id
                }
            });

            // Create removeFromCart listener
            removeFromCartButton.addEventListener('click', function () {
                miniCart.removeChild(cartElement);
            })

            // Add product to HTML container
            productsContainer.appendChild(productElement);

        });
    });