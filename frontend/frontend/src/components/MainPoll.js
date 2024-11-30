import React, { useState } from "react";
import "./MainPoll.css";

const MainPoll = () => {
  const [pollQuestion, setPollQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]); // Start with 2 options

  const handleAddOption = () => {
    if (options.length < 4) {
      setOptions([...options, ""]); // Add a new empty option
    }
  };

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...options];
    updatedOptions[index] = value;
    setOptions(updatedOptions);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const pollData = {
      question: pollQuestion,
      options: options.filter((option) => option.trim() !== ""), // Exclude empty options
    };
    console.log("Poll Data Submitted:", pollData);
    // Integrate submission logic (e.g., API call) here
  };

  return (
    <div className="main-poll">
      <h2>Create a Poll</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Type your poll question"
          value={pollQuestion}
          onChange={(e) => setPollQuestion(e.target.value)}
        />
        {options.map((option, index) => (
          <input
            key={index}
            type="text"
            placeholder={`Option ${index + 1}`}
            value={option}
            onChange={(e) => handleOptionChange(index, e.target.value)}
          />
        ))}
        {options.length < 4 && (
          <button
            type="button"
            className="add-option-btn"
            onClick={handleAddOption}
          >
            Add Option
          </button>
        )}
        <button type="submit" className="publish-btn">
          Publish
        </button>
      </form>
    </div>
  );
};

export default MainPoll;
