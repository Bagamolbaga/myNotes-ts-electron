import React, { FC, useRef } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";

interface QuillEditorProps {
    className?: string,
    value: string,
    onChangeHandler?: (value: string,
        delta: any,
        source: any,
        editor: any,
    ) => void
}

const QuillEditor: FC<QuillEditorProps> = ({className, value, onChangeHandler}) => {
    const quillRef = useRef(null)

  const Font = Quill.import("formats/font");
  Font.whitelist = [
    "arial",
    "comic-sans",
    "courier-new",
    "georgia",
    "helvetica",
    "lucida",
  ];
  Quill.register(Font, true);

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, false] }],
      [{ font: [] }],
      [{ color: [] }, { background: [] }],
      ["bold", "italic", "underline", "strike", "blockquote", "code"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "font",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "color",
    "background",
  ];

  return (
      <ReactQuill
        className={className}
        ref={quillRef}
        theme="snow"
        placeholder="content..."
        modules={modules}
        formats={formats}
        value={value}
        onChange={onChangeHandler ? onChangeHandler : () => {}}
      />
  );
};

export default QuillEditor;
