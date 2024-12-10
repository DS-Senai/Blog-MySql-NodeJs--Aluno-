// const db = require('./db')

// const Post = db.sequelize.define('posts', {
//     titulo: {
//         type: db.Sequelize.STRING
//     },
//     conteudo: {
//         type: db.Sequelize.TEXT
//     } 
// })

// module.exports = Post




// const db = require('../config/db'); // Corrigido o caminho para db.js
const db = require('C:/Maryna/blog-nodejs/Blog-MySql-NodeJs-Aluno/config/db');


// const Sequelize = db.Sequelize;
// const sequelize = db.sequelize;

// const Post = sequelize.define('post', {
//   // Defina os campos do modelo Post
//   title: {
//     type: Sequelize.STRING,
//     allowNull: false
//   },
//   content: {
//     type: Sequelize.TEXT,
//     allowNull: false
//   }
// });

// module.exports = Post;

//teste



// models/Post.js
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');  // Conexão com o banco de dados

const post = sequelize.define('post', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  }
}, {
  tableName: 'posts',  // Nome da tabela no banco de dados
  timestamps: true     // Caso queira que as colunas 'createdAt' e 'updatedAt' sejam automaticamente gerenciadas
});

module.exports = Post;


