const mongoos = require("mongoose");

const categorySchema = new mongoos.Schema({
    name:{
        type: String,
        required: 'This field is reduired.'
    },
    image:{
        type: String,
        required: 'This field is reduired.'
    },
});

module.exports = mongoos.model('category', categorySchema);