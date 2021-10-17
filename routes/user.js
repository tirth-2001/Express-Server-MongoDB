const express = require("express");
const router = express.Router();

const {
  getAllUsers,
  getUser,
  getUserById,
  getUserByQuery,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/user");

router.param("id", getUserById);
router.param("email", getUserByQuery);

// GET /users
router.get("/users", getAllUsers);

// GET by query parameter
router.get("/user/query", getUserByQuery);

// GET /user/:id
router.get("/user/:id", getUser);

// POST /user/create
router.post("/user/create", createUser);

// PUT /user/:id
router.put("/user/:id", updateUser);

// DELETE /user/:id
router.delete("/user/:id", deleteUser);

module.exports = router;
