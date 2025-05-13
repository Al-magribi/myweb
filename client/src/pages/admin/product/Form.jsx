import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useAddProductMutation } from "../../../../controller/api/admin/ApiProduct";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

const Form = ({ refetch, editData, isEdit, setIsEdit }) => {
  const [features, setFeatures] = useState([""]);
  const [productType, setProductType] = useState("product"); // "product" or "ebook"
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    status: "active",
  });
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [ebook, setEbook] = useState(null);
  const [preview, setPreview] = useState(null);

  const [addProduct, { isLoading, reset }] = useAddProductMutation();

  // Set initial data when in edit mode
  useEffect(() => {
    if (isEdit && editData) {
      setFormData({
        name: editData.name || "",
        price: editData.price || "",
        description: editData.description || "",
        status: editData.status || "active",
      });
      setProductType(editData.ebook ? "ebook" : "product");
      setPreview(editData.image);
      setDescription(editData.description);
      // Set features if they exist
      if (editData.features && editData.features.length > 0) {
        setFeatures(editData.features);
      }
    }
  }, [isEdit, editData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEbookChange = (e) => {
    const file = e.target.files[0];
    setEbook(file);
  };

  const addFeature = () => {
    setFeatures([...features, ""]);
  };

  const removeFeature = (index) => {
    const newFeatures = features.filter((_, i) => i !== index);
    setFeatures(newFeatures);
  };

  const handleFeatureChange = (index, value) => {
    const newFeatures = [...features];
    newFeatures[index] = value;
    setFeatures(newFeatures);
  };

  const handleClose = () => {
    setFormData({
      name: "",
      price: "",
      description: "",
      status: "active",
    });
    setFeatures([""]);
    setImage(null);
    setEbook(null);
    setPreview(null);
    setProductType("product");
    setIsEdit();

    const closeModal = document.querySelector('[data-bs-dismiss="modal"]');
    closeModal.click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("price", formData.price);
      formDataToSend.append("description", description);
      formDataToSend.append("status", formData.status);
      formDataToSend.append("type", productType);

      // Filter out empty features
      const validFeatures = features.filter((feature) => feature.trim() !== "");
      formDataToSend.append("features", JSON.stringify(validFeatures));

      if (image) {
        formDataToSend.append("image", image);
      }

      if (productType === "ebook" && ebook) {
        formDataToSend.append("ebook", ebook);
      }

      // Add product ID if in edit mode
      if (isEdit && editData) {
        formDataToSend.append("id", editData.id);
      }

      await toast.promise(
        addProduct(formDataToSend)
          .unwrap()
          .then((res) => res.message),
        {
          loading: isEdit ? "Updating product..." : "Adding product...",
          success: (message) => message,
          error: (error) => error.data.message,
        }
      );

      // Reset form
      setFormData({
        name: "",
        price: "",
        description: "",
        status: "active",
      });
      setFeatures([""]);
      setImage(null);
      setEbook(null);
      setPreview(null);
      setProductType("product");
      setIsEdit();
      reset();

      // Close modal
      const closeModal = document.querySelector('[data-bs-dismiss="modal"]');
      closeModal.click();

      // Refetch data if callback provided
      if (refetch) {
        refetch();
      }
    } catch (error) {
      console.error("Error in form submission:", error);
    }
  };

  return (
    <div
      className='modal fade'
      id='addproduct'
      data-bs-backdrop='static'
      data-bs-keyboard='false'
      tabIndex='-1'
      aria-labelledby='staticBackdropLabel'
      aria-hidden='true'>
      <div className='modal-dialog modal-lg modal-dialog-scrollable'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h1 className='modal-title fs-5' id='staticBackdropLabel'>
              {isEdit ? "Edit Product" : "Add Product"}
            </h1>
            <button
              type='button'
              className='btn-close'
              data-bs-dismiss='modal'
              aria-label='Close'
              onClick={handleClose}></button>
          </div>
          <div className='modal-body'>
            <form onSubmit={handleSubmit}>
              {/* Product Type Selection */}
              <div className='mb-4'>
                <label className='form-label'>Product Type</label>
                <div className='d-flex gap-3'>
                  <div className='form-check'>
                    <input
                      className='form-check-input'
                      type='radio'
                      name='productType'
                      id='typeProduct'
                      checked={productType === "product"}
                      onChange={() => setProductType("product")}
                    />
                    <label className='form-check-label' htmlFor='typeProduct'>
                      Physical Product
                    </label>
                  </div>
                  <div className='form-check'>
                    <input
                      className='form-check-input'
                      type='radio'
                      name='productType'
                      id='typeEbook'
                      checked={productType === "ebook"}
                      onChange={() => setProductType("ebook")}
                    />
                    <label className='form-check-label' htmlFor='typeEbook'>
                      E-Book
                    </label>
                  </div>
                </div>
              </div>

              {/* Basic Information */}
              <div className='row mb-4'>
                <div className='col-md-6'>
                  <div className='mb-3'>
                    <label htmlFor='productName' className='form-label'>
                      Product Name
                    </label>
                    <input
                      type='text'
                      className='form-control'
                      id='productName'
                      name='name'
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder='Enter product name'
                      required
                    />
                  </div>
                </div>
                <div className='col-md-6'>
                  <div className='mb-3'>
                    <label htmlFor='productPrice' className='form-label'>
                      Price
                    </label>
                    <div className='input-group'>
                      <span className='input-group-text'>IDR</span>
                      <input
                        type='number'
                        className='form-control'
                        id='productPrice'
                        name='price'
                        value={formData.price}
                        onChange={handleInputChange}
                        placeholder='0'
                        min='0'
                        step='1000'
                        required
                      />
                    </div>
                    <small className='text-muted'>
                      Enter price in IDR (Indonesian Rupiah)
                    </small>
                  </div>
                </div>
              </div>

              {/* Image Upload */}
              <div className='mb-4'>
                <label className='form-label'>Product Image</label>
                <div className='d-flex align-items-center gap-3'>
                  <div
                    className='border rounded p-3 text-center'
                    style={{ width: "150px", height: "150px" }}>
                    {preview ? (
                      <img
                        src={preview}
                        alt='Preview'
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    ) : (
                      <>
                        <i className='bi bi-image text-muted fs-1'></i>
                        <p className='mb-0 text-muted small'>No image</p>
                      </>
                    )}
                  </div>
                  <div className='flex-grow-1'>
                    <input
                      type='file'
                      className='form-control'
                      onChange={handleImageChange}
                      accept='image/*'
                      required={!isEdit}
                    />
                    <small className='text-muted'>
                      Recommended size: 600x600 pixels
                    </small>
                  </div>
                </div>
              </div>

              {/* E-book File Upload */}
              {productType === "ebook" && (
                <div className='mb-4'>
                  <label className='form-label'>E-Book File</label>
                  {isEdit && editData?.ebook && (
                    <div className='mb-2'>
                      <a
                        href={editData.ebook}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='btn btn-link p-0'>
                        Lihat/Download E-Book Saat Ini
                      </a>
                    </div>
                  )}
                  <input
                    type='file'
                    className='form-control'
                    onChange={handleEbookChange}
                    accept='.pdf,.epub,.mobi'
                    required={productType === "ebook" && !isEdit}
                  />
                  <small className='text-muted'>
                    Accepted formats: PDF, EPUB, MOBI
                  </small>
                </div>
              )}

              {/* Description */}
              <div className='mb-4'>
                <label htmlFor='productDescription' className='form-label'>
                  Description
                </label>
                <ReactQuill
                  theme='snow'
                  value={description}
                  onChange={setDescription}
                />
                {/* <textarea
                  className='form-control'
                  id='productDescription'
                  name='description'
                  value={formData.description}
                  onChange={handleInputChange}
                  rows='4'
                  placeholder='Enter product description'
                  required></textarea> */}
              </div>

              {/* Features */}
              <div className='mb-4'>
                <div className='d-flex justify-content-between align-items-center mb-2'>
                  <label className='form-label mb-0'>Key Features</label>
                  <button
                    type='button'
                    className='btn btn-sm btn-outline-primary'
                    onClick={addFeature}>
                    <i className='bi bi-plus-lg me-1'></i>
                    Add Feature
                  </button>
                </div>
                {features.map((feature, index) => (
                  <div key={index} className='input-group mb-2'>
                    <input
                      type='text'
                      className='form-control'
                      value={feature}
                      onChange={(e) =>
                        handleFeatureChange(index, e.target.value)
                      }
                      placeholder={`Feature ${index + 1}`}
                    />
                    <button
                      type='button'
                      className='btn btn-outline-danger'
                      onClick={() => removeFeature(index)}>
                      <i className='bi bi-trash'></i>
                    </button>
                  </div>
                ))}
              </div>

              {/* Status */}
              <div className='mb-4'>
                <label className='form-label'>Status</label>
                <div className='form-check'>
                  <input
                    className='form-check-input'
                    type='radio'
                    name='status'
                    id='statusActive'
                    value='active'
                    checked={formData.status === "active"}
                    onChange={handleInputChange}
                  />
                  <label className='form-check-label' htmlFor='statusActive'>
                    Active
                  </label>
                </div>
                <div className='form-check'>
                  <input
                    className='form-check-input'
                    type='radio'
                    name='status'
                    id='statusInactive'
                    value='inactive'
                    checked={formData.status === "inactive"}
                    onChange={handleInputChange}
                  />
                  <label className='form-check-label' htmlFor='statusInactive'>
                    Inactive
                  </label>
                </div>
              </div>

              <div className='modal-footer px-0 pb-0'>
                <button
                  type='button'
                  className='btn btn-secondary'
                  data-bs-dismiss='modal'
                  onClick={handleClose}>
                  Cancel
                </button>
                <button
                  type='submit'
                  className='btn btn-primary'
                  disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <span
                        className='spinner-border spinner-border-sm me-2'
                        role='status'
                        aria-hidden='true'></span>
                      {isEdit ? "Updating..." : "Saving..."}
                    </>
                  ) : isEdit ? (
                    "Update Product"
                  ) : (
                    "Save Product"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
