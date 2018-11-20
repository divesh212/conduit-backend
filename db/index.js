const Sequelize = require('sequelize')
const { user, getProfileResponse } = require('./models/User')
const { article, getArticleResponse } = require('./models/Article')

const db = new Sequelize({
    dialect: 'mysql',
    host: 'localhost',
    port: 3306,
    database: 'conduit',
    username: 'root',
    password: 'root',
})

const User = db.define('user', user)
const Article = db.define('article', article)

Article.prototype.getArticleResponse = getArticleResponse
User.prototype.getProfileResponse = getProfileResponse

Article.belongsTo(User)
User.hasMany(Article)
User.belongsToMany(User, { as: 'followees', through: 'follow' })

module.exports = {
    db,
    User,
    Article
}