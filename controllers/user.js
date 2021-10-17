const User = require("../models/User");

exports.getUserById = (req, res, next, id) => {
  //   console.log(id);
  User.findById(id).exec((err, user) => {
    if (err) {
      return res.status(400).json({
        error: "Error getting user",
      });
    } else if (!user) {
      return res.status(401).json({
        error: "User not found",
      });
    }
    req.profile = user;
    next();
  });
};

exports.getUserByQuery = (req, res) => {
  console.log(req.query);
  User.findOne({ email: req.query.email }).exec((err, user) => {
    if (err) {
      return res.status(400).json({
        error: "Error getting user",
      });
    } else if (!user) {
      return res.status(401).json({
        error: "User not found1",
      });
    }
    res.json(user);
  });
};

exports.isAdmin = (req, res, next) => {
  const user = req.profile;
  console.log(user);
  if (user.role != "admin") {
    return res.status(400).json({
      error: "You are not authorized to perform this action",
    });
  }
  next();
};

exports.getAllUsers = (req, res) => {
  User.find({}, (err, users) => {
    if (err) {
      res.status(500).send({
        error: err.message,
        message: "No users found",
      });
    } else {
      res.status(200).json(users);
    }
  });
};

exports.getUser = (req, res) => res.json(req.profile);
