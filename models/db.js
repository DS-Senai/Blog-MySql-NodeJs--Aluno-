const Sequelize = require('sequelize'); // Importação do Sequelize

const senha = "admin"
// Configuração da conexão com o banco de dados
const sequelize = new Sequelize('banco_de_dados_crud','root',senha, {
    host: "localhost",
    dialect:'mysql'
})

var db = {}; // Para armazenar a instância do Sequelize e a classe Sequelize

db.sequelize = sequelize; // Armazena a instância conectada do Sequelize, que pode ser usada para executar operações no banco de dados.
db.Sequelize = Sequelize; // Armazena a classe Sequelize, que pode ser útil para criar modelos ou para definir operações como DataTypes

module.exports = db;