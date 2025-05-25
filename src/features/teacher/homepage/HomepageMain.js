import React from "react";
import Item from "./components/Item";
const  HomepageMain = ({classes})=>{
    return(
        <main  style={{width:"100%",boxSizing:"border-box"}}>
            <p className="fs-5 mb-3">List classes</p>
            <div class="row">
                {
                    <div className="row">
                    {Array.isArray(classes) && (classes.length >0) ? (
                      classes.map((e, index) => {
                        console.log(e.class_teachers[0]?.id);
                        return((
                        <Item
                          key={index}
                          idh = {e.class_teachers[0]?.id}
                          classes_name={e.name}
                          student_name={e.student?.student_name}
                          teacher_count={e.teacher_count}
                          start_day={e.start_day}
                        />
                      ));
                      })
                    ) : (
                      <p>No classess available.</p>
                    )}
                  </div>
                }
            </div>
        </main>
    );
}
export default HomepageMain;