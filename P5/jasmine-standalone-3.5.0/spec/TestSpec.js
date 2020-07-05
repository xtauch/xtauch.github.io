describe("Cart", function() {
    describe("when user clicks add product button", function() {
        it("should increment the cart count", function() {
            let initialCartCount = cartCount
            incrementCartCount(1)
            expect(cartCount).toEqual(initialCartCount + 1)
        })

        it("should add the item to the list if not added yet", function() {
            let cart = []
            let teddy = new Teddies("Red", "123","SuperBear", 10, "Image", "Description")
            cart.push(teddy)
            expect(cart).toBeDefined()
        })

        it("should increment the quantity of the corresponding item in the list if added", function() {
            let cart = []
            let teddy = new Teddies("Red", "123","SuperBear", 10, "Image", "Description")
            cart.push(teddy)
            if (cart.find(element => element.id === "123") !== undefined){
                cart.find(element => element.id === "123").quantity +=1
            }
            expect(cart.find(element => element.id === "123").quantity).toEqual(2)
        })
    })

    describe("when user on the cart page", function() {
        it("should find amount to pay equal 0 if cart is empty", function() {
            amountToPay = 0
            calculateAmountToPay(0,1)
            expect(amountToPay).toEqual(0)
        })

        it("should find amount to pay equal 5800", function() {
            amountToPay = 0
            calculateAmountToPay(2900,2)
            expect(amountToPay).toEqual(5800)
        })

    })
})

describe("Http requests", function() {
    describe("when user clicks teddies category", function() {
        it("GET request returns a response", function() {
            let resp = fetch("http://localhost:3000/api/teddies")
            expect(resp).toBeDefined()
        })
    })
    describe("when user clicks cameras category", function() {
        it("GET request returns a response", function() {
            let resp = fetch("http://localhost:3000/api/cameras")
            expect(resp).toBeDefined()
        })

    })
    describe("when user clicks furniture category", function() {
        it("GET request returns a response", function() {
            let resp = fetch("http://localhost:3000/api/furniture")
            expect(resp).toBeDefined()
        })
    })
    describe("when user clicks send form", function() {
        it("POST request returns a response when form is valid", function() {
            let contact = new Contact("Toto", "Titi", "20 rue Perdu", "Paris", "toto.titi@perdu.com")
            let productList = []
            appendProductList("5be9c8541c9d440000665243", productList)
            fetchData("http://localhost:3000/api/teddies/order", contact, productList)
            expect(localStorage.getItem("commandId")).toBeDefined()
        })
    })

})

