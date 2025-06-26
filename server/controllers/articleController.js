const Article = require('../models/Article');

// Create new article
exports.createArticle = async (req, res) => {
  try {
    console.log("Incoming Data:", req.body); 

    const { title, slug, coverImage, tags, content } = req.body;

    const newArticle = new Article({
      title,
      slug,
      coverImage,
      tags,
      content
    });

    await newArticle.save();

    res.status(201).json({ message: "Article published successfully" });
  } catch (err) {
    console.error(" Error publishing article:", err); 
    res.status(500).json({ error: err.message });
  }
};


// Get all published articles
exports.getAllArticles = async (req, res) => {
  try {
    const articles = await Article.find().sort({ publishedAt: -1 });
    res.status(200).json(articles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get single article by slug
exports.getArticleBySlug = async (req, res) => {
  try {
    const article = await Article.findOne({ slug: req.params.slug });
    if (!article) return res.status(404).json({ message: "Article not found" });
    res.status(200).json(article);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
