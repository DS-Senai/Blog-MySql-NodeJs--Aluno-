// const Sequelize = require('sequelize'); // Importação do Sequelize

// // Configuração da conexão com o banco de dados
// const sequelize = new Sequelize('sequelize','admin','admin', {
//     host: "localhost",
//     dialect:'mysql'
// })

// let db = {}; // Para armazenar a instância do Sequelize e a classe Sequelize

// db.sequelize = sequelize; // Armazena a instância conectada do Sequelize, que pode ser usada para executar operações no banco de dados.
// db.Sequelize = Sequelize; // Armazena a classe Sequelize, que pode ser útil para criar modelos ou para definir operações como DataTypes

// module.exports = db;
const Sequelize = require('sequelize');
const sequelize = new Sequelize('blog', 'admin', 'admin', {
  host: 'localhost',
  dialect: 'mysql',
});

let db = {}

db.sequelize = sequelize;
db.Sequelize = Sequelize;

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

testConnection();

module.exports = db;
