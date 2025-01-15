import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "antd";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MultipleChoiceMode = () => {
  const [vocabularies, setVocabularies] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    fetchRandomVocabularies();
  }, []);

  useEffect(() => {
    if (vocabularies.length > 0) {
      generateOptions();
    }
  }, [currentIndex, vocabularies]);

  const fetchRandomVocabularies = async () => {
    try {
      const response = await axios.post(
        "https://english-elevate-server.vercel.app/api/vocabulary/get-random",
        { count: 20 }
      );
      setVocabularies(response.data.data || []);
    } catch (error) {
      toast.error("Error fetching vocabularies!");
    }
  };

  const generateOptions = () => {
    const currentWord = vocabularies[currentIndex]?.englishWord;
    const otherOptions = vocabularies
      .filter((_, idx) => idx !== currentIndex)
      .slice(0, 3)
      .map((item) => item.englishWord);

    const combinedOptions = [currentWord, ...otherOptions].sort(
      () => Math.random() - 0.5
    );

    // Gán cố định thứ tự (A, B, C, D) theo mảng tĩnh
    setOptions(
      combinedOptions.map((option, idx) => ({
        label: ["A", "B", "C", "D"][idx],
        value: option,
      }))
    );
  };

  const handleSelectOption = (option) => {
    if (!showAnswer) {
      setSelectedOption(option);
    }
  };

  const handleSubmit = () => {
    const correctAnswer = vocabularies[currentIndex]?.englishWord.toLowerCase();
    if (selectedOption === correctAnswer) {
      toast.success("Correct!");
      setScore((prev) => prev + 1);
    } else {
      toast.error(`Incorrect! The correct answer is "${correctAnswer}".`);
    }
    setShowAnswer(true);
  };

  const handleNext = () => {
    if (currentIndex < vocabularies.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedOption(null);
      setShowAnswer(false);
    } else {
      toast.info("You have completed all questions!");
    }
  };

  if (!vocabularies.length) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p>Loading questions...</p>
      </div>
    );
  }

  const currentQuestion = vocabularies[currentIndex];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-xl bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-center mb-4">
          Multiple Choice Quiz
        </h1>
        <p className="text-lg text-center mb-6">
          What does this mean?{" "}
          <span className="font-semibold text-blue-500">
            {currentQuestion.vietnameseMeaning}
          </span>
        </p>
        <div className="grid grid-cols-2 gap-4 mb-6">
          {options.map((option, index) => (
            <div
              key={index}
              onClick={() => handleSelectOption(option.value)}
              className={`cursor-pointer p-4 border-2 rounded-lg text-center text-lg font-semibold ${
                showAnswer
                  ? option.value === currentQuestion.englishWord
                    ? "bg-green-200 border-green-500"
                    : selectedOption === option.value
                    ? "bg-red-200 border-red-500"
                    : "bg-white border-gray-300"
                  : selectedOption === option.value
                  ? "bg-blue-200 border-blue-500"
                  : "bg-white border-gray-300 hover:bg-gray-100"
              }`}
            >
              <span className="text-gray-600">{option.label}</span>:{" "}
              {option.value}
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-4">
          <Button
            onClick={handleSubmit}
            disabled={showAnswer || selectedOption === null}
            type="primary"
            className="px-6 py-2"
          >
            Submit
          </Button>
          <Button
            onClick={handleNext}
            disabled={!showAnswer}
            className="px-6 py-2"
          >
            Next
          </Button>
        </div>
        <div className="mt-6 text-center">
          <p className="text-lg">Score: {score}</p>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default MultipleChoiceMode;
