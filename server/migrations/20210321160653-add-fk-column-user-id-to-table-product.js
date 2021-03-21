'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn("Products", "user_id", {
      type: Sequelize.INTEGER,
      references: {
        model: "Users",
        key: "id"
      },
      onUpdate: "cascade",
      onDelete: "cascade"
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("Products", "user_id", {})
  }
};
