import React, { useState } from "react";
import Layout from "../../layout/Layout";
import { useParams } from "react-router-dom";
import Section from "./Section";
import {
  useGetCourseByIdQuery,
  useAddSectionMutation,
} from "../../../../controller/api/course/ApiCourse";

const DetailPage = () => {
  const { id, name } = useParams();
  const { data: course, isLoading, error } = useGetCourseByIdQuery(id);
  const [addSection] = useAddSectionMutation();

  // State for section form
  const [newSection, setNewSection] = useState({ title: "", description: "" });

  const handleAddSection = async (e) => {
    e.preventDefault();
    try {
      await addSection({
        course_id: id,
        title: newSection.title,
        description: newSection.description,
        position: course?.sections?.length || 0,
      });
      setNewSection({ title: "", description: "" });

      const closeModal = document.querySelector("[data-bs-dismiss='modal']");
      closeModal.click();
    } catch (error) {
      console.error("Failed to add section:", error);
    }
  };

  if (isLoading) {
    return (
      <Layout title={`Course - ${name.replace(/-/g, " ")}`}>
        <div className='d-flex justify-content-center align-items-center min-vh-100'>
          <div className='spinner-border text-primary' role='status'>
            <span className='visually-hidden'>Loading...</span>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title={`Course - ${name.replace(/-/g, " ")}`}>
      <div className='container-fluid'>
        <div className='text-end mb-3'>
          <button
            className='btn btn-outline-primary btn-sm '
            data-bs-toggle='modal'
            data-bs-target='#addSectionModal'
          >
            <i className='bi bi-plus-lg me-2'></i>
            Add Section
          </button>
        </div>

        {/* Sections List */}
        <div className='row g-4'>
          {course?.sections?.length > 0 ? (
            course?.sections?.map((section, index) => (
              <div key={section.id} className='col-12'>
                <div className='card shadow-sm mb-4'>
                  <Section section={section} index={index} />
                </div>
              </div>
            ))
          ) : (
            <div className='col-12'>
              <div
                className='alert alert-warning d-flex align-items-center'
                role='alert'
              >
                <i className='bi bi-exclamation-triangle-fill me-2'></i>
                <div>
                  No sections found. Start by adding your first section!
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Add Section Modal */}
        <div
          className='modal fade'
          id='addSectionModal'
          tabIndex='-1'
          data-bs-backdrop='static'
          data-bs-keyboard='false'
          aria-labelledby='addSectionModalLabel'
          aria-hidden='true'
        >
          <div className='modal-dialog modal-dialog-centered'>
            <div className='modal-content'>
              <div className='modal-header border-bottom-0'>
                <h5 className='modal-title' id='addSectionModalLabel'>
                  Add New Section
                </h5>
                <button
                  type='button'
                  className='btn-close'
                  data-bs-dismiss='modal'
                  aria-label='Close'
                ></button>
              </div>
              <div className='modal-body'>
                <form onSubmit={handleAddSection}>
                  <div className='mb-3'>
                    <label className='form-label'>Section Title</label>
                    <input
                      type='text'
                      className='form-control form-control-lg'
                      placeholder='Enter section title'
                      value={newSection.title}
                      onChange={(e) =>
                        setNewSection({
                          ...newSection,
                          title: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <div className='mb-4'>
                    <label className='form-label'>Section Description</label>
                    <textarea
                      className='form-control'
                      placeholder='Enter section description'
                      value={newSection.description}
                      onChange={(e) =>
                        setNewSection({
                          ...newSection,
                          description: e.target.value,
                        })
                      }
                      rows={4}
                      required
                    />
                  </div>
                  <button type='submit' className='btn btn-primary w-100 py-2'>
                    Add Section
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DetailPage;
