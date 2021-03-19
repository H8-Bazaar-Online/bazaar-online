'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("Merchants", "user_id", {
      type: Sequelize.INTEGER,
      references: {
        model: "Users",
        key: "id"
      },
      onUpdate: "cascade",
      onDelete: "cascade"
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("Merchants", "user_id", {})
  }
};
