import React,{useState,useEffect} from "react";
import Item from "./Item";
const Achievement = ()=>{
    const id = JSON.parse(sessionStorage.getItem("current_user")).account.id;
    const [data,setData]= useState(null);
    const [change,setChange]= useState(true);
    const [statusAddForm,setAddForm]=useState(false);
    const changeOposite = ()=>{
        setChange(!change)
    }
     useEffect(()=>{
    
            const fetchData = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/achievement/getByStudentId/${id}`);
                const result = await response.json();
                setData(result);
                console.log(result)
            } catch (error) {
                console.error('Error fetching :', error);
            }
            };
            
            fetchData()
        }, [change]);
    return(
        <div className="position-relative">
            <div className="position-absolute" style={{top:"-50px",right:"-50px"}}>
                <button onClick={()=>setAddForm(true)} style={{background: "#007bff",color: "white",fontSize: "2rem", borderRadius: "50%",width: "48px",height: "48px"}}> +</button>
            </div>
            {(data && data.length > 0) ? data.map((e, index)=>(
                <Item changeOposite={changeOposite} key={index} data={e}></Item>
            ))
        : (<div> Don't have achievement </div>)}
        {statusAddForm && (
            <AddForm changeOposite={changeOposite} setAddForm={setAddForm}></AddForm>
        )}
        </div>
    );
}
export default Achievement;
const AddForm = ({changeOposite,setAddForm})=>{
    const student_id = JSON.parse(sessionStorage.getItem("current_user")).account.id;
    const [selectedFile, setSelectedFile] = useState(null);
    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };
    const handleSubmit = async(e)=>{
        e.preventDefault();
        const title = e.target.elements.title.value;
        const description = e.target.elements.description.value;
        if (!selectedFile) {
            console.error("No file selected");
            return;
        }
        const formData = new FormData();
        formData.append("achievement", selectedFile);
        try {
        const uploadResponse  = await fetch('http://localhost:5000/upload', {
            method: 'POST',
            body: formData,
        });

        if (uploadResponse.ok) {
            const uploadResult = await uploadResponse.json();
            const link = uploadResult.files.achievement[0].path;

            try {
                const saveResponse = await fetch("http://127.0.0.1:8000/api/achievement/", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        student_id : student_id,
                        title :title,
                        description : description,
                        links: {link1 : link},
                    }),
                });

                if (saveResponse.ok) {
                    const saveResult = await saveResponse.json();
                    console.log("Save successful:", saveResult);
                    changeOposite();
                    setAddForm(false)
                } else {
                    console.error("Save failed:", await saveResponse.text());
                }
            } catch (error) {
                console.error("Error saving link:", error);
            }
        } else {
            console.error("Upload failed:", await uploadResponse.text());
        }
        } catch (error) {
        console.error('Error uploading files:', error);
        }
    }
    return (
    <div
      className="modal d-block"
      tabIndex="-1"
      role="dialog"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content p-3">
          <div className="modal-header">
            <h5 className="modal-title">Images</h5>
            <button onClick={()=>setAddForm(false)} type="button" className="btn-close"></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
                <div className=" my-2">
                    <label className="form-label" style={{width:"150px"}}>Choose image</label>
                    <input name="title" type="text" className="form-control" ></input>
                </div>
                <div className=" my-2">
                    <label className="form-label" style={{width:"150px"}}>Choose image</label>
                    <textarea  name="description" type="text" className="form-control" ></textarea>
                </div>
                <div className="d-flex my-2">
                    <label className="form-label" style={{width:"150px"}}>Choose image</label>
                    <input onChange={handleFileChange} type="file" className="form-control" ></input>
                </div>
                <div className="modal-footer">
                    <button onClick={()=>setAddForm(false)} className="btn btn-secondary" >
                    Cancel
                    </button>
                    <button  type= "submit" className="btn btn-primary" >
                    Add
                    </button>
                </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );

}