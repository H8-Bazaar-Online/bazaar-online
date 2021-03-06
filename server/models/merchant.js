'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Merchant extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Merchant.belongsTo(models.User, { foreignKey: 'user_id' })
      // Merchant.hasMany(models.Product, { foreignKey: 'product_id' })
    }
  };
  Merchant.init({
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "The Name field is required"
        }
      }
    },
    logo: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "The Logo field is required"
        }
      }
    },
    category: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "The Category field is required"
        }
      }
    },
    user_id: {
      type: DataTypes.INTEGER
    }
  }, {
    sequelize,
    modelName: 'Merchant',
  });
  return Merchant;
};