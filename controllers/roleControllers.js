// ROLE MODEL
const { Role } = require("../models");

// CORE-CONFIG
const logger = require("../core-configurations/logger-config/logger");
const Bugsnag = require("../core-configurations/bugsnag-config/bugsnagConfig");

// UTILS
const { successResponse, errorResponse } = require("../utils/handleResponse");
const message = require("../utils/commonMessages");

// CREATE NEW ROLE
const createRole = async (req, res) => {
  try {
    logger.info("roleControllers --> createRole --> reached");
    const { name } = req.body;

    const responseRoleData = await Role.create({ name });

    logger.info("roleControllers --> createRole --> ended");
    return successResponse(
      res,
      message.ROLE.CREATE_SUCCESS,
      responseRoleData,
      201
    );
  } catch (error) {
    logger.error("roleControllers --> createRole --> error", error);
    Bugsnag.notify(error);
    return errorResponse(
      res,
      message.SERVER.INTERNAL_SERVER_ERROR,
      error.message,
      500
    );
  }
};

// GET ALL LIST OF ROLES
const getAllRolesList = async (req, res) => {
  try {
    logger.info("roleControllers --> getAllRolesList --> reached");
    const responseRolesData = await Role.findAll();

    logger.info("roleControllers --> getAllRolesList --> ended");
    return successResponse(
      res,
      message.USER.LIST_FETCH_SUCCESS,
      responseRolesData,
      200
    );
  } catch (error) {
    logger.error("roleControllers --> getAllRolesList --> error", error);
    Bugsnag.notify(error);
    return errorResponse(
      res,
      message.SERVER.INTERNAL_SERVER_ERROR,
      error.message,
      500
    );
  }
};

// GET ROLE BY ID
const getRoleById = async (req, res) => {
  logger.info("roleControllers --> getRoleId --> reached");
  const { id } = req.params;
  try {
    const responseRoleData = await Role.findByPk(id);

    if (!responseRoleData) {
      Bugsnag.notify(message.ROLE.ROLE_NOT_FOUND);
      return errorResponse(res, message.ROLE.ROLE_NOT_FOUND, null, 404);
    }

    logger.info("roleControllers --> getRoleId --> ended");
    return successResponse(
      res,
      message.ROLE.FETCH_SUCCESS,
      responseRoleData,
      200
    );
  } catch (error) {
    logger.error("roleControllers --> getRoleId --> error", error);
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
const updateRole = async (req, res) => {
  logger.info("roleControllers --> updateRole --> reached");
  const { id } = req.params;
  const { name } = req.body;
  try {
    const responseRoleData = await Role.findByPk(id);

    if (!responseRoleData) {
      Bugsnag.notify(message.ROLE.ROLE_NOT_FOUND);
      return errorResponse(res, message.ROLE.ROLE_NOT_FOUND, null, 404);
    }

    responseRoleData.name = name;

    await responseRoleData.save();

    logger.info("roleControllers --> updateRole --> ended");
    return successResponse(
      res,
      message.ROLE.UPDATE_SUCCESS,
      responseRoleData,
      200
    );
  } catch (error) {
    logger.error("roleControllers --> updateRole --> error", error);
    Bugsnag.notify(error);
    return errorResponse(
      res,
      message.SERVER.INTERNAL_SERVER_ERROR,
      error.message,
      500
    );
  }
};

const deleteRole = async (req, res) => {
  logger.info("roleControllers --> deleteRole --> reached");
  const { id } = req.params;
  try {
    const responseRoleData = await Role.findByPk(id);

    if (!responseRoleData) {
      Bugsnag.notify(message.ROLE.ROLE_NOT_FOUND);
      return errorResponse(res, message.ROLE.ROLE_NOT_FOUND, null, 404);
    }

    await responseRoleData.destroy();

    logger.info("roleControllers --> deleteRole --> ended");
    return successResponse(
      res,
      message.ROLE.DELETE_SUCCESS,
      responseRoleData,
      200
    );
  } catch (error) {
    logger.error("roleControllers --> deleteRole --> error", error);
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
  createRole,
  getAllRolesList,
  getRoleById,
  updateRole,
  deleteRole,
};
