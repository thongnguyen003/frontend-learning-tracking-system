import React,{useState} from "react";
import JournalMessage from "../../message/JournalMessage";
import "../../../../../../src/assets/css/globalStyle.css"
const GoalBox = ({data}) => {
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
              <JournalMessage type="goal" id={data.id} />
          )}
    </div>
  );
};

export default GoalBox;
const Detail = ({data})=>{
  return(
    <div>
      <label className="form-label text-muted" htmlFor="topic">
            Title
        </label>
        <textarea
            id="topic"
            rows="2"
            className="form-control"
            value={data.title}
        ></textarea>
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
}