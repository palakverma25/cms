// src/components/utils.js
import { Editor, Transforms, Text } from 'slate';

export const toggleMark = (editor, format) => {
  const isActive = Editor.marks(editor)?.[format];
  if (format === 'list') {
    const [match] = Editor.nodes(editor, {
      match: n => n.type === 'list-item'
    });
    Transforms.unwrapNodes(editor, {
      match: n => n.type === 'list-item',
      split: true
    });
    const newType = match ? 'paragraph' : 'list-item';
    Transforms.setNodes(editor, { type: newType });
  } else {
    if (isActive) Editor.removeMark(editor, format);
    else Editor.addMark(editor, format, true);
  }
};
