module.exports = (sequelize, dataTypes) => {
    let alias = "ColoresPorProducto"
    let cols = {
        ID_ColorPorProducto: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        }
    }
    let config = {
        tableName: "colorporproducto",
        timestamps: false
    }
    const ColorPorProducto = sequelize.define(alias, cols, config)

    ColorPorProducto.associate = function(models){
        ColorPorProducto.belongsTo(models.Productos, { as:"Producto", foreignKey: "ID_Producto" })
        ColorPorProducto.belongsTo(models.Colores, { as: "Color", foreignKey: "ID_Color" })
    }

    return ColorPorProducto
}