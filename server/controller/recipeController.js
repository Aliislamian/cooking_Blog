require("../model/database");
const Category = require("../model/Category");
const Recipe = require("../model/Recipe");
const Singin = require("../model/signin");


// exports.signIn = async(req, res) => {
//     try {
//       res.render('', { title: 'Cooking Blog - explore-latest', recipe });
        
//     } catch (error) {
        
//     }
// }

/**
 * Get /
 * Home Page
 */

exports.homepage = async (req, res) => {

    try {
        const limitNumber = 5;
        const categories = await Category.find({}).limit(limitNumber);
        const latest = await Recipe.find({}).sort({_id: -1}).limit(limitNumber);
        const American = await Recipe.find({'category': 'American'}).limit(limitNumber);
        const food = {latest, American}
        res.render('index', {title: 'Cooking Blog - Home', categories, food});       
    } catch (error) {
        res.status(500).send({
            message: error.message || "Error"
        })
    }
};
exports.exploreCategories = async(req, res) => {
    try {
      const limitNumber = 20;
      const categories = await Category.find({}).limit(limitNumber);
      res.render('categories', { title: 'Cooking Blog - Categoreis', categories } );
    } catch (error) {
      res.satus(500).send({message: error.message || "Error Occured" });
    }
  }; 



  exports.exploreCategoriesById  = async(req, res) => {
    try {
        let categoryid = req.params.id;
      const limitNumber = 20;
      const categoryByid = await Recipe.find({'category': categoryid}).limit(limitNumber);
      res.render('categories', { title: 'Cooking Blog - Categoreis', categoryByid } );
    } catch (error) {
      res.satus(500).send({message: error.message || "Error Occured" });
    }
  }; 


  exports.exploreRecipe = async(req, res) => {
    try {
        let recipeId = req.params.id;
        const recipe = await Recipe.findById(recipeId);
      res.render('recipe', { title: 'Cooking Blog - Recipe', recipe });
    } catch (error) {
      res.satus(500).send({message: error.message || "Error Occured" });
    }
  };

  exports.searchRecipe = async(req, res) => {
    try {
      let searchTerm = req.body.searchTerm;
      let recipe = await Recipe.find( { $text: { $search: searchTerm, $diacriticSensitive: true } });
      res.render('search', { title: 'Cooking Blog - Search', recipe } );
    } catch (error) {
      res.satus(500).send({message: error.message || "Error Occured" });
    }    
  };

  
  exports.exploreLatest = async(req, res) => {
    try {
        const limitNumber = 20;
        const recipe = await Recipe.find({}).sort({ _id: -1 }).limit(limitNumber);
      res.render('explore-latest', { title: 'Cooking Blog - explore-latest', recipe });
    } catch (error) {
      res.satus(500).send({message: error.message || "Error Occured" });
    }
  };

  
  
  exports.exploreRandom = async(req, res) => {
    try {
        let count = await Recipe.find().countDocuments();
        let random = Math.floor(Math.random() * count);
        let recipe = await Recipe.findOne().skip(random).exec();
      res.render('explore-random', { title: 'Cooking Blog - explore-latest', recipe });
    } catch (error) {
      res.satus(500).send({message: error.message || "Error Occured" });
    }
  };

  exports.submitRecipe = async(req, res) => {
    const infoErrorsObj = req.flash('infoErrors');
    const infoSubmitObj = req.flash('infoSubmit');
    res.render('submit-recipe', { title: 'Cooking Blog - Submit Recipe', infoErrorsObj,infoSubmitObj  } );
  }

  
  exports.submitRecipePost = async(req, res) => {
    try {

        let imageUploadFile;
        let uploadPath;
        let newImageName;
    
        if(!req.files || Object.keys(req.files).length === 0){
          console.log('No Files where uploaded.');
        } else {
    
          imageUploadFile = req.files.image;
          newImageName = Date.now() + imageUploadFile.name;
    
          uploadPath = require('path').resolve('./') + '/public/uploads/' + newImageName;
    
          imageUploadFile.mv(uploadPath, function(err){
            if(err) return res.satus(500).send(err);
          })
    
        }
    
        const newRecipe = new Recipe({
          name: req.body.name,
          description: req.body.description,
          email: req.body.email,
          ingredients: req.body.ingredients,
          category: req.body.category,
          image: newImageName
        });
        
        await newRecipe.save();
    
        req.flash('infoSubmit', 'Recipe has been added.')
        res.redirect('/submit-recipe');
      } catch (error) {
        // res.json(error);
        req.flash('infoErrors', error);
        res.redirect('/submit-recipe');
      }
  }
  

  















































//   async function insertDymmyRecipeData(){
//     try {
//         await Recipe.insertMany([
//             { 
//                 "name": "Recipe Name Goes Here",
//                 "description": `Recipe Description Goes Here`,
//                 "email": "recipeemail@raddy.co.uk",
//                 "ingredients": [
//                   "1 level teaspoon baking powder",
//                   "1 level teaspoon cayenne pepper",
//                   "1 level teaspoon hot smoked paprika",
//                 ],
//                 "category": "American", 
//                 "image": "6.avif"
//               },
//               { 
//                 "name": "Recipe Name Goes Here",
//                 "description": `Recipe Description Goes Here`,
//                 "email": "recipeemail@raddy.co.uk",
//                 "ingredients": [
//                   "1 level teaspoon baking powder",
//                   "1 level teaspoon cayenne pepper",
//                   "1 level teaspoon hot smoked paprika",
//                 ],
//                 "category": "American", 
//                 "image": "6.avif"
//               },
//         ]);
//     } catch (error) {
//         console.log('err' + error);
//     }
// }

// insertDymmyRecipeData();


// async function inserDymmyCategoryData(){
//     try {
//         await Category.insertMany([
//             {
//                 "name": "American",
//                 "image": "4.avif"
//             },
            
//         ]);
//     } catch (error) {
//         console.log('err' + error);
//     }
// }

// inserDymmyCategoryData();