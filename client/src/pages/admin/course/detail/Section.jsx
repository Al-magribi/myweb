import React from "react";
import Lecture from "./Lecture";
import {
  useAddLectureMutation,
  useAddSectionMutation,
  useDeleteSectionMutation,
} from "../../../../controller/api/admin/ApiCourse";

const Section = ({ section, index }) => {
  const [addLecture] = useAddLectureMutation();
  const [addSection] = useAddSectionMutation();
  const [deleteSection] = useDeleteSectionMutation();
  const [isEditing, setIsEditing] = React.useState(false);
  const [newLecture, setNewLecture] = React.useState({
    title: "",
    description: "",
    duration: "",
    youtubeLink: "",
  });
  const [editSection, setEditSection] = React.useState({
    title: section.title,
    description: section.description,
  });

  const handleAddLecture = async (e) => {
    e.preventDefault();
    try {
      await addLecture({
        section_id: section.id,
        title: newLecture.title,
        description: newLecture.description,
        duration: parseInt(newLecture.duration),
        position: section.lectures?.length || 0,
        is_preview: false,
        video_url: newLecture.youtubeLink,
      });
      setNewLecture({
        title: "",
        description: "",
        duration: "",
        youtubeLink: "",
      });
    } catch (error) {
      console.error("Failed to add lecture:", error);
    }
  };

  const handleEditSection = async (e) => {
    e.preventDefault();
    try {
      await addSection({
        id: section.id,
        title: editSection.title,
        description: editSection.description,
        position: section.position,
      });
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update section:", error);
    }
  };

  const handleDeleteSection = async () => {
    if (window.confirm("Are you sure you want to delete this section?")) {
      try {
        await deleteSection(section.id);
      } catch (error) {
        console.error("Failed to delete section:", error);
      }
    }
  };

  return (
    <div className="accordion-item">
      <h2 className="accordion-header">
        <button
          className="accordion-button"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target={`#section${section.id}`}
        >
          Section {index + 1}: {section.title}
        </button>
      </h2>
      <div
        id={`section${section.id}`}
        className="accordion-collapse collapse show"
      >
        <div className="accordion-body">
          {isEditing ? (
            <form onSubmit={handleEditSection} className="mb-3">
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Section Title"
                  value={editSection.title}
                  onChange={(e) =>
                    setEditSection({ ...editSection, title: e.target.value })
                  }
                  required
                />
              </div>
              <div className="mb-3">
                <textarea
                  className="form-control"
                  placeholder="Section Description"
                  value={editSection.description}
                  onChange={(e) =>
                    setEditSection({
                      ...editSection,
                      description: e.target.value,
                    })
                  }
                  required
                />
              </div>
              <div className="d-flex gap-2">
                <button type="submit" className="btn btn-primary">
                  Save Changes
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div className="mb-3">
              <p>{section.description}</p>
              <div className="d-flex gap-2">
                <button
                  className="btn btn-sm btn-outline-primary"
                  onClick={() => setIsEditing(true)}
                >
                  <i className="bi bi-pencil"></i> Edit Section
                </button>
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={handleDeleteSection}
                >
                  <i className="bi bi-trash"></i> Delete Section
                </button>
              </div>
            </div>
          )}

          {/* Lectures List */}
          <div className="list-group mb-3">
            {section.lectures?.map((lecture, lectureIndex) => (
              <Lecture
                key={lecture.id}
                lecture={lecture}
                lectureIndex={lectureIndex}
                sectionId={section.id}
              />
            ))}
          </div>

          {/* Add Lecture Form */}
          <button
            className="btn btn-outline-primary btn-sm"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target={`#addLecture${section.id}`}
          >
            + Add Lecture
          </button>
          <div className="collapse mt-3" id={`addLecture${section.id}`}>
            <div className="card card-body">
              <form onSubmit={handleAddLecture}>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Lecture Title"
                    value={newLecture.title}
                    onChange={(e) =>
                      setNewLecture({
                        ...newLecture,
                        title: e.target.value,
                      })
                    }
                    required
                  />
                </div>
                <div className="mb-3">
                  <textarea
                    className="form-control"
                    placeholder="Lecture Description"
                    value={newLecture.description}
                    onChange={(e) =>
                      setNewLecture({
                        ...newLecture,
                        description: e.target.value,
                      })
                    }
                    required
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Duration (minutes)"
                    value={newLecture.duration}
                    onChange={(e) =>
                      setNewLecture({
                        ...newLecture,
                        duration: e.target.value,
                      })
                    }
                    required
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="url"
                    className="form-control"
                    placeholder="YouTube Video URL"
                    value={newLecture.youtubeLink}
                    onChange={(e) =>
                      setNewLecture({
                        ...newLecture,
                        youtubeLink: e.target.value,
                      })
                    }
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Add Lecture
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section;
