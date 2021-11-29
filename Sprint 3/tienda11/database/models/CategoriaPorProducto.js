module.exports = (sequelize, dataTypes) => {
    let alias = "CategoriasPorProducto"
    let cols = {
        id_categoryProduct: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        }
    }
    let config = {
        tableName: "category_product",
        timestamps: false
    }
    const ColorPorProducto = sequelize.define(alias, cols, config)

    ColorPorProducto.associate = function(models){
        ColorPorProducto.belongsTo(models.Categorias, { as:"category", foreignKey: "id_category" })
        ColorPorProducto.belongsTo(models.Productos, { as:"product", foreignKey: "id_product" })
    }

    return ColorPorProducto
}