const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  try{
    const result = await mongodb
    .getDb()
    .db("project2")
    .collection('recipes')
    .find();
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
  } catch (err) {
    res.status(500).json({message: err.message});
  }
};

const getSingle = async (req, res) => {
  try {
    const userId = new ObjectId(req.params.id);
    const result = await mongodb
    .getDb()
    .db("project2")
    .collection('recipes')
    .find({ _id: userId });
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists[0]);
    });
  } catch {
    res.status(500).json({err});
  }
};

const createRecipe = async (req, res) => {
  try {
    const recipe = {
      recipeName: req.body.recipeName,
      source: req.body.source,
      servings: req.body.servings,
      timeNeeded: req.body.timeNeeded,
      cuisine: req.body.cuisine,
      recipeType: req.body.recipeType,
      notes: req.body.notes
    };
  
    const response = await mongodb
      .getDb()
      .db("project2")
      .collection('recipes')
      .insertOne(recipe);
    if (response.acknowledged) {
      res.status(201).json(response);
    }
    else {
      res.status(500).json(response.error || 'An error occurred while adding the recipe.');
    }
  } catch {
    res.status(500).json({err});
  }
};

const updateRecipe = async (req, res) => {
   try {
    const userId = new ObjectId(req.params.id);
    const recipe = {
        recipeName: req.body.recipeName,
        source: req.body.source,
        servings: req.body.servings,
        timeNeeded: req.body.timeNeeded,
        cuisine: req.body.cuisine,
        recipeType: req.body.recipeType,
        notes: req.body.notes
      };
  
    const response = await mongodb
      .getDb()
      .db("project2")
      .collection("recipes")
      .replaceOne({_id: userId}, recipe);
    console.log(response);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    }
    else {
      res.status(500).json(response.error || 'An error occurred while updating the recipe');
    }
   } catch {
    res.status(500).json({err});
   }
};

const deleteRecipe = async (req, res) => {
  try {
    const userId = new ObjectId(req.params.id);
    const response = await mongodb
      .getDb()
      .db("project2")
      .collection("recipes")
      .deleteOne({_id: userId}, true);
    console.log(response);
    if (response.deletedCount > 0) {
      res.status(200).send();
    }
    else {
      res.status(500).json(response.error || 'An error occurred while deleting the recipe');
    }
  } catch {
    res.status(500).json({err});
  }
}

module.exports = { getAll, getSingle, createRecipe, updateRecipe, deleteRecipe};
