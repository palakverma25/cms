// src/components/Toolbar.jsx
import React from 'react';
import { IconButton } from '@mui/material';
import { FormatBold, FormatItalic, FormatUnderlined, FormatListBulleted } from '@mui/icons-material';
import { useSlate } from 'slate-react';
import { toggleMark } from './utils';

const Toolbar = () => {
  const editor = useSlate();
  return (
    <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
      <IconButton onMouseDown={e => { e.preventDefault(); toggleMark(editor, 'bold'); }}>
        <FormatBold />
      </IconButton>
      <IconButton onMouseDown={e => { e.preventDefault(); toggleMark(editor, 'italic'); }}>
        <FormatItalic />
      </IconButton>
      <IconButton onMouseDown={e => { e.preventDefault(); toggleMark(editor, 'underline'); }}>
        <FormatUnderlined />
      </IconButton>
      <IconButton onMouseDown={e => { e.preventDefault(); toggleMark(editor, 'list'); }}>
        <FormatListBulleted />
      </IconButton>
    </div>
  );
};

export default Toolbar;
