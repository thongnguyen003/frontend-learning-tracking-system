import React, { useState } from "react";

function CreateSelfForm({ onClose, onCreated, weekId, journalId }) {
  const [formData, setFormData] = useState({
    duration: "",
    resources: "",
    concentration: "",
    follow_plan: "",
    evaluation: "",
    reinforcing_learning: "",
    notes: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/api/journal/journal-selfs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, week_id: weekId,journal_id: journalId,  }),
      });
      if (!res.ok) throw new Error("Failed to create Self Reflection entry");
      onCreated();
      onClose();
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="form-box bg-white p-3 rounded shadow-sm" style={{ width: "420px" }}>
      <h5 className="mb-3">Add Self Reflection Entry</h5>
      <input
        className="form-control mb-2"
        name="duration"
        placeholder="Duration"
        value={formData.duration}
        onChange={handleChange}
      />
      <input
        className="form-control mb-2"
        name="resources"
        placeholder="Resources"
        value={formData.resources}
        onChange={handleChange}
      />
      <input
        className="form-control mb-2"
        name="concentration"
        placeholder="Concentration"
        value={formData.concentration}
        onChange={handleChange}
      />
      <input
        className="form-control mb-2"
        name="follow_plan"
        placeholder="Follow Plan"
        value={formData.follow_plan}
        onChange={handleChange}
      />
      <input
        className="form-control mb-2"
        name="evaluation"
        placeholder="Evaluation"
        value={formData.evaluation}
        onChange={handleChange}
      />
      <input
        className="form-control mb-2"
        name="reinforcing_learning"
        placeholder="Reinforcing Learning"
        value={formData.reinforcing_learning}
        onChange={handleChange}
      />
      <input
        className="form-control mb-2"
        name="notes"
        placeholder="Notes"
        value={formData.notes}
        onChange={handleChange}
      />
      <button className="btn btn-primary me-2" onClick={handleSubmit}>Submit</button>
      <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
    </div>
  );
}

export default CreateSelfForm;
