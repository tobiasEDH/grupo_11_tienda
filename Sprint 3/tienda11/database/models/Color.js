module.exports = (sequelize, dataTypes) => {
    let alias = "Colores"
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
        tableName: "color",
        timestamps: false
    }
    const Color = sequelize.define(alias, cols, config)

    Color.associate = function(models){
        Color.hasMany(models.ColoresPorProducto)
    }

    return Color
}