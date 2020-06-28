fetchData("furniture");

function createFurniture(response) {
    for (let i = 0; i < response.length; i++) {
        let furniture = new Furniture(response[i].varnish, response[i]._id, response[i].name, response[i].price, response[i].imageUrl, response[i].description);
        let productContainer = document.getElementById("products");
        if (i === 0) {
            productContainer.innerHTML +=
                "<div class=\"row\">" +
                "<div id=\""+furniture.id+"\" class=\"card col-4 my-2\">" +
                "<img class=\"card-img-top\" src=\""+furniture.imageUrl+"\" alt=\"Photo du produit\">" +
                "<div class=\"card-body\">\n" +
                "<h5 class=\"card-title\">"+furniture.name+"</h5>\n" +
                "<p class=\"card-text\">"+furniture.description+"</p>\n" +
                "</div>" +
                "</div>" +
                "</div>";
        } else {
            productContainer.getElementsByTagName('div')[0].innerHTML +=
                "<div id=\""+furniture.id+"\" class=\"card col-4 my-2\">" +
                "<img class=\"card-img-top\" src=\""+furniture.imageUrl+"\" alt=\"Photo du produit\">" +
                "<div class=\"card-body\">\n" +
                "<h5 class=\"card-title\">"+furniture.name+"</h5>\n" +
                "<p class=\"card-text\">"+furniture.description+"</p>\n" +
                "</div>" +
                "</div>" +
                "</div>";
        }
    }
    for (let i = 0; i < response.length; i++) {
        let furniture = new Furniture(response[i].varnish, response[i]._id, response[i].name, response[i].price, response[i].imageUrl, response[i].description);
        document.getElementById(furniture.id).addEventListener('click', function () {
            localStorage.setItem('productID', furniture.id);
            localStorage.setItem('category', "furniture");
            localStorage.setItem('currentItem', JSON.stringify(furniture))
            location.href="../html/product.html";
            console.log(furniture.id);
        });
    }
}

function fetchData(category){
    fetch("http://localhost:3000/api/"+category)
        .then((resp) => resp.json()) // Transform the data into json
        .then(function(data){
            createFurniture(data);
        })
        .catch(function(error) {
            console.log(error)
        });
}

