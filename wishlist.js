import { cardCreater } from "./productCardCreater.js";


let wishList = JSON.parse(localStorage.getItem("wishList")) || [];
console.log(wishList);
let wishlistContainer = document.querySelector(".wishList-items");

let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
cardCreater(wishList, wishlistContainer, cartItems, "wishList");


wishlistContainer.addEventListener("click", (e) => {
    e.preventDefault();

    if (e.target.dataset.id) {
        wishList = wishList.filter((item) => item.id.toString() !== e.target.dataset.id);
        localStorage.setItem("wishList", JSON.stringify(wishList));
        location.href = "./wishList.html";
    }
});