import React, { useMemo, useState, useCallback } from 'react';
import { createEditor, Transforms, Editor, Text } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';

const HOTKEYS = {
  'mod+b': 'bold',
  'mod+i': 'italic'
};

const Leaf = ({ attributes, children, leaf }) => {
  if (leaf.bold) children = <strong>{children}</strong>;
  if (leaf.italic) children = <em>{children}</em>;
  return <span {...attributes}>{children}</span>;
};

export default function RichEditor({ value, onChange }) {
  const editor = useMemo(() => withReact(createEditor()), []);
  const renderLeaf = useCallback(props => <Leaf {...props} />, []);

  const onKeyDown = event => {
    for (const hotkey in HOTKEYS) {
      if (event.metaKey && event.key === hotkey.replace('mod+', '')) {
        event.preventDefault();
        const mark = HOTKEYS[hotkey];
        Transforms.setNodes(
          editor,
          { [mark]: true },
          { match: Text.isText, split: true }
        );
      }
    }
  };

  return (
    <Slate editor={editor} value={value} onChange={onChange}>
      <div style={{ border: '1px solid #ccc', padding: 10 }}>
        <Editable
          renderLeaf={renderLeaf}
          placeholder="Enter your content..."
          onKeyDown={onKeyDown}
        />
      </div>
    </Slate>
  );
}
