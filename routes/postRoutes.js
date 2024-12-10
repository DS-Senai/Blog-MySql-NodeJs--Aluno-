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

// Rota para a página "Sobre"
app.get('/sobre', (req, res) => {
    res.render('sobre');  // Renderiza o arquivo "sobre.handlebars"
});

// Rota para listar todos os posts
app.get('/posts', (req, res) => {
    Post.findAll().then(posts => {
        res.render('posts', { posts: posts });  // Renderiza a página de posts
    }).catch(err => {
        res.send("Erro ao carregar posts: " + err);
    });
});
