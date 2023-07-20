const mongoose = require("mongoose")

const Schema = mongoose.Schema

const bookSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    author: {
        type: String,
        require: false
    },
    genre: {
        type: String,
        require: true
    },
    price: {
        type: String,
        require: true
    },
    publisher: {
        type: String,
        require: true
    }
},
    {
        timestamps: true
    }

)

// collection will have a name "books"
module.exports = mongoose.model("Book", bookSchema)