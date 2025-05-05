import React from "react";
const Item = ({course_name,teacher_name,start_day,students_count})=>{
    return (
        <div className="col-md-3">
            <a>
                <div className="card shadow-sm rounded-4">
                    <div className="card-body">
                        <h6 className="card-title text-success fw-bold">{course_name}</h6>
                        <p className="card-text mb-1">By:{teacher_name}</p>
                        <p className="card-text mb-1">Start date: {start_day}</p>
                        <p className="card-text mb-0">Class size: {students_count}</p>
                    </div>
                </div>
            </a>
        </div>
    );
}
export default Item;