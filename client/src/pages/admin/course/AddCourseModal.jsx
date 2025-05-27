import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { formatCurrency, cleanCurrencyInput } from "../../../utils/format";
import { toast } from "react-hot-toast";

const AddCourseModal = ({ onSubmit, detail }) => {
  const [formData, setFormData] = useState({
    title: "",
    instructor: "",
    category: "",
    level: "",
    duration: "",
    price: "",
    description: "",
    thumbnail: null,
    video_preview: "",
    link_files: "",
    objectives: [""],
    requirements: [""],
    is_published: false,
  });

  const [priceInput, setPriceInput] = useState("");
  const [thumbnailPreview, setThumbnailPreview] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    if (detail) {
      setIsEditMode(true);
      setFormData({
        id: detail.id,
        title: detail.title || "",
        instructor: detail.instructor || "",
        category: detail.category || "",
        level: detail.level || "Beginner",
        duration: detail.duration || "",
        price: detail.price || "",
        description: detail.description || "",
        thumbnail: null, // We don't set the file object
        video_preview:
          detail.video_preview === "null" ? "" : detail.video_preview || "",
        link_files: detail.link_files || "",
        objectives: detail.objectives?.length ? detail.objectives : [""],
        requirements: detail.requirements?.length ? detail.requirements : [""],
        is_published: detail.is_published || false,
      });
      setPriceInput(formatCurrency(detail.price));
      setThumbnailPreview(detail.thumbnail || "");
    }
  }, [detail]);

  const handlePriceChange = (e) => {
    const rawValue = e.target.value;
    const cleanValue = cleanCurrencyInput(rawValue);

    // Update the display value
    setPriceInput(rawValue);

    // Update the actual form data with numeric value
    setFormData((prev) => ({
      ...prev,
      price: cleanValue,
    }));
  };

  const handlePriceBlur = () => {
    // Only format when there's a value
    if (formData.price) {
      setPriceInput(formatCurrency(formData.price));
    }
  };

  const handlePriceFocus = () => {
    // Show only numbers when focused
    setPriceInput(formData.price);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "price") {
      handlePriceChange(e);
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files[0]) {
      // Store the actual File object
      setFormData((prev) => ({
        ...prev,
        [name]: files[0],
      }));

      // Create preview URL
      const previewUrl = URL.createObjectURL(files[0]);
      setThumbnailPreview(previewUrl);
    }
  };

  const handleArrayChange = (index, value, field) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].map((item, i) => (i === index ? value : item)),
    }));
  };

  const addArrayItem = (field) => {
    setFormData((prev) => ({
      ...prev,
      [field]: [...prev[field], ""],
    }));
  };

  const removeArrayItem = (index, field) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Validate required fields including thumbnail for new courses
      if (
        !isEditMode &&
        (!formData.thumbnail || !(formData.thumbnail instanceof File))
      ) {
        toast.error("Please select a thumbnail image");
        return;
      }

      // Create a new FormData instance
      const formDataToSend = new FormData();

      // Append all form fields
      Object.keys(formData).forEach((key) => {
        if (key === "thumbnail") {
          // Only append thumbnail if it's a new file
          if (formData.thumbnail instanceof File) {
            formDataToSend.append("thumbnail", formData.thumbnail);
          }
        } else if (key === "objectives" || key === "requirements") {
          // Filter out empty values and stringify
          const arrayValue = formData[key].filter((item) => item.trim() !== "");
          formDataToSend.append(key, JSON.stringify(arrayValue));
        } else if (key === "price") {
          // Ensure price is a clean number
          formDataToSend.append(
            key,
            cleanCurrencyInput(formData[key].toString())
          );
        } else if (key === "is_published") {
          formDataToSend.append(key, formData[key].toString());
        } else {
          formDataToSend.append(key, formData[key]);
        }
      });

      await onSubmit(formDataToSend, isEditMode ? detail.id : null);

      // Reset form if not editing
      if (!isEditMode) {
        setFormData({
          id: "",
          title: "",
          instructor: "",
          category: "",
          level: "Beginner",
          duration: "",
          price: "",
          description: "",
          thumbnail: null,
          video_preview: "",
          link_files: "",
          objectives: [""],
          requirements: [""],
          is_published: false,
        });
        setPriceInput("");
        setThumbnailPreview("");
      }

      // Close modal
      document.querySelector('[data-bs-dismiss="modal"]').click();
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error(
        error.message || `Failed to ${isEditMode ? "update" : "create"} course`
      );
    }
  };

  const handleClose = () => {
    setFormData({
      id: "",
      title: "",
      instructor: "",
      category: "",
      level: "Beginner",
      duration: "",
      price: "",
      description: "",
      thumbnail: null,
      video_preview: "",
      link_files: "",
      objectives: [""],
      requirements: [""],
      is_published: false,
    });
    setIsEditMode(false);
  };

  return (
    <div className='modal fade' id='course' tabIndex='-1'>
      <div className='modal-dialog modal-lg modal-dialog-scrollable'>
        <div className='modal-content'>
          <div className='modal-header bg-light'>
            <h5 className='modal-title fw-bold'>
              {isEditMode ? "Edit Course" : "Add New Course"}
            </h5>
            <button
              type='button'
              className='btn-close'
              data-bs-dismiss='modal'
              onClick={handleClose}
            ></button>
          </div>
          <div className='modal-body p-4'>
            <form onSubmit={handleSubmit}>
              {/* Course Basic Information Section */}
              <div className='mb-4'>
                <h6 className='text-primary mb-3 fw-bold'>Basic Information</h6>
                <div className='row g-3'>
                  <div className='col-12'>
                    <label className='form-label'>Course Title</label>
                    <input
                      type='text'
                      className='form-control form-control-lg'
                      placeholder='Enter course title'
                      name='title'
                      value={formData.title}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className='col-md-6'>
                    <label className='form-label'>Instructor</label>
                    <input
                      type='text'
                      className='form-control'
                      placeholder='Enter instructor name'
                      name='instructor'
                      value={formData.instructor}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className='col-md-6'>
                    <label className='form-label'>Category</label>
                    <select
                      className='form-select'
                      name='category'
                      value={formData.category}
                      onChange={handleInputChange}
                      required
                    >
                      <option value='' hidden>
                        Select Category
                      </option>
                      <option value='Web Development'>Web Development</option>
                      <option value='Excel'>Excel</option>
                      <option value='Artificial Interlligence'>
                        Artificial Intelligence
                      </option>
                    </select>
                  </div>

                  <div className='col-md-4'>
                    <label className='form-label'>Level</label>
                    <select
                      className='form-select'
                      name='level'
                      value={formData.level}
                      onChange={handleInputChange}
                      required
                    >
                      <option value='' hidden>
                        Select Level
                      </option>
                      <option value='Beginner'>Beginner</option>
                      <option value='Intermediate'>Intermediate</option>
                      <option value='Advance'>Advanced</option>
                      <option value='All Levels'>All Levels</option>
                    </select>
                  </div>

                  <div className='col-md-4'>
                    <label className='form-label'>Duration (hours)</label>
                    <input
                      type='number'
                      className='form-control'
                      placeholder='Enter duration'
                      name='duration'
                      value={formData.duration}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className='col-md-4'>
                    <label className='form-label'>Price</label>
                    <input
                      type='text'
                      className='form-control'
                      placeholder='Enter price'
                      name='price'
                      value={priceInput}
                      onChange={handleInputChange}
                      onBlur={handlePriceBlur}
                      onFocus={handlePriceFocus}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Course Media Section */}
              <div className='mb-4'>
                <h6 className='text-primary mb-3 fw-bold'>Course Media</h6>
                <div className='row g-3'>
                  <div className='col-md-6'>
                    <label className='form-label d-block'>
                      Thumbnail Image{" "}
                      {!isEditMode && <span className='text-danger'>*</span>}
                    </label>
                    <div className='d-flex gap-3 align-items-start'>
                      {thumbnailPreview && (
                        <img
                          src={thumbnailPreview}
                          alt='Thumbnail preview'
                          className='rounded'
                          style={{
                            width: "120px",
                            height: "80px",
                            objectFit: "cover",
                          }}
                        />
                      )}
                      <div className='flex-grow-1'>
                        <input
                          type='file'
                          className='form-control'
                          name='thumbnail'
                          onChange={handleFileChange}
                          accept='image/*'
                          required={!isEditMode}
                        />
                        <small className='text-muted'>
                          Recommended size: 1280x720px
                        </small>
                      </div>
                    </div>
                  </div>

                  <div className='col-md-6'>
                    <label className='form-label'>Preview Video URL</label>
                    <input
                      type='text'
                      className='form-control'
                      name='video_preview'
                      placeholder='Enter video URL'
                      value={formData.video_preview}
                      onChange={handleInputChange}
                      required
                    />
                    <small className='text-muted'>YouTube or Vimeo URL</small>
                  </div>

                  <div className='col-12'>
                    <label className='form-label'>Course Files Link</label>
                    <input
                      type='text'
                      className='form-control'
                      name='link_files'
                      placeholder='Enter course files URL (Google Drive, Dropbox, etc.)'
                      value={formData.link_files}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>

              {/* Course Description Section */}
              <div className='mb-4'>
                <h6 className='text-primary mb-3 fw-bold'>
                  Course Description
                </h6>
                <div className='bg-light rounded p-3'>
                  <ReactQuill
                    theme='snow'
                    value={formData.description}
                    onChange={(value) =>
                      setFormData((prev) => ({ ...prev, description: value }))
                    }
                    placeholder='Enter detailed course description'
                  />
                </div>
              </div>

              {/* Learning Objectives Section */}
              <div className='mb-4'>
                <h6 className='text-primary mb-3 fw-bold'>
                  Learning Objectives
                </h6>
                <div className='bg-light rounded p-3'>
                  {formData.objectives.map((objective, index) => (
                    <div key={index} className='input-group mb-2'>
                      <span className='input-group-text bg-white'>
                        <i className='bi bi-check-circle text-primary'></i>
                      </span>
                      <input
                        type='text'
                        className='form-control'
                        value={objective}
                        onChange={(e) =>
                          handleArrayChange(index, e.target.value, "objectives")
                        }
                        placeholder='What will students learn?'
                      />
                      <button
                        type='button'
                        className='btn btn-outline-danger'
                        onClick={() => removeArrayItem(index, "objectives")}
                        disabled={formData.objectives.length === 1}
                      >
                        <i className='bi bi-trash'></i>
                      </button>
                    </div>
                  ))}
                  <button
                    type='button'
                    className='btn btn-sm btn-outline-primary mt-2'
                    onClick={() => addArrayItem("objectives")}
                  >
                    <i className='bi bi-plus-lg me-1'></i> Add Learning
                    Objective
                  </button>
                </div>
              </div>

              {/* Requirements Section */}
              <div className='mb-4'>
                <h6 className='text-primary mb-3 fw-bold'>
                  Course Requirements
                </h6>
                <div className='bg-light rounded p-3'>
                  {formData.requirements.map((requirement, index) => (
                    <div key={index} className='input-group mb-2'>
                      <span className='input-group-text bg-white'>
                        <i className='bi bi-asterisk text-primary'></i>
                      </span>
                      <input
                        type='text'
                        className='form-control'
                        value={requirement}
                        onChange={(e) =>
                          handleArrayChange(
                            index,
                            e.target.value,
                            "requirements"
                          )
                        }
                        placeholder='What do students need?'
                      />
                      <button
                        type='button'
                        className='btn btn-outline-danger'
                        onClick={() => removeArrayItem(index, "requirements")}
                        disabled={formData.requirements.length === 1}
                      >
                        <i className='bi bi-trash'></i>
                      </button>
                    </div>
                  ))}
                  <button
                    type='button'
                    className='btn btn-sm btn-outline-primary mt-2'
                    onClick={() => addArrayItem("requirements")}
                  >
                    <i className='bi bi-plus-lg me-1'></i> Add Requirement
                  </button>
                </div>
              </div>

              {/* Published Status */}
              <div className='mb-4'>
                <div className='form-check form-switch'>
                  <input
                    type='checkbox'
                    className='form-check-input'
                    id='isPublished'
                    name='is_published'
                    checked={formData.is_published}
                    onChange={handleInputChange}
                  />
                  <label className='form-check-label' htmlFor='isPublished'>
                    Publish course immediately
                  </label>
                </div>
              </div>

              <div className='modal-footer px-0 pb-0'>
                <button
                  type='button'
                  className='btn btn-sm btn-danger'
                  data-bs-dismiss='modal'
                  onClick={handleClose}
                >
                  Cancel
                </button>
                <button type='submit' className='btn btn-sm btn-primary'>
                  {isEditMode ? "Update Course" : "Create Course"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCourseModal;
