
# Tutorial para Criação de um Blog com CRUD utilizando Node.js, Express, Sequelize, e Handlebars

## Configuração Inicial do Projeto

1. **Instalar as dependências necessárias:**

   ```bash
   npm install express express-handlebars body-parser sequelize mysql2
   ```

2. **Configurar o arquivo `package.json` para script de inicialização:**

   ```json
   "scripts": {
       "start": "node app.js"
   }
   ```

---

## Configurar o Servidor com Express

1. **Criar o arquivo principal `app.js` e configurar o servidor:**

   ```javascript
   const express = require("express");
   const app = express();
   const bodyParser = require("body-parser");
   const handlebars = require("express-handlebars");

   // Configurar o Handlebars
   app.engine('handlebars', handlebars.engine({
       defaultLayout: 'main',
       runtimeOptions: {
           allowProtoPropertiesByDefault: true,
           allowProtoMethodsByDefault: true
       }
   }));
   app.set('view engine', 'handlebars');

   // Configurar Body Parser
   app.use(bodyParser.urlencoded({ extended: false }));
   app.use(bodyParser.json());

   // Configurar arquivos estáticos
   app.use(express.static("assets"));

   const port = 8083;
   app.listen(port, () => {
       console.log("Servidor rodando na URL http://localhost:" + port);
   });
   ```

---

## Configurar o Banco de Dados com Sequelize

1. **Criar o arquivo `models/db.js` para configuração do banco de dados:**

   ```javascript
   const Sequelize = require('sequelize'); // Importação do Sequelize

   // Configuração da conexão com o banco de dados
   const sequelize = new Sequelize('sequelize','root','admin', {
       host: "localhost",
       dialect:'mysql'
   })

   var db = {}; // Para armazenar a instância do Sequelize e a classe Sequelize

   db.sequelize = sequelize; // Armazena a instância conectada do Sequelize, que pode ser usada para executar operações no banco de dados.
   db.Sequelize = Sequelize; // Armazena a classe Sequelize, que pode ser útil para criar modelos ou para definir operações como DataTypes

   module.exports = db;
   ```

2. **Criar o arquivo `models/Post.js` para definição da tabela de posts:**

   ```javascript
   const db = require('./db')

   const Post = db.sequelize.define('posts', {
       titulo: {
           type: db.Sequelize.STRING
       },
       conteudo: {
           type: db.Sequelize.TEXT
       } 
   })

   Post.sync({force: true})

   module.exports = Post
   ```

---

## Criar as Rotas e Funcionalidades do CRUD

1. **Rotas no `app.js` para CRUD:**

   ```javascript
   const Post = require('./models/Post');

   // Formulário de cadastro
   app.get('/cadastro', (req, res) => {
       res.render('formulario');
   });

   // CREATE - Adicionar novo post
   app.post('/add', (req, res) => {
       Post.create({
           titulo: req.body.titulo,
           conteudo: req.body.conteudo
       }).then(() => {
           res.render('add');
       }).catch(err => {
           res.send("Erro ao criar post: " + err);
       });
   });

   // READ - Exibir posts
   app.get('/', (req, res) => {
       Post.findAll().then(posts => {
           res.render('home', { posts: posts });
       });
   });

   // DELETE - Remover post
   app.get('/deletar/:id', (req, res) => {
       Post.destroy({ where: { id: req.params.id } }).then(() => {
           res.render('delete', { msg: "Postagem deletada com sucesso!" });
       }).catch(err => {
           res.render('delete', { msg: "Erro ao deletar postagem: " + err });
       });
   });

   // EDITAR - Pegar dados para edição
   app.get('/edit/:id', (req, res) => {
       Post.findOne({ where: { id: req.params.id } }).then(post => {
           res.render('editposts', { post: post });
       });
   });

   // UPDATE - Salvar edições
   app.post('/edit', (req, res) => {
       Post.findOne({ where: { id: req.body.id } }).then(post => {
           post.titulo = req.body.titulo;
           post.conteu
           do = req.body.conteudo;
           return post.save();
       }).then(() => {
           res.redirect('/');
       });
   });
   ```

---

## Criar as Views com Handlebars

1. **Layout Principal:**

   `views/layouts/main.handlebars`

   ```html
   <!DOCTYPE html>
   <html lang="en">
   <head>
       <meta charset="UTF-8">
       <meta name="viewport" content="width=device-width, initial-scale=1.0">
       <title>HANDLEBARS</title>
       <link rel="stylesheet" href="/css/style.css">
       <link rel="stylesheet" href="/bootstrap/css/bootstrap.css">
   </head>
   <body>
       {{>navbar}} 
       {{{body}}} <!-- Aqui será inserido o conteúdo da página 'add.handlebars' -->
       <script type="text/javaScript" src="/js/script.js"></script>
   </body>
   </html>
   ```

2. **Home:**

   `views/home.handlebars`

   ```html
   <div class="container">
       <h1>MEU BLOG PESSOAL</h1>
       <p>Meus ultimos posts:</p>
       <a href="/cadastro"><button class="btn btn-primary">CRIAR POST</button></a>
       <hr>

       {{#each posts}}
       <small>{{createAt}}</small>
       <h3>{{{titulo}}}</h3>
       <p>{{{conteudo}}}</p>
       <a href="/deletar/{{id}}"><button class="btn btn-danger">Deletar</button></a>
        <a href="/edit/{{id}}"><button class="btn btn-success">EDITAR</button></a>
       <hr>
       {{/each}}
   </div>
   ```

3. **Formulário:**

   `views/formulario.handlebars`

   ```html
   <div class="container card">
       <div class="card-body">
           <form action="/add" method="POST">
               <div class="form-group">
                   <label for="exampleInputEmail1">Titulo:</label>
                   <input name="titulo" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter nome">
                   <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
               </div>
               <div class="form-group">
                   <label for="exampleInputPassword1">Conteúdo</label>
                   <input name="conteudo" type="text" class="form-control" id="exampleInputPassword1" placeholder="Digite o conteúdo">
               </div>
               <button type="submit" class="btn btn-primary">Submit</button>
           </form>
       </div>
   </div>
   ```

4. **Editar Post:**

   `views/editposts.handlebars`

   ```html
   <div class="container">
       <form action="/edit" method="POST">
           <input type="hidden" name="id" value="{{post.id}}">
           <h2>TITULO</h2>
           <input type="text" name="titulo" value="{{post.titulo}}">
           <h2>CONTEUDO</h2>
           <textarea class="form-control" name="conteudo" id="">{{post.conteudo}}</textarea></br>
           <button type="submit" class="btn btn-success">SALVAR</button>
       </form>
   </div>
   ```

5. **Deletar:**

   `views/delete.handlebars`

   ```html
   <div class="container">
       <p>{{{msg}}}</p>
       <a href="/"><button class="btn btn-primary">PAGINA INICIAL</button></a>
   </div>
   ```

6. **Adicionar:**

   `views/add.handlebars`

   ```html
   <div class="container">
       <p>Post Criado com sucesso</p>
       <a href="/"><button class="btn btn-primary">PAGINA INICIAL</button></a>
   </div>
   ```

7. **Executar o projeto:**

```javascript
    node app.js
```