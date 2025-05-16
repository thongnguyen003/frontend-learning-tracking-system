import React,{useState,useEffect} from "react";
import "../../styles/learningJournal.css";
import TabButton from "./components/TabButton";
import TableSection from "./components/TableSection";
import DetailBox from "./components/DetailBox";
import GoalBox from "./components/GoalBox";
import ClassBox from "./components/ClassBox";

import {  useParams } from "react-router-dom";

function    LearningJournal() {
    let {id} = useParams();
    const [goal,setGoal]=useState([]);
    const [journalClass,setJournalClass]=useState([]);
    const [journalSelf,setJournalSelf]=useState([]);
    const [data,setData]=useState([]);
    const [activeWeek, setActiveWeek] = useState(0);
    const [detaiStatus, setDetail] = useState([]);
    useEffect(()=>{
        const fetchData = async () => {
            try {
            const response = await fetch(`http://127.0.0.1:8000/api/journal/getByCourseStudentId/${id}`);
            const data = await response.json();
            const result = data.original;
            setData(result);
            } catch (error) {
            console.error('Error fetching goals:', error);
            }
        };
        console.log('data:', data);
        fetchData();
    },[]);
    useEffect(()=>{
        if(data.length>0){
            setActiveWeek(data[0].id);
            let curentData = data.filter( (e)=> e.id == data[0].id);
            setJournalClass(curentData[0].journal_classes);
            setJournalSelf(curentData[0].journal_selfs);
            setGoal(curentData[0].journal_goals)
            console.log(journalSelf);
        }
    },[data]);
    useEffect(()=>{
        if(data && data.length>0){
            let curentData = data.filter( (e)=> e.id == activeWeek)[0];
            console.log(data)
            console.log(curentData)
            setJournalClass(curentData.journal_classes);
            setJournalSelf(curentData.journal_selfs);
            setGoal(curentData.journal_goals)
        }
    },[activeWeek])
    useEffect(()=>{
        console.log("hello"+detaiStatus)
    },[detaiStatus]);


        const smaillGoalColumns = [
            { label: "#", key: "id", width: "2.5rem" },
            { label: "Title", key: "title" },
            { label: "Date", key: "date", width: "7rem" },
            { label: "Status", key: "status", width: "5rem" },
        ];
        const inClassColumns = [
            { label: "Date", key: "date", width: "7rem" },
            { label: "Topic", key: "topic", width: "7rem" },
            { label: "Description", key: "description" },
        ];


return (
    <div style={{width:"100%"}}>
        <div className="d-flex mb-4 mt-3">
            {data.map((week,index) => (
            <TabButton
                key={week.id}
                active={activeWeek === week.id}
                onClick={() => {setDetail([]); setActiveWeek(week.id)}}
            >
                {"week"+(index+1)}
            </TabButton>
            ))}
        </div>

        <div className="d-flex flex-row pb-0"  >
            <div className="flex-grow d-flex flex-column gap-3 pb-0" style={{height:"420px",overflowY: "auto"}}>
                <TableSection
                    title="1"
                    columns={smaillGoalColumns}
                    rows={goal}
                    click = {setDetail}
                />
                <TableSection
                    title="2"
                    columns={inClassColumns}
                    rows={journalClass}
                    click = {setDetail}
                />
                <TableSection
                    title="3"
                    columns={inClassColumns}
                    rows={journalSelf}
                    click = {setDetail}
                />
            </div>
            {/* part 2 */}
            <div className={`pl-3 ${detaiStatus && detaiStatus.length > 0 ? "" : "d-none"}`} style={{ height:"420px",overflowY: "auto"}}>
                {detaiStatus[0] ==1 
                ?
                <GoalBox data={goal.filter((e)=> e.id == detaiStatus[1])[0]}></GoalBox>
                : detaiStatus[0] ==2 
                ?<ClassBox data={journalClass.filter((e)=> e.id == detaiStatus[1])[0]}></ClassBox>
                : detaiStatus[0] == 3 
                ?<DetailBox data={journalSelf.filter((e)=> e.id == detaiStatus[1])[0]}></DetailBox>
                : "invalid"}
            </div>
        </div>
    </div>
);
}
export default LearningJournal;