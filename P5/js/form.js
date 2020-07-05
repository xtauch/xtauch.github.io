document.getElementById("form_1").onsubmit = function(event) {
    event.preventDefault()
}

function onSubmitButton() {
    let firstName = document.getElementById("name")
    let lastName = document.getElementById("lastName")
    let address = document.getElementById("address")
    let city = document.getElementById("city")
    let email = document.getElementById("email")
    if (firstName.checkValidity() === true && lastName.checkValidity() === true && address.checkValidity() === true
        && city.checkValidity() === true && email.checkValidity() === true){

        let contact = new Contact(firstName, lastName, address, city, email)

        new Promise(function(resolve, reject) {
            sendProduct(contact)
            setTimeout(() => resolve(),250)
        }).then(function() {
            location.href="../html/confirm.html"
        })



    }
}

function sendProduct(contact){
    let url

    if (localStorage.getItem("teddiesProducts") != null) {
        let productList = []
        url = 'http://localhost:3000/api/teddies/order'
        JSON.parse(localStorage.getItem("teddiesProducts")).forEach(element => appendProductList(element.id, productList))
        fetchData(url, contact, productList)
    }

    if (localStorage.getItem("camerasProducts") != null) {
        let productList = []
        url = 'http://localhost:3000/api/cameras/order'
        JSON.parse(localStorage.getItem("camerasProducts")).forEach(element => appendProductList(element.id, productList))
        fetchData(url, contact, productList)
    }

    if (localStorage.getItem("furnitureProducts") != null) {
        let productList = []
        url = 'http://localhost:3000/api/furniture/order'
        JSON.parse(localStorage.getItem("furnitureProducts")).forEach(element => appendProductList(element.id, productList))
        fetchData(url, contact, productList)
    }
}



// The data we are going to send in our request
function appendProductList(id, list) {
    let product = new Products(id)
    list.push(product)
}

function fetchData(url, contact, productList) {
    let form = new Form(contact, productList)
    // The parameters we are gonna pass to the fetch function
    let fetchData = {
        method: 'POST',
        body: JSON.stringify(form),
        headers: {
            'Content-Type': 'application/json'
        }
    }
    fetch(url, fetchData)
        .then((resp) => resp.json()) // Transform the data into json
        .then(function(data){
            console.log(data);
            localStorage.setItem("commandId", data.orderId)
        })
        .catch(function(error) {
            console.log(error)
        });
}






