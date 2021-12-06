module.exports = (sequelize, dataTypes) => {
    let alias = "CategoriasPorProducto"
    let cols = {
        ID_CategoriaPorProducto: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        }
    }
    let config = {
        tableName: "categoriaporproducto",
        timestamps: false
    }
    const CategoriaPorProducto = sequelize.define(alias, cols, config)

    CategoriaPorProducto.associate = function(models){
        CategoriaPorProducto.belongsTo(models.Categorias, { as:"Categoria", foreignKey: "ID_Categoria" })
        CategoriaPorProducto.belongsTo(models.Productos, { as:"Producto", foreignKey: "ID_Producto" })
    }

    return CategoriaPorProducto
}