const Sequelize = require('sequelize');

module.exports = class Book extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      title: {
        type: Sequelize.STRING(100),
        allowNull:false,
      },
      author: {
        type: Sequelize.STRING(40),
        allowNull: true,
      },
      publisher: {
        type: Sequelize.STRING(40),
        allowNull: true,
      },
      published_date: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      price: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      // img: {
      //   type: Sequelize.STRING(400),
      //   allowNull: true,
      // },
    }, {
      sequelize,
      timestamps: false,
      underscored: false,
      modelName: 'Book',
      tableName: 'books',
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
    })
  }

  static associate(db) {
    db.Book.belongsTo(db.Category);
  }
};