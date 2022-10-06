const express = require('express');
const { v4: uuidv4 } = require('uuid');

const { Book, Category, Domain } = require('../models');

const router = express.Router();

router.route('/')
  .get(async (req, res, next) => {
    try {
      const books = await Book.findAll({
        include: {
          model: Category,
        },
        order: [['id', 'ASC']],
      });
      const categories = await Category.findAll({
        order: [['id', 'ASC']],
      });
      const newbooks = await Book.findAll({
        attributes: Book.title,
        limit: 5,
        order: [['id', 'DESC']],
      });
      const updbooks = await Book.findAll({
        attributes: Book.title,
        limit: 5,
        order: [['updatedAt', 'DESC']],
      });
      res.render('main', {
        title: 'HSBooks',
        books: books,
        categories: categories,
        newbooks: newbooks,
        updbooks: updbooks,
      });
    } catch (err) {
      console.error(err);
      next(err);
    }
  })
  .post(async (req, res, next) => {
    try {
      const add = await Book.create({
        title: req.body.title,
        author: req.body.author,
        publisher: req.body.publisher,
        published_date: req.body.published_date,
        price: req.body.price,
        CategoryId: req.body.CategoryId,
      });
      res.redirect('/');
    } catch (err) {
      console.error(err);
      next(err);
    }
  });

  router.route('/domain')
    .get(async (req, res, next) => {
      try {
        const books = await Book.findAll({
          include: {
            model: Category,
          },
          order: [['id', 'ASC']],
        });
        const newbooks = await Book.findAll({
          attributes: Book.title,
          limit: 5,
          order: [['id', 'DESC']],
        });
        const updbooks = await Book.findAll({
          attributes: Book.title,
          limit: 5,
          order: [['updatedAt', 'DESC']],
        });
        const domains = await Domain.findAll();
        res.render('domain', {
          title: 'HSBooks',
          books: books,
          newbooks: newbooks,
          updbooks: updbooks,
          domains: domains,
        });
      } catch (err) {
        console.error(err);
        next(err);
      }
    })
    .post(async (req, res, next) => {
      try {
        await Domain.create({
          host: req.body.host,
          clientSecret: uuidv4(),
        });
        res.redirect('/domain');
      } catch (err) {
        console.error(err);
        next(err);
      }
    });

router.route('/:id')
  .get(async (req, res, next) => {
    try {
      const books = await Book.findAll({
        include: {
          model: Category,
        },
        order: [['id', 'ASC']],
      });
      const categories = await Category.findAll({
        order: [['id', 'ASC']],
      });
      const ubook = await Book.findOne({
        where: {id: req.params.id
      }});
      const newbooks = await Book.findAll({
        attributes: Book.title,
        limit: 5,
        order: [['id', 'DESC']],
      });
      const updbooks = await Book.findAll({
        attributes: Book.title,
        limit: 5,
        order: [['updatedAt', 'DESC']],
      });
      res.render('update', {
        title: 'HSBooks',
        books: books,
        categories: categories,
        ubook: ubook,
        newbooks: newbooks,
        updbooks: updbooks,
      });
    } catch (err) {
      console.error(err);
      next(err);
    }
  })
  .put(async (req, res, next) => {
    try {
      const ubook = await Book.update({
        title: req.body.title,
        author: req.body.author,
        publisher: req.body.publisher,
        published_date: req.body.published_date,
        price: req.body.price,
        CategoryId: req.body.CategoryId,
      }, { where: {id: req.params.id } });
      res.redirect('/');
    } catch (err) {
      console.error(err);
      next(err);
    }
  })
  .delete(async (req, res, next) => {
    try {
      const dbook = await Book.destroy({ where: {id: req.params.id } });
      res.redirect('/');
    } catch (err) {
      console.error(err);
      next(err);
    }
  });

module.exports = router;