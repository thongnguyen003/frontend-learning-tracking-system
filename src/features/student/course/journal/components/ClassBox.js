// import React,{useState} from "react";
// import JournalMessage from "../../message/JournalMessage";
// import "../../../../../../src/assets/css/globalStyle.css"
// const ClassBox = ({data}) => {
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
//               <JournalMessage type="class" id={data.id} />
//           )}
//     </div>
//   );
// };

// export default ClassBox;
// const Detail = ({data})=>{
//   return(
//     <div>
//       <label className="form-label text-muted" htmlFor="date">
//         Date
//       </label>
//         <input id="date" type="text" value={data.date} className="form-control"/>
//       <label className="form-label text-muted" htmlFor="topic">Topic</label>
//       <textarea id="topic" rows="2" className="form-control" value={data.topic || ""}></textarea> 
//       <label className="form-label text-muted" htmlFor="description">
//         Description
//       </label>
//       <textarea id="description" rows="3" className="form-control" value={data.description || ""} ></textarea>
//       <label className="form-label text-muted" htmlFor="concentration">
//         Assessement
//       </label>
//       <select id="concentration" className="form-select">
//         <option>1</option>
//         <option>2</option>
//         <option>3</option>
//       </select>
//       <label className="form-label text-muted" htmlFor="activity"> Difficult </label>
//       <textarea id="activity" rows="2" className="form-control" value={data.difficult || ""}></textarea>
//       <label className="form-label text-muted" htmlFor="activity">Flan</label>
//       <textarea id="activity" rows="2" className="form-control" value={data.plan || ""} >
//       </textarea>
//       <label className="form-label text-muted" htmlFor="activity"> Solution </label>
//       <textarea id="activity" rows="2" className="form-control" value={data.solution || ""} ></textarea>

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

const ClassBox = ({ data, onDeleted }) => {
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
        <JournalMessage type="class" id={data.id} />
      )}
    </div>
  );
};

export default ClassBox;

const Detail = ({ data, onDeleted }) => {
  const [formData, setFormData] = useState({ ...data });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleEdit = async () => {
    try {
      await axios.put(`/api/journals/${data.id}`, formData);
      alert("Journal updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to update journal");
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this journal?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`/api/journals/${data.id}`);
      alert("Journal deleted successfully!");
      if (onDeleted) onDeleted();
    } catch (err) {
      console.error(err);
      alert("Failed to delete journal");
    }
  };

  return (
    <div>
      <label className="form-label text-muted" htmlFor="date">
        Date
      </label>
      <input
        id="date"
        type="text"
        className="form-control"
        value={formData.date || ""}
        onChange={handleChange}
      />

      <label className="form-label text-muted" htmlFor="topic">Topic</label>
      <textarea
        id="topic"
        rows="2"
        className="form-control"
        value={formData.topic || ""}
        onChange={handleChange}
      ></textarea>

      <label className="form-label text-muted" htmlFor="description">Description</label>
      <textarea
        id="description"
        rows="3"
        className="form-control"
        value={formData.description || ""}
        onChange={handleChange}
      ></textarea>

      <label className="form-label text-muted" htmlFor="assessment">Assessment</label>
      <select
        id="assessment"
        className="form-select"
        value={formData.assessment || "1"}
        onChange={handleChange}
      >
        <option>1</option>
        <option>2</option>
        <option>3</option>
      </select>

      <label className="form-label text-muted" htmlFor="difficult">Difficult</label>
      <textarea
        id="difficult"
        rows="2"
        className="form-control"
        value={formData.difficult || ""}
        onChange={handleChange}
      ></textarea>

      <label className="form-label text-muted" htmlFor="plan">Plan</label>
      <textarea
        id="plan"
        rows="2"
        className="form-control"
        value={formData.plan || ""}
        onChange={handleChange}
      ></textarea>

      <label className="form-label text-muted" htmlFor="solution">Solution</label>
      <textarea
        id="solution"
        rows="2"
        className="form-control"
        value={formData.solution || ""}
        onChange={handleChange}
      ></textarea>

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
