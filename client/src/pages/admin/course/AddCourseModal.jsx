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
    level: "Beginner",
    duration: "",
    price: "",
    description: "",
    thumbnail: null,
    video_preview: "",
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

  return (
    <div className='modal fade' id='course' tabIndex='-1'>
      <div className='modal-dialog modal-lg modal-dialog-scrollable'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h5 className='modal-title'>
              {isEditMode ? "Edit Course" : "Add New Course"}
            </h5>
            <button
              type='button'
              className='btn-close'
              data-bs-dismiss='modal'
            ></button>
          </div>
          <div className='modal-body'>
            <form onSubmit={handleSubmit}>
              <div className='row g-3'>
                {/* Basic Information */}
                <div className='col-12'>
                  <input
                    type='text'
                    className='form-control'
                    placeholder='Course Title'
                    name='title'
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className='col-md-6'>
                  <input
                    type='text'
                    className='form-control'
                    placeholder='Instructor Name'
                    name='instructor'
                    value={formData.instructor}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className='col-md-4'>
                  <select
                    className='form-select'
                    name='category'
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                  >
                    <option value='' hidden>
                      Category
                    </option>
                    <option value='Web Development'>Web Development</option>
                    <option value='Excel'>Excel</option>
                    <option value='Artificial Interlligence'>
                      Artificial Intelligence
                    </option>
                  </select>
                </div>

                <div className='col-md-4'>
                  <select
                    className='form-select'
                    name='level'
                    value={formData.level}
                    onChange={handleInputChange}
                    required
                  >
                    <option value='' hidden>
                      Level
                    </option>
                    <option value='Beginner'>Beginner</option>
                    <option value='Intermediate'>Intermediate</option>
                    <option value='Advance'>Advanced</option>
                    <option value='All Levels'>All Levels</option>
                  </select>
                </div>

                <div className='col-md-4'>
                  <input
                    type='number'
                    className='form-control'
                    placeholder='Duration (hours)'
                    name='duration'
                    value={formData.duration}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className='col-md-4'>
                  <input
                    type='text'
                    className='form-control'
                    placeholder='Price'
                    name='price'
                    value={priceInput}
                    onChange={handleInputChange}
                    onBlur={handlePriceBlur}
                    onFocus={handlePriceFocus}
                    required
                  />
                </div>

                {/* Description */}
                <div className='col-12'>
                  <ReactQuill
                    theme='snow'
                    value={formData.description}
                    onChange={(value) =>
                      setFormData((prev) => ({ ...prev, description: value }))
                    }
                    placeholder='Course Description'
                  />
                </div>

                {/* Media Upload */}
                <div className='col-md-6'>
                  <label className='form-label'>
                    Thumbnail Image{" "}
                    {!isEditMode && <span className='text-danger'>*</span>}
                  </label>
                  <input
                    type='file'
                    className='form-control'
                    name='thumbnail'
                    onChange={handleFileChange}
                    accept='image/*'
                    required={!isEditMode}
                  />
                  {thumbnailPreview && (
                    <img
                      src={thumbnailPreview}
                      alt='Thumbnail preview'
                      className='mt-2 img-thumbnail'
                      style={{ maxHeight: "100px" }}
                    />
                  )}
                </div>

                <div className='col-md-6'>
                  <label className='form-label'>Preview Video</label>
                  <input
                    type='text'
                    className='form-control'
                    name='video_preview'
                    value={formData.video_preview}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                {/* Learning Objectives */}
                <div className='col-12'>
                  <label className='form-label'>Learning Objectives</label>
                  {formData.objectives.map((objective, index) => (
                    <div key={index} className='input-group mb-2'>
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
                    className='btn btn-sm btn-outline-primary'
                    onClick={() => addArrayItem("objectives")}
                  >
                    <i className='bi bi-plus-lg'></i> Add Objective
                  </button>
                </div>

                {/* Requirements */}
                <div className='col-12'>
                  <label className='form-label'>Requirements</label>
                  {formData.requirements.map((requirement, index) => (
                    <div key={index} className='input-group mb-2'>
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
                    className='btn btn-sm btn-outline-primary'
                    onClick={() => addArrayItem("requirements")}
                  >
                    <i className='bi bi-plus-lg'></i> Add Requirement
                  </button>
                </div>

                {/* Published Status */}
                <div className='col-12'>
                  <div className='form-check'>
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
              </div>

              <div className='modal-footer'>
                <button
                  type='button'
                  className='btn btn-secondary'
                  data-bs-dismiss='modal'
                >
                  Cancel
                </button>
                <button type='submit' className='btn btn-primary'>
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
