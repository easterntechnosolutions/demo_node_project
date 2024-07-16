const express = require("express");

// CONTROLLERS
const { generateAuthToken } = require("../controllers/authControllers");

// MIDDLEWARE MODULE
const { validateAuth } = require("../middlewares/validatation");

const router = express.Router();

router.post("/generate_token", validateAuth, generateAuthToken);

module.exports = router;
