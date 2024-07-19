const express = require("express");

// CONTROLLERS
const {
  addCategory,
  getAllCategoryList,
  getCategoryById,
  updateCategoryById,
  deleteCategoryById,
} = require("../controllers/categoryControllers");

// VERIFY TOKEN FOR EACH ROUTES
const { verifyToken } = require("../middlewares/verifyToken");

// CHECK ROLE ACCORDING TO ROUTES
const checkRole = require("../middlewares/checkRole");

//  TO VALIDATE USER DATA TYPES WHILE CREATING NEW USER
const { validateCategory } = require("../middlewares/validatation");

const router = express.Router();

// Private routes (require authentication)
router.post(
  "/add_category",
  verifyToken,
  checkRole(["super_admin", "admin1"]),
  validateCategory,
  addCategory
);

router.get(
  "/",
  verifyToken,
  checkRole(["super_admin", "admin1", "admin2", "super_agent"]),
  getAllCategoryList
);

router.get(
  "/:id",
  verifyToken,
  checkRole(["super_admin", "admin1", "admin2"]),
  getCategoryById
);

router.put(
  "/:id",
  verifyToken,
  checkRole(["super_admin"]),
  validateCategory,
  updateCategoryById
);

router.delete(
  "/:id",
  verifyToken,
  checkRole(["super_admin"]),
  deleteCategoryById
);

module.exports = router;
