import React, { useState } from 'react';
import axios from 'axios';

const AdminForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    coverImage: '',
    tags: '',
    content: ''
  });

  const [preview, setPreview] = useState(false);

  // Automatically generate slug when title is typed
  const handleTitleChange = (e) => {
    const title = e.target.value;
    const autoSlug = title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
    setFormData({ ...formData, title, slug: autoSlug });
  };

  // Generic change handler for other inputs
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle publish
  const handlePublish = async () => {
    try {
      const payload = {
        ...formData,
        tags: formData.tags.split(',').map(tag => tag.trim())
      };

      await axios.post('http://localhost:5000/api/articles', payload);
      alert("Article published!");
      setFormData({ title: '', slug: '', coverImage: '', tags: '', content: '' });
      setPreview(false);
    } catch (err) {
      alert("Failed to publish: " + err.message);
    }
  };

  return (
    <div style={{ maxWidth: 800, margin: 'auto', padding: 20 }}>
      <h2>Create New Article</h2>

      <label>Title</label>
      <input
        name="title"
        value={formData.title}
        onChange={handleTitleChange}
        placeholder="Title"
        style={{ width: '100%', padding: 8, marginBottom: 10 }}
      />

      <label>Slug (editable)</label>
      <input
        name="slug"
        value={formData.slug}
        onChange={handleChange}
        placeholder="Slug"
        style={{ width: '100%', padding: 8, marginBottom: 10 }}
      />

      <label>Cover Image URL</label>
      <input
        name="coverImage"
        value={formData.coverImage}
        onChange={handleChange}
        placeholder="Cover Image URL"
        style={{ width: '100%', padding: 8, marginBottom: 10 }}
      />

      <label>Tags (comma separated)</label>
      <input
        name="tags"
        value={formData.tags}
        onChange={handleChange}
        placeholder="e.g. tech, react, mongodb"
        style={{ width: '100%', padding: 8, marginBottom: 10 }}
      />

      <label>Content</label>
      <textarea
        name="content"
        value={formData.content}
        onChange={handleChange}
        placeholder="Write your article here..."
        rows={8}
        style={{ width: '100%', padding: 8, marginBottom: 10 }}
      />

      <div style={{ display: 'flex', gap: '10px' }}>
        <button onClick={() => setPreview(true)}>Preview</button>
        <button onClick={handlePublish}>Publish</button>
      </div>

      {preview && (
        <div style={{ marginTop: 30, border: '1px solid #ccc', padding: 20 }}>
          <h2>{formData.title}</h2>
          {formData.coverImage && (
            <img
              src={formData.coverImage}
              alt="cover"
              style={{ width: '100%', maxHeight: 300, objectFit: 'cover' }}
            />
          )}
          <p><strong>Slug:</strong> {formData.slug}</p>
          <p><strong>Tags:</strong> {formData.tags}</p>
          <p>{formData.content}</p>
        </div>
      )}
    </div>
  );
};

export default AdminForm;
