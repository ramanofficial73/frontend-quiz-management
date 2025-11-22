import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import API from "../../services/api";

export default function ViewQuestions() {
  const { quizId } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get(`/api/quizzes/${quizId}`)
      .then((res) => setQuiz(res.data))
      .catch((err) => {
        console.error(err);
        setQuiz(null);
      })
      .finally(() => setLoading(false));
  }, [quizId]);

  if (loading) return <div className="p-6 text-gray-500">Loading…</div>;
  if (!quiz)
    return <div className="p-6 text-red-500">Failed to load quiz.</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">{quiz.title}</h1>
            <p className="text-gray-500 mt-1">{quiz.description}</p>
          </div>
          <div className="flex gap-2">
            <Link
              to={`/admin/quizzes/${quizId}/questions`}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow transition"
            >
              + Add Question
            </Link>
            <Link
              to="/admin/quizzes"
              className="border border-gray-300 hover:bg-gray-100 px-4 py-2 rounded-lg transition"
            >
              Back
            </Link>
          </div>
        </div>

        {/* Questions List */}
        <div className="space-y-6">
          {quiz.questions.map((q, idx) => (
            <div
              key={q.id}
              className="bg-white shadow-lg rounded-2xl p-6 border border-gray-200"
            >
              {/* Question Header */}
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-sm text-gray-400">Q#{idx + 1}</div>
                  <div className="text-xl font-semibold text-gray-800 mt-1">
                    {q.text}
                  </div>
                </div>
              </div>

              {/* Options */}
              <div className="grid gap-3 sm:grid-cols-2">
                {q.options.map((o) => (
                  <div
                    key={o.id}
                    className={`p-3 border rounded-lg flex items-center justify-between transition
                      ${
                        o.isCorrect
                          ? "bg-green-50 border-green-400"
                          : "bg-gray-50"
                      }`}
                  >
                    <span className="text-gray-800">{o.text}</span>
                    {o.isCorrect && (
                      <span className="text-green-600 font-bold text-lg">
                        ✅
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
