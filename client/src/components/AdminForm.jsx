// src/components/AdminForm.jsx
import React, { useState } from 'react';
import { createEditor, Transforms, Text, Editor } from 'slate';
import { Slate, Editable, withReact, useSlateStatic } from 'slate-react';
import { withHistory } from 'slate-history';
import { IconButton, Button } from '@mui/material';
import {
  FormatBold,
  FormatItalic,
  FormatUnderlined,
  FormatListBulleted,
  FormatListNumbered,
  Image as ImageIcon,
  FormatAlignLeft,
  FormatAlignCenter,
  FormatAlignRight
} from '@mui/icons-material';
import axios from 'axios';
import { uploadToCloudinary } from '../utils/uploadImage';

const initialValue = [{ type: 'paragraph', children: [{ text: '' }] }];

const serialize = nodes =>
  nodes.map(n => nodeToHtml(n)).join('');
const nodeToHtml = node => {
  if (Text.isText(node)) return node.text;
  const children = node.children.map(nodeToHtml).join('');
  if (node.type === 'image') {
    const align = node.align ? `text-align:${node.align};` : '';
    return `<div style="${align}"><img src="${node.url}" style="max-width:100%;" /></div>`;
  }
  if (node.type === 'bulleted-list') return `<ul>${children}</ul>`;
  if (node.type === 'numbered-list') return `<ol>${children}</ol>`;
  if (node.type === 'list-item') return `<li>${children}</li>`;
  return `<p>${children}</p>`;
};

const Element = ({ attributes, children, element }) => {
  switch (element.type) {
    case 'image':
      return (
        <div
          {...attributes}
          contentEditable={false}
          style={{ textAlign: element.align || 'left', margin: '12px 0' }}
        >
          <img src={element.url} alt="" style={{ maxWidth: '100%' }} />
          {children}
        </div>
      );
    case 'bulleted-list': return <ul {...attributes}>{children}</ul>;
    case 'numbered-list': return <ol {...attributes}>{children}</ol>;
    case 'list-item': return <li {...attributes}>{children}</li>;
    default: return <p {...attributes}>{children}</p>;
  }
};

const Leaf = ({ attributes, children, leaf }) => {
  if (leaf.bold) children = <strong>{children}</strong>;
  if (leaf.italic) children = <em>{children}</em>;
  if (leaf.underline) children = <u>{children}</u>;
  return <span {...attributes}>{children}</span>;
};

const toggleMark = (editor, format) => {
  const isActive = Editor.marks(editor)?.[format] === true;
  isActive ? Editor.removeMark(editor, format) : Editor.addMark(editor, format, true);
};

const MarkButton = ({ format, Icon }) => {
  const editor = useSlateStatic();
  return (
    <IconButton onMouseDown={e => { e.preventDefault(); toggleMark(editor, format); }}>
      <Icon />
    </IconButton>
  );
};

const ListButton = ({ format, Icon }) => {
  const editor = useSlateStatic();
  return (
    <IconButton onMouseDown={e => {
      e.preventDefault();
      const [match] = Editor.nodes(editor, { match: n => n.type === format });
      const isActive = !!match;
      Transforms.unwrapNodes(editor, {
        match: n => ['bulleted-list','numbered-list'].includes(n.type),
        split: true
      });
      const newType = isActive ? 'paragraph' : 'list-item';
      Transforms.setNodes(editor, { type: newType });
      if (!isActive) Transforms.wrapNodes(editor, { type: format, children: [] });
    }}>
      <Icon />
    </IconButton>
  );
};

const ImageButton = () => {
  const editor = useSlateStatic();
  return (
    <IconButton component="label" onMouseDown={e => e.preventDefault()}>
      <ImageIcon />
      <input
        type="file"
        accept="image/*"
        hidden
        onChange={async e => {
          const file = e.target.files?.[0];
          if (file) {
            const url = await uploadToCloudinary(file);
            Transforms.insertNodes(editor, {
              type: 'image',
              url,
              align: 'center',
              children: [{ text: '' }]
            });
            Transforms.insertNodes(editor, { type: 'paragraph', children: [{ text: '' }] });
          }
        }}
      />
    </IconButton>
  );
};

const AlignButton = ({ align, Icon }) => {
  const editor = useSlateStatic();
  return (
    <IconButton onMouseDown={e => {
      e.preventDefault();
      Transforms.setNodes(editor, { align }, { match: n => n.type === 'image' });
    }}>
      <Icon />
    </IconButton>
  );
};

export default function AdminForm() {
  const [editor] = useState(() => withHistory(withReact(createEditor())));
  const [content, setContent] = useState(initialValue);
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [tags, setTags] = useState('');
  const [preview, setPreview] = useState(false);
  const API = process.env.REACT_APP_API_BASE || 'http://localhost:5000';

  const handleTitle = e => {
    const val = e.target.value;
    setTitle(val);
    setSlug(val.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^\w-]+/g, ''));
  };

  const handlePublish = async () => {
    const html = serialize(content);
    await axios.post(`${API}/api/articles`, {
      title, slug, coverImage,
      tags: tags.split(',').map(t => t.trim()).filter(Boolean),
      content: html
    });
    alert('✅ Published!');
    setTitle(''); setSlug(''); setCoverImage(''); setTags('');
    setContent(initialValue); setPreview(false);
  };

  return (
    <div style={{ maxWidth: 800, margin: 'auto', padding: 20 }}>
      <h2>Create New Article</h2>
      <input value={title} onChange={handleTitle} placeholder="Title" style={{ width: '100%', padding: 8, margin: '10px 0' }} />
      <input value={slug} onChange={e => setSlug(e.target.value)} placeholder="Slug" style={{ width: '100%', padding: 8, margin: '10px 0' }} />
      <input value={coverImage} onChange={e => setCoverImage(e.target.value)} placeholder="Cover Image URL" style={{ width: '100%', padding: 8, margin: '10px 0' }} />
      <input value={tags} onChange={e => setTags(e.target.value)} placeholder="Tags" style={{ width: '100%', padding: 8, margin: '10px 0' }} />

      <Slate editor={editor} initialValue={content} onChange={setContent}>
        <>
          <div style={{ display: 'flex', gap: 4, marginBottom: 8 }}>
            <MarkButton format="bold" Icon={FormatBold} />
            <MarkButton format="italic" Icon={FormatItalic} />
            <MarkButton format="underline" Icon={FormatUnderlined} />
            <ListButton format="bulleted-list" Icon={FormatListBulleted} />
            <ListButton format="numbered-list" Icon={FormatListNumbered} />
            <ImageButton />
            <AlignButton align="left" Icon={FormatAlignLeft} />
            <AlignButton align="center" Icon={FormatAlignCenter} />
            <AlignButton align="right" Icon={FormatAlignRight} />
          </div>
          <div style={{ border: '1px solid #ccc', padding: 10, minHeight: 200 }}>
            <Editable
              renderElement={props => <Element {...props} />}
              renderLeaf={props => <Leaf {...props} />}
              placeholder="Write your content…"
              onKeyDown={e => {
                if (!e.ctrlKey) return;
                const map = { b: 'bold', i: 'italic', u: 'underline' };
                const f = map[e.key];
                if (f) {
                  e.preventDefault();
                  toggleMark(editor, f);
                }
              }}
            />
          </div>
        </>
      </Slate>

      <div style={{ marginTop: 10 }}>
        <Button variant="outlined" onClick={() => setPreview(true)} style={{ marginRight: 8 }}>Preview</Button>
        <Button variant="contained" onClick={handlePublish}>Publish</Button>
      </div>

      {preview && (
        <div style={{ marginTop: 30, border: '1px solid #ccc', padding: 20 }}>
          <h2>{title}</h2>
          {coverImage && (
            <img src={coverImage} alt="" style={{ width: '100%', maxHeight: 300, objectFit: 'cover' }} />
          )}
          <p><strong>Slug:</strong> {slug}</p>
          <p><strong>Tags:</strong> {tags}</p>
          <div dangerouslySetInnerHTML={{ __html: serialize(content) }} />
        </div>
      )}
    </div>
  );
}
