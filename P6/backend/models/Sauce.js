const mongoose = require('mongoose')

const sauceSchema = mongoose.Schema({
   // _id: {type: String, required: false},
    name: {type: String, required: false},
    manufacturer: {type: String, required: false},
    description: {type: String, required: false},
    heat: {type: Number, required: false},
    likes: {type: Number, required: false},
    dislikes: {type: Number, required: false},
    imageUrl: {type: String, required: false},
    mainPepper: {type: String, required: false},
    usersLiked: {type: [String], required: false},
    usersDisliked: {type: [String], required: false},
    userId: {type: String, required: false},
})

module.exports = mongoose.model('Sauce', sauceSchema)