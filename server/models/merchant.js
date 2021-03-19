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
      Merchant.belongsTo(models.User)
      Merchant.hasMany(models.Product)
    }
  };
  Merchant.init({
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "Merchant name is required"
        }
      }
    },
    logo: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "Merchant logo is required"
        }
      }
    },
    category: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "Merchant category is required"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Merchant',
  });
  return Merchant;
};