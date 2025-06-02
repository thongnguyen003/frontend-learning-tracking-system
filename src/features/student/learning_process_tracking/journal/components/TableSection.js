import React,{useState,useEffect} from "react";
 
function TableSection({ title, columns, rows, click, setShowAddModal=false,journalTime ,detaiStatus}) {
    const [hasDeadLine,setHasDeadLine] = useState(false);
    let currentUser= JSON.parse(sessionStorage.getItem('current_user'));
    const currentRole = currentUser.role;
     useEffect(() => {
        setHasDeadLine(false)
        if(title == 1 && journalTime){
            journalTime.accept_deadline.indexOf("goal") !== -1 && setHasDeadLine(true);
        }else if(title ==2  && journalTime){
            journalTime.accept_deadline.indexOf("class") !== -1 && setHasDeadLine(true);
        }else if(title ==3  && journalTime){
            journalTime.accept_deadline.indexOf("self") !== -1 && setHasDeadLine(true);
        }
    }, [title, journalTime]);
    const clickAddButton = () => {
        if(title == 1){
            setShowAddModal ('goal')
        }else if(title == 2 ){
            setShowAddModal('class')
        }else if (title == 3){
            setShowAddModal('self')
        }
    }
    const dateConvert = (dateString)=>{
        const date = new Date(dateString);
        const day = date.getUTCDate();
        const month = date.getUTCMonth() + 1;
        const year = date.getUTCFullYear();
        const formattedDate = [
        day.toString().padStart(2, '0'),
        month.toString().padStart(2, '0'),
        year
        ].join('/');
        return formattedDate;
    }
     const dateCompare = (dateString)=>{
        const date1 = new Date(dateString);
        const deadline = `${journalTime.end_date}T${journalTime.deadline}Z`;
        const date2 = new Date(deadline);
        if (date1 > date2) {
            return true;
        } else if (date1 < date2) {
            return false;
        }
    }
    return (
        <div className="table-container pb-0 mb-0">
            <div className="table-header">
                <div>
                <i className="fas fa-chevron-down"></i>
                {title == 1 ? "Smaill Goal" : title ==2 ? "In class"  : title ==3 ? "Self" :""}
                </div>
                <div>Deadline : {hasDeadLine ? journalTime.deadline : "None"}</div>
                {currentRole == "student" ? (
                    <button className="create-btn" type="button" onClick={clickAddButton}>
                    <i className="fas fa-plus"></i>
                    Create
                    </button>
                ):(
                    <></>
                )}
            </div>
            {rows && rows.length >0 ?
            <table className="table mb-0 pb-0">
                <thead>   
                <tr>
                    {columns.map((col, i) => (
                    <th
                        key={i}
                        style={{ width: col.width ? col.width : "auto" }}
                        className={col.className ? col.className : ""}
                    >
                        {col.label}
                    </th>
                    ))}
                </tr>
                </thead>
                <tbody >
                {rows.map((row, i) => (
                    <tr  key={i} style={{background:(detaiStatus && title == detaiStatus[0] && row.id == detaiStatus[1]) ? "blue" : "red"}}>
                    {columns.map((col, j) => (
                        <td onClick={()=>click([title,row.id])}  key={j} className={j === 0 ? "text-muted" : ""} style={{color: ((col.key === "created_at" && hasDeadLine && dateCompare(row[col.key] ))|| (col.key === "updated_at" && hasDeadLine && dateCompare(row[col.key]))) ? "red" : "black"}}>
                        {col.key == "created_at" || col.key =="updated_at" ? (
                            dateConvert(row[col.key]) || "Default Create Value"
                        ) : (
                            row[col.key] || ""
                        )}
                        </td>
                    ))}
                    </tr>
                ))}
                </tbody>
            </table>
            : "Don't available data"}
        </div>
    );
}
export default TableSection;
