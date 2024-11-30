import React from "react";
import "./MainForm.css";

const MainForm = () => {
  return (
    <div className="main-form">
      <h2>New Question</h2>
      <form>
        <select>
          <option>Choose categories</option>
          {/* Add options here */}
        </select>
        <input type="text" placeholder="Type catching attention title" />
        <textarea placeholder="Type your question"></textarea>
        <div className="form-buttons">
          <button>Add Image</button>
          <button>Publish</button>
        </div>
      </form>
    </div>
  );
};

export default MainForm;