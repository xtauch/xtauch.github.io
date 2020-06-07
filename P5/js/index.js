let toyCategory = document.getElementById('toyCategory');
toyCategory.addEventListener('click', function () {
getData("teddies")
});



function getData(category){
    let request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            let response = JSON.parse(this.responseText);
            console.log(response);
        }
    };
    request.open("GET", "http://localhost:3000/api/"+category);
    request.send();
}


//localStorage.setItem('monChat', 'Tom');
//let cat = localStorage.getItem('myCat');
//localStorage.removeItem('myCat');
// Effacer tous les éléments
//localStorage.clear();