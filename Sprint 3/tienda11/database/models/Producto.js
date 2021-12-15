module.exports = (sequelize, dataTypes) => {
    let alias = "Productos"
    let cols = {
        ID_Producto: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        Nombre: {
            type: dataTypes.STRING
        },
        Imagen: {
            type: dataTypes.STRING
        },
        Descuento: {
            type: dataTypes.INTEGER,
            allowNull: true,
            default: 0
        },
        Precio: {
            type: dataTypes.FLOAT
        },
        description: {
            type: dataTypes.INTEGER
        }
    }
    let config = {
        tableName: "producto",
        timestamps: false
    }
    const Producto = sequelize.define(alias, cols, config)

    Producto.associate = function(models){
        Producto.hasMany(models.CategoriasPorProducto, {
            foreignKey: 'ID_Producto',
            as: 'CategoriasPorProducto'
        })
        Producto.hasMany(models.ColoresPorProducto, {
            foreignKey: 'ID_Producto',
            as: 'ColoresPorProducto'
        })
        Producto.hasMany(models.ProductosEnCarrito, {
            foreignKey: 'ID_Producto',
            as: 'ProductosEnCarrito'
        })
        Producto.belongsTo(models.Marcas, { as:"Marca", foreignKey: "ID_Marca" })
    }
    return Producto
}