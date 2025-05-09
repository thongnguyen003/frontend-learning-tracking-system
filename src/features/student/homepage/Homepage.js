import React from "react";
import Item from "./Item";
const  Homepage = ({course})=>{
  
    return(
        <main className="homepage my-3">
            <p className="fs-5 mb-3">List Course</p>
            <div class="row">
                {
                    <div className="row">
                    {Array.isArray(course) ? (
                      course.map((e, index) => (
                        <Item
                          key={index} // Thêm key để tránh lỗi khi render danh sách
                          course_name={e.course_name}
                          teacher_name={e.teacher?.teacher_name} // Kiểm tra `teacher` tồn tại
                          students_count={e.students_count}
                          start_day={e.start_day}
                        />
                      ))
                    ) : (
                      <p>No courses available.</p>
                    )}
                  </div>
                }
            </div>
        </main>
    );
}
export default Homepage;