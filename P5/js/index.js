

fetchData("teddies")
fetchData("cameras")
fetchData("furniture")



function fetchData(category){
    fetch("http://localhost:3000/api/"+category)
        .then((resp) => resp.json()) // Transform the data into json
        .then(function(data){
            if (category === "teddies") {
                document.getElementById("Row1Product1").src = data[1].imageUrl
                document.getElementById("Row1Product2").src = data[2].imageUrl
                document.getElementById("Row1Product3").src = data[3].imageUrl
            }
            if (category === "cameras") {
                document.getElementById("Row2Product1").src = data[1].imageUrl
                document.getElementById("Row2Product2").src = data[2].imageUrl
                document.getElementById("Row2Product3").src = data[3].imageUrl
            }
            if (category === "furniture") {
                document.getElementById("Row3Product1").src = data[1].imageUrl
                document.getElementById("Row3Product2").src = data[2].imageUrl
                document.getElementById("Row3Product3").src = data[3].imageUrl
            }
        })
        .catch(function(error) {
            console.log(error)
        });
}