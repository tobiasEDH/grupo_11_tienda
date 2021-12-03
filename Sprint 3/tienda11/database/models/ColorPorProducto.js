module.exports = (sequelize, dataTypes) => {
    let alias = "ColoresPorProducto"
    let cols = {
        id_colorProduct: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        }
    }
    let config = {
        tableName: "color_product",
        timestamps: false
    }
    const ColorPorProducto = sequelize.define(alias, cols, config)

    ColorPorProducto.associate = function(models){
        ColorPorProducto.belongsTo(models.Productos, { as:"product", foreignKey: "id_product" })
        ColorPorProducto.belongsTo(models.Colores, { as: "color", foreignKey: "id_color" })
    }

    return ColorPorProducto
}