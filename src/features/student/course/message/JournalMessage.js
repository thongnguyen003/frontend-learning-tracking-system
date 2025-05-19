import React,{ useState,useEffect } from "react";
import Item from "./component/Item";

function JournalMessage({type,id}) {
    const [listTeacher,setTeacher]=useState(null);
    const [changeData,setChance]=useState(false);//use render if send request to delete, update, create, I am supper AI (joke)
    const [listMessage,setMessage]=useState(null);
    const [statusDetailForm,setStatusDetail]=useState(false);
    const [statusForm,setStatusForm]=useState(false);
    const [tongLeDetail,settongLeDetail]= useState(0);
    const [tongLeUpdate,setTongLeUpdate]=useState(0);
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
        const course_goal_id = type === "course" ? id : null;
        const journal_class_id = type === "class" ? id : null;
        const journal_goals_id = type === "goal" ? id : null;
        const journal_self_id = type === "self" ? id : null;
        const formData = new FormData(e.target);
        const content = formData.get("content");
        const teacher_id = formData.get("teacher_id");
        const response = await fetch('http://127.0.0.1:8000/api/message/', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
            view_teacher_id : teacher_id,
            teacher_id:null,
            student_id : 6,
            content: content,
            journal_class_id : journal_class_id,
            journal_goal_id : journal_goals_id,
            journal_self_id : journal_self_id,
            course_goal_id : course_goal_id
            }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Dữ liệu trả về:', data);
        setChance(!changeData);
        setStatusForm(!statusForm)
        console.log("change thành công")
        } catch (error) {
        console.error('Lỗi khi gửi dữ liệu:', error);
        }
    };
    const handleSubmitDetail = async (e) => {
        e.preventDefault();
        try {
        let formData = new FormData(e.target);
        let content = formData.get("content");
        let message_id = formData.get("message_id");
        const response = await fetch('http://127.0.0.1:8000/api/message/detail', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
            teacher_id : null,
            student_id : 6,
            content: content,
            message_id: message_id,
            }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Dữ liệu trả về:', data);
        setChance(!changeData);
        setStatusDetail(!statusDetailForm)
        } catch (error) {
        console.error('Lỗi khi gửi dữ liệu:', error);
        }
    };
    useEffect(()=>{
        const fetchData = async () => {
        try {
            const path = type == "goal" ? "getByJournalGoal" : type == "class" ? "getByJournalClass" : type == "self" ? "getByJournalSelf" : "getByCourseGoal";
            const response = await fetch(`http://127.0.0.1:8000/api/message/${path}/${id}`);
            if (!response.ok) {
            throw new Error("Không thể tải dữ liệu");
            }
            const data = await response.json();
            console.log(data)
            setTeacher(data.teacher);
            setMessage(data.message);
        } catch (error) {
            console.error("Lỗi khi tải dữ liệu:", error);
        }
        };
        fetchData();
    },[id,changeData]);
    return (
        <div className="bg-white rounded-3 p-3 position-relative" style={{ width: "100%", minHeight: "420px" }}>
            {statusForm ?
            (<div className="position-sticky top-0 right-0 p-4 bg-light rounded-3 shadow-sm" style={{ width: "300px" }}>
                <form onSubmit={handleSubmit}>
                    <h1 className="fw-semibold">Add new commit</h1>
                    <label className="form-label  fw-normal mb-2" htmlFor="topic">
                        Choose Teacher
                    </label>
                    <select name="teacher_id" className="form-select mb-3">
                        {listTeacher && listTeacher.length > 0 ? (
                            listTeacher.map((e) => (
                                <option key={e.teacher.id} value={e.teacher.id}>
                                    {e.teacher.teacher_name}
                                </option>
                            ))
                        ) : (
                            <option  value="1">Don't have data</option>
                        )}
                    </select>
                    <label className="form-label fw-normal mb-2" htmlFor="content">
                        Message
                    </label>
                    <input
                        name="content"
                        className="form-control mb-3"
                        placeholder="Enter your message"
                    />
                    <div className="d-flex gap-2 mt-3">
                        <button type="submit" className="btn btn-success"> Send</button>
                        <button  onClick={()=>setStatusForm(!statusForm)} type="button" className="btn btn-warning"> Cancel</button>
                    </div>
                </form>
            </div>)
            :(<button type="button" onClick={()=>setStatusForm(!statusForm)} className="btn btn-warning position-sticky top-0 right-0"> Add new message</button>)} 
        {listMessage && listMessage.length > 0 ? (
            listMessage.map((messageContainer, index) => 
                ((messageContainer.detail_messages && messageContainer.detail_messages.length > 0)
                    &&(<div key={index} className="mb-4 bg-light rounded-3 p-2">
                        {messageContainer.detail_messages && messageContainer.detail_messages.length > 0 ? (
                            messageContainer.detail_messages.map((e, subIndex) => (
                                <Item setChance={setChance} changeData={changeData} tongLeUpdate={tongLeUpdate} setTongLeUpdate={setTongLeUpdate} tongLeDetail={tongLeDetail} settongLeDetail={settongLeDetail} key={subIndex} data={e} />
                            ))
                        ) 
                        : (
                        <div className="text-muted">Don't have detail message.</div>
                        )}
                        {statusDetailForm == messageContainer.id ? 
                        (<form onSubmit={handleSubmitDetail}>
                            <input name="content" id="date" type="text" className="form-control"  />
                            <input name="message_id" value={messageContainer.id} hidden></input>
                            <div className="d-flex gap-2 mt-3">
                                <button type="submit" className="btn btn-success"> Send</button>
                                <button  onClick={()=>setStatusDetail(!statusDetailForm)} type="button" className="btn btn-warning"> Cancel</button>
                            </div>
                        </form>)
                        :
                        (<button type="button" onClick={()=>setStatusDetail(messageContainer.id)} className="btn btn-warning"> Reply</button>)
                        }
                    </div>)
                )
            )
        ) : (
            <div className="text-muted">Don't have message.</div>
        )}
        </div>
    );
}

export default JournalMessage;
