module.exports = function (sequelize, dataTypes) {

    let alias = "Marca";

    let cols = {
        id: {
            type: dataTypes.BIGINT(11).UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        marca: {
            type: dataTypes.STRING(45),
            allowNull: false
        }
    }

    let config = {
        tableName: "marcas",
        timestamps: false,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: false
    }




    let Marca = sequelize.define(alias, cols, config);

    Marca.associate = function (models) {
        Marca.hasMany(models.Auto, {
            as: "autos",
            foreignKey: "marca_id"
        })

    }

    return Marca
}