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
    console.log(formData)
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
    <form  onSubmit={handleSubmit} className="modal d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
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
              <input className="form-control mb-2" type="date" name="date" placeholder="date" value={formData.date} onChange={handleChange}/>
            </div>
            <div className="mb-3">
              <label className="form-label">Topic</label>
              <input className="form-control mb-2" name="topic" placeholder="topic" value={formData.topic} onChange={handleChange} />
            </div>
            <div className="mb-3">
              <label className="form-label">Description</label>
              <input className="form-control mb-2" name="description" placeholder="description" value={formData.description} onChange={handleChange} />
            </div>
            <div className="mb-3">
              <label className="form-label">Duration</label>
              <input className="form-control mb-2" name="duration" placeholder="Duration" value={formData.duration} onChange={handleChange} />
            </div>
            <div className="mb-3">
              <label className="form-label">Resources</label>
              <input className="form-control mb-2" name="resources" placeholder="Resources" value={formData.resources} onChange={handleChange}/>
            </div>
            <div className="mb-3">
              <label className="form-label">Activity</label>
              <input className="form-control mb-2" name="activity" placeholder="Activity" value={formData.activity} onChange={handleChange} />
            </div>
            <div className="mb-3">
              <label className="form-label">Concentration</label>
              <select className="form-control mb-2" name="concentration" placeholder="Concentration" value={formData.concentration} onChange={handleChange}  >
                <option value='0'>False</option>
                <option value='1'>True</option>
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">Follow Plan</label>
              <select className="form-control mb-2" name="follow_plan" placeholder="Follow Plan" value={formData.follow_plan} onChange={handleChange} >
                <option value='0'>False</option>
                <option value='1'>True</option>
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">Evaluation</label>
              <input className="form-control mb-2"name="evaluation" placeholder="Evaluation" value={formData.evaluation} onChange={handleChange} />
            </div>
            <div className="mb-3">
              <label className="form-label">Reinforcing Learning</label>
              <input className="form-control mb-2" name="reinforcing_learning" placeholder="Reinforcing Learning" value={formData.reinforcing_learning} onChange={handleChange} />
            </div>
            <div className="mb-3">
              <label className="form-label">Notes</label>
              <input className="form-control mb-2" name="notes" placeholder="Notes" value={formData.notes} onChange={handleChange} />
            </div>
          </div>
          {/* footer */}
          <div className="modal-footer">
            <button type="submit" className="btn btn-primary me-2" onClick={handleSubmit}>Submit</button>
            <button className="btn btn-secondary" onClick={()=>{setShowAddModal(false)}}>Cancel</button>
          </div>
        </div>
      </div>
    </form>
  );
}
export default CreateSelfForm;
