// const db = require('./db')

// const Post = db.sequelize.define('posts', {
//     titulo: {
//         type: db.Sequelize.STRING
//     },
//     conteudo: {
//         type: db.Sequelize.TEXT
//     } 
// })

// Post.sync({force: true})

// module.exports = Post

const express = require('express');
const app = express();
const Post = require('./models/Post');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Rota para listar posts
app.get('/posts', async (req, res) => {
  const posts = await Post.findAll();
  res.json(posts);
});

// Rota para criar um novo post
app.post('/posts', async (req, res) => {
  try {
    const post = await Post.create(req.body);
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(8083, () => console.log('Servidor rodando na URL http://localhost:8083'));

console.log('Conexão bem-sucedida. Esperando solicitações...');
