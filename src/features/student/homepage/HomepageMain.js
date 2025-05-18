import React from "react";
import Item from "./components/Item";
const  HomepageMain = ({course})=>{
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