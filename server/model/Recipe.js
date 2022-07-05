const mongoos = require("mongoose");

const recipeSchema = new mongoos.Schema({
    name:{
        type: String,
        required: 'This field is reduired.'
    },
    description:{
        type: String,
        required: 'This field is reduired.'
    },
    email:{
        type: String,
        required: 'This field is reduired.'
    },
    ingredients:{
        type: Array,
        required: 'This field is reduired.'
    },
    category: {
        type: String,
        enum: ['Thai', 'American', 'Chinese', 'Mexican', 'Indian'],
        required: 'This field is required.'
      },
    image:{
        type: String,
        required: 'This field is reduired.'
    },
});

// //recipeSchema.index({name: 'text', description: 'text'});
recipeSchema.index({ name: 'text', description: 'text' });


// recipeSchema.index({"$**": 'text'});


module.exports = mongoos.model('Recipe', recipeSchema);