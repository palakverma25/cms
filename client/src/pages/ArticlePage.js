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

  if (!article) return <p style={{ textAlign: 'center' }}>Loading article...</p>;

  return (
    <div style={{ maxWidth: 900, margin: 'auto', padding: 20 }}>
      <h1 style={{ fontSize: '2rem', marginBottom: 20 }}>{article.title}</h1>
      {article.coverImage && (
        <img
          src={article.coverImage}
          alt="cover"
          style={{
            width: '100%',
            height: 300,
            objectFit: 'cover',
            marginBottom: 20,
            borderRadius: 8
          }}
        />
      )}
      {article.tags?.length > 0 && (
        <p style={{ marginBottom: 10 }}>
          <strong>Tags:</strong> {article.tags.join(', ')}
        </p>
      )}
      <div style={{ lineHeight: '1.6', whiteSpace: 'pre-wrap' }}>
        {article.content}
      </div>
    </div>
  );
};

export default ArticlePage;
