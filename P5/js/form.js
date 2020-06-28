document.getElementById("submitForm").addEventListener("click", function () {
    let firstName = document.getElementById("name").value
    let lastName = document.getElementById("lastName").value
    let address = document.getElementById("address").value
    let city = document.getElementById("city").value
    let email = document.getElementById("email").value
    let contact = new Contact(firstName, lastName, address, city, email);
    sendProduct(contact);
})

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

    location.href="../html/confirmation.html";

}



// The data we are going to send in our request
function appendProductList(id, list) {
    let product = new Products(id)
    list.push(product)
    console.log("append")
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






