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
const {
  validateNewUser,
  validatePrevUser,
} = require("../middlewares/validatation");

const router = express.Router();

// Private routes (require authentication)
router.post(
  "/add_user",
  verifyToken,
  checkRole(["super_admin", "admin1"]),
  validateNewUser,
  createUser
);

router.get(
  "/",
  verifyToken,
  checkRole(["super_admin", "admin1", "admin2", "super_agent"]),
  getAllUserList
);

router.get(
  "/:id",
  verifyToken,
  checkRole(["super_admin", "admin1", "admin2"]),
  getUserById
);

router.put(
  "/:id",
  verifyToken,
  checkRole(["super_admin"]),
  validatePrevUser,
  updateUser
);

router.delete("/:id", verifyToken, checkRole(["super_admin"]), deleteUser);

module.exports = router;
