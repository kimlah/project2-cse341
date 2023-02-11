const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  try {
    const result = await mongodb
    .getDb()
    .db("project2")
    .collection('users')
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
    .collection('users')
    .find({ _id: userId });
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists[0]);
    });
  } catch {
    res.status(500).json({err});
  }
};

const createUser = async (req, res) => {
  //const {username, password, email, firstName, lastName, birthday} = req.body;
  //const newUser = new user({username, password, email, firstName, lastName, birthday});
  try {
    const user = {
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      birthday: req.body.birthday
    };
    /*await newUser.save();
    return res.status(201).json({
      success: true,
      message: "sighup successful",
      data: newUser
    });*/
  
    const response = await mongodb
      .getDb()
      .db("project2")
      .collection('users')
      .insertOne(user);
    if (response.acknowledged) {
      res.status(201).json(response);
    }
    else {
      res.status(500).json(response.error || 'An error occurred while creating the user.');
    }
  } catch {
    res.status(500).json({err});
  }
};

const updateUser = async (req, res) => {
   try {
    const userId = new ObjectId(req.params.id);
    const user = {
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      birthday: req.body.birthday
    };
  
    const response = await mongodb
      .getDb()
      .db("project2")
      .collection("users")
      .replaceOne({_id: userId}, user);
    console.log(response);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    }
    else {
      res.status(500).json(response.error || 'An error occurred while updating the user');
    }
   } catch {
    res.status(500).json({err});
   }
};

const deleteUser = async (req, res) => {
  try {
    const userId = new ObjectId(req.params.id);
    const response = await mongodb
      .getDb()
      .db("project2")
      .collection("users")
      .deleteOne({_id: userId}, true);
    console.log(response);
    if (response.deletedCount > 0) {
      res.status(200).send();
    }
    else {
      res.status(500).json(response.error || 'An error occurred while deleting the user');
    }
  } catch {
    res.status(500).json({err});
  }
}

module.exports = { getAll, getSingle, createUser, updateUser, deleteUser };
