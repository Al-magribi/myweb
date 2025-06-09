import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useGetCourseByIdQuery } from "../../../controller/api/course/ApiCourse";
import VideoPlayer from "./VideoPlayer";
import CourseTabs from "./CourseTabs";
import CourseContentSidebar from "./CourseContentSidebar";
import { getYoutubeId, formatDuration, formatPrice } from "./utils";

const TABS = [
  { key: "overview", label: "Overview" },
  { key: "qa", label: "Q&A" },
  { key: "notes", label: "Notes" },
  // Add more tabs if needed
];

const Learning = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useGetCourseByIdQuery(id);
  const [selectedLecture, setSelectedLecture] = useState(null);
  const [expandedSection, setExpandedSection] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");

  if (isLoading)
    return (
      <div className='d-flex justify-content-center align-items-center min-vh-100'>
        <div className='spinner-border text-primary' role='status'>
          <span className='visually-hidden'>Loading...</span>
        </div>
      </div>
    );

  if (error)
    return (
      <div className='alert alert-danger m-5 text-center' role='alert'>
        Error loading course content
      </div>
    );

  if (!data) return null;

  // Find the first lecture for initial video
  let firstLecture = null;
  for (const section of data.sections) {
    if (section.lectures && section.lectures.length > 0) {
      firstLecture = section.lectures[0];
      break;
    }
  }
  const currentLecture = selectedLecture || firstLecture;
  const currentVideoId = getYoutubeId(
    currentLecture?.video_url || data.video_preview
  );

  // Dummy tab content
  const renderTabContent = () => {
    if (activeTab === "overview") {
      return (
        <div className='p-4'>
          <h5 className='fw-bold mb-3'>{data.title}</h5>
          <div className='mb-2'>
            <span className='badge bg-secondary me-2'>{data.category}</span>
            <span className='badge bg-info'>{data.level}</span>
          </div>
          <div className='mb-2 text-muted'>
            <i className='bi bi-person-circle me-2'></i>
            {data.instructor}
          </div>
          <div className='mb-2 text-muted'>
            <i className='bi bi-clock me-2'></i>
            {formatDuration(data.duration)}
          </div>
          <div className='mb-2 text-muted'>
            <i className='bi bi-currency-dollar me-2'></i>
            {formatPrice(data.price)}
          </div>
          <div
            className='mt-3 text-muted'
            dangerouslySetInnerHTML={{ __html: data.description }}
          />
        </div>
      );
    }
    if (activeTab === "qa") {
      return (
        <div className='p-4'>
          <h5 className='fw-bold mb-3'>Q&amp;A</h5>
          <div className='mb-3'>
            <input
              className='form-control'
              placeholder='Search all course questions'
            />
          </div>
          <div className='d-flex flex-wrap gap-2 mb-3'>
            <select className='form-select w-auto'>
              <option>All lectures</option>
            </select>
            <select className='form-select w-auto'>
              <option>Sort by recommended</option>
            </select>
            <button className='btn btn-outline-primary'>
              Filter questions
            </button>
          </div>
          <div className='mt-4'>
            <div className='fw-bold mb-2'>All questions in this course (0)</div>
            <div className='text-muted'>No questions yet.</div>
          </div>
        </div>
      );
    }
    if (activeTab === "notes") {
      return (
        <div className='p-4'>
          <h5 className='fw-bold mb-3'>Notes</h5>
          <div className='text-muted'>No notes yet.</div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className='container-fluid p-0 bg-light'>
      <div className='row g-0'>
        {/* Left: Video Player & Tabs */}
        <div
          className='col-lg-8 p-0'
          style={{ minHeight: "100vh", background: "#fff" }}
        >
          {/* Video Player */}
          <VideoPlayer videoId={currentVideoId} />

          {/* Tabs */}
          <CourseTabs
            TABS={TABS}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            renderTabContent={renderTabContent}
          />
        </div>

        {/* Right: Course Content */}
        <div
          className='col-lg-4 bg-light p-0'
          style={{ minHeight: "100vh", position: "sticky", top: 0, zIndex: 2 }}
        >
          <CourseContentSidebar
            sections={data.sections}
            expandedSection={expandedSection}
            setExpandedSection={setExpandedSection}
            selectedLecture={selectedLecture}
            setSelectedLecture={setSelectedLecture}
            formatDuration={formatDuration}
          />
        </div>
      </div>
    </div>
  );
};

export default Learning;
