const express = require("express");
const router = express.Router();

const {
  getAllUsers,
  getUser,
  getUserById,
  getUserByQuery,
} = require("../controllers/user");

router.param("id", getUserById);

// GET /users
router.get("/users", getAllUsers);

// GET by query parameter
router.get("/user/query", getUserByQuery);

// GET /user/:id
router.get("/user/:id", getUser);

// POST

module.exports = router;
