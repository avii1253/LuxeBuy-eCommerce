import { calulateDiscount } from "./utilities.js";

export const cardCreater = (products, productContainer, cart, type) => {

    for (let product of products) {
        const cardContainer = document.createElement("div");
        cardContainer.classList.add("card", "card-vertical", "d-flex", "direction-column", "relative", "shadow")

        const cardImageContainer = document.createElement("div");
        cardImageContainer.classList.add("card-image-container", "fitting");

        const image = document.createElement("img");
        image.classList.add("card-image", "fit");
        image.setAttribute("src", product.image);
        image.setAttribute("alt", product.category);

        cardImageContainer.appendChild(image);

        const cardDetails = document.createElement("div");
        cardDetails.classList.add("card-details");

        const cardTitle = document.createElement("div");
        cardTitle.classList.add("card-title");
        cardTitle.innerHTML = product.name;

        cardDetails.appendChild(cardTitle);

        const cardDesciption = document.createElement("div");
        cardDesciption.classList.add("card-description");
        const cardDes = document.createElement("p");
        cardDes.classList.add("card-des");
        cardDes.innerHTML = product.category;
        cardDesciption.appendChild(cardDes);

        const cardPrice = document.createElement("p");
        cardPrice.classList.add("card-price");
        cardPrice.innerHTML = ` Rs. ${product.currPrice}
                        <span class="price-strike-through">Rs. ${product.originalPrice}</span>
                        <span class="discount">(${calulateDiscount(product.currPrice, product.originalPrice)}% OFF)</span>`;
        cardDesciption.appendChild(cardPrice);


        cardDetails.appendChild(cardDesciption);

        const ctaBtn = document.createElement("div");
        ctaBtn.classList.add("cta-btn", "bck");


        const button = document.createElement("button");
        button.classList.add("button", "btn-primary", "btn-icon", "cart-btn", "d-flex", "align-center", "justify-center", "gap", "cursor", "btn-margin");

        let alpha = product.id;
        button.setAttribute("data-id", alpha.toString());

        //testing ...

        if (type === "main") {
            let temp = cart.some((item) => product.id === item.id);
            if (temp) {
                button.innerHTML = `Go To Cart <span class='material-symbols-outlined'>
            shopping_cart
                            </span >`;
            } else {
                button.innerHTML = `<span class='material-symbols-outlined'>
            shopping_cart
                            </span >
                Add To Cart`;

            }
        }
        else if (type === "wishList") {
            button.innerHTML = `<span class="material-symbols-outlined">
delete
</span>`;
        }




        ctaBtn.appendChild(button);
        cardDetails.appendChild(ctaBtn);


        cardContainer.appendChild(cardImageContainer);
        cardContainer.appendChild(cardDetails);


        productContainer.appendChild(cardContainer);
    }
}