import React from "react";
import {
  useAddLectureMutation,
  useDeleteLectureMutation,
} from "../../../../controller/api/admin/ApiCourse";

const Lecture = ({ lecture, lectureIndex, sectionId }) => {
  const [addLecture] = useAddLectureMutation();
  const [deleteLecture] = useDeleteLectureMutation();
  const [isEditing, setIsEditing] = React.useState(false);
  const [editLecture, setEditLecture] = React.useState({
    title: lecture.title,
    description: lecture.description,
    duration: lecture.duration,
    youtubeLink: lecture.video_url,
  });

  const handleEditLecture = async (e) => {
    e.preventDefault();
    try {
      await addLecture({
        id: lecture.id,
        section_id: sectionId,
        title: editLecture.title,
        description: editLecture.description,
        duration: parseInt(editLecture.duration),
        video_url: editLecture.youtubeLink,
        position: lecture.position,
        is_preview: lecture.is_preview,
      });
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update lecture:", error);
    }
  };

  const handleDeleteLecture = async () => {
    if (window.confirm("Are you sure you want to delete this lecture?")) {
      try {
        await deleteLecture(lecture.id);
      } catch (error) {
        console.error("Failed to delete lecture:", error);
      }
    }
  };

  return (
    <div className="list-group-item">
      {isEditing ? (
        <form onSubmit={handleEditLecture}>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Lecture Title"
              value={editLecture.title}
              onChange={(e) =>
                setEditLecture({ ...editLecture, title: e.target.value })
              }
              required
            />
          </div>
          <div className="mb-3">
            <textarea
              className="form-control"
              placeholder="Lecture Description"
              value={editLecture.description}
              onChange={(e) =>
                setEditLecture({ ...editLecture, description: e.target.value })
              }
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="number"
              className="form-control"
              placeholder="Duration (minutes)"
              value={editLecture.duration}
              onChange={(e) =>
                setEditLecture({ ...editLecture, duration: e.target.value })
              }
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="url"
              className="form-control"
              placeholder="YouTube Video URL"
              value={editLecture.youtubeLink}
              onChange={(e) =>
                setEditLecture({ ...editLecture, youtubeLink: e.target.value })
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
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h6 className="mb-1">
              {lectureIndex + 1}. {lecture.title}
            </h6>
            <p className="mb-1 text-muted small">{lecture.description}</p>
            <small className="text-muted">
              Duration: {lecture.duration} minutes
            </small>
            {lecture.video_url && (
              <div className="mt-2">
                <a
                  href={lecture.video_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-sm btn-outline-secondary"
                >
                  <i className="bi bi-youtube"></i> Watch Video
                </a>
              </div>
            )}
          </div>
          <div className="d-flex gap-2">
            <button
              className="btn btn-sm btn-outline-primary"
              onClick={() => setIsEditing(true)}
            >
              <i className="bi bi-pencil"></i>
            </button>
            <button
              className="btn btn-sm btn-outline-danger"
              onClick={handleDeleteLecture}
            >
              <i className="bi bi-trash"></i>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Lecture;
