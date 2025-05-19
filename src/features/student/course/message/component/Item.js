import React,{useState,useEffect} from "react";
import more from "../../../../../assets/icons/more.svg";
const Item = ({data,changeData,setChance,settongLeDetail,tongLeDetail,tongLeUpdate,setTongLeUpdate})=>{
    let user = data.student_id ? data.student : data.teacher;
    user = user ?? {name:"unknown"};
    let currentUser= JSON.parse(sessionStorage.getItem('current_user'));
    let role = data.student_id ? "student" : "teacher";
    let roleBoolean = currentUser.role == role;
    const [Info,setInfo] = useState(data);
    
    const handleChange = (e)=>{
        const field = e.target.name;
        setInfo({...Info, [field]: e.target.value})
    }
    const handletongLeDetail = (e)=>{
        const id = parseInt(e.target.name);
        settongLeDetail(prev => (prev === id ? 0 : id));
        
    }
     const handleTongLeUpdate = (e)=>{
        const id = parseInt(e.target.name);
        setTongLeUpdate(prev => (prev === id ? 0 : id));
        settongLeDetail(0);
    }
    const clickUpdate = ()=>{
        setTongLeUpdate(0);
        update();
    }
    const clickdelete = (id)=>{
        settongLeDetail(0);
        deleteMessage(id);
    }
    const update = async () => {
        try {
        const content = Info.content;
        const id = Info.id;
        const response = await fetch(`http://127.0.0.1:8000/api/message/detail/${id}`, {
            method: 'PUT',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
            content: content
            }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Dữ liệu trả về:', data);
        setChance(!changeData);
        } catch (error) {
        console.error('Lỗi khi gửi dữ liệu:', error);
        }
    };
    const deleteMessage = async (id) => {
        try {
        const response = await fetch(`http://127.0.0.1:8000/api/message/detail/${id}`, {
            method: 'DELETE',
            headers: {
            'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Dữ liệu trả về:', data);
        setChance(!changeData);
        } catch (error) {
        console.error('Lỗi khi gửi dữ liệu:', error);
        }
    };
    return(
        <div className="d-flex  mb-3">
            <div className="" style={{width:"40px",height:"40px",borderRadius: "50%",overflow: "hidden"}}>
                <img src="https://storage.googleapis.com/a1aa/image/8ad3d5e1-d604-4498-cd29-c90aff815c02.jpg" alt=""    
                className="rounded-circle flex-shrink-0"
                style={{ objectFit: "cover",width:"100%" ,height:"100%"}}
                />
            </div>
            <div className="ms-3 flex-1">
                <p className="mb-0 fw-semibold" style={{ color: "#1E293B", fontSize: "0.875rem", lineHeight: "1.25rem" }}>
                    {user.name}
                </p>
                <p className="mb-1" style={{ color: "#64748B", fontSize: "0.75rem", lineHeight: "1rem" }}>
                    {data.time}
                </p>
                <div className="d-flex mb-0 align-items-center">
                    <div>
                        <input onChange={handleChange} name="content" value={Info.content} className={` form-control ${tongLeUpdate != data.id && "bg-inherit border-0"} mr-2`} readOnly={tongLeUpdate != data.id}/>
                    </div>
                    <div style={{width:"30px",height:"30px"}} className="position-relative">
                       {
                        (roleBoolean)&&  <img name={data.id} onClick={handletongLeDetail}  style={{width:"100%",height:"100%"}} src={more}></img>
                       }
                        { (data.id == tongLeDetail  )&&(
                            <div className="position-absolute bg-white border shadow-sm" style={{ transform: "translateY(0)", right: "20px",top: "100%", width: "150px"}}>
                                <button name={data.id} onClick={handleTongLeUpdate}  className="btn border-bottom w-100 text-start">Update</button>
                                <button  onClick={() => clickdelete(data.id)} className="btn w-100 text-start">Delete</button>
                            </div>)
                        }     
                    </div>   
                </div>
                { data.id == tongLeUpdate &&(
                    <div className="d-flex gap-2 mt-3">
                        <button onClick={clickUpdate} type="submit" className="btn btn-success"> Update</button>
                        <button  onClick={()=>setTongLeUpdate(0)} type="button" className="btn btn-warning"> Cancel</button>
                    </div> 
                )}
            </div>
        </div>
    );
}
export default Item;