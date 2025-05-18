import React from "react";

function JournalMessage() {
    return (
        <div className="bg-white rounded-3 p-3" style={{ width: "100%",minHeight:"420px"}}>
            <div className="d-flex mb-4 bg-light rounded-3 p-2 mb-3">
                <div className="" style={{width:"40px",height:"40px",borderRadius: "50%",overflow: "hidden"}}>
                    <img src="https://storage.googleapis.com/a1aa/image/8ad3d5e1-d604-4498-cd29-c90aff815c02.jpg" alt=""    
                    className="rounded-circle flex-shrink-0"
                    style={{ objectFit: "cover",width:"100%" ,height:"100%"}}
                    />
                </div>
                <div className="ms-3">
                    <p className="mb-0 fw-semibold" style={{ color: "#1E293B", fontSize: "0.875rem", lineHeight: "1.25rem" }}>
                        Uyên TRẦN
                    </p>
                    <p className="mb-1" style={{ color: "#64748B", fontSize: "0.75rem", lineHeight: "1rem" }}>
                        9:05 AM May 9
                    </p>
                    <p className="mb-0" style={{ color: "#334155", fontSize: "0.875rem", lineHeight: "1.25rem" ,wordBreak: "break-word",overflowWrap: "break-word" }}>
                        But is this a practical approach? 
                    </p>
                </div>
            </div>
        </div>
    );
}

export default JournalMessage;
