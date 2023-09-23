const mongoose = require('mongoose')
const Schema = mongoose.Schema

const BookSchema = new Schema({
    title : {
        type : String
    },
    isbn : {
        type : String
    },
    author : {
        type : String
    },
    datePublished : {
        type : String
    },
    genre : {
        type : String
    }


})

const Books = mongoose.model("Book", BookSchema)
module.exports = Books