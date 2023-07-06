import Output from "editorjs-react-renderer";

import React from "react";

interface IEditorRenderProps {
  content: string;
}
const EditorRender = ({ content }: IEditorRenderProps) => {
  return <Output data={JSON.parse(content)} />;
};

export default EditorRender;
