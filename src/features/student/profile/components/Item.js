import React,{useState} from "react";
const  Item = ({data,changeOposite})=> {
    const [indexImage,setIndex]=useState(0);
    const [statusImageBox,setImageBox]=useState(false);
    const id = data.id;
    const [info,setInfo]=useState({
        title : data.title,
        description : data.description
    });
    const edit = async ()=>{
        try {
        const response = await fetch(`http://127.0.0.1:8000/api/achievement/${id}`, {
            method: 'PUT',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(info),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result = await response.json();
        console.log('Dữ liệu trả về:', result);
        changeOposite()
        } catch (error) {
        console.error('Lỗi khi gửi dữ liệu:', error);
        }
    }
    const deleteData = async ()=>{
        try {
        const response = await fetch(`http://127.0.0.1:8000/api/achievement/${id}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result = await response.json();
        console.log('Dữ liệu trả về:', result);
        changeOposite()
        } catch (error) {
        console.error('Lỗi khi gửi dữ liệu:', error);
        }
    }
    const handleSlide = (type)=>{
        let index = indexImage;
        type == "a" ? ++ index : --index;
        index > (data.images.length -1)? index = 0 : (index <0 ? index = (data.images.length -1) : index = index);
        setIndex(index)
    }
    const handleChange = (e) =>{
        const name = e.target.name;
        setInfo({...info, [name] : e.target.value})
        console.log(info)
    }
    return (
        <div className="w-100  flex items-center gap-2 bg-[#f3f6fa] mb-4">
            {/* Image carousel */}
            <div className="relative w-48 h-32 flex items-center">
                <button onClick={()=>handleSlide("b")} className="absolute left-0 z-10 text-black text-xl px-2 py-1 bg-white bg-opacity-70 rounded-r-md hover:bg-opacity-100">
                <i className="fas fa-chevron-left"></i>
                </button>
                <img onClick={()=>setImageBox(true)}
                src={data.images.length > 0 && data.images[indexImage].link}
                alt={data.images.length > 0 && data.images[indexImage].link}
                className="w-48 h-32 object-cover rounded-sm mx-auto"
                width={192}
                height={128}
                />
                <button onClick={()=>handleSlide("a")} className="absolute right-0 z-10 text-black text-xl px-2 py-1 bg-white bg-opacity-70 rounded-l-md hover:bg-opacity-100" >
                <i className="fas fa-chevron-right"></i>
                </button>
            </div>

            {/* Title and textarea */}
            <div className="flex-1 flex flex-col gap-1">
                <input onChange={ (e)=>handleChange(e)}
                type="text"
                name = "title"
                value={info.title}
                className="border border-black rounded-md text-center text-xs font-semibold py-0.5 px-2"
                />
                <textarea onChange={(e)=>handleChange(e)}
                rows={4}
                name="description"
                className="w-full border border-black rounded-md text-xs p-1 resize-none"
                value={info.description}
                />
            </div>

            {/* Edit and Delete icons on the right */}
            <div className="flex flex-col justify-start gap-2 mr-2">
                <button onClick={edit}
                className="text-black text-lg hover:text-blue-600"
                >
                <i className="fas fa-pencil-alt"></i>
                </button>
                <button onClick={deleteData}
                aria-label="Delete"
                className="text-black text-lg hover:text-red-600"
                >
                <i className="fas fa-trash-alt"></i>
                </button>
            </div>
            {statusImageBox &&  <ImageBox changeOposite={changeOposite} setImageBox = {setImageBox} images={data.images} achievement_id={data.id}></ImageBox>}
        </div>
    );
}
export default Item;
const ImageBox = ({images,achievement_id,setImageBox,changeOposite})=>{
    const [statusAdd,setAdd]=useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };
    const deleteImage = async(id)=>{
        try {
        const response = await fetch(`http://127.0.0.1:8000/api/achievement/image/${id}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        changeOposite()
        } catch (error) {
        console.error('Lỗi khi gửi dữ liệu:', error);
        }
    }
    const handleSubmit = async (e)=>{
        e.preventDefault();
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
                const saveResponse = await fetch("http://127.0.0.1:8000/api/achievement/image/", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        achievement_id: achievement_id,
                        link:  link,
                    }),
                });

                if (saveResponse.ok) {
                    const saveResult = await saveResponse.json();
                    console.log("Save successful:", saveResult);
                    changeOposite()
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
            <button onClick={()=>setImageBox(false)} type="button" className="btn-close"></button>
          </div>
          <div className="modal-body row " style={{minHeight:"300px",overflow:"auto"}}>
            {(images && images.length>0) ?images.map((e,index)=>(
                <div className="col-md-3 mb-2 position-relative">
                    <button onClick={()=>deleteImage(e.id)} className="position-absolute " style={{top:"-10px",right:"5px",background:"red",width:"20px",height:"20px",borderRadius:"100px",textAlign :"center",color:"white"}}>X</button>
                    <img src={e.link} className="w-100" style={{height:"90px"}}></img>
                </div>
            )):(
                <div> Don' have image </div>
            )}
          </div>
            {statusAdd ?(
                <>
                <div className="modal-header " style={{padding:"0"}}></div>
                <form onSubmit={handleSubmit}>
                    <div className="d-flex my-2">
                        <label className="form-label" style={{width:"150px"}}>Choose image</label>
                        <input onChange={handleFileChange} type="file" className="form-control" ></input>
                    </div>
                    <div className="d-flex justify-content-around">
                        <button onClick={()=>setAdd(false)} className="btn btn-secondary" > Cancel </button>
                        <button type="submit" className="btn btn-primary" > Submit </button>
                    </div>
                </form>
                </>
            ):(
                <div className="modal-footer">
                    <button className="btn btn-primary" onClick={()=>setAdd(true)}> Add  </button>
                </div>
            )}
        </div>
      </div>
    </div>
  );

}
const Example = ()=>{
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
            <button type="button" className="btn-close"></button>
          </div>
          <div className="modal-body">
            
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" >
              Cancel
            </button>
            <button className="btn btn-primary" >
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );

}