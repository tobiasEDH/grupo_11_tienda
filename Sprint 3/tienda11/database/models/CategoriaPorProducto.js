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
        tableName: "categoriaporproducto",
        timestamps: false
    ColorPorProducto.associate = function(models){
        ColorPorProducto.belongsTo(models.Categorias, { as:"category", foreignKey: "id_category" })
        ColorPorProducto.belongsTo(models.Productos, { as:"product", foreignKey: "id_product" })
    }
    }
    return ColorPorProducto
}