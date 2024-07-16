const { body, validationResult } = require("express-validator");

// UITLS MODULES
const message = require("../utils/commonMessages");
const { errorResponse } = require("../utils/handleResponse");

const validateAuth = [
  body("email").isEmail().withMessage("Invalid email format"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return errorResponse(
        res,
        message.AUTH.INVALID_FORMAT,
        errors.array(),
        400
      );
    }
    next();
  },
];

const validateUser = [
  body("firstname")
    .isAlpha()
    .withMessage("Firstname must contain only letters"),
  body("lastname").isAlpha().withMessage("Lastname must contain only letters"),
  body("email").isEmail().withMessage("Invalid email format"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return errorResponse(
        res,
        message.AUTH.INVALID_FORMAT,
        errors.array(),
        400
      );
    }
    next();
  },
];

const validateRole = [
  body("name").isAlpha().withMessage("Role name must contain only letters"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return errorResponse(
        res,
        message.AUTH.INVALID_FORMAT,
        errors.array(),
        400
      );
    }
    next();
  },
];

module.exports = { validateAuth, validateUser, validateRole };
