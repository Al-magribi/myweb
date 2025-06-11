import React from "react";

const CourseContentSidebar = ({
  sections,
  expandedSection,
  setExpandedSection,
  selectedLecture,
  setSelectedLecture,
  formatDuration,
  lectureProgressMap = {}, // new prop: { [lectureId]: { is_completed: true/false, ... } }
}) => (
  <div
    className="p-0 h-100 bg-white border-start"
    style={{ minHeight: "100vh" }}
  >
    <div className="p-4 border-bottom">
      <span className="fw-bold fs-6">Course content</span>
    </div>
    <div className="overflow-auto" style={{ maxHeight: "calc(100vh - 60px)" }}>
      {sections.map((section, sectionIdx) => {
        // Hitung total durasi section (dalam detik)
        const totalSectionDuration = section.lectures.reduce(
          (acc, lec) => acc + (lec.duration || 0),
          0
        );
        // Hitung jumlah lecture selesai di section ini
        const completedCount = section.lectures.filter(
          (lec) => lectureProgressMap[lec.id]?.is_completed === true
        ).length;
        return (
          <div key={section.id} className="border-bottom">
            {/* Section Header */}
            <div
              className="d-flex align-items-center justify-content-between px-4 py-3 bg-white section-title"
              style={{ cursor: "pointer" }}
              onClick={() =>
                setExpandedSection(
                  expandedSection === section.id ? null : section.id
                )
              }
            >
              <div className="d-flex flex-column">
                <div className="fw-bold">
                  {`Section ${sectionIdx + 1}: ${section.title}`}
                </div>

                <span className="small text-muted">
                  {`${completedCount} / ${
                    section.lectures.length
                  } | ${formatDuration(totalSectionDuration)}`}
                </span>
              </div>

              <div className="d-flex align-items-center gap-3">
                <i
                  className={`bi ${
                    expandedSection === section.id
                      ? "bi-chevron-up"
                      : "bi-chevron-down"
                  } text-muted`}
                ></i>
              </div>
            </div>
            {/* Lectures List */}
            <ul
              className={`list-group list-group-flush ${
                expandedSection === section.id ? "show" : "collapse"
              }`}
            >
              {section.lectures.map((lecture, idx) => {
                const progress = lectureProgressMap[lecture.id];
                const isCompleted = progress?.is_completed === true;
                return (
                  <li
                    key={lecture.id}
                    className={`list-group-item d-flex align-items-center justify-content-between px-4 py-2 border-0 ${
                      selectedLecture?.id === lecture.id
                        ? "bg-primary bg-opacity-10 text-primary"
                        : "bg-transparent"
                    }`}
                    style={{ cursor: "pointer", borderRadius: 0 }}
                    onClick={() => setSelectedLecture(lecture)}
                  >
                    <div className="d-flex align-items-center gap-2 flex-grow-1">
                      <input
                        type="checkbox"
                        className="form-check-input me-2"
                        style={{ pointerEvents: "none" }}
                        checked={isCompleted}
                        readOnly
                      />
                      <span className="small text-muted">{idx + 1}.</span>
                      <span className="small fw-semibold ms-1">
                        {lecture.title}
                      </span>
                    </div>
                    <div className="d-flex align-items-center gap-2">
                      {/* Resource button jika ada resource, contoh: */}
                      {lecture.resources && lecture.resources.length > 0 && (
                        <div className="dropdown">
                          <button
                            className="btn btn-sm btn-outline-secondary dropdown-toggle"
                            type="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            Resources
                          </button>
                          <ul className="dropdown-menu">
                            {lecture.resources.map((res, i) => (
                              <li key={i}>
                                <a
                                  className="dropdown-item"
                                  href={res.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  {res.name}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      <span className="small text-muted ms-2">
                        {formatDuration(lecture.duration)}
                      </span>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}
    </div>
  </div>
);

export default CourseContentSidebar;
