fetchData("cameras");

function createCameras(response) {
    for (let i = 0; i < response.length; i++) {
        let camera = new Cameras(response[i].lenses, response[i]._id, response[i].name, response[i].price, response[i].imageUrl, response[i].description);
        let productContainer = document.getElementById("products");
        if (i === 0) {
            productContainer.innerHTML +=
                "<div class=\"row\">" +
                "<div id=\""+camera.id+"\" class=\"card col-4 my-2\">" +
                "<img class=\"card-img-top\" src=\""+camera.imageUrl+"\" alt=\"Photo du produit\">" +
                "<div class=\"card-body\">\n" +
                "<h5 class=\"card-title\">"+camera.name+"</h5>\n" +
                "<p class=\"card-text\">"+camera.description+"</p>\n" +
                "</div>" +
                "</div>" +
                "</div>";
        } else {
            productContainer.getElementsByTagName('div')[0].innerHTML +=
                "<div id=\""+camera.id+"\" class=\"card col-4 my-2\">" +
                "<img class=\"card-img-top\" src=\""+camera.imageUrl+"\" alt=\"Photo du produit\">" +
                "<div class=\"card-body\">\n" +
                "<h5 class=\"card-title\">"+camera.name+"</h5>\n" +
                "<p class=\"card-text\">"+camera.description+"</p>\n" +
                "</div>" +
                "</div>" +
                "</div>";
        }
    }
    for (let i = 0; i < response.length; i++) {
        let camera = new Cameras(response[i].lenses, response[i]._id, response[i].name, response[i].price, response[i].imageUrl, response[i].description);
        document.getElementById(camera.id).addEventListener('click', function () {
            localStorage.setItem('productID', camera.id);
            localStorage.setItem('category', "cameras");
            localStorage.setItem('currentItem', JSON.stringify(camera))
            location.href="../html/product.html";
            console.log(camera.id);
        });
    }
}

function fetchData(category){
    fetch("http://localhost:3000/api/"+category)
        .then((resp) => resp.json()) // Transform the data into json
        .then(function(data){
            createCameras(data);
        })
        .catch(function(error) {
            console.log(error)
        });
}
