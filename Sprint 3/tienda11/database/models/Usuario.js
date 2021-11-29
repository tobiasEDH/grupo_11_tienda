module.exports = (sequelize, dataTypes) => {
    let alias = "Usuarios"
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING
        },
        images: {
            type: dataTypes.STRING
        },
        lastName: {
            type: dataTypes.STRING
        },
        email: {
            type: dataTypes.STRING
        },
        password: {
            type: dataTypes.STRING(500)
        }
    }
    let config = {
        tableName: "user",
        timestamps: false
    }
    const Usuario = sequelize.define(alias, cols, config)
    return Usuario
}