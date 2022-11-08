module.exports = function (sequelize, dataTypes) {

    let alias = "category";

    let cols = {
        id: {
            type: dataTypes.BIGINT(11).UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        nombreCategory: {
            type: dataTypes.STRING(45),
            allowNull: false
        }
    }

    let config = {
        tableName: "category",
        timestamps: false,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: false
    }




    let category = sequelize.define(alias, cols, config);

    category.associate = function (models) {
        category.hasMany(models.Users, {
            as: "users",
            foreignKey: "category_id"
        })

    }

    return category
}