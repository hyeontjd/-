const express = require('express');
const axios = require('axios');

const router = express.Router();
const URL = 'http://localhost:5000/open';

axios.defaults.headers.origin = 'http://localhost:5001';
const request = async (req, api) => {
  try {
    if (!req.session.jwt) {
      const tokenResult = await axios.post(`${URL}/token`, {
        clientSecret: process.env.CLIENT_SECRET,
      });
      req.session.jwt = tokenResult.data.token;
    }
    return await axios.get(`${URL}${api}`, {
      headers: { authorization: req.session.jwt },
    });
  } catch (error) {
    if (error.response.status === 419) {
      delete req.session.jwt;
      return request(req, api);
    }
    return error.response;
  }
};

router.get('/', (req, res) => {
  res.render('main', { key: process.env.CLIENT_SECRET });
});

router.get('/books', async (req, res, next) => {
  try {
    const result = await request(req, '/books');
    res.json(result.data);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.get('/categories', async (req, res, next) => {
  try {
    const result = await request(req, '/categories');
    res.json(result.data);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// router.get('/books/:category', async (req, res, next) => {
//   try {
//     const result = await request(req, '/books/${encodeURIComponent(req.params.category)}');
//     res.json(result.data);
//   } catch (err) {
//     console.error(err);
//     next(err);
//   }
// });

module.exports = router;