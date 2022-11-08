module.exports = function (sequelize, dataTypes) {

    let alias = "Auto";
    let cols = {
        id: {
            type: dataTypes.BIGINT(11).UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        nombreAuto: {
            type: dataTypes.STRING(45),
            allowNull: false
        },
        marca_id: {
            type: dataTypes.BIGINT(5),
            allowNull: false
        },
        modelo: {
            type: dataTypes.BIGINT(4),
            allowNull: false
        },
        cilindraje: {
            type: dataTypes.BIGINT(5),
            allowNull: false
        },
        precio: {
            type: dataTypes.DECIMAL(12, 0),
            allowNull: false
        },
        descuento: {
            type: dataTypes.BIGINT(2),
            allowNull: false
        },
        color: {
            type: dataTypes.BIGINT(45),
            allowNull: false
        },
        textoLargo: {
            type: dataTypes.BIGINT(450),

        },
        imagen: {
            type: dataTypes.BIGINT(450),
            allowNull: true

        },
        estado: {
            type: dataTypes.BIGINT(45),
        }

    }
    let config = {
        tableName: "autos",
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: false
    }



    let Auto = sequelize.define(alias, cols , config);

    Auto.associate = function (models) {
        Auto.belongsTo(models.Marca, {
            as: "marca",
            foreignKey: "marca_id"
        })
    }
    return Auto
}