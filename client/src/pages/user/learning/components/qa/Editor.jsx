import React, { Component } from "react";
import PropTypes from "prop-types";
import ReactQuill, { Quill } from "react-quill-new";
import QuillResizeImage from "quill-resize-image";
import "react-quill-new/dist/quill.snow.css";
import "./index.css";

// Register the resize module
Quill.register("modules/resize", QuillResizeImage);

class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = { editorHtml: props.value || "" };
    this.reactQuillRef = React.createRef();
  }

  handleChange = (html) => {
    this.setState({ editorHtml: html });
    this.props.onChange(html);
  };

  componentDidUpdate(prevProps) {
    if (prevProps.value !== this.props.value) {
      this.setState({ editorHtml: this.props.value });
    }
  }

  handleImageUpload = () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      const file = input.files[0];
      if (file) {
        const formData = new FormData();
        formData.append("file", file);

        try {
          const response = await fetch(`/api/courses/qa/upload/image`, {
            method: "POST",
            body: formData,
          });
          const data = await response.json();

          const editor = this.reactQuillRef.current?.getEditor();
          if (editor) {
            const range = editor.getSelection(true);
            editor.insertEmbed(range.index, "image", data.url);
          }
        } catch (error) {
          console.error("Error uploading image:", error);
          alert("Gagal mengunggah gambar. Coba lagi.");
        }
      }
    };
  };

  render() {
    const { placeholder, height, classname } = this.props;

    return (
      <div className="d-flex mb-2" style={{ height: height }}>
        <ReactQuill
          ref={this.reactQuillRef}
          theme="snow"
          value={this.state.editorHtml}
          onChange={this.handleChange}
          modules={Editor.modules(this.handleImageUpload)}
          formats={Editor.formats}
          placeholder={placeholder}
          style={{ width: "100%" }}
          className={`react-quill border bg-white rounded ${classname}`}
        />
      </div>
    );
  }
}

Editor.modules = (handleImageUpload) => {
  return {
    toolbar: {
      container: [
        [{ header: "1" }, { header: "2" }, { font: [] }],
        [{ size: [] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [
          { list: "ordered" },
          { list: "bullet" },
          { indent: "-1" },
          { indent: "+1" },
        ],
        ["link", "image"],
        ["clean"],
      ],
      handlers: {
        image: handleImageUpload,
      },
    },
    clipboard: {
      matchVisual: false,
    },
    resize: {
      modules: ["Resize"],
    },
  };
};

Editor.formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "indent",
  "link",
  "image",
];

Editor.propTypes = {
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default Editor;
