module.exports = function (sequelize, dataTypes) {

    let alias = "Users";
    let cols = {
        id: {
            type: dataTypes.BIGINT(11).UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        firstName: {
            type: dataTypes.STRING(45),
            allowNull: false
        },
        lastName: {
            type: dataTypes.STRING(45),
            allowNull: false
        },
        email: {
            type: dataTypes.STRING(45),
            allowNull: false
        },
        password: {
            type: dataTypes.STRING(90),
            allowNull: false
        },
        imagen: {
            type: dataTypes.STRING(45),
            allowNull: false
        },
        /* category_id: {
            type: dataTypes.BIGINT(5),
            allowNull: false
        } */

    }
    let config = {
        tableName: "users",
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: false
    }



    let Users = sequelize.define(alias, cols , config);

    Users.associate = function (models) {
        Users.belongsTo(models.category, {
            as: "category",
            foreignKey: "category_id"
        })
    }
    return Users
}