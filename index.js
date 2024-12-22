import { products } from "./products.js";
import { cardCreater } from "./productCardCreater.js";

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const productContainer = document.querySelector(".product-container");


let checkInCart = (cart, clickedProductId) => {
    return cart && cart.length > 0 && cart.some(item => clickedProductId === item.id.toString());
}



productContainer.addEventListener("click", (e) => {
    e.preventDefault();


    if (e.target.dataset.id) {

        let isProductInCart = checkInCart(cart, e.target.dataset.id);

        if (!isProductInCart) {
            let productId = e.target.dataset.id;
            let productToAddToCart = products.filter(
                ({ id }) => productId === id.toString()
            );
            productToAddToCart = productToAddToCart.map(product => ({ ...product, quantity: 1 }));
            cart = [...cart, ...productToAddToCart];
            const button = e.target;
            button.innerHTML = `Go To Cart <span class='material-symbols-outlined'>
        shopping_cart
                        </span >`;
            localStorage.setItem("cart", JSON.stringify(cart));
        } else {
            location.href = "./cart.html";
        }
    }
});

cardCreater(products, productContainer, cart, "main");


let searchInput = document.querySelector(".search-input");
let goSearch = document.querySelector(".goSearch");

goSearch.addEventListener("click", (e) => {
    e.preventDefault();

    if (searchInput.value) {
        let val = searchInput.value.toLowerCase();
        let temp = products.filter((product) => {
            let productVal = product.keywords.toLowerCase();
            return productVal === val || productVal.includes(val);
        });
        productContainer.innerHTML = "";
        if (temp.length > 0) {
            cardCreater(temp, productContainer, cart, "main");
        } else {
            productContainer.innerHTML = `Not found ! <span class="material-symbols-outlined">
arrow_back
</span>`;
        }
    }
    else {
        productContainer.innerHTML = "";
        cardCreater(products, productContainer, cart, "main");
    }
});


let sideBar = document.querySelector(".side-bar");
sideBar.addEventListener("click", (e) => {
    let currRating = e.target.dataset.rating;
    if (currRating) {
        console.log(currRating);
        let tempo = products.filter((product) => product.rating >= Number(currRating));
        console.log(tempo);
        productContainer.innerHTML = "";
        cardCreater(tempo, productContainer, cart, "main");
    }

})

