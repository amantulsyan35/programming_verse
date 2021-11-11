import React from 'react';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/mode/javascript/javascript';
import { Controlled as ControlledEditor } from 'react-codemirror2';

const Editor = ({ language, value, handleChange, name, readOnly }) => {
  const changeCode = (editor, data, value) => {
    handleChange(value, name);
  };

  return (
    <div>
      <ControlledEditor
        onBeforeChange={changeCode}
        value={value}
        className='code-mirror-wrapper'
        options={{
          lineWrapping: true,
          lint: true,
          mode: language,
          theme: 'material',
          lineNumbers: true,
          readOnly: readOnly,
        }}
      />
    </div>
  );
};

export default Editor;
