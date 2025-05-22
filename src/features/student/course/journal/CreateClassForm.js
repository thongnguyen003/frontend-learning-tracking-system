import React, { useState } from "react";

function CreateClassForm({changeOposite, setShowAddModal ,journalId }) {
  const [formData, setFormData] = useState({
    date: "",
    topic: "",
    description: "",
    assessment: "",
    difficulty: "",
    plan: "",
    solution: "",
    journal_id: journalId,
  });
  const [showForm, setShowForm] = useState(false);
  const handleToggleForm =()=>{
    setShowForm(!showForm);
  }
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(formData)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://127.0.0.1:8000/api/journal/journal-classes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify( formData ),
      });

      if (res.ok){
          setShowAddModal(false)
      changeOposite()
       console.log("sssssssss33333333333333333333333333ssssssppppppppppppppppppp")
      }else{
        throw new Error("Failed to create In Class entry");

      }
      console.log("sssssssssssssssppppppppppppppppppp")
    
    } catch (error) {
      console.log("ssssssssssssssssssssssssssss")
      alert(error.message);
   
    }
  };

  return (
    <div className="goals-list-wrapper">
      <form onSubmit={handleSubmit} className="form-box bg-white p-3 rounded shadow-sm" style={{ width: "420px" }}>
      <h5 className="mb-3">Add In-Class Entry</h5>
      <input
      type="datetime-local"
        className="form-control mb-2"
        name="date"
        placeholder="Date"
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
      <textarea
        className="form-control mb-2"
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
      />
      <input
        className="form-control mb-2"
        name="assessment"
        placeholder="Assessment"
        value={formData.assessment}
        onChange={handleChange}
      />
      <input
        className="form-control mb-2"
        name="difficulty"
        placeholder="Difficulty"
        value={formData.difficulty}
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
      <button type="submit" className="btn btn-primary me-2">Submit</button>
      <button className="btn btn-secondary" onClick={()=>{setShowAddModal(false)}}>Cancel</button>
      </form>
    </div>
   
  );
}

export default CreateClassForm;
