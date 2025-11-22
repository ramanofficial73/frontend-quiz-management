import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../services/api";

export default function CreateQuiz() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const submitQuiz = async () => {
    // Validation
    if (!title.trim()) {
      alert("Quiz title cannot be empty!");
      return;
    }
    if (!description.trim()) {
      alert("Quiz description cannot be empty!");
      return;
    }

    try {
      await API.post("/api/admin/quizzes", { title, description });
      alert("Quiz created!");
      navigate("/admin/quizzes");
    } catch (e) {
      console.error(e);
      alert("Error creating quiz");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-lg">
        <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">
          Create New Quiz
        </h1>

        <div className="space-y-5">
          <div className="flex flex-col">
            <label className="mb-2 font-medium text-gray-700">Quiz Title</label>
            <input
              className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
              placeholder="Enter quiz title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-2 font-medium text-gray-700">
              Description
            </label>
            <textarea
              className="border rounded-lg p-3 h-32 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
              placeholder="Enter quiz description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <button
            onClick={submitQuiz}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow-lg transition-all"
          >
            Save Quiz
          </button>
        </div>
      </div>
    </div>
  );
}
