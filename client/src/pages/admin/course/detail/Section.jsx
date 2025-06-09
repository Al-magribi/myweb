import React, { useEffect, useState } from "react";
import Lecture from "./Lecture";
import {
  useAddSectionMutation,
  useDeleteSectionMutation,
  useAddLectureMutation,
} from "../../../../controller/api/course/ApiCourse";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { toast } from "react-hot-toast";
import Layout from "../../layout/Layout";

const Section = ({ section, index, name }) => {
  const [addSection] = useAddSectionMutation();
  const [deleteSection] = useDeleteSectionMutation();
  const [addLecture, { isLoading, isSuccess, data }] = useAddLectureMutation();
  const [isEditing, setIsEditing] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showAddLecture, setShowAddLecture] = useState(false);
  const [durationError, setDurationError] = useState("");
  const [editSection, setEditSection] = useState({
    title: section.title,
    description: section.description,
  });
  const [newLecture, setNewLecture] = useState({
    title: "",
    description: "",
    duration: "",
    youtubeLink: "",
  });
  const [lectures, setLectures] = useState(section.lectures || []);

  // Configure sensors for drag and drop
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: section.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const handleDragEnd = async (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      const oldIndex = lectures.findIndex(
        (lecture) => lecture.id === active.id
      );
      const newIndex = lectures.findIndex((lecture) => lecture.id === over.id);

      // Update local state immediately
      const reorderedLectures = arrayMove(lectures, oldIndex, newIndex);
      setLectures(reorderedLectures);

      // Update positions in the database
      try {
        await Promise.all(
          reorderedLectures.map((lecture, index) =>
            addLecture({
              id: lecture.id,
              section_id: section.id,
              title: lecture.title,
              description: lecture.description,
              duration: lecture.duration,
              video_url: lecture.video_url,
              position: index,
              is_preview: lecture.is_preview,
            })
          )
        );
      } catch (error) {
        console.error("Failed to update lecture positions:", error);
        // Revert local state if database update fails
        setLectures(section.lectures);
      }
    }
  };

  const handleEditSection = async (e) => {
    e.preventDefault();
    try {
      await addSection({
        id: section.id,
        course_id: section.course_id,
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
      const result = await addLecture({
        section_id: section.id,
        title: newLecture.title,
        description: newLecture.description,
        duration: parseDuration(newLecture.duration),
        video_url: newLecture.youtubeLink,
        position: lectures.length,
        is_preview: false,
      });

      // Update local state with new lecture
      setLectures([...lectures, result.data]);

      // Reset form
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

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message);
    }
  }, [data, isSuccess]);

  if (isLoading) {
    return (
      <div className='d-flex justify-content-center align-items-center min-vh-100'>
        <div className='spinner-border text-primary' role='status'>
          <span className='visually-hidden'>Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      <div className='card-body'>
        {isEditing ? (
          <form onSubmit={handleEditSection}>
            <div className='mb-3'>
              <label className='form-label'>Section Title</label>
              <input
                type='text'
                className='form-control'
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
        ) : (
          <>
            <div className='d-flex justify-content-between align-items-start mb-3'>
              <div className='d-flex align-items-center'>
                <div
                  className='me-3 cursor-grab'
                  {...listeners}
                  style={{ cursor: "grab" }}
                >
                  <i className='bi bi-grip-vertical fs-4'></i>
                </div>
                <div>
                  <h5 className='card-title mb-1'>
                    Section {index + 1}: {section.title}
                  </h5>
                  <p className='card-text text-muted mb-0'>
                    {section.description}
                  </p>
                </div>
              </div>
              <div className='d-flex gap-2'>
                <button
                  className='btn btn-light'
                  onClick={() => setIsExpanded(!isExpanded)}
                  title={isExpanded ? "Hide Lectures" : "Show Lectures"}
                >
                  <i
                    className={`bi bi-chevron-${isExpanded ? "up" : "down"}`}
                  ></i>
                </button>
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

            {/* Lectures List */}
            <div className={`ms-4 ${isExpanded ? "" : "d-none"}`}>
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
              >
                <SortableContext
                  items={lectures.map((lecture) => lecture.id)}
                  strategy={verticalListSortingStrategy}
                >
                  {lectures.map((lecture, lectureIndex) => (
                    <Lecture
                      key={lecture.id}
                      lecture={lecture}
                      lectureIndex={lectureIndex}
                      sectionId={section.id}
                    />
                  ))}
                </SortableContext>
              </DndContext>

              {/* Add Lecture Button/Form */}
              {!showAddLecture ? (
                <button
                  className='btn btn-outline-primary w-100 mt-3'
                  onClick={() => setShowAddLecture(true)}
                >
                  <i className='bi bi-plus-lg me-2'></i>
                  Add Lecture
                </button>
              ) : (
                <div className='card border-0 bg-light mt-3'>
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
                        <label className='form-label'>
                          Lecture Description
                        </label>
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
                            style={{
                              fontFamily: "monospace",
                              letterSpacing: "1px",
                            }}
                          />
                          <span className='input-group-text'>
                            <i className='bi bi-clock'></i>
                          </span>
                        </div>
                        <div className='form-text'>
                          <small className='text-muted'>
                            <i className='bi bi-info-circle me-1'></i>
                            Enter duration in MM:SS format (e.g., 02:30 for 2
                            minutes and 30 seconds)
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
                        <button
                          type='submit'
                          className='btn btn-primary flex-grow-1'
                        >
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
          </>
        )}
      </div>
    </div>
  );
};

export default Section;
