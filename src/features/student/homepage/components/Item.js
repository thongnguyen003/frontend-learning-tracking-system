import React from "react";
import { useNavigate } from 'react-router-dom';
const Item = ({idh,course_name,teacher_name,start_day,students_count})=>{
    const navigate = useNavigate(); // Đưa hook useNavigate ra ngoài

    const redictor = () => {
        navigate(`/courseGoal/`); // Chuyển hướng đến đường dẫn với tham số index
    };
    return (
        <div className="col-md-3" onClick={redictor}>
            <div className="card shadow-sm rounded-4">
                <div className="card-body">
                    <h6 className="card-title text-success fw-bold">{course_name}</h6>
                    <p className="card-text mb-1">By:{teacher_name} {idh}</p>
                    <p className="card-text mb-1">Start date: {start_day}</p>
                    <p className="card-text mb-0">Class size: {students_count}</p>
                </div>
            </div>
        </div>
    );
}
export default Item;