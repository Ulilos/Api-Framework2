const { DataTypes } = require('sequelize')
const sequelize = require('../config/database')

const Aluno = sequelize.define('Aluno',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    ra:{
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true
    },
    nome:{
        type: DataTypes.STRING,
        allowNull: false,
    }
})

module.exports = Aluno