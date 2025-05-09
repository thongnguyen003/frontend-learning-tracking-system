import React from "react";
import { MdExplicit } from "react-icons/md";
 
function TableSection({ title, columns, rows }) {
    return (
        <div className="table-container">
            <div className="table-header">
                <div>
                <i className="fas fa-chevron-down"></i>
                {title}
                </div>
                <button className="create-btn" type="button">
                <i className="fas fa-plus"></i>
                Create
                </button>
            </div>
            <table className="table mb-0">
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
                        <td key={j} className={j === 0 ? "text-muted" : ""}>
                        {row[col.key] || ""}
                        </td>
                    ))}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}
export default TableSection;
