module.exports = (sequelize, dataTypes) => {
    let alias = "ProductosEnCarrito"
    let cols = {
        id_productCart: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        cant_product: {
            type: dataTypes.INTEGER
        },
        price: {
            type: dataTypes.FLOAT
        }
    }
    let config = {
        tableName: "product_cart",
        timestamps: false
    }
    const ProductoEnCarrito = sequelize.define(alias, cols, config)

    ProductoEnCarrito.associate = function(models){
        ProductoEnCarrito.belongsTo(models.Carritos, { as: "cart", foreignKey: "id_cart" })
        ProductoEnCarrito.belongsTo(models.Productos, { as: "product", foreignKey: "id_product" })
    }

    return ProductoEnCarrito
}