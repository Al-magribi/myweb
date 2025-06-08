import React from "react";
import Lecture from "./Lecture";
import {
  useAddLectureMutation,
  useAddSectionMutation,
  useDeleteSectionMutation,
} from "../../../../controller/api/course/ApiCourse";

const Section = ({ section, index }) => {
  const [addLecture] = useAddLectureMutation();
  const [addSection] = useAddSectionMutation();
  const [deleteSection] = useDeleteSectionMutation();
  const [isEditing, setIsEditing] = React.useState(false);
  const [showAddLecture, setShowAddLecture] = React.useState(false);
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
  const [durationError, setDurationError] = React.useState("");

  const parseDuration = (durationStr) => {
    const [minutes, seconds] = durationStr.split(":").map(Number);
    return minutes * 60 + seconds;
  };

  const handleAddLecture = async (e) => {
    e.preventDefault();
    const regex = /^([0-9]{2}):([0-5][0-9])$/;
    if (!regex.test(newLecture.duration)) {
      setDurationError("Format durasi harus MM:SS, contoh: 02:30");
      return;
    }
    setDurationError("");
    try {
      await addLecture({
        section_id: section.id,
        title: newLecture.title,
        description: newLecture.description,
        duration: parseDuration(newLecture.duration),
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
      setShowAddLecture(false);
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
    <div className='card shadow-sm'>
      <div className='card-body'>
        {isEditing ? (
          <form onSubmit={handleEditSection} className='mb-4'>
            <div className='mb-3'>
              <label className='form-label'>Section Title</label>
              <input
                type='text'
                className='form-control form-control-lg'
                placeholder='Enter section title'
                value={editSection.title}
                onChange={(e) =>
                  setEditSection({ ...editSection, title: e.target.value })
                }
                required
              />
            </div>
            <div className='mb-3'>
              <label className='form-label'>Section Description</label>
              <textarea
                className='form-control'
                placeholder='Enter section description'
                value={editSection.description}
                onChange={(e) =>
                  setEditSection({
                    ...editSection,
                    description: e.target.value,
                  })
                }
                rows={3}
                required
              />
            </div>
            <div className='d-flex gap-2'>
              <button type='submit' className='btn btn-primary'>
                Save Changes
              </button>
              <button
                type='button'
                className='btn btn-light'
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div className='mb-4'>
            <div className='d-flex justify-content-between align-items-start mb-3'>
              <div>
                <h3 className='h4 mb-2'>
                  Section {index + 1}: {section.title}
                </h3>
                <p className='text-muted mb-0'>{section.description}</p>
              </div>
              <div className='d-flex gap-2'>
                <button
                  className='btn btn-light'
                  onClick={() => setIsEditing(true)}
                >
                  <i className='bi bi-pencil'></i>
                </button>
                <button
                  className='btn btn-light text-danger'
                  onClick={handleDeleteSection}
                >
                  <i className='bi bi-trash'></i>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Lectures List */}
        <div className='list-group list-group-flush mb-4'>
          {section.lectures?.map((lecture, lectureIndex) => (
            <Lecture
              key={lecture.id}
              lecture={lecture}
              lectureIndex={lectureIndex}
              sectionId={section.id}
            />
          ))}
        </div>

        {/* Add Lecture Button */}
        {!showAddLecture ? (
          <button
            className='btn btn-outline-primary w-100'
            onClick={() => setShowAddLecture(true)}
          >
            <i className='bi bi-plus-lg me-2'></i>
            Add Lecture
          </button>
        ) : (
          <div className='card border-0 bg-light'>
            <div className='card-body'>
              <form onSubmit={handleAddLecture}>
                <div className='mb-3'>
                  <label className='form-label'>Lecture Title</label>
                  <input
                    type='text'
                    className='form-control'
                    placeholder='Enter lecture title'
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
                <div className='mb-3'>
                  <label className='form-label'>Lecture Description</label>
                  <textarea
                    className='form-control'
                    placeholder='Enter lecture description'
                    value={newLecture.description}
                    onChange={(e) =>
                      setNewLecture({
                        ...newLecture,
                        description: e.target.value,
                      })
                    }
                    rows={3}
                    required
                  />
                </div>
                <div className='mb-3'>
                  <label className='form-label'>Duration</label>
                  <div className='input-group'>
                    <input
                      type='text'
                      className='form-control'
                      placeholder='MM:SS'
                      value={newLecture.duration}
                      onChange={(e) => {
                        setNewLecture({
                          ...newLecture,
                          duration: e.target.value,
                        });
                      }}
                      pattern='[0-9]{2}:[0-5][0-9]'
                      title='Please enter duration in MM:SS format (e.g., 02:30)'
                      required
                      style={{ fontFamily: "monospace", letterSpacing: "1px" }}
                    />
                    <span className='input-group-text'>
                      <i className='bi bi-clock'></i>
                    </span>
                  </div>
                  <div className='form-text'>
                    <small className='text-muted'>
                      <i className='bi bi-info-circle me-1'></i>
                      Enter duration in MM:SS format (e.g., 02:30 for 2 minutes
                      and 30 seconds)
                    </small>
                  </div>
                  {durationError && (
                    <div className='text-danger small mt-1'>
                      {durationError}
                    </div>
                  )}
                </div>
                <div className='mb-4'>
                  <label className='form-label'>YouTube Video URL</label>
                  <input
                    type='url'
                    className='form-control'
                    placeholder='Enter YouTube video URL'
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
                <div className='d-flex gap-2'>
                  <button type='submit' className='btn btn-primary flex-grow-1'>
                    Add Lecture
                  </button>
                  <button
                    type='button'
                    className='btn btn-light'
                    onClick={() => setShowAddLecture(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Section;
