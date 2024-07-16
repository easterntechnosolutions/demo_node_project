"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    // Fetch the role IDs to associate with users
    const roles = await queryInterface.sequelize.query(
      `SELECT id,name from Roles;`
    );

    const rolesRows = roles[0];
    console.log("ROLES ::: ", rolesRows);

    await queryInterface.bulkInsert(
      "Users",
      [
        {
          firstname: "Amit",
          lastname: "Vishwakarma",
          email: "amit.vishwakarma@gmail.com",
          roleId: rolesRows.find((role) => role.name === "Admin").id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstname: "Ravi",
          lastname: "Singh",
          email: "ravi.singh@gmail.com",
          roleId: rolesRows.find((role) => role.name === "Super_Admin").id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstname: "Mehak",
          lastname: "Shrivastava",
          email: "mehak@gmail.com",
          roleId: rolesRows.find((role) => role.name === "Customer").id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
