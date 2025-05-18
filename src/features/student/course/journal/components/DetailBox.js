import React from "react";

const DetailBox = ({data}) => {
  return (
    <div className="bg-white rounded shadow-sm p-3" style={{ width: "420px"}}>
      <Detail data={data}></Detail>
    </div>
  );
};

export default DetailBox;
const Detail = ({data})=>{
  return(
    <div>
        <label className="form-label text-muted" htmlFor="date">
        Date
      </label>
      <input
        id="date"
        type="text"
        value={data.date}
        className="form-control"
      />

      <label className="form-label text-muted" htmlFor="topic">
        Topic
      </label>
      <textarea
        id="topic"
        rows="2"
        className="form-control"
        value={data.topic || ""}
      >
      </textarea>

      <label className="form-label text-muted" htmlFor="description">
        Description
      </label>
      <textarea
        id="description"
        rows="3"
        className="form-control"
        value={data.description || ""}
      >
      </textarea>

      <label className="form-label text-muted" htmlFor="duration">
        Duration
      </label>
      <input
        id="duration"
        type="text"
        value={data.duration}
        className="form-control"
      />

      <label className="form-label text-muted" htmlFor="duration2">
        URL
      </label>
      <input
        id="duration2"
        type="text"
        value={data.resources}
        className="form-control"
      />

      <label className="form-label text-muted" htmlFor="activity">
        Activity
      </label>
      <textarea
        id="activity"
        rows="2"
        className="form-control"
        value={data.activity || ""}
      >
      </textarea>

      <label className="form-label text-muted" htmlFor="concentration">
        Concentration
      </label>
      <select id="concentration" className="form-select">
        <option>true</option>
        <option>false</option>
      </select>

      <label className="form-label text-muted" htmlFor="follow_plan">
        Follow Plan
      </label>
      <select id="follow_plan" className="form-select">
        <option>true</option>
        <option>false</option>
      </select>

      <label className="form-label text-muted" htmlFor="evaluation">
        Evaluation
      </label>
      <textarea
        id="evaluation"
        rows="2"
        className="form-control"
        value={data.evaluation || ""}
      >
      </textarea>

      <label className="form-label text-muted" htmlFor="reinforcing_learning">
        Reinforcing Learning
      </label>
      <textarea
        id="reinforcing_learning"
        rows="2"
        className="form-control"
        value={data.reinforcing_learning || ""}
      >
      </textarea>

      <label className="form-label text-muted" htmlFor="notes">
        Notes
      </label>
      <textarea
        id="notes"
        rows="3"
        className="form-control"
        value={data.notes || ""}
      >
      </textarea>

      <div className="d-flex gap-2 mt-3">
        <button
          type="button"
          className="btn btn-success"
        >
          <i className="fas fa-pen"></i> Edit
        </button>
        <button
          type="button"
          className="btn btn-warning"
        >
          <i className="fas fa-trash-alt"></i> Delete
        </button>
      </div>
    </div>
  );
}
