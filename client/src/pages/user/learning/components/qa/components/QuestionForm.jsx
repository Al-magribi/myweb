import React from "react";
import Editor from "../Editor";

const QuestionForm = ({
  title,
  question,
  onTitleChange,
  onQuestionChange,
  onSubmit,
  isSubmitting,
  isEditing,
}) => {
  return (
    <div className="d-flex flex-column gap-2">
      <input
        type="text"
        className="form-control"
        placeholder="Question title"
        value={title}
        onChange={(e) => onTitleChange(e.target.value)}
      />

      <Editor
        value={question}
        onChange={onQuestionChange}
        placeholder="Enter your question"
        height="300px"
      />

      {isSubmitting ? (
        <button className="btn btn-sm btn-outline-primary">
          <span
            className="spinner-border spinner-border-sm"
            role="status"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Loading...</span>
        </button>
      ) : (
        <button className="btn btn-sm btn-outline-primary" onClick={onSubmit}>
          {isEditing ? "Update Question" : "Ask a question"}
        </button>
      )}
    </div>
  );
};

export default QuestionForm;
