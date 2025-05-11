import React from "react";

const ClassBox = ({data}) => {
  return (
    <div
      className="bg-white rounded shadow-sm p-3"
      style={{ width: "420px"}}
    >
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
      >
        {data.topic}
      </textarea>

      <label className="form-label text-muted" htmlFor="description">
        Description
      </label>
      <textarea
        id="description"
        rows="3"
        className="form-control"
      >
        {data.description}
      </textarea>
      <label className="form-label text-muted" htmlFor="concentration">
        Assessement
      </label>
      <select id="concentration" className="form-select">
        <option>1</option>
        <option>2</option>
        <option>3</option>
      </select>

      <label className="form-label text-muted" htmlFor="activity">
        Difficult
      </label>
      <textarea
        id="activity"
        rows="2"
        className="form-control"
      >
        {data.difficult}
      </textarea>
      <label className="form-label text-muted" htmlFor="activity">
        Flan
      </label>
      <textarea
        id="activity"
        rows="2"
        className="form-control"
      >
        {data.plan}
      </textarea>
      <label className="form-label text-muted" htmlFor="activity">
        Solution
      </label>
      <textarea
        id="activity"
        rows="2"
        className="form-control"
      >
        {data.solution}
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
};

export default ClassBox;
