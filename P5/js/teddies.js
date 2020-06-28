fetchData("teddies");

function createTeddies(response) {
    for (let i = 0; i < response.length; i++) {
        let teddy = new Teddies(response[i].colors, response[i]._id, response[i].name, response[i].price, response[i].imageUrl, response[i].description);
        let productContainer = document.getElementById("products");
        if (i === 0) {
            productContainer.innerHTML +=
                "<div class=\"row\">" +
                "<div id=\""+teddy.id+"\" class=\"card col-4 my-2\">" +
                "<img class=\"card-img-top\" src=\""+teddy.imageUrl+"\" alt=\"Photo du produit\">" +
                "<div class=\"card-body\">\n" +
                "<h5 class=\"card-title\">"+teddy.name+"</h5>\n" +
                "<p class=\"card-text\">"+teddy.description+"</p>\n" +
                "</div>" +
                "</div>" +
                "</div>";
        } else {
            productContainer.getElementsByTagName('div')[0].innerHTML +=
                "<div id=\""+teddy.id+"\" class=\"card col-4 my-2\">" +
                "<img class=\"card-img-top\" src=\""+teddy.imageUrl+"\" alt=\"Photo du produit\">" +
                "<div class=\"card-body\">\n" +
                "<h5 class=\"card-title\">"+teddy.name+"</h5>\n" +
                "<p class=\"card-text\">"+teddy.description+"</p>\n" +
                "</div>" +
                "</div>" +
                "</div>";
        }
    }
    for (let i = 0; i < response.length; i++) {
        let teddy = new Teddies(response[i].colors, response[i]._id, response[i].name, response[i].price, response[i].imageUrl, response[i].description);
        document.getElementById(teddy.id).addEventListener('click', function () {
            localStorage.setItem('productID', teddy.id);
            localStorage.setItem('category', "teddies");
            localStorage.setItem('currentItem', JSON.stringify(teddy))
            location.href="../html/product.html";
            console.log(teddy.id);
        });
    }
}

function fetchData(category){
    fetch("http://localhost:3000/api/"+category)
        .then((resp) => resp.json()) // Transform the data into json
        .then(function(data){
            createTeddies(data);
        })
        .catch(function(error) {
            console.log(error)
        });
}
