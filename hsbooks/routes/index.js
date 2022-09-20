const express = require('express');

const router = express.Router();

router.use((req, res, next) => {
  next();
});

router.get('/', (req, res, next) => {
  res.render('main');
});

module.exports = router;