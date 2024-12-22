import { calulateDiscount } from "./utilities.js";

export const createHorizontalCards = (cartProducts, cartProductContainer) => {

    for (let product of cartProducts) {

        // const cardContainer = document.createElement("div");
        // cardContainer.classList.add("card-horizontal", "d-flex", "shadow");

        // //image container 
        // const imageContainer = document.createElement("div");
        // imageContainer.classList.add("card-hori-image-container", "relative");
        // const image=document.createElement("img");
        // image.classList.add("card-image");
        // image.setAttribute("src",product.image);
        // image.setAttribute("alt",product.name);

        // imageContainer.appendChild(image);
        // cardContainer.appendChild(imageContainer);



        // Create the main card container
        const card = document.createElement('div');
        card.className = 'card-horizontal d-flex shadow';

        // Create the image container
        const imageContainer = document.createElement('div');
        imageContainer.className = 'card-hori-image-container relative';

        const img = document.createElement('img');
        img.className = 'card-image fit';
        img.setAttribute("src", product.image); // Replace with the actual image URL
        img.alt = 'shoes';
        imageContainer.appendChild(img);

        // Create the details container
        const details = document.createElement('div');
        details.className = 'card-details d-flex direction-column';

        // Add card title
        const title = document.createElement('div');
        title.className = 'card-title';
        title.textContent = product.name;
        details.appendChild(title);

        // Add description
        const description = document.createElement('div');
        description.className = 'card-description';

        const descText = document.createElement('p');
        descText.className = 'card-des';
        descText.textContent = product.category;
        description.appendChild(descText);

        const price = document.createElement('p');
        price.className = 'card-price';
        price.innerHTML = `Rs. ${product.currPrice}<span class="price-strike-through padding-all-8">Rs. ${product.originalPrice}</span>
<span class="discount padding-all-8">(${calulateDiscount(product.currPrice, product.originalPrice)}% OFF)</span>`;
        description.appendChild(price);

        details.appendChild(description);

        // Add quantity container
        const quantityContainer = document.createElement('div');
        quantityContainer.className = 'quantity-container d-flex gap';

        const quantityTitle = document.createElement('p');
        quantityTitle.className = 'q-title';
        quantityTitle.textContent = 'Quantity: ';
        quantityContainer.appendChild(quantityTitle);

        const countContainer = document.createElement('div');

        countContainer.className = 'count-container d-flex align-center gap';

        const decrementButton = document.createElement('button');
        decrementButton.setAttribute("data-type", "minus");
        decrementButton.setAttribute("data-id", product.id);
        decrementButton.className = 'count';
        decrementButton.textContent = '-';

        const countValue = document.createElement('span');
        countValue.className = 'count-value';
        countValue.classList.add(`count${product.id}`);
        // product.quantity = "1";
        countValue.textContent = product.quantity;

        const incrementButton = document.createElement('button');
        incrementButton.setAttribute("data-type", "plus");
        incrementButton.setAttribute("data-id", product.id);
        incrementButton.className = 'count';
        incrementButton.textContent = '+';

        countContainer.appendChild(decrementButton);
        countContainer.appendChild(countValue);
        countContainer.appendChild(incrementButton);

        quantityContainer.appendChild(countContainer);
        details.appendChild(quantityContainer);

        // Add CTA buttons
        const ctaContainer = document.createElement('div');
        ctaContainer.className = 'cta-btn d-flex gap';

        // Add "Add to Cart" button
        const cartBtnContainer = document.createElement('div');
        cartBtnContainer.className = 'cta-btn';

        // const cartBtn = document.createElement('button');
        // cartBtn.className = 'button hori-btn btn-primary btn-icon d-flex align-center justify-center gap cursor btn-margin';
        // cartBtn.innerHTML = '<img src="" alt="cart"> Add To Cart';
        // cartBtnContainer.appendChild(cartBtn);

        // Add "Move to Wishlist" button
        const wishlistBtnContainer = document.createElement('div');
        wishlistBtnContainer.className = 'cta-btn';

        const wishlistBtn = document.createElement('button');
        wishlistBtn.setAttribute("data-type", "wishlist");
        wishlistBtn.setAttribute("data-id", product.id);
        wishlistBtn.className = 'button hori-btn btn-outline-primary btn-icon d-flex align-center justify-center gap cursor btn-margin';
        wishlistBtn.textContent = ' Move to Wishlist';
        wishlistBtnContainer.appendChild(wishlistBtn);

        const deleteBtnContainer = document.createElement('div');
        deleteBtnContainer.className = 'cta-btn del-btn';

        const removeBtn = document.createElement("button");

        removeBtn.className = 'button hori-btn  btn-icon d-flex align-center justify-center gap cursor btn-margin';
        removeBtn.innerHTML = `<span data-type="delete" data-id=${product.id} class="material-symbols-outlined">
                    delete
                </span>`;
        deleteBtnContainer.appendChild(removeBtn);


        ctaContainer.appendChild(cartBtnContainer);
        ctaContainer.appendChild(wishlistBtnContainer);
        ctaContainer.appendChild(deleteBtnContainer);
        details.appendChild(ctaContainer);

        // Append everything to the main card container
        card.appendChild(imageContainer);
        card.appendChild(details);

        // Append the card to the DOM
        cartProductContainer.appendChild(card); // Or replace `document.body` with the parent container you want
    }

};