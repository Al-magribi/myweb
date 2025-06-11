import React from "react";
import QuestionItem from "./QuestionItem";

const QuestionList = ({
  questions,
  isLoading,
  currentUserId,
  onEdit,
  onDelete,
  page,
  onPageChange,
}) => {
  if (isLoading) {
    return <div>Loading questions...</div>;
  }

  if (!questions?.length) {
    return <div className="text-muted">No questions yet.</div>;
  }

  return (
    <div className="my-4 d-flex flex-column gap-3">
      <div className="fw-bold">
        All questions in this course ({questions.length})
      </div>

      <div className="d-flex flex-column gap-3">
        {questions.map((question) => (
          <QuestionItem
            key={question.id}
            question={question}
            currentUserId={currentUserId}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>

      {/* Pagination */}

      <nav className="d-flex justify-content-center">
        <ul className="pagination pagination-sm">
          <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
            <button
              className="page-link"
              onClick={() => onPageChange((p) => Math.max(1, p - 1))}
            >
              <i className="bi bi-chevron-left"></i>
            </button>
          </li>
          <li className="page-item">
            <span className="page-link">{page}</span>
          </li>
          <li className="page-item">
            <button
              className="page-link"
              onClick={() => onPageChange((p) => p + 1)}
            >
              <i className="bi bi-chevron-right"></i>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default QuestionList;
