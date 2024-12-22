import { createHorizontalCards } from "./horizontalCards.js";


let cartProductContainer = document.querySelector(".cart-items");
let wishList = JSON.parse(localStorage.getItem("wishList")) || [];
let cartProducts = JSON.parse(localStorage.getItem("cart")) || [];

let isCart = document.querySelector(".isCart");
(cartProducts.length > 0) ? isCart.innerHTML = "Your Cart" : isCart.innerHTML = "Your cart is empty";


createHorizontalCards(cartProducts, cartProductContainer);

cartProductContainer.addEventListener("click", (e) => {
    e.preventDefault();

    let type = e.target.dataset.type;
    let selectedId = e.target.dataset.id;

    switch (type) {
        case "delete":
            cartProducts = cartProducts.filter(({ id }) => id.toString() !== selectedId);
            localStorage.setItem("cart", JSON.stringify(cartProducts));
            location.href = "./cart.html";
            break;
        case "plus":
            let targetItemPlus = cartProducts.find((product) => product.id.toString() === selectedId);
            let temp = document.querySelector(`.count${selectedId}`);
            let oldQuantity = Number(temp.innerHTML);
            oldQuantity = oldQuantity + 1;
            temp.innerHTML = `${oldQuantity}`;
            targetItemPlus.quantity = oldQuantity;
            localStorage.setItem("cart", JSON.stringify(cartProducts));
            location.href = "./cart.html";
            break;
        case "minus":
            let targetItemMinus = cartProducts.find((product) => product.id.toString() === selectedId);
            let temp2 = document.querySelector(`.count${selectedId}`);
            let reduceQuantity = Number(temp2.innerHTML);
            if (reduceQuantity > 1) {
                reduceQuantity -= 1;
                temp2.innerHTML = `${reduceQuantity}`;
                targetItemMinus.quantity = reduceQuantity;
                localStorage.setItem("cart", JSON.stringify(cartProducts));
                location.href = "./cart.html";
            }
            break;
        case "wishlist":
            let alpha = cartProducts.filter(({ id }) => id.toString() === selectedId);
            wishList = [...wishList, ...alpha];
            console.log(wishList);
            cartProducts = cartProducts.filter(({ id }) => id.toString() !== selectedId);
            localStorage.setItem("cart", JSON.stringify(cartProducts));
            localStorage.setItem("wishList", JSON.stringify(wishList));
            location.href = "./cart.html";
            break;
    }

});

let noItems = document.querySelector(".no-items");
noItems.innerHTML = `Price (${cartProducts.length}) items`;

let totalPrice = document.querySelector(".total-price");
let tempPrice = cartProducts.reduce((acc, item) => { return acc + (item.quantity * item.originalPrice) }, 0)
totalPrice.innerHTML = `Rs. ${tempPrice}`;

let discountPrice = document.querySelector(".discount-price");
let dPrice = cartProducts.reduce((acc, item) => { return acc + (item.quantity * item.originalPrice) }, 0) - cartProducts.reduce((acc, item) => { return acc + (item.quantity * item.currPrice) }, 0);
discountPrice.innerHTML = `Rs ${dPrice}`;


let finalPrice = document.querySelector(".final-price");
finalPrice.innerHTML = `Rs. ${tempPrice - dPrice + 100}`;


let youWillSave = document.querySelector(".you-will-save");
youWillSave.innerHTML = `Rs. ${dPrice - 100}`


if (!cartProducts.length) {
    let priceDetailContainer = document.querySelector(".price-details-container");
    priceDetailContainer.style.display = 'none';
}
