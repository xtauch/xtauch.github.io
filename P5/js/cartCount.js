

let cartCount = 0

if (localStorage.getItem("teddiesProducts") != null) {
    JSON.parse(localStorage.getItem("teddiesProducts")).forEach(element => incrementCartCount(element.quantity));
}
if (localStorage.getItem("camerasProducts") != null) {
    JSON.parse(localStorage.getItem("camerasProducts")).forEach(element => incrementCartCount(element.quantity));
}
if (localStorage.getItem("furnitureProducts") != null) {
    JSON.parse(localStorage.getItem("furnitureProducts")).forEach(element => incrementCartCount(element.quantity));
}

function incrementCartCount(quantity) {
    cartCount += quantity
}

document.getElementById("cartCount").innerHTML = cartCount
localStorage.setItem("cartCount", cartCount)

