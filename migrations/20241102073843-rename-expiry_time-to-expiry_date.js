"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.renameColumn(
      "user_roles",
      "expiry_time",
      "expiry_date"
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.renameColumn(
      "user_roles",
      "expiry_date",
      "expiry_time"
    );
  },
};
