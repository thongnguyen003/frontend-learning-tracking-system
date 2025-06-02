import React,{useState} from "react";
import { useParams } from 'react-router-dom';
import JournalMessage from "../../message/JournalMessage";
import "../../../../../../src/assets/css/globalStyle.css"
import { useApi } from "../../../../../hooks/useApi";
const DetailBox = ({data,setDetail,changeOposite}) => {
  const [self, setSelf] = useState([]);
    const [choosePart,setChoose]=useState(true);
    const [editSelf, setEditSelf] = useState();
    const [errorMessage, setErrorMessage] = useState('');
    const { apiCall, loading } = useApi();
    let { id } = useParams();
  
      const startEditSelf = (self) => {
        setEditSelf(self);
        setErrorMessage('');
    };
  
    const cancelEdit = () => {
      setEditSelf(null);
      setErrorMessage('');
    };
  
    const saveEditSelf = async () => {
      if (!editSelf || !editSelf.topic?.trim()) return;
      try {
        setErrorMessage('');
        const updatedSelf = await apiCall(`/journal/journal-selfs/${editSelf.id}`, 'PUT', {
          topic: editSelf.topic,
          description: editSelf.description,
          duration: editSelf.duration,
          resources: editSelf.resources,
          activity: editSelf.activity,
          concentration: editSelf.concentration,
          follow_plan: editSelf.follow_plan,
          evaluation: editSelf.evaluation,
          reinforcing_learning: editSelf.reinforcing_learning,
          notes: editSelf.notes,
          journal_id : id,
          date: editSelf.date || new Date().toISOString().split('T')[0]  
        });
        setSelf(prevSelf => prevSelf.map(s => (s.id === updatedSelf.id ? updatedSelf : s)));
        setEditSelf(null);
        changeOposite();
      } catch {
        setErrorMessage('Error saving goal changes. Please try again.');
      }
    };
  
    const handleDeleteSelf = async () => {
    if (!window.confirm("Are you sure you want to delete this class?")) return;
  
    try {
      await apiCall(`/journal/journal-selfs/${data.id}`, 'DELETE');
      // Sau khi xoá, bạn có thể redirect hoặc reload lại danh sách nếu ở view lớn hơn
      alert("Class deleted successfully.");
      changeOposite();
    } catch (error) {
      alert("Failed to delete class.");
    }
  };
  
    const handleEditChange = (field, value) => {
    if (!editSelf) return;
    setEditSelf({ ...editSelf, [field]: value });
    console.log(editSelf)
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
              self={self}
              editSelf={editSelf}
              onEditStart={startEditSelf}
              onEditCancel={cancelEdit}
              onEditSave={saveEditSelf}
              onDelete={handleDeleteSelf}
              onEditChange={handleEditChange} />
          ) : (
              <JournalMessage type="self" id={data.id} />
          )}
    </div>
  );
};
export default DetailBox;
const formatDateTimeLocal = (dateStr) => {
  if (!dateStr) return "";
  // Nếu đã có 'T' thì trả về luôn
  if (dateStr.includes("T")) return dateStr;
  // Nếu chưa có 'T', thêm 'T00:00' để thành đúng format
  return dateStr + "T00:00";
};
const Detail = ({
  data,
  editSelf,
  onEditStart,
  onEditCancel,
  onEditSave,
  onEditChange,
  onDelete,
}) => {
  const currentData = editSelf || data;
  let currentUser= JSON.parse(sessionStorage.getItem('current_user'));
  const currentRole = currentUser.role;
  return(
    <div>
        <label className="form-label text-muted" htmlFor="date">
        Date
      </label>
      <input
        id="date"
        type="date"
        value={currentData.date}
        className="form-control"
        onChange={e => onEditChange("date", e.target.value)}
      />

      <label className="form-label text-muted" htmlFor="topic">
        Topic
      </label>
      <textarea
        id="topic"
        rows="2"
        className="form-control"
        value={currentData.topic || ""}
        onChange={e => onEditChange("topic", e.target.value)}
        readOnly={!editSelf}
      >
      </textarea>

      <label className="form-label text-muted" htmlFor="description">
        Description
      </label>
      <textarea
        id="description"
        rows="3"
        className="form-control"
        value={currentData.description || ""}
        onChange={e => onEditChange("description", e.target.value)}
        readOnly={!editSelf}
      >
      </textarea>

      <label className="form-label text-muted" htmlFor="duration">
        Duration
      </label>
      <input
        id="duration"
        type="text"
        value={currentData.duration}
        className="form-control"
        onChange={e => onEditChange("duration", e.target.value)}
        readOnly={!editSelf}
      />

      <label className="form-label text-muted" htmlFor="duration2">
        URL
      </label>
      <input
        id="duration2"
        type="text"
        value={currentData.resources}
        className="form-control"
        onChange={e => onEditChange("resources", e.target.value)}
        readOnly={!editSelf}
      />

      <label className="form-label text-muted" htmlFor="activity">
        Activity
      </label>
      <textarea
        id="activity"
        rows="2"
        className="form-control"
        value={currentData.activity || ""}
        onChange={e => onEditChange("activity", e.target.value)}
        readOnly={!editSelf}
      >
      </textarea>

      <label className="form-label text-muted" htmlFor="concentration">
        Concentration
      </label>
      <select id="concentration" className="form-select"
        value={currentData.concentration || ""}
        onChange={e => onEditChange("concentration", e.target.value)}
        disabled={!editSelf}>
        <option value='0'>False</option>
        <option value='1'>True</option>
      </select>

      <label className="form-label text-muted" htmlFor="follow_plan">
        Follow Plan
      </label>
      <select id="follow_plan" className="form-select"
        value={currentData.follow_plan || ""}
        onChange={e => onEditChange("follow_plan", e.target.value)}
        disabled={!editSelf}>
        <option value='0'>False</option>
        <option value='1'>True</option>
      </select>

      <label className="form-label text-muted" htmlFor="evaluation">
        Evaluation
      </label>
      <textarea
        id="evaluation"
        rows="2"
        className="form-control"
        value={currentData.evaluation || ""}
        onChange={e => onEditChange("evaluation", e.target.value)}
        readOnly={!editSelf}>
      
      </textarea>

      <label className="form-label text-muted" htmlFor="reinforcing_learning">
        Reinforcing Learning
      </label>
      <textarea
        id="reinforcing_learning"
        rows="2"
        className="form-control"
        value={currentData.reinforcing_learning || ""}
        onChange={e => onEditChange("reinforcing_learning", e.target.value)}
        readOnly={!editSelf}>
      </textarea>

      <label className="form-label text-muted" htmlFor="notes">
        Notes
      </label>
      <textarea
        id="notes"
        rows="3"
        className="form-control"
        value={currentData.notes || ""}
        onChange={e => onEditChange("notes", e.target.value)}
        readOnly={!editSelf}
      >
      </textarea>
      {currentRole == "student" && (
        <div className="d-flex gap-2 mt-3">
          {!editSelf ? (
            <>
              <button className="btn btn-success" onClick={ () => onEditStart(data) }>
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
}

