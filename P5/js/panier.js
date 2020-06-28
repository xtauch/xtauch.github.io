let amountToPay = 0;


new Promise(function(resolve, reject) {
    if (localStorage.getItem("teddiesProducts") != null) {
        JSON.parse(localStorage.getItem("teddiesProducts")).forEach(element => fetchProduct(element));
    }
    if (localStorage.getItem("camerasProducts") != null) {
        JSON.parse(localStorage.getItem("camerasProducts")).forEach(element => fetchProduct(element));
    }
    if (localStorage.getItem("furnitureProducts") != null) {
        JSON.parse(localStorage.getItem("furnitureProducts")).forEach(element => fetchProduct(element));
    }
    setTimeout(() => resolve(),250);
}).then(function() {
    buildCartResume();
});

function createProductItem(response) {
    let productContainer = document.getElementById("productsList");
    productContainer.innerHTML +=
        "<div class=\"row\">" +
        "<div id=\""+response._id+"\" class=\"col-4 my-4\">" +
        "<img class=\"col-12\" src=\""+response.imageUrl+"\" alt=\"Photo du produit\">" +
        "</div>\n" +
        "<div class=\"card col-8 my-4\">\n" +
        "<div class=\"card-body\">\n" +
        "<h5 class=\"card-title\">"+response.name+"</h5>\n" +
        "<h6 class=\"card-title\">"+"Prix : "+response.price+"</h6>\n" +
        "<select id=\"dropdownSelect\" class=\"browser-default custom-select my-2\">\n" +
        "<option selected></option>\n" +
        "</select>\n" +
        "</div>\n" +
        "</div>\n" +
        "</div>";
}

function buildCartResume() {
    let cartResume = document.getElementById("cartResume");
    cartResume.innerHTML =
        "<div class=\"card col-12 my-4\">\n" +
        "<div class=\"card-body\">\n" +
        "<h6 class=\"card-title\">"+"Sous-total : "+amountToPay+"</h6>\n" +
        "<button id=\"buttonAdd\" class=\"btn-warning btn\">Valider la commande</button>\n" +
        "</div>\n" +
        "</div>";

    document.getElementById("buttonAdd").addEventListener('click', function () {
        localStorage.setItem('cartAmount',amountToPay);
        location.href="../html/form.html";
    });
}

function fetchProduct(element){
    fetch("http://localhost:3000/api/"+element.category+"/"+element.id)
        .then((resp) => resp.json()) // Transform the data into json
        .then(function(data){
            createProductItem(data);
            amountToPay += data.price;
        })
        .catch(function(error) {
            console.log(error)
        });
}