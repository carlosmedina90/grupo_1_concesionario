module.exports = function (sequelize, dataTypes) {
  let alias = "Cart";
  let cols = {
    id: {
      type: dataTypes.BIGINT(11).UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    auto_id: {
      type: dataTypes.BIGINT(11),
      allowNull: false,
    },
    user_id: {
      type: dataTypes.BIGINT(11),
      allowNull: false,
    },
    reference: {
      type: dataTypes.STRING(100),
      allowNull: false,
    },
    quantity: {
      type: dataTypes.BIGINT(11),
      allowNull: false,
    },
    price: {
      type: dataTypes.DECIMAL(12, 0),
      allowNull: false,
    },
  };
  let config = {
    tableName: "cart",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: false,
  };

  let Cart = sequelize.define(alias, cols, config);

  Cart.associate = function (models) {
    Cart.belongsTo(models.Auto, {
      as: "auto",
      foreignKey: "auto_id",
    });
    Cart.belongsTo(models.Users, {
      as: "user",
      foreignKey: "user_id",
    });
  };
  return Cart;
};
