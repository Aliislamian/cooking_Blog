const mongoos = require("mongoose");

const singInSchema = new mongoos.Schema({
    email:{
        type: String,
        required: 'This field is reduired.'
    },
    password:{
        type: String,
        required: 'This field is reduired.'
    },
});

module.exports = mongoos.model('Signin', singInSchema);