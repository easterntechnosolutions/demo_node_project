const express = require("express");

// CONTROLLERS
const {
  addProduct,
  getAllProducts,
  getProductById,
  updateProductById,
  deleteProductById,
  searchProducts,
} = require("../controllers/productControllers");

// VERIFY TOKEN FOR EACH ROUTES
const { verifyToken } = require("../middlewares/verifyToken");

// CHECK ROLE ACCORDING TO ROUTES
const checkRole = require("../middlewares/checkRole");

//  TO VALIDATE USER DATA TYPES WHILE CREATING NEW USER
const { validateProduct } = require("../middlewares/validatation");

const router = express.Router();

// Private routes (require authentication)
router.post(
  "/add_product",
  verifyToken,
  checkRole(["super_admin", "admin1"]),
  validateProduct,
  addProduct
);

router.get(
  "/",
  verifyToken,
  checkRole(["super_admin", "admin1", "admin2", "super_agent"]),
  getAllProducts
);

router.get(
  "/search",
  verifyToken,
  checkRole(["super_admin", "admin1", "admin2", "super_agent"]),
  searchProducts
);

router.get(
  "/:id",
  verifyToken,
  checkRole(["super_admin", "admin1", "admin2"]),
  getProductById
);

router.put(
  "/:id",
  verifyToken,
  checkRole(["super_admin"]),
  validateProduct,
  updateProductById
);

router.delete(
  "/:id",
  verifyToken,
  checkRole(["super_admin"]),
  deleteProductById
);

module.exports = router;
