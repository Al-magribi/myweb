import React from "react";
import {
  useAddLectureMutation,
  useDeleteLectureMutation,
} from "../../../../controller/api/course/ApiCourse";

const Lecture = ({ lecture, lectureIndex, sectionId }) => {
  const [addLecture] = useAddLectureMutation();
  const [deleteLecture] = useDeleteLectureMutation();
  const [isEditing, setIsEditing] = React.useState(false);
  const [durationError, setDurationError] = React.useState("");

  // Convert seconds to MM:SS format
  const formatDuration = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  // Convert MM:SS format to seconds
  const parseDuration = (durationStr) => {
    const [minutes, seconds] = durationStr.split(":").map(Number);
    return minutes * 60 + seconds;
  };

  const [editLecture, setEditLecture] = React.useState({
    title: lecture.title,
    description: lecture.description,
    duration: formatDuration(lecture.duration),
    youtubeLink: lecture.video_url,
  });

  const handleEditLecture = async (e) => {
    e.preventDefault();
    const regex = /^([0-9]{2}):([0-5][0-9])$/;
    if (!regex.test(editLecture.duration)) {
      setDurationError("Format durasi harus MM:SS, contoh: 02:30");
      return;
    }
    setDurationError("");
    try {
      await addLecture({
        id: lecture.id,
        section_id: sectionId,
        title: editLecture.title,
        description: editLecture.description,
        duration: parseDuration(editLecture.duration),
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
    <div className='list-group-item border-0 bg-transparent p-0 mb-3'>
      {isEditing ? (
        <div className='card border-0 bg-light'>
          <div className='card-body'>
            <form onSubmit={handleEditLecture}>
              <div className='mb-3'>
                <label className='form-label'>Lecture Title</label>
                <input
                  type='text'
                  className='form-control'
                  placeholder='Enter lecture title'
                  value={editLecture.title}
                  onChange={(e) =>
                    setEditLecture({ ...editLecture, title: e.target.value })
                  }
                  required
                />
              </div>
              <div className='mb-3'>
                <label className='form-label'>Lecture Description</label>
                <textarea
                  className='form-control'
                  placeholder='Enter lecture description'
                  value={editLecture.description}
                  onChange={(e) =>
                    setEditLecture({
                      ...editLecture,
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
                    value={editLecture.duration}
                    onChange={(e) => {
                      setEditLecture({
                        ...editLecture,
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
                  <div className='text-danger small mt-1'>{durationError}</div>
                )}
              </div>
              <div className='mb-4'>
                <label className='form-label'>YouTube Video URL</label>
                <input
                  type='url'
                  className='form-control'
                  placeholder='Enter YouTube video URL'
                  value={editLecture.youtubeLink}
                  onChange={(e) =>
                    setEditLecture({
                      ...editLecture,
                      youtubeLink: e.target.value,
                    })
                  }
                  required
                />
              </div>
              <div className='d-flex gap-2'>
                <button type='submit' className='btn btn-primary flex-grow-1'>
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
          </div>
        </div>
      ) : (
        <div className='card shadow-sm'>
          <div className='card-body'>
            <div className='d-flex justify-content-between align-items-start'>
              <div className='flex-grow-1'>
                <div className='d-flex align-items-center mb-2'>
                  <span className='badge bg-primary me-2'>
                    {lectureIndex + 1}
                  </span>
                  <h5 className='card-title mb-0'>{lecture.title}</h5>
                </div>
                <p className='card-text text-muted mb-3'>
                  {lecture.description}
                </p>
                <div className='d-flex align-items-center gap-3'>
                  <span className='text-muted'>
                    <i className='bi bi-clock me-1'></i>
                    {formatDuration(lecture.duration)}
                  </span>
                  {lecture.video_url && (
                    <a
                      href={lecture.video_url}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='btn btn-sm btn-outline-secondary'
                    >
                      <i className='bi bi-youtube me-1'></i>
                      Watch Video
                    </a>
                  )}
                </div>
              </div>
              <div className='d-flex gap-2 ms-3'>
                <button
                  className='btn btn-light'
                  onClick={() => setIsEditing(true)}
                >
                  <i className='bi bi-pencil'></i>
                </button>
                <button
                  className='btn btn-light text-danger'
                  onClick={handleDeleteLecture}
                >
                  <i className='bi bi-trash'></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Lecture;
