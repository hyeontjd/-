const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const { Book, Category } = require('../models');

const router = express.Router();

fs.readFileSync('img');

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, 'img/');
    },
    filename(req, file, cb) {
      const ext = path.extname(file.originalname);
      cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
    },
  }),
});

router.get('/up', upload.single('img'), (req, res)=> {
  console.log(req.file);
  res.json({ url: `/img/${req.file.filename}` });
});

