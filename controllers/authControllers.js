const dotenv = require("dotenv");

// USER MODEL
const { User } = require("../models");

// CORE-CONFIG MODULES
const generateToken = require("../core-configurations/jwt-config/generateToken");
const logger = require("../core-configurations/logger-config/logger");
const Bugsnag = require("../core-configurations/bugsnag-config/bugsnagConfig");

// UTILS MODULES
const { successResponse, errorResponse } = require("../utils/handleResponse");
const message = require("../utils/commonMessages");

dotenv.config();

const generateAuthToken = async (req, res) => {
  try {
    logger.info("authControllers --> generateAuthToken --> reached");

    const { email } = req.body;
    const responseData = await User.findOne({ where: { email } });

    if (!responseData) {
      Bugsnag.notify(message.AUTH.INVALID_USER);
      return errorResponse(res, message.AUTH.INVALID_USER, null, 404);
    }

    // GENERATE TOKEN
    const tokenData = generateToken(responseData.id);

    logger.info("authControllers --> generateAuthToken --> ended");
    return successResponse(res, message.AUTH.VERIFIED_USER, tokenData, 200);
  } catch (error) {
    logger.error("authControllers --> generateAuthToken --> error", error);
    Bugsnag.notify(error);
    return errorResponse(
      res,
      message.SERVER.INTERNAL_SERVER_ERROR,
      error.message,
      500
    );
  }
};

module.exports = { generateAuthToken };
