import React from "react";

const GoalBox = ({data}) => {
  return (
    <div
      className="bg-white rounded shadow-sm p-3"
      style={{ width: "420px"}}
    >
        <label className="form-label text-muted" htmlFor="topic">
            Title
        </label>
        <textarea
            id="topic"
            rows="2"
            className="form-control"
        >{data.title}</textarea>
        <label className="form-label text-muted" htmlFor="concentration"> Assess </label>
        <select id="concentration" className="form-select">
            <option>Good</option>
            <option>Not good</option>
        </select>
        <label className="form-label text-muted" htmlFor="date"> Date </label>
        <input
        id="date"
        type="text"
        value={data.date}
        className="form-control"
        readOnly
        />
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
};

export default GoalBox;
