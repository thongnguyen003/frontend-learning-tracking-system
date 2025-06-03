import { split } from "postcss/lib/list";
import React, { useState, useEffect } from "react"; // Import useState and useEffect
import { Link,useNavigate,useParams } from "react-router-dom";

const StudentList = ({ classId }) => {
  const navigate = useNavigate(); 
  const [students, setStudents] = useState([]);
  const [quantityProcess, setQuantityProcess] = useState(0);
  const [otherStudents, setOtherStudents] = useState([]);
  const [statusAddForm, setStatusAddForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const {id}=useParams();
  const [change, setChange]= useState(true)
  const rediretor = (path)=>{
    const nextPath = path;
    navigate(nextPath);
  }
  const changeOpposite = ()=>{
      setChange(!change)
  }
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/students/byCourseId/${id}`);
        const data = await response.json();
        if(data.error){
          console.log(data.error)
        }else{
          setStudents(data.student);
          setOtherStudents(data.allStudent)
          setQuantityProcess(data.journalTimes)
        }
      } catch (error) {
        console.error('Error fetching students:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, [change]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
      <div className="bg-white p-6 rounded-md shadow-md my-6" style={{width:"100%",height:"100%",overflow:"auto"}}>
        <div className="d-flex justify-between align-items-center">
          <h2 className="text-lg font-bold mb-4">Student List</h2>
          <button onClick={()=>setStatusAddForm(true)} className="create-btn" type="button" >
                <i className="fas fa-plus"></i> Create
          </button>
        </div>
        <div className="text-right font-semibold mb-4">
          {students.length} Students
        </div>
        <div className="space-y-2">
              <div  className="flex items-center align-items-center justify-between p-2 border-b">
                <div className="flex  flex-1"> 
                  {/*  */} Name
                </div>
                <div className="flex-1 d-flex align-items-center justify-content-center" >
                  {/*  */}Image
                </div>
                <div className="flex  flex-1"> 
                  {/*  */} Journal
                </div>
                <div className="flex  flex-1"> 
                  {/*  */} Goal completion rate
                </div>
                <div className="flex-1 d-flex align-items-center justify-content-center">
                  {/*  */}Tracking
                </div>
              </div>
          {(students && students.length >0) &&(
              students.map((student, index) => (
              <div key={student.id} className="flex align-items-center justify-between p-2 border-b">
                <div className="flex align-items-center flex-1"> 
                  <span className="flex-1">{index + 1}. {student.student_name}</span>
                </div>
                <div className="flex-1 d-flex align-items-center justify-content-center" >
                  <div className=" d-flex align-items-center justify-content-center" style={{width:"40px",height:"40px"}}>
                    <img
                      src={student.image || 'default-image-url'} 
                      alt={`Image of ${student.name}`}
                      className="rounded-full w-10 h-10 mr-3"
                      style={{width:"100%",height:'100%', verticalAlign: 'middle' }} 
                    />
                  </div>
                </div>
                <div className="flex align-items-center flex-1"> 
                  <span className="flex-1">{quantityProcess}/ {student.course_students[0].journals.length}</span>
                </div>
                <div className="flex align-items-center flex-1"> 
                  <span className="flex-1"> {student.course_students[0].journals.reduce((pre, e) => pre + e.journal_goals_count, 0)}/{student.course_students[0].journals.reduce((pre, e) => pre + e.active_journal_goals_count, 0)}</span>
                </div>
                <div className="flex-1 d-flex align-items-center justify-content-center">
                  {/* <button onClick={()=>rediretor("/student/course")} className="bg-[#00b33c] text-white text-sm font-semibold rounded-md px-3 py-1 mr-2">
                    Info
                  </button> */}
                  <button onClick={()=>rediretor(`/teacher/learningProcessTracking/${student.course_students[0].id}`)} className="bg-[#00b33c] text-white text-sm font-semibold rounded-md px-3 py-1">
                    LG
                  </button>
                </div>
              </div>
            ))
          ) }
        </div>
        {statusAddForm &&(
          <AddForm setChange={changeOpposite} otherStudents={otherStudents} setStatusAddForm={setStatusAddForm}></AddForm>
        )}
      </div>
  );
};

export default StudentList;
const AddForm = ({setStatusAddForm,otherStudents,setChange})=>{
  const {id}=useParams();
  const [students,setStudents]=useState("")
  const handleChange = (e)=>{
    const name = e.target.name;
    if ( name == "student"){
       const ischecked = e.target.checked;
       let studentList = students.split(',')
       if(ischecked){
          studentList.push(e.target.value)
       }else{
        studentList = studentList.filter((item)=> item != e.target.value)
       }
       studentList = studentList.filter((item)=> item != "")
       setStudents(studentList.join(','));
    }
  }
  const handleSubmit = async (e)=>{
    e.preventDefault();
    try {
        const response = await fetch(`http://127.0.0.1:8000/api/course-student`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({students : students,
              course_id : id
            }),
        });

        if (response.ok) {
            const result = await response.json();
            setChange();
            setStatusAddForm(false)
        } else {
            console.error("Save failed:", await response.text());
        }
    } catch (error) {
        console.error("Error saving link:", error);
    }
  }
  return(
    <div className="modal d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
        <form onSubmit={handleSubmit} className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content p-3">
            <div className="modal-header">
                <h5 className="modal-title">Add</h5>
                <button onClick={()=>setStatusAddForm(false)} type="button" className="btn-close"></button>
            </div>
            <div className="modal-body"> 
                <div className=" my-2">
                    <label className="form-label mr-2">Choose student in class</label>
                    <div className="row" style={{maxHeight:"200px",overflowY:"auto"}}>
                      {(otherStudents && otherStudents.length > 0) ? (
                        otherStudents.map((e)=>(
                          <div className="col-12" >
                            <input onChange={handleChange} className="mr-2" type="checkbox" name="student" value={e.id} checked={students.includes(e.id)}></input>
                            <label className="form-label">{e.student_name}</label>
                          </div>
                        ))
                      ): (
                        <div className="col-12"> Don't have data </div>
                      )}
                    </div>
                </div>    
            </div>
            <div className="modal-footer">
                <button onClick={()=>setStatusAddForm(false)} className="btn btn-secondary" >
                Cancel
                </button>
                <button type="submit" className="btn btn-primary" >
                Add
                </button>
            </div>
            </div>
        </form>
      </div>
  );
}