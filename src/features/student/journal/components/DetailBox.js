import React from "react";
const DetailBox = ()=>{
    return ( 
        <div className=" bg-white rounded-lg shadow-sm p-4 flex flex-col gap-3"   style={{ width :"420px",}}>
                <label className="text-xs font-semibold text-[#475569]" for="date">Date</label>
                <input
                    id="date"
                    type="text"
                    value="12-12-2025"
                    className="border border-[#1e293b] rounded px-2 py-1 text-xs text-[#1e293b] focus:outline-none focus:ring-1 focus:ring-[#22c55e]"
                />

                <label className="text-xs font-semibold text-[#475569]" for="topic">Topic</label>
                <textarea
                    id="topic"
                    rows="2"
                    className="border border-[#1e293b] rounded px-2 py-1 text-xs text-[#1e293b] resize-none focus:outline-none focus:ring-1 focus:ring-[#22c55e]"
                >Syntax is important</textarea>

                <label className="text-xs font-semibold text-[#475569]" for="description">Description</label>
                <textarea
                    id="description"
                    rows="3"
                    className="border border-[#1e293b] rounded px-2 py-1 text-xs text-[#1e293b] resize-none focus:outline-none focus:ring-1 focus:ring-[#22c55e]"
                >Syntax is important</textarea>

                <label className="text-xs font-semibold text-[#475569]" for="duration">Duration</label>
                <input
                    id="duration"
                    type="text"
                    value="1 h 20 m"
                    className="border border-[#1e293b] rounded px-2 py-1 text-xs text-[#1e293b] focus:outline-none focus:ring-1 focus:ring-[#22c55e]"
                />

                <label className="text-xs font-semibold text-[#475569]" for="duration2">Duration</label>
                <input
                    id="duration2"
                    type="text"
                    value="http://kienthuchay.com"
                    className="border border-[#1e293b] rounded px-2 py-1 text-xs text-[#1e293b] focus:outline-none focus:ring-1 focus:ring-[#22c55e]"
                />

                <label className="text-xs font-semibold text-[#475569]" for="activity">Activity</label>
                <textarea
                    id="activity"
                    rows="2"
                    className="border border-[#1e293b] rounded px-2 py-1 text-xs text-[#1e293b] resize-none focus:outline-none focus:ring-1 focus:ring-[#22c55e]"
                >Syntax is important</textarea>

                <label className="text-xs font-semibold text-[#475569]" for="concentration">Concentration</label>
                <select
                    id="concentration"
                    className="border border-[#1e293b] rounded px-2 py-1 text-xs text-[#1e293b] focus:outline-none focus:ring-1 focus:ring-[#22c55e]"
                >
                    <option>True</option>
                </select>

                <label className="text-xs font-semibold text-[#475569]" for="follow_plan">Follow_plan</label>
                <select
                    id="follow_plan"
                    className="border border-[#1e293b] rounded px-2 py-1 text-xs text-[#1e293b] focus:outline-none focus:ring-1 focus:ring-[#22c55e]"
                >
                    <option>True</option>
                </select>

                <label className="text-xs font-semibold text-[#475569]" for="evaluation">Evaluation</label>
                <textarea
                    id="evaluation"
                    rows="2"
                    className="border border-[#1e293b] rounded px-2 py-1 text-xs text-[#1e293b] resize-none focus:outline-none focus:ring-1 focus:ring-[#22c55e]"
                >Syntax is important</textarea>

                <label className="text-xs font-semibold text-[#475569]" for="reinforcing_learning">Reinforcing_learning</label>
                <textarea
                    id="reinforcing_learning"
                    rows="2"
                    className="border border-[#1e293b] rounded px-2 py-1 text-xs text-[#1e293b] resize-none focus:outline-none focus:ring-1 focus:ring-[#22c55e]"
                >Syntax is important</textarea>

                <label className="text-xs font-semibold text-[#475569]" for="notes">notes</label>
                <textarea
                    id="notes"
                    rows="3"
                    className="border border-[#1e293b] rounded px-2 py-1 text-xs text-[#1e293b] resize-none focus:outline-none focus:ring-1 focus:ring-[#22c55e]"
                >Syntax is important</textarea>

                <div className="flex gap-3 mt-2">
                    <button
                    type="button"
                    className="flex items-center gap-1 bg-[#22c55e] text-white text-xs font-semibold rounded px-3 py-1 hover:bg-[#16a34a]"
                    >
                    <i className="fas fa-pen"></i> Edit
                    </button>
                    <button
                    type="button"
                    className="flex items-center gap-1 bg-[#b45309] text-white text-xs font-semibold rounded px-3 py-1 hover:bg-[#92400e]"
                    >
                    <i className="fas fa-trash-alt"></i> Delete
                    </button>
                </div>
            </div>
    );
}
export default DetailBox;