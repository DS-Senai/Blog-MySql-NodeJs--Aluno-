const db = require('./db')

const Post = db.sequelize.define('posts', {

    id: {
        type: db.Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    titulo: {
        type: db.Sequelize.STRING
    },
    conteudo: {
        type: db.Sequelize.TEXT
    } 
})

//Post.sync({force: true})


module.exports = Post