module.exports = (sequelize, dataTypes) => {
    let alias = "Marcas"
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING
        }
    }
    let config = {
        tableName: "mark",
        timestamps: false
    }
    const Marca = sequelize.define(alias, cols, config)

    Marca.associate = function(models){
        Marca.hasMany(models.Productos, {
            as: "products",
            foreignKey: "id_mark"
        })
    }

    return Marca
}