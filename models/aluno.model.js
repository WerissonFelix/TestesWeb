// Definindo as constantes
const { DataTypes } = require('sequelize'); // Pega os tipos de dados existentes no sequelize
const sequelize = require('../config/base'); // pega as configurações do sequelize na pasta config

// Configurando o model da tabela

const Aluno = sequelize.define('Aluno',{ 
    // Instâncias 
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    idade: {
        type: DataTypes.INTEGER
            
    },
    cpf: {
        type: DataTypes.STRING,
        allowNull: false
    }  
});

// Exporta modulo
module.exports = Aluno;
