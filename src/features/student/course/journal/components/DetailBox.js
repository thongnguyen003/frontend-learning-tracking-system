// import React,{useState} from "react";
// import JournalMessage from "../../message/JournalMessage";
// import "../../../../../../src/assets/css/globalStyle.css"
// const DetailBox = ({data}) => {
//   const [choosePart,setChoose]=useState(true);
//   return (
//     <div className="bg-white rounded shadow-sm p-3" style={{ width: "420px"}} >
//         <div className="d-flex border-bottom mb-3">
//             <button onClick={() => setChoose(true)}  className={`flex1 btn btn-light ${choosePart ? "globalActive" : ""}`}> Detail </button>
//             <button onClick={() => setChoose(false)} className={`flex1 btn btn-light ${!choosePart ? "globalActive" : ""}`}> Contact</button>
//         </div>
//           {choosePart ? (
//               <Detail data={data} />
//           ) : (
//               <JournalMessage type="self" id={data.id} />
//           )}
//     </div>
//   );
// };

// export default DetailBox;
// const Detail = ({data})=>{
//   return(
//     <div>
//         <label className="form-label text-muted" htmlFor="date">
//         Date
//       </label>
//       <input
//         id="date"
//         type="text"
//         value={data.date}
//         className="form-control"
//       />

//       <label className="form-label text-muted" htmlFor="topic">
//         Topic
//       </label>
//       <textarea
//         id="topic"
//         rows="2"
//         className="form-control"
//         value={data.topic || ""}
//       >
//       </textarea>

//       <label className="form-label text-muted" htmlFor="description">
//         Description
//       </label>
//       <textarea
//         id="description"
//         rows="3"
//         className="form-control"
//         value={data.description || ""}
//       >
//       </textarea>

//       <label className="form-label text-muted" htmlFor="duration">
//         Duration
//       </label>
//       <input
//         id="duration"
//         type="text"
//         value={data.duration}
//         className="form-control"
//       />

//       <label className="form-label text-muted" htmlFor="duration2">
//         URL
//       </label>
//       <input
//         id="duration2"
//         type="text"
//         value={data.resources}
//         className="form-control"
//       />

//       <label className="form-label text-muted" htmlFor="activity">
//         Activity
//       </label>
//       <textarea
//         id="activity"
//         rows="2"
//         className="form-control"
//         value={data.activity || ""}
//       >
//       </textarea>

//       <label className="form-label text-muted" htmlFor="concentration">
//         Concentration
//       </label>
//       <select id="concentration" className="form-select">
//         <option>true</option>
//         <option>false</option>
//       </select>

//       <label className="form-label text-muted" htmlFor="follow_plan">
//         Follow Plan
//       </label>
//       <select id="follow_plan" className="form-select">
//         <option>true</option>
//         <option>false</option>
//       </select>

//       <label className="form-label text-muted" htmlFor="evaluation">
//         Evaluation
//       </label>
//       <textarea
//         id="evaluation"
//         rows="2"
//         className="form-control"
//         value={data.evaluation || ""}
//       >
//       </textarea>

//       <label className="form-label text-muted" htmlFor="reinforcing_learning">
//         Reinforcing Learning
//       </label>
//       <textarea
//         id="reinforcing_learning"
//         rows="2"
//         className="form-control"
//         value={data.reinforcing_learning || ""}
//       >
//       </textarea>

//       <label className="form-label text-muted" htmlFor="notes">
//         Notes
//       </label>
//       <textarea
//         id="notes"
//         rows="3"
//         className="form-control"
//         value={data.notes || ""}
//       >
//       </textarea>

//       <div className="d-flex gap-2 mt-3">
//         <button
//           type="button"
//           className="btn btn-success"
//         >
//           <i className="fas fa-pen"></i> Edit
//         </button>
//         <button
//           type="button"
//           className="btn btn-warning"
//         >
//           <i className="fas fa-trash-alt"></i> Delete
//         </button>
//       </div>
//     </div>
//   );
// }

import React, { useState } from "react";
import axios from "axios";
import JournalMessage from "../../message/JournalMessage";
import "../../../../../../src/assets/css/globalStyle.css";

const DetailBox = ({ data, onDeleted }) => {
  const [choosePart, setChoose] = useState(true);

  return (
    <div className="bg-white rounded shadow-sm p-3" style={{ width: "420px" }}>
      <div className="d-flex border-bottom mb-3">
        <button
          onClick={() => setChoose(true)}
          className={`flex1 btn btn-light ${choosePart ? "globalActive" : ""}`}
        >
          Detail
        </button>
        <button
          onClick={() => setChoose(false)}
          className={`flex1 btn btn-light ${!choosePart ? "globalActive" : ""}`}
        >
          Contact
        </button>
      </div>

      {choosePart ? (
        <Detail data={data} onDeleted={onDeleted} />
      ) : (
        <JournalMessage type="self" id={data.id} />
      )}
    </div>
  );
};

export default DetailBox;

const Detail = ({ data, onDeleted }) => {
  const [formData, setFormData] = useState({ ...data });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleEdit = async () => {
    try {
      await axios.put(`/api/journal/journal-classes/${data.id}`, formData);
      alert("Journal updated successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to update journal");
    }
  };

  const handleDelete = async () => {
    const confirm = window.confirm("Are you sure you want to delete this journal?");
    if (!confirm) return;

    try {
      await axios.delete(`/api/journal/journal-classes/${data.id}`);
      alert("Journal deleted successfully!");
      if (onDeleted) onDeleted();
    } catch (error) {
      console.error(error);
      alert("Failed to delete journal");
    }
  };

  return (
    <div>
      <FormGroup label="Date">
        <input
          id="date"
          type="text"
          className="form-control"
          value={formData.date || ""}
          onChange={handleChange}
        />
      </FormGroup>

      <FormGroup label="Topic">
        <textarea
          id="topic"
          rows="2"
          className="form-control"
          value={formData.topic || ""}
          onChange={handleChange}
        />
      </FormGroup>

      <FormGroup label="Description">
        <textarea
          id="description"
          rows="3"
          className="form-control"
          value={formData.description || ""}
          onChange={handleChange}
        />
      </FormGroup>

      <FormGroup label="Duration">
        <input
          id="duration"
          type="text"
          className="form-control"
          value={formData.duration || ""}
          onChange={handleChange}
        />
      </FormGroup>

      <FormGroup label="URL">
        <input
          id="resources"
          type="text"
          className="form-control"
          value={formData.resources || ""}
          onChange={handleChange}
        />
      </FormGroup>

      <FormGroup label="Activity">
        <textarea
          id="activity"
          rows="2"
          className="form-control"
          value={formData.activity || ""}
          onChange={handleChange}
        />
      </FormGroup>

      <FormGroup label="Concentration">
        <select
          id="concentration"
          className="form-select"
          value={formData.concentration || "true"}
          onChange={handleChange}
        >
          <option>true</option>
          <option>false</option>
        </select>
      </FormGroup>

      <FormGroup label="Follow Plan">
        <select
          id="follow_plan"
          className="form-select"
          value={formData.follow_plan || "true"}
          onChange={handleChange}
        >
          <option>true</option>
          <option>false</option>
        </select>
      </FormGroup>

      <FormGroup label="Evaluation">
        <textarea
          id="evaluation"
          rows="2"
          className="form-control"
          value={formData.evaluation || ""}
          onChange={handleChange}
        />
      </FormGroup>

      <FormGroup label="Reinforcing Learning">
        <textarea
          id="reinforcing_learning"
          rows="2"
          className="form-control"
          value={formData.reinforcing_learning || ""}
          onChange={handleChange}
        />
      </FormGroup>

      <FormGroup label="Notes">
        <textarea
          id="notes"
          rows="3"
          className="form-control"
          value={formData.notes || ""}
          onChange={handleChange}
        />
      </FormGroup>

      <div className="d-flex gap-2 mt-3">
        <button type="button" className="btn btn-success" onClick={handleEdit}>
          <i className="fas fa-pen"></i> Edit
        </button>
        <button type="button" className="btn btn-warning" onClick={handleDelete}>
          <i className="fas fa-trash-alt"></i> Delete
        </button>
      </div>
    </div>
  );
};

const FormGroup = ({ label, children }) => (
  <div className="mb-2">
    <label className="form-label text-muted">{label}</label>
    {children}
  </div>
);
