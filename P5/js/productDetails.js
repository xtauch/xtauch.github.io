let category = localStorage.getItem('category');
let productID = localStorage.getItem('productID');
let currentItem = JSON.parse(localStorage.getItem('currentItem'));


fetchProduct();

function createProductDetails(response) {
    let productContainer = document.getElementById("products");

    productContainer.innerHTML =
        "<div class=\"row\">" +
        "<div id=\""+response._id+"\" class=\"col-7 my-4\">" +
        "<img class=\"col-12\" src=\""+response.imageUrl+"\" alt=\"Photo du produit\">" +
        "</div>\n" +
        "<div class=\"card col-5 my-4\">\n" +
        "<div class=\"card-body\">\n" +
        "<h5 class=\"card-title\">"+response.name+"</h5>\n" +
        "<h6 class=\"card-title\">"+"Prix : "+response.price+"</h6>\n" +
        "<select id=\"dropdownSelect\" class=\"browser-default custom-select my-2\"></select>\n" +
        "<p class=\"card-text my-4\">"+response.description+"</p>\n" +
        "<button id=\"buttonAdd\" class=\"btn-warning btn\">Ajouter au panier</button>\n" +
        "</div>\n" +
        "</div>\n" +
        "</div>";

    document.getElementById("buttonAdd").addEventListener('click', function () {
        addToCart();
    });

    let dropdownSelect = document.getElementById("dropdownSelect");

    switch (category) {
        case "teddies":
            for (let i = 0; i < response.colors.length; i++) {
                if (i === 0) {
                    dropdownSelect.innerHTML +=
                        "<option selected>"+response.colors[i]+"</option>"
                } else {
                    dropdownSelect.innerHTML +=
                        "<option>"+response.colors[i]+"</option>"
                }
            }
            break;

        case "furniture":
            for (let i = 0; i < response.varnish.length; i++) {
                if (i === 0) {
                    dropdownSelect.innerHTML +=
                        "<option selected>"+response.varnish[i]+"</option>"
                } else {
                    dropdownSelect.innerHTML +=
                        "<option>"+response.varnish[i]+"</option>"
                }
            }
            break;

        case "cameras":
            for (let i = 0; i < response.lenses.length; i++) {
                if (i === 0) {
                    dropdownSelect.innerHTML +=
                        "<option selected>"+response.lenses[i]+"</option>"
                } else {
                    dropdownSelect.innerHTML +=
                        "<option>"+response.lenses[i]+"</option>"
                }
            }
            break;
    }
}

function fetchProduct(){
    fetch("http://localhost:3000/api/"+category+"/"+productID)
        .then((resp) => resp.json()) // Transform the data into json
        .then(function(data){
            createProductDetails(data);
        })
        .catch(function(error) {
            console.log(error)
        });
}

function addToCart() {
    let cart = [];

    switch (currentItem.category) {
        case "teddies" :
            if (localStorage.getItem("teddiesProducts") == null) {
                localStorage.setItem("teddiesProducts", JSON.stringify(cart));
            }
                cart = JSON.parse(localStorage.getItem("teddiesProducts"));
                cart.push(currentItem);
                localStorage.setItem("teddiesProducts", JSON.stringify(cart));
            break

        case "cameras" :
            if (localStorage.getItem("camerasProducts") == null) {
                localStorage.setItem("camerasProducts", JSON.stringify(cart));
            }
                cart = JSON.parse(localStorage.getItem("camerasProducts"));
                cart.push(currentItem);
                localStorage.setItem("camerasProducts", JSON.stringify(cart));
            break

        case "furniture" :
            if (localStorage.getItem("furnitureProducts") == null) {
                localStorage.setItem("furnitureProducts", JSON.stringify(cart));
            }
                cart = JSON.parse(localStorage.getItem("furnitureProducts"));
                cart.push(currentItem);
                localStorage.setItem("furnitureProducts", JSON.stringify(cart));
            break
    }

    let cartCount = JSON.parse(localStorage.getItem("cartCount"));
    cartCount++
    document.getElementById("cartCount").innerHTML = cartCount
    localStorage.setItem("cartCount", cartCount)
}



