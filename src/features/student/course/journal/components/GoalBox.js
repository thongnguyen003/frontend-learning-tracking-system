import React, { useState, useEffect } from "react";
import JournalMessage from "../../message/JournalMessage";
import "../../../../../../src/assets/css/globalStyle.css";

const GoalBox = ({ data, onDelete }) => {
  const [choosePart, setChoose] = useState(true);
  const [title, setTitle] = useState(data.title);
  const [state, setState] = useState(data.state);
  const [date] = useState(data.date); // Assuming date is read-only

  const handleEdit = async () => {
    const updatedGoal = {
      journal_id: data.journal_id, // Ensure this is included
      title,
      state,
      date,
    };

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/journal-goals/${data.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedGoal),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Goal updated:", result);
        // Optionally, you can trigger a re-fetch of goals or update the state
      } else {
        console.error("Error updating goal");
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/journal-goals/${data.id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        console.log("Goal deleted");
        onDelete(data.id); // Call the parent handler to update the UI
      } else {
        console.error("Error deleting goal");
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  return (
    <div className="bg-white rounded shadow-sm p-3" style={{ width: "420px" }}>
      <div className="d-flex border-bottom mb-3">
        <button onClick={() => setChoose(true)} className={`flex1 btn btn-light ${choosePart ? "globalActive" : ""}`}>
          Detail
        </button>
        <button onClick={() => setChoose(false)} className={`flex1 btn btn-light ${!choosePart ? "globalActive" : ""}`}>
          Contact
        </button>
      </div>
      {choosePart ? (
        <Detail
          title={title}
          setTitle={setTitle}
          state={state}
          setState={setState}
          date={date}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      ) : (
        <JournalMessage type="goal" id={data.id} />
      )}
    </div>
  );
};

const Detail = ({ title, setTitle, state, setState, date, onEdit, onDelete }) => {
  return (
    <div>
      <label className="form-label text-muted" htmlFor="topic">
        Title
      </label>
      <textarea
        id="topic"
        rows="2"
        className="form-control"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      ></textarea>
      <label className="form-label text-muted" htmlFor="concentration">
        Assess
      </label>
      <select id="concentration" className="form-select" value={state} onChange={(e) => setState(e.target.value)}>
        <option value={1}>Good</option>
        <option value={0}>Not good</option>
      </select>
      <label className="form-label text-muted" htmlFor="date">
        Date
      </label>
      <input
        id="date"
        type="text"
        value={date}
        className="form-control"
        readOnly
      />
      <div className="d-flex gap-2 mt-3">
        <button type="button" className="btn btn-success" onClick={onEdit}>
          <i className="fas fa-pen"></i> Edit
        </button>
        <button type="button" className="btn btn-warning" onClick={onDelete}>
          <i className="fas fa-trash-alt"></i> Delete
        </button>
      </div>
    </div>
  );
};

export default GoalBox;