module.exports = (sequelize, dataTypes) => {
    let alias = "Productos"
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING
        },
        image: {
            type: dataTypes.STRING
        },
        discount: {
            type: dataTypes.INTEGER,
            allowNull: true,
            default: 0
        },
        price: {
            type: dataTypes.FLOAT
        }
    }
    let config = {
        tableName: "product",
        timestamps: false
    }
    const Producto = sequelize.define(alias, cols, config)

    Producto.associate = function(models){
        Producto.hasOne(models.Carritos, {
            as: "carts",
            foreignKey: "id_cart"
        })
        // Producto.hasMany(models.ProductosEnCarrito)
        // Producto.hasMany(models.ColoresPorProducto)
        // Producto.hasMany(models.CategoriasPorProducto)
        Producto.belongsTo(models.Marcas, { as:"mark" ,foreignKey: "id_mark" })
    }
    return Producto
}