class Furniture {
    constructor(varnish, id, name, price, imageUrl, description, quantity = 0, category = "furniture") {
        this.varnish = varnish;
        this.id = id;
        this.name = name;
        this.price = price;
        this.imageUrl = imageUrl;
        this.description = description;
        this.quantity = quantity;
        this.category = category;
    }
}