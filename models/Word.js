const mongoose = require('mongoose') //Mongoose is an Object Document Mapper (ODM). This means that Mongoose allows you to define objects with a strongly-typed schema that is mapped to a MongoDB document.
const Schema = mongoose.Schema

// Create Schema
const WordSchema = new Schema({
    word: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    POS: {
        type: String,
        required: true
    },
    polarity: {
        type: String,
        required: true
    }
})

module.exports = Word = mongoose.model('word', WordSchema)