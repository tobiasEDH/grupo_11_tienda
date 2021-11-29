module.exports = (sequelize, dataTypes) => {
    let alias = "Carritos"
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        buyer_name: {
            type: dataTypes.STRING,
            allowNull: true
        },
        items_total: {
            type: dataTypes.INTEGER
        },
        price_total: {
            type: dataTypes.FLOAT
        },
    }
    let config = {
        tableName: "cart",
        timestamps: false
    }
    const Carrito = sequelize.define(alias, cols, config)

    Carrito.associate = function(models){
        Carrito.belongsTo(models.Usuarios, { as:"user",foreignKey:"id"})
        Carrito.hasMany(models.ProductosEnCarrito)
    }
    return Carrito
}