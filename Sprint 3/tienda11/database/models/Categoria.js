module.exports = (sequelize, dataTypes) => {
    let alias = "Categorias"
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING
        }
    }
    let config = {
        tableName: "category",
        timestamps: false
    }
    const Categoria = sequelize.define(alias, cols, config)

    Categoria.associate = function(models){
        Categoria.hasMany(models.CategoriasPorProducto)
    }

    return Categoria
}