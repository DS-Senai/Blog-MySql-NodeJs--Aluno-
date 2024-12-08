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


//<<<<<<<<<<<<<ROTAS>>>>>>>>>>>>>>

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
        post.conteudo = req.body.conteudo;
        return post.save();
    }).then(() => {
        res.redirect('/');
    });
});

