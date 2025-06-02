import React,{useState,useEffect} from "react";
import { useParams } from "react-router-dom";
import Item from "./components/Item";
import AddForm from "./components/AddForm";
const  HomepageMain = ()=>{
    const [course,setCourse] = useState([]);
    const [stateAddForm,setAddForm]=useState(false);
    const [change,setChange]=useState(false);
    const id_user = JSON.parse(sessionStorage.getItem("current_user")).account.id;
    let id = id_user;
    const role = JSON.parse(sessionStorage.getItem("current_user")).role;
    const { id: param } = useParams();
    const changeOposite = ()=>{
      setChange(!change);
    }
    if (role === "teacher") {
        id = param;
    }
    useEffect(()=>{
      const fetchCourse = async () => {
        try {
          const path = role == "student" ? 'getByStudentId' : 'getByClassId';
          const response = await fetch(`http://127.0.0.1:8000/api/course/${path}/${id}`);
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          const result = await response.json();
          setCourse(result.original || []); 
          console.log(result.original)
        } catch (error) {
          console.error('Failed to fetch course:', error);
        }
      };
      fetchCourse();
    },[change]);
    return(
        <main className="position-relative"  style={{width:"100%",boxSizing:"border-box"}}>
            {role=="teacher"&&(
            <div className="position-absolute" style={{top:"10px",right:"20px"}}>
                <button onClick={()=>setAddForm(true)} style={{background: "#007bff",color: "white",fontSize: "2rem", borderRadius: "50%",width: "48px",height: "48px",display:"flex",justifyContent:"center",alignItems:"center"}}>+</button>
            </div>
            )}
            <p className="fs-5 mb-3">List Course</p>
            <div class="row">
                {
                    <div className="row">
                    {Array.isArray(course) && (course.length >0) ? (
                      course.map((e, index) => {
                        return((
                        <Item
                          key={index}
                          idh = {role == "teacher" ? e.id : e.course_students[0].id}
                          course_name={e.course_name}
                          teacher_name={e.teacher?.teacher_name}
                          students_count={e.students_count}
                          start_day={e.start_day}
                        />
                      ));
                      })
                    ) : (
                      <p>No courses available.</p>
                    )}
                  </div>
                }
            </div>
            {stateAddForm &&(
              <AddForm changeOposite={changeOposite} teacher_id={id_user} class_id={id} setAddForm={setAddForm}></AddForm>
            )}
        </main>
    );
}
export default HomepageMain;