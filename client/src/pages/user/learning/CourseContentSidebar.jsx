import React from "react";

const CourseContentSidebar = ({
  sections,
  expandedSection,
  setExpandedSection,
  selectedLecture,
  setSelectedLecture,
  formatDuration,
}) => (
  <div
    className='p-4 h-100 overflow-auto custom-scrollbar'
    style={{ maxHeight: "100vh" }}
  >
    <div className='bg-white rounded-4 shadow-sm p-0 mb-4 border'>
      <div className='d-flex align-items-center justify-content-between px-4 py-3 border-bottom'>
        <span className='fw-bold fs-5 d-flex align-items-center'>
          <i className='bi bi-list-ul me-2 text-primary'></i> Course content
        </span>
        <span className='badge bg-light text-dark fw-normal'>
          {sections.reduce((acc, s) => acc + s.lectures.length, 0)} lectures
        </span>
      </div>
      <div
        className='overflow-auto'
        style={{ maxHeight: "75vh", transition: "max-height 0.3s" }}
      >
        {sections.map((section) => (
          <div key={section.id} className='mb-1'>
            <div
              className='fw-semibold px-4 py-2 d-flex align-items-center section-title'
              style={{
                fontSize: "1rem",
                cursor: "pointer",
                borderLeft:
                  expandedSection === section.id
                    ? "4px solid #0d6efd"
                    : "4px solid transparent",
                background:
                  expandedSection === section.id ? "#f5faff" : "transparent",
                transition: "all 0.2s",
              }}
              onClick={() =>
                setExpandedSection(
                  expandedSection === section.id ? null : section.id
                )
              }
            >
              <i
                className={`bi ${
                  expandedSection === section.id
                    ? "bi-folder2-open"
                    : "bi-folder2"
                } me-2 text-secondary`}
              ></i>
              <span>{section.title}</span>
              <span className='ms-auto text-muted small'>
                {section.lectures.length} lectures
              </span>
              <i
                className={`ms-2 bi ${
                  expandedSection === section.id
                    ? "bi-chevron-up"
                    : "bi-chevron-down"
                } text-muted`}
              ></i>
            </div>
            <ul
              className={`list-group list-group-flush mb-2 px-2 ${
                expandedSection === section.id ? "show" : "collapse"
              }`}
              style={{ transition: "all 0.3s" }}
            >
              {section.lectures.map((lecture) => (
                <li
                  key={lecture.id}
                  className={`list-group-item d-flex justify-content-between align-items-center px-3 py-2 border-0 lecture-item ${
                    selectedLecture?.id === lecture.id
                      ? "bg-primary bg-opacity-10 border-start border-4 border-primary text-primary"
                      : "bg-transparent"
                  } `}
                  style={{
                    cursor: "pointer",
                    borderRadius: 8,
                    marginBottom: 2,
                    transition: "background 0.2s, border 0.2s",
                  }}
                  onClick={() => setSelectedLecture(lecture)}
                  onMouseOver={(e) => e.currentTarget.classList.add("bg-light")}
                  onMouseOut={(e) =>
                    e.currentTarget.classList.remove("bg-light")
                  }
                >
                  <div className='d-flex align-items-center gap-2'>
                    <i
                      className={`bi bi-play-circle${
                        selectedLecture?.id === lecture.id ? "-fill" : ""
                      } me-2 ${
                        selectedLecture?.id === lecture.id
                          ? "text-primary"
                          : "text-secondary"
                      }`}
                    ></i>
                    <span className='small fw-semibold'>{lecture.title}</span>
                  </div>
                  <span className='badge rounded-pill bg-light text-dark border border-1 border-secondary small px-2 py-1'>
                    {formatDuration(lecture.duration)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default CourseContentSidebar;
