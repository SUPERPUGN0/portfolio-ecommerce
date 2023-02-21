// Recupera i dati dal file JSON dei prodotti
fetch('products.json')
    .then(response => response.json())
    .then(products => {
        // Seleziona l'elemento HTML in cui inserire i prodotti
        const productsContainer = document.getElementById('productsContainer');

        // Crea un elemento HTML per ogni prodotto e aggiungilo all'elemento container
        products.forEach(product => {
            const productElement = document.createElement('div');
            productElement.classList.add('product');

            const imageElement = document.createElement('img');
            imageElement.src = product.image;
            imageElement.classList.add('product-image');
            productElement.appendChild(imageElement);

            const nameElement = document.createElement('h3');
            nameElement.innerText = product.name;
            productElement.appendChild(nameElement);

            const priceElement = document.createElement('div');
            priceElement.innerText = `$${product.price.toFixed(2)}`;
            productElement.appendChild(priceElement);

            productsContainer.appendChild(productElement);
        });
    });