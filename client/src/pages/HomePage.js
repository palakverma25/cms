import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const HomePage = () => {
  const [articles, setArticles] = useState([]);
  const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:5000';

  useEffect(() => {
    axios.get(`${API_BASE}/api/articles`)
      .then(res => setArticles(res.data))
      .catch(err => console.error("Error fetching articles:", err));
  }, [API_BASE]);

  const renderExcerpt = content => {
    const previewLength = 300;
    if (content.length <= previewLength) return content;

    // Chop at last closing tag before slice limit to avoid broken HTML
    const slice = content.slice(0, previewLength);
    const closingTagIndex = slice.lastIndexOf('</');
    return closingTagIndex > 0 ? slice.slice(0, closingTagIndex + slice.slice(closingTagIndex).indexOf('>') + 1) + '…' : slice + '…';
  };

  return (
    <div style={{ maxWidth: 900, margin: 'auto', padding: 20 }}>
      <h1>Published Articles</h1>

      {articles.length === 0 ? (
        <p>No articles published yet.</p>
      ) : (
        articles.map(article => (
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

            <div
              style={{ maxHeight: 200, overflow: 'hidden' }}
              dangerouslySetInnerHTML={{
                __html: renderExcerpt(article.content)
              }}
            />

            <Link to={`/articles/${article.slug}`}>Read More →</Link>
          </div>
        ))
      )}
    </div>
  );
};

export default HomePage;
