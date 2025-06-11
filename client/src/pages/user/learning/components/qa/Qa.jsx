import React, { useState, useEffect } from "react";
import {
  useGetQuestionsQuery,
  useAddQuestionMutation,
  useDeleteQuestionMutation,
} from "../../../../../controller/api/course/ApiQa";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import QuestionFilters from "./components/QuestionFilters";
import QuestionList from "./components/QuestionList";
import QuestionForm from "./components/QuestionForm";

const Qa = ({ courseId, lectureId }) => {
  const { user } = useSelector((state) => state.auth);

  const [title, setTitle] = useState("");
  const [question, setQuestion] = useState("");
  const [selectedLecture, setSelectedLecture] = useState(lectureId || "");
  const [page, setPage] = useState(1);
  const [lectures, setLectures] = useState([]);
  const limit = 10;
  const [editingQuestionId, setEditingQuestionId] = useState(null);

  const { data: questionsData, isLoading } = useGetQuestionsQuery({
    courseId,
    lectureId: selectedLecture,
    page,
    limit,
  });

  const [addQuestion, { isLoading: isAdding }] = useAddQuestionMutation();
  const [deleteQuestion, { isLoading: isDeleting }] =
    useDeleteQuestionMutation();

  const handleSubmitQuestion = async () => {
    if (!question.trim()) return;

    if (!selectedLecture) {
      return toast.error("Please select a lecture");
    }

    try {
      await addQuestion({
        id: editingQuestionId,
        courseId,
        lectureId: selectedLecture,
        title,
        question,
      }).unwrap();

      setQuestion("");
      setTitle("");
      setEditingQuestionId(null);
      toast.success(
        editingQuestionId
          ? "Question updated successfully"
          : "Question added successfully"
      );
    } catch (error) {
      console.error("Failed to add question:", error);
      toast.error("Failed to save question");
    }
  };

  const handleEditQuestion = (questionData) => {
    setQuestion(questionData.question);
    setTitle(questionData.title);
    setEditingQuestionId(questionData.id);
  };

  const handleDeleteQuestion = async (id) => {
    try {
      await deleteQuestion(id).unwrap();
      toast.success("Question deleted successfully");
    } catch (error) {
      console.error("Failed to delete question:", error);
      toast.error("Failed to delete question");
    }
  };

  // Fetch lectures for the course
  useEffect(() => {
    const fetchLectures = async () => {
      try {
        const response = await fetch(
          `/api/courses/lectures?courseId=${courseId}`
        );
        const data = await response.json();
        setLectures(data.lectures || []);
      } catch (error) {
        console.error("Error fetching lectures:", error);
      }
    };

    if (courseId) {
      fetchLectures();
    }
  }, [courseId]);

  return (
    <div className="p-4">
      <QuestionForm
        title={title}
        question={question}
        onTitleChange={setTitle}
        onQuestionChange={setQuestion}
        onSubmit={handleSubmitQuestion}
        isSubmitting={isAdding}
        isEditing={!!editingQuestionId}
      />

      <div className="my-3">
        <input
          className="form-control"
          placeholder="Search all course questions"
        />
      </div>

      <QuestionFilters
        lectures={lectures}
        selectedLecture={selectedLecture}
        onLectureChange={setSelectedLecture}
      />

      <QuestionList
        questions={questionsData?.questions || []}
        isLoading={isLoading || isDeleting}
        currentUserId={user.id}
        onEdit={handleEditQuestion}
        onDelete={handleDeleteQuestion}
        page={page}
        onPageChange={setPage}
      />
    </div>
  );
};

export default Qa;
