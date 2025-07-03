// src/components/ArticlePage.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ArticlePage = () => {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:5000';

  useEffect(() => {
    axios.get(`${API_BASE}/api/articles/${slug}`)
      .then(res => setArticle(res.data))
      .catch(err => console.error("Error loading article:", err));
  }, [slug, API_BASE]);

  if (!article) {
    return <p style={{ textAlign: 'center', marginTop: '2rem' }}>Loading article...</p>;
  }

  return (
    <div style={{ maxWidth: 900, margin: 'auto', padding: '2rem' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{article.title}</h1>

      {article.coverImage && (
        <img
          src={article.coverImage}
          alt="cover"
          style={{
            width: '100%',
            height: 'auto',
            maxHeight: 400,
            objectFit: 'cover',
            marginBottom: '1.5rem',
            borderRadius: 8
          }}
        />
      )}

      {article.tags?.length > 0 && (
        <p style={{ marginBottom: '1.5rem', color: '#555' }}>
          <strong>Tags:</strong> {article.tags.join(', ')}
        </p>
      )}

      <div
        style={{ lineHeight: '1.75', whiteSpace: 'normal' }}
        dangerouslySetInnerHTML={{ __html: article.content }}
      />
    </div>
  );
};

export default ArticlePage;
