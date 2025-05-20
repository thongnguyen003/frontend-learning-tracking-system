import React, { useState } from "react";

function CreateClassForm({ onClose, onCreated, weekId }) {
  const [formData, setFormData] = useState({
    date: "",
    topic: "",
    description: "",
    assessement: "",
    difficult: "",
    plan: "",
    solution: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/api/journal/journal-classes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, week_id: weekId }),
      });
      if (!res.ok)
         throw new Error("Failed to create In Class entry");
      onCreated();
      onClose();
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="form-box bg-white p-3 rounded shadow-sm" style={{ width: "420px" }}>
      <h5 className="mb-3">Add In-Class Entry</h5>
      <input
        className="form-control mb-2"
        name="date"
        placeholder="Date"
        value={formData.date}
        onChange={handleChange}
      />
      <input
        className="form-control mb-2"
        name="topic"
        placeholder="Topic"
        value={formData.topic}
        onChange={handleChange}
      />
      <textarea
        className="form-control mb-2"
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
      />
      <input
        className="form-control mb-2"
        name="assessement"
        placeholder="Assessment"
        value={formData.assessement}
        onChange={handleChange}
      />
      <input
        className="form-control mb-2"
        name="difficult"
        placeholder="Difficult"
        value={formData.difficult}
        onChange={handleChange}
      />
      <input
        className="form-control mb-2"
        name="plan"
        placeholder="Plan"
        value={formData.plan}
        onChange={handleChange}
      />
      <input
        className="form-control mb-2"
        name="solution"
        placeholder="Solution"
        value={formData.solution}
        onChange={handleChange}
      />
      <button className="btn btn-primary me-2" onClick={handleSubmit}>Submit</button>
      <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
    </div>
  );
}

export default CreateClassForm;
