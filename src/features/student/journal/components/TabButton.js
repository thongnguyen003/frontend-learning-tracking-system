import React from "react";
function TabButton({ active, children, onClick }) {
    return (
        <button
        type="button"
        className={`tab-btn ${active ? "active" : ""}`}
        onClick={onClick}
        >
        {children}
        </button>
    );
}
export default TabButton;