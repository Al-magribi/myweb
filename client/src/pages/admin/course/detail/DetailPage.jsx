import React, { useState } from "react";
import Layout from "../../layout/Layout";
import { useParams } from "react-router-dom";
import Section from "./Section";
import {
  useGetCourseByIdQuery,
  useAddSectionMutation,
} from "../../../../controller/api/admin/ApiCourse";

const DetailPage = () => {
  const { id, name } = useParams();
  const { data: course, isLoading } = useGetCourseByIdQuery(id);
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
    } catch (error) {
      console.error("Failed to add section:", error);
    }
  };

  if (isLoading) {
    return (
      <Layout title={`Course - ${name.replace(/-/g, " ")}`}>
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title={`Course - ${name.replace(/-/g, " ")}`}>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-8">
            {/* Sections List */}
            <div className="accordion mb-4" id="sectionsAccordion">
              {course?.sections?.length > 0 ? (
                course?.sections?.map((section, index) => (
                  <Section key={section.id} section={section} index={index} />
                ))
              ) : (
                <p className="bg-danger bg-opacity-10 text-danger p-2 rounded">
                  <i className="bi bi-exclamation-circle me-2"></i>
                  No sections found
                </p>
              )}
            </div>
          </div>

          <div className="col-md-4">
            {/* Add Section Form */}
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Add New Section</h5>
                <form onSubmit={handleAddSection}>
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Section Title"
                      value={newSection.title}
                      onChange={(e) =>
                        setNewSection({ ...newSection, title: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <textarea
                      className="form-control"
                      placeholder="Section Description"
                      value={newSection.description}
                      onChange={(e) =>
                        setNewSection({
                          ...newSection,
                          description: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-primary w-100">
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
