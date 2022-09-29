const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const Book = require('./book');
const Category = require('./category');
const Domain = require('./domain');

const db = {};
const sequelize = new Sequelize(
  config.database, config.username, config.password, config,
);

db.sequelize = sequelize;
db.Book = Book;
db.Category = Category;
db.Domain = Domain;

Book.init(sequelize);
Category.init(sequelize);
Domain.init(sequelize);

Book.associate(db);
Category.associate(db);
Domain.associate(db);

module.exports = db;
