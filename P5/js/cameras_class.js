class Cameras {
    constructor(lenses, id, name, price, imageUrl, description, quantity = 0, category = "cameras") {
        this.lenses = lenses;
        this.id = id;
        this.name = name;
        this.price = price;
        this.imageUrl = imageUrl;
        this.description = description;
        this.quantity = quantity;
        this.category = category;
    }
}