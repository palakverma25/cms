import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ArticlePage = () => {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/articles/${slug}`)
      .then((res) => {
        setArticle(res.data);
      })
      .catch((err) => {
        console.error("Error loading article:", err);
      });
  }, [slug]);

  if (!article) return <p>Loading article...</p>;

  return (
    <div style={{ maxWidth: 900, margin: 'auto', padding: 20 }}>
      <h1>{article.title}</h1>
      {article.coverImage && (
        <img
          src={article.coverImage}
          alt="cover"
          style={{ width: '100%', height: 300, objectFit: 'cover', marginBottom: 20, borderRadius: 8 }}
        />
      )}
      <p><strong>Tags:</strong> {article.tags?.join(', ')}</p>
      <p>{article.content}</p>
    </div>
  );
};

export default ArticlePage;
