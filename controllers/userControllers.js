// USER MODEL
const { User } = require("../models");

// CORE CONFIG
const logger = require("../core-configurations/logger-config/logger");
const Bugsnag = require("../core-configurations/bugsnag-config/bugsnagConfig");

// UTILS
const { successResponse, errorResponse } = require("../utils/handleResponse");
const message = require("../utils/commonMessages");

// CREATE / REGISTER NEW USER
const createUser = async (req, res) => {
  try {
    logger.info("userControllers --> createUser --> reached");
    const { firstname, lastname, email, roleId } = req.body;

    const responseNewUserData = await User.create({
      firstname,
      lastname,
      email,
      roleId,
    });

    logger.info("userControllers --> createUser --> ended");
    return successResponse(
      res,
      message.USER.CREATE_SUCCESS,
      responseNewUserData,
      201
    );
  } catch (error) {
    logger.error("userControllers --> createUser --> error", error);
    Bugsnag.notify(error);
    return errorResponse(
      res,
      message.SERVER.INTERNAL_SERVER_ERROR,
      error.message,
      500
    );
  }
};

// GET ALL LIST OF USERS
const getAllUserList = async (req, res) => {
  try {
    logger.info("userControllers --> getAllUserList --> reached");
    const responseUsersData = await User.findAll();

    logger.info("userControllers --> getAllUserList --> ended");
    return successResponse(
      res,
      message.USER.LIST_FETCH_SUCCESS,
      responseUsersData,
      200
    );
  } catch (error) {
    logger.error("userControllers --> getAllUserList --> error", error);
    Bugsnag.notify(error);
    return errorResponse(
      res,
      message.SERVER.INTERNAL_SERVER_ERROR,
      error.message,
      500
    );
  }
};

// GET USER BY ID
const getUserById = async (req, res) => {
  logger.info("userControllers --> getUserById --> reached");
  const { id } = req.params;
  try {
    const responseUserData = await User.findByPk(id);

    if (!responseUserData) {
      Bugsnag.notify(message.USER.USER_NOT_FOUND);
      return errorResponse(res, message.USER.USER_NOT_FOUND, null, 404);
    }

    logger.info("userControllers --> getUserById --> ended");

    return successResponse(
      res,
      message.USER.FETCH_SUCCESS,
      responseUserData,
      200
    );
  } catch (error) {
    logger.error("userControllers --> getUserById --> error", error);
    Bugsnag.notify(error);
    return errorResponse(
      res,
      message.SERVER.INTERNAL_SERVER_ERROR,
      error.message,
      500
    );
  }
};

// UPDATE USER BY ID
const updateUser = async (req, res) => {
  logger.info("userControllers --> updateUser --> reached");
  const { id } = req.params;
  const { firstname, lastname, email } = req.body;
  try {
    const responseUserData = await User.findByPk(id);

    if (!responseUserData) {
      Bugsnag.notify(message.USER.USER_NOT_FOUND);
      return errorResponse(res, message.USER.USER_NOT_FOUND, null, 404);
    }

    responseUserData.firstname = firstname;
    responseUserData.lastname = lastname;
    responseUserData.email = email;

    await responseUserData.save();

    logger.info("userControllers --> updateUser --> ended");
    return successResponse(
      res,
      message.USER.UPDATE_SUCCESS,
      responseUserData,
      200
    );
  } catch (error) {
    logger.error("userControllers --> updateUser --> error", error);
    Bugsnag.notify(error);
    return errorResponse(
      res,
      message.SERVER.INTERNAL_SERVER_ERROR,
      error.message,
      500
    );
  }
};

// DELETE USER BY ID
const deleteUser = async (req, res) => {
  logger.info("userControllers --> deleteUser --> reached");
  const { id } = req.params;
  try {
    const responseUserData = await User.findByPk(id);

    if (!responseUserData) {
      Bugsnag.notify(message.USER.USER_NOT_FOUND);
      return errorResponse(res, message.USER.USER_NOT_FOUND, null, 404);
    }

    await responseUserData.destroy();

    logger.info("userControllers --> deleteUser --> ended");
    return successResponse(
      res,
      message.USER.DELETE_SUCCESS,
      responseUserData,
      200
    );
  } catch (error) {
    logger.error("userControllers --> deleteUser --> error", error);
    Bugsnag.notify(error);
    return errorResponse(
      res,
      message.SERVER.INTERNAL_SERVER_ERROR,
      error.message,
      500
    );
  }
};

module.exports = {
  createUser,
  getAllUserList,
  getUserById,
  updateUser,
  deleteUser,
};
