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

exports.createUser = (req, res) => {
  console.log(req.body);
  const data = User.create(req.body, (err, user) => {
    if (err) {
      res.status(400).json({
        error: err.message,
        message: "Error creating user",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "User created successfully",
        data: user,
      });
    }
  });
};

exports.updateUser = (req, res) => {
  const user = req.profile;

  const data = User.findByIdAndUpdate(
    user._id,
    { $set: req.body },
    { new: true, runValidators: true, useFindAndModify: false },
    (err, user) => {
      if (err) {
        res.status(400).json({
          error: err.message,
          message: "Error updating user",
        });
      } else {
        res.status(200).json({
          success: true,
          message: "User updated successfully",
          data: user,
        });
      }
    }
  );
};

exports.deleteUser = (req, res) => {
  const user = req.profile;

  User.findByIdAndRemove(user._id, (err, user) => {
    if (err) {
      res.status(400).json({
        error: err.message,
        message: "Error deleting user",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "User deleted successfully",
        data: user,
      });
    }
  });
};

exports.getUser = (req, res) => res.json(req.profile);
