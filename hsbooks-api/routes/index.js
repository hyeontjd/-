const express = require('express');
const axios = require('axios');

const router = express.Router();
const URL = 'http://localhost:5000/open';

axios.defaults.headers.origin = 'http://localhost:5001';
const request = async (req, api) => {
  try {
    if (!req.session.jwt) { // 세션에 토큰이 없으면
      const tokenResult = await axios.post(`${URL}/token`, {
        clientSecret: process.env.CLIENT_SECRET,
      });
      req.session.jwt = tokenResult.data.token; // 세션에 토큰 저장
    }
    return await axios.get(`${URL}${api}`, {
      headers: { authorization: req.session.jwt },
    }); // API 요청
  } catch (error) {
    if (error.response.status === 419) { // 토큰 만료시 토큰 재발급 받기
      delete req.session.jwt;
      return request(req, api);
    } // 419 외의 다른 에러면
    return error.response;
  }
};

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

router.get('/books/:category', async (req, res, next) => {
  try {
    const result = await request(req, '/books/${encodeURIComponent(req.params.category)}');
    res.json(result.data);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.get('/', (req, res) => {
  res.render('main', { key: process.env.CLIENT_SECRET });
});

module.exports = router;