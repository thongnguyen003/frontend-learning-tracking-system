import React ,{useState,useEffect}from "react";
const AddForm = ({setAddForm,teacher_id,class_id,changeOposite})=>{
    const [data,setData]= useState({
        class_id : class_id,
        teacher_id : teacher_id,
        start_day : null,
        end_day : null,
        chooseAllStudent : true,
    });
    const handleSubmit = async(e)=>{
        e.preventDefault();
        try {
            const response  = await fetch('http://localhost:8000/api/course/', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                const result = await response.json();
                changeOposite()
                setAddForm(false)
            }else{
                 console.error(`Error: ${response.status} - ${response.statusText}`);
            }
        } catch (error) {
            console.error("An error occurred:", error);
        }
    }
    const handleChange = (e) => {
        const name = e.target.name; 
        if (name == "option") {
            const isChecked = e.target.checked;
            setData({
                ...data,
                chooseAllStudent: isChecked ,
            });
            return;
        }
        setData({
            ...data,
            [name]: e.target.value, 
        });
    };
    return (
        <div
        className="modal d-block"
        tabIndex="-1"
        role="dialog"
        style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
        <form onSubmit={handleSubmit} className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content p-3">
            <div className="modal-header">
                <h5 className="modal-title">Add</h5>
                <button onClick={()=>setAddForm(false)} type="button" className="btn-close"></button>
            </div>
            <div className="modal-body">
                <div className=" my-2">
                    <label className="form-label" style={{width:"150px"}}>Course name</label>
                    <input onChange={handleChange} name="course_name"  type="text" className="form-control" required ></input>
                </div>  
                <div className=" my-2">
                    <label className="form-label" style={{width:"150px"}}>Start day</label>
                    <input onChange={handleChange} name="start_day"  type="date" className="form-control" required></input>
                </div> 
                <div className="my-2">
                    <label className="form-label" style={{width:"150px"}}>End day</label>
                    <input onChange={handleChange} name="end_day"  type="date" className="form-control" required></input>
                </div> 
                <div className=" my-2">
                    <label className="form-label mr-2">Choose all student in class</label>
                    <input onChange={handleChange} type="checkbox" name="option"  required checked={data.chooseAllStudent?1:0} />
                </div>    
            </div>
            <div className="modal-footer">
                <button onClick={()=>setAddForm(false)} className="btn btn-secondary" >
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
export default AddForm;