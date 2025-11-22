import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../../services/api";

export default function QuizDetail() {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    API.get(`/api/quizzes/${quizId}`)
      .then((res) => setQuiz(res.data))
      .catch((err) => console.error("Failed to fetch quiz:", err));
  }, [quizId]);

  const handleOptionSelect = (questionId, optionId) => {
    setAnswers((prev) => ({ ...prev, [questionId]: optionId }));
  };

  const handleSubmit = () => {
    if (!quiz) return;
    // Calculate score based on isCorrect
    let calculatedScore = 0;
    quiz.questions.forEach((q) => {
      const selectedOptionId = answers[q.id];
      const selectedOption = q.options.find((o) => o.id === selectedOptionId);
      if (selectedOption && selectedOption.isCorrect) calculatedScore += 1;
    });
    setScore(calculatedScore);
    setShowResult(true);
  };

  if (!quiz) return <p className="p-6">Loading quiz...</p>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <button
        onClick={() => navigate("/")}
        className="mb-4 text-blue-500 hover:underline"
      >
        &larr; Back to quizzes
      </button>

      <h1 className="text-3xl font-bold mb-6">{quiz.title}</h1>

      <div className="space-y-6">
        {quiz.questions.map((question) => (
          <div key={question.id} className="bg-white p-4 rounded-xl shadow">
            <p className="font-medium">{question.text}</p>
            <div className="mt-2 space-y-2">
              {question.options.map((option) => {
                const isSelected = answers[question.id] === option.id;
                let bgClass = "";
                if (showResult) {
                  if (option.isCorrect) bgClass = "bg-green-100";
                  else if (isSelected && !option.isCorrect)
                    bgClass = "bg-red-100";
                }

                return (
                  <label
                    key={option.id}
                    className={`flex items-center space-x-2 cursor-pointer p-2 rounded ${bgClass}`}
                  >
                    <input
                      type="radio"
                      name={`question-${question.id}`}
                      value={option.id}
                      checked={isSelected}
                      onChange={() =>
                        handleOptionSelect(question.id, option.id)
                      }
                      className="accent-blue-500"
                      disabled={showResult} // Disable after submit
                    />
                    <span>{option.text}</span>
                  </label>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {!showResult && (
        <button
          onClick={handleSubmit}
          className="mt-6 bg-blue-500 text-white px-6 py-2 rounded-xl hover:bg-blue-600 transition"
        >
          Submit
        </button>
      )}

      {showResult && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl shadow-lg max-w-lg w-full">
            <h2 className="text-2xl font-bold mb-4">Your Result</h2>
            <p className="mb-4">
              You scored {score} / {quiz.questions.length}
            </p>
            <button
              onClick={() => navigate("/")}
              className="bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600 transition"
            >
              Back to Quizzes
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
