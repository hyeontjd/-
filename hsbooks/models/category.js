const Sequelize = require('sequelize');

module.exports = class Category extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      category: {
        type: Sequelize.STRING(100),
        allowNull: false,
      }
    }, {
      sequelize,
      timestamps: false,
      underscored: false,
      modelName: 'Category',
      tableName: 'categories',
      paranoid: false,
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
    })
  }

  static associate(db) {
    db.Category.hasMany(db.Book);
  }  
}