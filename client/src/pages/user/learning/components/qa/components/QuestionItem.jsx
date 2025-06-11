import React from "react";

const QuestionItem = ({ question, onEdit, onDelete, currentUserId }) => {
  return (
    <div className="card p-3">
      <div className="d-flex justify-content-between align-items-center mb-2">
        <div className="d-flex align-items-center gap-2">
          <div className="fw-bold">{question.title}</div>
        </div>

        {currentUserId === question.user_id && (
          <div className="d-flex gap-2">
            <button
              className="btn btn-sm btn-outline-warning"
              onClick={() => onEdit(question)}
            >
              <i className="bi bi-pencil-square"></i>
            </button>

            <button
              className="btn btn-sm btn-outline-danger"
              onClick={() => onDelete(question.id)}
            >
              <i className="bi bi-trash"></i>
            </button>
          </div>
        )}
      </div>
      <div className="question-content" style={{ paddingLeft: 2 }}>
        <div dangerouslySetInnerHTML={{ __html: question.question }} />
      </div>
      <div className="d-flex gap-2 justify-content-between">
        <div className="fw-bold text-primary">{question.user_name}</div>
        <span className="text-muted small">
          {new Date(question.created_at).toLocaleDateString()}
        </span>
      </div>
    </div>
  );
};

export default QuestionItem;
