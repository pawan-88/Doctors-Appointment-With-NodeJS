'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Schedules', 'dayOfWeek', {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: 'Monday'
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Schedules', 'dayOfWeek');
  }
};
