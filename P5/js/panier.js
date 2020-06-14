// localStorage.clear();
let amountToPay = 0;
let products = JSON.parse(localStorage.getItem("products"));

new Promise(function(resolve, reject) {
    products.forEach(element => getProduct(element));
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
        location.href="../html/confirmation.html";
    });
}




function getProduct(element){
    let request = new XMLHttpRequest();
    let category;

    if (element === "5be9c8541c9d440000665243" || element === "5beaa8bf1c9d440000a57d94" || element === "5beaaa8f1c9d440000a57d95" ||
        element === "5beaabe91c9d440000a57d96" || element === "5beaacd41c9d440000a57d97") {
        category = "teddies";
    } else if (element === "5be1ed3f1c9d44000030b061" || element === "5be1ef211c9d44000030b062" || element === "5be9bc241c9d440000a730e7" ||
        element === "5be9c4471c9d440000a730e8" || element === "5be9c4c71c9d440000a730e9") {
        category = "cameras";
    } else if (element === "5be9cc611c9d440000c1421e" || element === "5beaadda1c9d440000a57d98" || element === "5beaae361c9d440000a57d99" ||
        element === "5beaaf2e1c9d440000a57d9a" || element === "5beab2061c9d440000a57d9b") {
        category = "furniture";
    } else {
        category = null;
    }

    request.open("GET", "http://localhost:3000/api/"+category+"/"+element);
    request.send();
    request.onreadystatechange = function() {
        //If success
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            let response = JSON.parse(this.responseText);
            createProductItem(response);
            amountToPay += response.price;
            console.log(response);
        }
    };
}