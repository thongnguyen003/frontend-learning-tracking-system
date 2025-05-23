import React, { useState } from "react";
function CreateSelfForm({changeOposite, setShowAddModal ,journalId }) {
  const [formData, setFormData] = useState({
    date:"",
    topic:"",
    description:"",
    duration: "",
    resources: "",
    activity:"",
    concentration: "",
    follow_plan: "",
    evaluation: "",
    reinforcing_learning: "",
    notes: "",
    journal_id: journalId,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
     e.preventDefault();
    try {
      const res = await fetch("http://127.0.0.1:8000/api/journal/journal-selfs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok){
          setShowAddModal(false)
          console.log(res.data)
      changeOposite()
      }else{
        throw new Error("Failed to create In Class entry");

      }
      console.log("ppppppppppppppp")
    
    } catch (error) {
      console.log("ssssssssssssssssssssssssssss")
      alert(error.message);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="form-box bg-white p-3 rounded shadow-sm" style={{ width: "420px" }}>
      <h5 className="mb-3">Add Self Reflection Entry</h5>
      <input
        className="form-control mb-2"
        type="datetime-local"
        name="date"
        placeholder="date"
        value={formData.date}
        onChange={handleChange}
      />
        <input
        className="form-control mb-2"
        name="topic"
        placeholder="topic"
        value={formData.topic}
        onChange={handleChange}
      />
        <input
        className="form-control mb-2"
        name="description"
        placeholder="description"
        value={formData.description}
        onChange={handleChange}
      />
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
        name="activity"
        placeholder="Activity"
        value={formData.activity}
        onChange={handleChange}
      />
      <input
        className="form-control mb-2"
        name="concentration"
        placeholder="Concentrationnnnnnnnn"
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
      <button type="submit" className="btn btn-primary me-2" onClick={handleSubmit}>Submit</button>
      <button className="btn btn-secondary" onClick={()=>{setShowAddModal(false)}}>Cancel</button>
    </form>
  );
}
export default CreateSelfForm;
