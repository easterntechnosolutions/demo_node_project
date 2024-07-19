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
  "/add_role",
  verifyToken,
  validateRole,
  checkRole(["super_admin"]),
  createRole
);

router.get(
  "/",
  verifyToken,
  checkRole(["super_admin", "admin1", "admin2", "super_agent"]),
  getAllRolesList
);

router.get("/:id", verifyToken, checkRole(["super_admin"]), getRoleById);

router.put(
  "/:id",
  verifyToken,
  validateRole,
  checkRole(["super_admin"]),
  updateRole
);

router.delete("/:id", verifyToken, checkRole(["super_admin"]), deleteRole);

module.exports = router;
