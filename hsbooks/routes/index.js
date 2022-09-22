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

router.get('/add', async (req, res) => {
  try {
    const books = await Book.findAll({
      include: {
        model: Category,
      },
      order: [['id', 'DESC']],
    });
    const categories = await Category.findAll({
      order: [['id', 'ASC']],
    });
    res.render('add', {
      title: 'HSBooks',
      books: books,
      categories: categories,
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const add = await Book.create({
      title: req.body.title,
      author: req.body.author,
      publisher: req.body.publisher,
      published_date: req.body.published_date,
      price: req.body.price,
      CategoryId: req.body.CategoryId,
    });
    res.redirect('/add');
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