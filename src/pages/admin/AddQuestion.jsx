import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import API from "../../services/api";

export default function AddQuestions() {
  const { quizId } = useParams();
  const navigate = useNavigate();

  const [text, setText] = useState("");
  const [type] = useState("MCQ");
  const [options, setOptions] = useState([
    { text: "", correct: false },
    { text: "", correct: false },
  ]);

  const handleOptionChange = (index, key, value) => {
    const updated = [...options];
    updated[index][key] = value;
    setOptions(updated);
  };

  const addOption = () => {
    setOptions([...options, { text: "", correct: false }]);
  };

  const saveQuestion = async () => {
    if (!text.trim()) {
      alert("Question text cannot be empty!");
      return;
    }

    const filledOptions = options.filter((opt) => opt.text.trim() !== "");
    if (filledOptions.length < 2) {
      alert("Please provide at least 2 options.");
      return;
    }

    const hasCorrect = filledOptions.some((opt) => opt.correct);
    if (!hasCorrect) {
      alert("At least one option must be marked as correct.");
      return;
    }

    const payload = {
      text,
      type,
      position: 0,
      options: filledOptions,
    };

    try {
      await API.post(`/api/admin/quizzes/${quizId}/questions`, payload);
      alert("Question added successfully!");
      navigate("/admin/quizzes");
    } catch (error) {
      console.error(error);
      alert("Error adding question");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-lg">
        <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">
          Add Question to Quiz #{quizId}
        </h1>

        <div className="space-y-5">
          {/* Question text */}
          <div className="flex flex-col">
            <label className="mb-2 font-medium text-gray-700">
              Question Text
            </label>
            <input
              type="text"
              placeholder="Enter question text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
            />
          </div>

          {/* Options */}
          <div className="flex flex-col space-y-3">
            <label className="font-medium text-gray-700">Options</label>
            {options.map((opt, index) => (
              <div key={index} className="flex gap-3 items-center">
                <input
                  type="text"
                  placeholder={`Option ${index + 1}`}
                  value={opt.text}
                  onChange={(e) =>
                    handleOptionChange(index, "text", e.target.value)
                  }
                  className="border rounded-lg p-2 flex-1 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
                />
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={opt.correct}
                    onChange={(e) =>
                      handleOptionChange(index, "correct", e.target.checked)
                    }
                  />
                  Correct
                </label>
              </div>
            ))}

            <button
              onClick={addOption}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition w-1/2 self-start"
            >
              ➕ Add Option
            </button>
          </div>

          {/* Save button */}
          <button
            onClick={saveQuestion}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg shadow-lg transition-all"
          >
            💾 Save Question
          </button>

          {/* Back button */}
          <button
            onClick={() => navigate("/admin/quizzes")}
            className="w-full bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-3 rounded-lg shadow transition-all"
          >
            &larr; Back to Quizzes
          </button>
        </div>
      </div>
    </div>
  );
}
