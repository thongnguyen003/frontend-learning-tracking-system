import React,{useState,useEffect} from "react";
import Item from "./components/Item";
const  HomepageMain = ()=>{
    const [course,setCourse] = useState([]);
    const id = JSON.parse(sessionStorage.getItem("current_user")).account.id;
    const role = JSON.parse(sessionStorage.getItem("current_user")).role;
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
          console.log(result.original || []);
        } catch (error) {
          console.error('Failed to fetch course:', error);
        }
      };
      fetchCourse();
    },[]);
    return(
        <main  style={{width:"100%",boxSizing:"border-box"}}>
            <p className="fs-5 mb-3">List Course</p>
            <div class="row">
                {
                    <div className="row">
                    {Array.isArray(course) && (course.length >0) ? (
                      course.map((e, index) => {
                        console.log(e.course_students[0]?.id);
                        return((
                        <Item
                          key={index}
                          idh = {e.course_students[0]?.id}
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
        </main>
    );
}
export default HomepageMain;