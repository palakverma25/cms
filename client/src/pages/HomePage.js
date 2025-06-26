import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const HomePage = () => {
  const [articles, setArticles] = useState([]);

  const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:5000';

  useEffect(() => {
    axios.get(`${API_BASE}/api/articles`)
      .then((res) => setArticles(res.data))
      .catch((err) => console.error("Error fetching articles:", err));
  }, [API_BASE]);

  return (
    <div style={{ maxWidth: 900, margin: 'auto', padding: 20 }}>
      <h1>Published Articles</h1>

      {articles.length === 0 ? (
        <p>No articles published yet.</p>
      ) : (
        articles.map((article) => (
          <div
            key={article._id}
            style={{
              border: '1px solid #ddd',
              padding: 20,
              margin: '20px 0',
              borderRadius: 8
            }}
          >
            {article.coverImage && (
              <img
                src={article.coverImage}
                alt="cover"
                style={{ width: '100%', height: 200, objectFit: 'cover', borderRadius: 8 }}
              />
            )}
            <h2>{article.title}</h2>
            <p>{article.content.slice(0, 100)}...</p>
            <Link to={`/articles/${article.slug}`}>Read More →</Link>
          </div>
        ))
      )}
    </div>
  );
};

export default HomePage;
