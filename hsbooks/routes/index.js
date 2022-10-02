const express = require('express');
const { v4: uuidv4 } = require('uuid');

const { Book, Category, Domain } = require('../models');

const router = express.Router();

router.use((req, res, next) => {
  next();
});

router.route('/')
  .get(async (req, res, next) => {
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
      res.redirect('/add');
    } catch (err) {
      console.error(err);
      next(err);
    }
  });

// router.get('/', async (req, res, next) => {
//   try {
//     const books = await Book.findAll({
//       include: {
//         model: Category,
//       },
//       order: [['id', 'ASC']],
//     });
//     res.render('main', {
//       title: 'HSBooks',
//       books: books,
//     });
//   } catch (err) {
//     console.error(err);
//     next(err);
//   }
// });

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

// router.post('/', async (req, res, next) => {
//   try {
//     const add = await Book.create({
//       title: req.body.title,
//       author: req.body.author,
//       publisher: req.body.publisher,
//       published_date: req.body.published_date,
//       price: req.body.price,
//       CategoryId: req.body.CategoryId,
//     });
//     res.redirect('/add');
//   } catch (err) {
//     console.error(err);
//     next(err);
//   }
// });

router.get('/update/:id', async (req, res) => {
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
    const ubook = await Book.findOne({ where: {id: req.params.id }});
    res.render('update', {
      title: 'HSBooks',
      books: books,
      categories: categories,
      ubook: ubook,
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.route('/:id')
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
      res.json('delete');
    } catch (err) {
      console.error(err);
      next(err);
    }
  });

// router.put('/:id', async (req, res, next) => {
//   try {
//     const ubook = await Book.update({
//       title: req.body.title,
//       author: req.body.author,
//       publisher: req.body.publisher,
//       published_date: req.body.published_date,
//       price: req.body.price,
//       CategoryId: req.body.CategoryId,
//     }, { where: {id: req.params.id } });
//     res.redirect('/');
//   } catch (err) {
//     console.error(err);
//     next(err);
//   }
// });

// router.delete('/:id', async (req, res, next) => {
//   try {
//     const dbook = await Book.destroy({ where: {id: req.params.id } });
//     res.json('delete');
//   } catch (err) {
//     console.error(err);
//     next(err);
//   }
// });

router.route('/domain')
  .get(async (req, res) => {
    try {
      const books = await Book.findAll({
        include: {
          model: Category,
        },
        order: [['id', 'ASC']],
      });
      const domains = await Domain.findAll();
      res.render('domain', {
        title: 'HSBooks',
        books: books,
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

// router.get('/domain', async (req, res) => {
//   try {
//     const books = await Book.findAll({
//       include: {
//         model: Category,
//       },
//       order: [['id', 'ASC']],
//     });
//     const domains = await Domain.findAll();
//     res.render('domain', {
//       title: 'HSBooks',
//       books: books,
//       domains: domains,
//     });
//   } catch (err) {
//     console.error(err);
//     next(err);
//   }
// });

// router.post('/domain', async (req, res, next) => {
//   try {
//     await Domain.create({
//       host: req.body.host,
//       clientSecret: uuidv4(),
//     });
//     res.redirect('/domain');
//   } catch (err) {
//     console.error(err);
//     next(err);
//   }
// });

module.exports = router;