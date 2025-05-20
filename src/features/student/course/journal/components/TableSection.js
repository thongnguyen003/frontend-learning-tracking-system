import React from "react";
 
function TableSection({ title, columns, rows, click,onCreate  }) {
    return (
        <div className="table-container pb-0 mb-0">
            <div className="table-header">
                <div>
                <i className="fas fa-chevron-down"></i>
                {title == 1 ? "Smaill Goal" : title ==2 ? "In class"  : title ==3 ? "Self" :""}
                </div>
            
                {onCreate && (
                <button className="btn btn-success mb-2" onClick={onCreate}>
                    Create
                </button>
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
                <tbody>
                {rows.map((row, i) => (
                    <tr key={i}>
                    {columns.map((col, j) => (
                        <td onClick={()=>click([title,row.id])}  key={j} className={j === 0 ? "text-muted" : ""}>
                        {row[col.key]|| ""}
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
