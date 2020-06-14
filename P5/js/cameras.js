getData("cameras");

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
            location.href="../html/product.html";
            console.log(camera.id);
        });
    }
}

function getData(category){
    let request = new XMLHttpRequest();
    request.open("GET", "http://localhost:3000/api/"+category);
    request.send();
    request.onreadystatechange = function() {
        //If success
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            let response = JSON.parse(this.responseText);
            switch (category) {
                case "teddies":
                    createTeddies(response);
                    break;
                case "furniture":
                    createFurniture(response);
                    break;
                case "cameras":
                    createCameras(response);
                    break;
            }

        }
    };
}

//localStorage.setItem('monChat', 'Tom');
//let cat = localStorage.getItem('myCat');
//localStorage.removeItem('myCat');
// Effacer tous les éléments
//localStorage.clear();