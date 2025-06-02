import React,{useState} from "react";
import { useParams } from "react-router-dom";
import JournalMessage from "../../message/JournalMessage";
import "../../../../../../src/assets/css/globalStyle.css"
import { useApi } from "../../../../../hooks/useApi";
const ClassBox = ({data,changeOposite,setDetail}) => {
  const [classes, setClasses] = useState([]);
  const [choosePart,setChoose]=useState(true);
  const [editClasses, setEditClasses] = useState();
  const [errorMessage, setErrorMessage] = useState('');
  const { apiCall, loading } = useApi();
  let { id } = useParams();

    const startEditClasses = (classes) => {
    setEditClasses(classes);
    setErrorMessage('');
  };

  const cancelEdit = () => {
    setEditClasses(null);
    setErrorMessage('');
  };

  const saveEditClasses = async () => {
    if (!editClasses || !editClasses.topic?.trim()) return;
    try {
      setErrorMessage('');
      const updatedClass = await apiCall(`/journal/journal-classes/${editClasses.id}`, 'PUT', {
        topic: editClasses.topic,
        description: editClasses.description,
        difficulty: editClasses.difficulty,
        plan: editClasses.plan,
        solution: editClasses.solution,
        assessment: editClasses.assessment,
        journal_id : editClasses.journal_id,
        date: editClasses.date || new Date().toISOString().split('T')[0]

      });
      setClasses(prevClass => prevClass.map(cls => (cls.id === updatedClass.id ? updatedClass : cls)));
      setEditClasses(null);
      changeOposite()
    } catch {
      setErrorMessage('Error saving goal changes. Please try again.');
    }
  };

  const handleDeleteClass = async () => {
  if (!window.confirm("Are you sure you want to delete this class?")) return;

  try {
    await apiCall(`/journal/journal-classes/${data.id}`, 'DELETE');
    // Sau khi xoá, bạn có thể redirect hoặc reload lại danh sách nếu ở view lớn hơn
    alert("Class deleted successfully.");
    changeOposite()
  } catch (error) {
    alert("Failed to delete class.");
  }
};

  const handleEditChange = (field, value) => {
  if (!editClasses) return;
  setEditClasses({ ...editClasses, [field]: value });
  console.log(editClasses)
};

  return (
    <div className="bg-white rounded shadow-sm p-3" style={{ width: "420px"}} >
        <div className="d-flex border-bottom mb-3 justify-content-between">
            <div>
              <button onClick={() => setChoose(true)} className={`flex1 btn btn-light ${choosePart ? "globalActive" : ""}`}>
                Detail
              </button>
              <button onClick={() => setChoose(false)} className={`flex1 btn btn-light ${!choosePart ? "globalActive" : ""}`}>
                Contact
              </button>
            </div>
            <div>
              <button onClick={() => setDetail([])} className={`flex1 btn btn-danger `}>
                close
              </button>
            </div>
        </div>
          {choosePart ? (
              <Detail data={data}
              classes={classes}
              editClasses={editClasses}
              onEditStart={startEditClasses}
              onEditCancel={cancelEdit}
              onEditSave={saveEditClasses}
               onDelete={handleDeleteClass}
              onEditChange={handleEditChange} />
          ) : (
              <JournalMessage type="class" id={data.id} />
          )}
    </div>
  );
};

export default ClassBox;
let currentUser= JSON.parse(sessionStorage.getItem('current_user'));
const currentRole = currentUser && currentUser.role;
const Detail = ({
  data,
  editClasses,
  onEditStart,
  onEditCancel,
  onEditSave,
  onEditChange,
  onDelete
}) => {
  const currentData = editClasses || data;

  return(
    <div>
      <label className="form-label text-muted" htmlFor="date" type="datetime-local">
        Date
      </label>
        <input id="date" type="date" value={currentData.date || ""} className="form-control"/>
      <label className="form-label text-muted" htmlFor="topic">Topic</label>
      <textarea id="topic" rows="2" className="form-control" 
      value={currentData.topic || ""}
      onChange={e => onEditChange("topic", e.target.value)}
      readOnly={!editClasses} ></textarea> 
      <label className="form-label text-muted" htmlFor="description">
        Description
      </label>
      <textarea id="description" rows="3" className="form-control" 
      value={currentData.description || ""}
      onChange={e => onEditChange("description", e.target.value)}
      readOnly={!editClasses}
      ></textarea>
      <label className="form-label text-muted" htmlFor="assessment">
        Assessment
      </label>
      <select id="assessment" className="form-select"
        value={currentData.assessment || ""}
        onChange={e => onEditChange("assessment", e.target.value)}
        disabled={!editClasses}> 
        <option value='1'>1 No Problem!</option>
        <option value='2'>2 Litle difficulty</option>
        <option value='3'>3 Difficulty</option>
      </select>
      <label className="form-label text-muted" htmlFor="difficulty"> Difficult </label>
      <textarea id="difficulty" rows="2" className="form-control" 
        value={currentData.difficulty || ""}
        onChange={e => onEditChange("difficulty", e.target.value)}
        readOnly={!editClasses}
      ></textarea>
      <label className="form-label text-muted" htmlFor="plan">Plan</label>
      <textarea id="plan" rows="2" className="form-control"
        value={currentData.plan || ""}
        onChange={e => onEditChange("plan", e.target.value)}
        readOnly={!editClasses}
       >
      </textarea>
      <label className="form-label text-muted" htmlFor="plan"> Solution </label>
      <textarea id="solution" rows="2" className="form-control" 
        value={currentData.solution || ""}
        onChange={e => onEditChange("solution", e.target.value)}
        readOnly={!editClasses}
      ></textarea>
      {currentRole == "student" &&(
        <div className="d-flex gap-2 mt-3">
          {!editClasses ? (
            <>
              <button className="btn btn-success" onClick={() => onEditStart(data)}>
                <i className="fas fa-pen"></i> Edit
              </button>
              <button className="btn btn-warning" onClick={onDelete}>
                <i className="fas fa-trash-alt"></i> Delete
              </button>
            </>
          ) : (
            <>
              <button className="btn btn-primary" onClick={onEditSave}>
                Save
              </button>
              <button className="btn btn-secondary" onClick={onEditCancel}>
                Cancel
              </button>
            </>
          )}
        </div>
      )}
       
    </div>
  );
};
