import React,{useState} from "react";
import JournalMessage from "../../message/JournalMessage";
import "../../../../../../src/assets/css/globalStyle.css"
const ClassBox = ({data}) => {
  const [choosePart,setChoose]=useState(true);
  return (
    <div className="bg-white rounded shadow-sm p-3" style={{ width: "420px"}} >
        <div className="d-flex border-bottom mb-3">
            <button onClick={() => setChoose(true)}  className={`flex1 btn btn-light ${choosePart ? "globalActive" : ""}`}> Detail </button>
            <button onClick={() => setChoose(false)} className={`flex1 btn btn-light ${!choosePart ? "globalActive" : ""}`}> Contact</button>
        </div>
          {choosePart ? (
              <Detail data={data} />
          ) : (
              <JournalMessage type="class" id={data.id} />
          )}
    </div>
  );
};

export default ClassBox;
const Detail = ({data})=>{
  return(
    <div>
      <label className="form-label text-muted" htmlFor="date">
        Date
      </label>
        <input id="date" type="text" value={data.date} className="form-control"/>
      <label className="form-label text-muted" htmlFor="topic">Topic</label>
      <textarea id="topic" rows="2" className="form-control" value={data.topic || ""}></textarea> 
      <label className="form-label text-muted" htmlFor="description">
        Description
      </label>
      <textarea id="description" rows="3" className="form-control" value={data.description || ""} ></textarea>
      <label className="form-label text-muted" htmlFor="concentration">
        Assessement
      </label>
      <select id="concentration" className="form-select">
        <option>1</option>
        <option>2</option>
        <option>3</option>
      </select>
      <label className="form-label text-muted" htmlFor="activity"> Difficult </label>
      <textarea id="activity" rows="2" className="form-control" value={data.difficult || ""}></textarea>
      <label className="form-label text-muted" htmlFor="activity">Flan</label>
      <textarea id="activity" rows="2" className="form-control" value={data.plan || ""} >
      </textarea>
      <label className="form-label text-muted" htmlFor="activity"> Solution </label>
      <textarea id="activity" rows="2" className="form-control" value={data.solution || ""} ></textarea>

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
