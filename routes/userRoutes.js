const express = require("express");

// CONTROLLERS
const {
  getAllUserList,
  createUser,
  deleteUser,
  getUserById,
  updateUser,
} = require("../controllers/userControllers");

// VERIFY TOKEN FOR EACH ROUTES
const { verifyToken } = require("../middlewares/verifyToken");

// CHECK ROLE ACCORDING TO ROUTES
const checkRole = require("../middlewares/checkRole");

//  TO VALIDATE USER DATA TYPES WHILE CREATING NEW USER
const { validateUser } = require("../middlewares/validatation");

const router = express.Router();

// Private routes (require authentication)
router.post(
  "/create_user",
  verifyToken,
  checkRole(["Admin", "Super_Admin"]),
  validateUser,
  createUser
);

router.get(
  "/get_all_users",
  verifyToken,
  checkRole(["Admin", "Super_Admin", "Customer"]),
  getAllUserList
);

router.get(
  "/get_user_by_id/:id",
  verifyToken,
  checkRole(["Admin", "Super_Admin"]),
  getUserById
);

router.put(
  "/update_user/:id",
  verifyToken,
  checkRole(["Super_Admin"]),
  validateUser,
  updateUser
);

router.delete(
  "/delete_user/:id",
  verifyToken,
  checkRole(["Super_Admin"]),
  deleteUser
);

module.exports = router;
