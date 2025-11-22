import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../services/api";

export default function UserQuizList() {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    API.get("/api/quizzes")
      .then((res) => setQuizzes(res.data))
      .catch((err) => {
        console.error("Failed to fetch quizzes:", err);
        setError("Failed to load quizzes. Please try again later.");
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <p className="p-10 text-gray-500 text-center">Loading quizzes...</p>;
  }

  if (error) {
    return <p className="p-10 text-red-600 text-center">{error}</p>;
  }

  if (quizzes.length === 0) {
    return (
      <p className="p-10 text-gray-500 text-center">No quizzes available.</p>
    );
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-gray-800 text-center">
        Available Quizzes
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {quizzes.map((quiz) => (
          <div
            key={quiz.id}
            className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition p-6 flex flex-col justify-between border border-gray-200"
          >
            <div>
              <h2 className="text-2xl font-semibold text-gray-900">
                {quiz.title}
              </h2>
              <p className="text-gray-600 mt-2">{quiz.description}</p>
              <p className="mt-3 text-sm text-gray-500">
                Questions: {quiz.questions.length}
              </p>
            </div>

            <div className="mt-6 flex gap-3">
              <button
                onClick={() => navigate(`/quiz/${quiz.id}`)}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl shadow transition"
              >
                Start Quiz
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
