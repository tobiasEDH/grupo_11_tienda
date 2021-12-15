module.exports = (sequelize, dataTypes) => {
    let alias = "ProductosEnCarrito"
    let cols = {
        ID_ProductoEnCarrito: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        Cant_Producto: {
            type: dataTypes.INTEGER
        },
        Precio: {
            type: dataTypes.FLOAT
        }
    }
    let config = {
        tableName: "productoencarrito",
        timestamps: false
    }
    const ProductoEnCarrito = sequelize.define(alias, cols, config)

    ProductoEnCarrito.associate = function(models){
        ProductoEnCarrito.belongsTo(models.Productos, { as:"Producto", foreignKey: "ID_Producto" })
        ProductoEnCarrito.belongsTo(models.Carritos, { as:"Carrito", foreignKey: "ID_Carrito" })
    }

    return ProductoEnCarrito
}