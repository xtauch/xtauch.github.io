

let cartCount = 0;

if (localStorage.getItem("teddiesProducts") != null) {
    JSON.parse(localStorage.getItem("teddiesProducts")).forEach(element => incrementCartCount(element));
}
if (localStorage.getItem("camerasProducts") != null) {
    JSON.parse(localStorage.getItem("camerasProducts")).forEach(element => incrementCartCount(element));
}
if (localStorage.getItem("furnitureProducts") != null) {
    JSON.parse(localStorage.getItem("furnitureProducts")).forEach(element => incrementCartCount(element));
}

function incrementCartCount(element) {
    cartCount++
}

document.getElementById("cartCount").innerHTML = cartCount
localStorage.setItem("cartCount", cartCount)

