import React from "react";

const QuestionFilters = ({ lectures, selectedLecture, onLectureChange }) => {
  return (
    <div className="d-flex flex-wrap gap-2 mb-3">
      <select
        className="form-select w-auto"
        value={selectedLecture}
        onChange={(e) => onLectureChange(e.target.value)}
      >
        <option value="">All lectures</option>
        {lectures.map((lecture) => (
          <option key={lecture.id} value={lecture.id}>
            {lecture.title}
          </option>
        ))}
      </select>
      <select className="form-select w-auto">
        <option>Sort by recommended</option>
      </select>
      <button className="btn btn-outline-primary">Filter questions</button>
    </div>
  );
};

export default QuestionFilters;
