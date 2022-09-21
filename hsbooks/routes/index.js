const express = require('express');

const { Book, Category } = require('../models');

const router = express.Router();

router.use((req, res, next) => {
  next();
});

router.get('/', async (req, res, next) => {
  try {
    const books = await Book.findAll({
      include: {
        model: Category,
      },
      order: [['id', 'ASC']],
    });
    res.render('main', {
      title: 'HSBooks',
      books: books,
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const dbook = await Book.destroy({ where: {id: req.params.id } });
    res.json('delete');
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;