const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");

// CORE CONFIG MODULES
const logger = require("./core-configurations/logger-config/logger");
const sequelize = require("./core-configurations/sequelize-config/sequelize");
const Bugsnag = require("./core-configurations/bugsnag-config/bugsnagConfig");

// DB MODELS MODULES
const db = require("./models");

// MIDDLEWARES MODULES
const loggerMiddleware = require("./middlewares/loggerMiddleware");

// ROUTES
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const uploadFileRoutes = require("./routes/uploadFileRoutes");
const roleRoutes = require("./routes/roleRoutes");

dotenv.config();

const PORT = process.env.PORT || 8080;

const app = express();

// MIDDLEWARE
const bugsnagMiddleware = Bugsnag.getPlugin("express");
app.use(bugsnagMiddleware.requestHandler);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(loggerMiddleware);

// TEST ROUTES
app.get("/", (req, res) => {
  res.status(200).send("HELLO WORLD....");
});

// AUTH ROUTES
app.use(`${process.env.BASE_URL}/auth`, authRoutes);

// USER ROUTES
app.use(`${process.env.BASE_URL}/users`, userRoutes);

// UPLOAD FILE ROUTES
app.use(`${process.env.BASE_URL}/file`, uploadFileRoutes);

// ROLE ROUTES
app.use(`${process.env.BASE_URL}/roles`, roleRoutes);

// BUGSNAG ERROR HANDLER
app.use(bugsnagMiddleware.errorHandler);

// AUTHENTICATE SEQUELIZE AND ESTABLISH CONNECTION WITH DB
db.sequelize
  .authenticate()
  .then(() => {
    logger.info("Connection has been established successfully.");
    return sequelize.sync();
  })
  .then(() => {
    app.listen(PORT, () =>
      logger.info(`Server is running on PORT ::: ${PORT}`)
    );
  })
  .catch((err) => {
    logger.info("Unable to connect to the database:", err);
  });
