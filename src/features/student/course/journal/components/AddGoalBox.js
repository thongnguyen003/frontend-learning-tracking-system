import React, { useState } from "react";

const AddGoalModal = ({ journalId, setShowAddModal, changeOposite }) => {
  const [title, setTitle] = useState("");
  const [state, setState] = useState(1); // Default to "Good"

  const handleSubmit = async () => {
    const newGoal = {
      journal_id: journalId,
      title,
      state,
      date: new Date().toISOString().slice(0, 10), // YYYY-MM-DD
    };

    try {
      const response = await fetch("http://127.0.0.1:8000/api/journal-goals", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newGoal),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Goal added:", result);
        setShowAddModal(false);
        changeOposite();
      } else {
        console.error("Error adding goal");
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  return (
    <div
      className="modal d-block"
      tabIndex="-1"
      role="dialog"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content p-3">
          <div className="modal-header">
            <h5 className="modal-title">Add New Goal</h5>
            <button
              type="button"
              className="btn-close"
              onClick={()=>setShowAddModal(false)}
            ></button>
          </div>
          <div className="modal-body">
            <div className="mb-3">
              <label className="form-label">Title</label>
              <textarea
                className="form-control"
                rows="2"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              ></textarea>
            </div>
            <div className="mb-3">
              <label className="form-label">Assess</label>
              <select
                className="form-select"
                value={state}
                onChange={(e) => setState(Number(e.target.value))}
              >
                <option value={1}>Good</option>
                <option value={0}>Not good</option>
              </select>
            </div>
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={()=>setShowAddModal(false)}>
              Cancel
            </button>
            <button className="btn btn-primary" onClick={handleSubmit}>
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddGoalModal;
