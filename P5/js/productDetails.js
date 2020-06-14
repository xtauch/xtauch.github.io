let category = localStorage.getItem('category');
let productID = localStorage.getItem('productID');



getProduct();

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
        addToCart(response._id);
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

function getProduct(){
    let request = new XMLHttpRequest();

    request.open("GET", "http://localhost:3000/api/"+category+"/"+productID);
    request.send();
    request.onreadystatechange = function() {
        //If success
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            let response = JSON.parse(this.responseText);
            createProductDetails(response);
            console.log(response);
        }
    };
}


function addToCart(id) {
    let cart = new Array();
    if (localStorage.getItem("products") == null) {
        localStorage.setItem("products", JSON.stringify(cart));
    } else {
         cart = JSON.parse(localStorage.getItem("products"));
    }
    cart.push(id);
    localStorage.setItem("products", JSON.stringify(cart));
    console.log(localStorage.getItem("products"));
}

