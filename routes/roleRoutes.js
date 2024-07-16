const express = require("express");

// VERIFY TOKEN FOR EACH ROUTES
const { verifyToken } = require("../middlewares/verifyToken");

// CHECK ROLE ACCORDING TO ROUTES
const checkRole = require("../middlewares/checkRole");

//  TO VALIDATE USER DATA TYPES WHILE CREATING NEW USER
const { validateRole } = require("../middlewares/validatation");

// CONTROLLERS
const {
  getAllRolesList,
  createRole,
  getRoleById,
  updateRole,
  deleteRole,
} = require("../controllers/roleControllers");

const router = express.Router();

// Private routes (require authentication)
router.post(
  "/create_role",
  verifyToken,
  validateRole,
  checkRole(["Super_Admin"]),
  createRole
);

router.get(
  "/get_all_roles",
  verifyToken,
  checkRole(["Super_Admin"]),
  getAllRolesList
);

router.get(
  "/get_role_by_id/:id",
  verifyToken,
  checkRole(["Super_Admin"]),
  getRoleById
);

router.put(
  "/update_role/:id",
  verifyToken,
  validateRole,
  checkRole(["Super_Admin"]),
  updateRole
);

router.delete(
  "/delete_role/:id",
  verifyToken,
  checkRole(["Super_Admin"]),
  deleteRole
);

module.exports = router;
