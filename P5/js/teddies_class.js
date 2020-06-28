class Teddies {
    constructor(colors, id, name, price, imageUrl, description, quantity = 0, category = "teddies") {
        this.colors = colors;
        this.id = id;
        this.name = name;
        this.price = price;
        this.imageUrl = imageUrl;
        this.description = description;
        this.quantity = quantity;
        this.category = category;
    }
}