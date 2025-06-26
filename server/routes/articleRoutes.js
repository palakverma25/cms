const express = require('express');
const router = express.Router();

const {
  createArticle,
  getAllArticles,
  getArticleBySlug
} = require('../controllers/articleController');

// Route to create a new article 
router.post('/', createArticle);

// Route to get all articles 
router.get('/', getAllArticles);

// Route to get an article by slug
router.get('/:slug', getArticleBySlug);

module.exports = router;
