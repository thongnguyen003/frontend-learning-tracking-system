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
    <form onSubmit={handleSubmit} className="modal d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content p-3">
          {/* header */}
          <div className="modal-header">
            <h5 className="modal-title">Add New Class Journal</h5>
            <button type="button" className="btn-close" onClick={()=>setShowAddModal(false)} ></button>
          </div>
          {/* body */}
          <div className="modal-body">
            <div className="mb-3">
              <label className="form-label">Date</label>
              <input type="date" className="form-control mb-2" name="date" placeholder="Date" value={formData.date}onChange={handleChange}/>
            </div>
            <div className="mb-3">
              <label className="form-label">Topic</label>
              <input className="form-control mb-2" name="topic" placeholder="Topic" value={formData.topic} onChange={handleChange}/>
            </div>
            <div className="mb-3">
              <label className="form-label">Description</label>
               <textarea className="form-control mb-2" name="description" placeholder="Description" value={formData.description} onChange={handleChange}/>
            </div>
            <div className="mb-3">
              <label className="form-label">Assessment</label>
              <select className="form-select" name="assessment" value={formData.assessment} onChange={handleChange} >
                <option value='1'>1 No Problem!</option>
                <option value='2'>2 Litle difficulty</option>
                <option value='3'>3 Difficulty</option>
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">Difficulty</label>
              <input className="form-control mb-2" name="difficulty" placeholder="Difficulty" value={formData.difficulty} onChange={handleChange} />
            </div>
            <div className="mb-3">
              <label className="form-label">Plan</label>
              <input className="form-control mb-2" name="plan" placeholder="Plan" value={formData.plan} onChange={handleChange} />
            </div>
            <div className="mb-3">
              <label className="form-label">Solution</label>
              <input className="form-control mb-2" name="solution" placeholder="Solution" value={formData.solution} onChange={handleChange} />
            </div>
          </div>
          {/* footer */}
          <div className="modal-footer">
            <button type="submit" className="btn btn-primary me-2">Submit</button>
            <button className="btn btn-secondary" onClick={()=>{setShowAddModal(false)}}>Cancel</button>
          </div>
        </div>
      </div>
    </form>
   
  );
}

export default CreateClassForm;

