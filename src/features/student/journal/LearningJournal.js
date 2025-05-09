import React,{useState} from "react";
import "../styles/learningJournal.css";
import TabButton from "./components/TabButton";
import TableSection from "./components/TableSection";
import DetailBox from "./components/DetailBox";
function    LearningJournal() {
const [activeWeek, setActiveWeek] = useState("Week1");

const smaillGoalColumns = [
    { label: "#", key: "id", width: "2.5rem" },
    { label: "Title", key: "title" },
    { label: "Date", key: "date", width: "7rem" },
    { label: "Status", key: "status", width: "5rem" },
];

const smaillGoalRows = [
    { id: "1", title: "Syntax is important", date: "12-12-2025", status: "good" },
    { id: "2", title: "Syntax is important", date: "11-12-2025", status: "good" },
    { id: "3", title: "Syntax is important", date: "10-12-2025", status: "good" },
];

const inClassColumns = [
    { label: "Date", key: "date", width: "7rem" },
    { label: "Topic", key: "topic", width: "7rem" },
    { label: "Description", key: "description" },
];

const inClassRows = [
    { id: "1", date: "22-11-2025", topic: "Noun", description: "countable and uncountable nouns" },
    { id: "2", date: "23-11-2025", topic: "Adjective", description: "Prefix of adjective" },
    { id: "3", date: "26-11-2025", topic: "Relative clause", description: "Syntax is important" },
];

const selfRows = [
    { id: "1", date: "22-11-2025", topic: "Noun", description: "countable and uncountable nouns kkklllllllllllllllllkkkkkkkkkkkkhhhhhhhhhhhhhhhhhhhhh" },
    { id: "2", date: "23-11-2025", topic: "Adjective", description: "Prefix of adjective" },
    { id: "3", date: "26-11-2025", topic: "Relative clause", description: "Syntax is important" },
];

return (
    <>
    <div className="d-flex mb-4 mt-3">
        {["Week1", "Week2", "Week3", "Week4"].map((week) => (
        <TabButton
            key={week}
            active={activeWeek === week}
            onClick={() => setActiveWeek(week)}
        >
            {week}
        </TabButton>
        ))}
    </div>

    <div className="d-flex flex-row"  >
        <div className="flex-grow-1" style={{height:"420px",overflowY: "auto"}}>
            <TableSection
                title="Smaill Goal"
                columns={smaillGoalColumns}
                rows={smaillGoalRows}
            />
            <TableSection
                title="In class"
                columns={inClassColumns}
                rows={inClassRows}
            />
            <TableSection
                title="Self"
                columns={inClassColumns}
                rows={selfRows}
            />
        </div>
        {/* part 2 */}
        <div className="pl-3" style={{ height:"420px",overflowY: "auto"}}>
            <DetailBox></DetailBox>
        </div>
    </div>
    </>
);
}
export default LearningJournal;