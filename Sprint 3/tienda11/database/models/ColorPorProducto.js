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
        ColorPorProducto.associate = function(models){
                        ColorPorProducto.belongsTo(models.Productos, { foreignKey: "ID_Producto" })
                        ColorPorProducto.belongsTo(models.Colores, { foreignKey: "ID_Color" })
    }
    }
    return ColorPorProducto
}