import React,{useState,useEffect} from "react";
import "../../styles/learningJournal.css";
import TabButton from "./components/TabButton";
import TableSection from "./components/TableSection";
import DetailBox from "./components/DetailBox";
import GoalBox from "./components/GoalBox";
import ClassBox from "./components/ClassBox";
import AddGoalModal from "./components/AddGoalBox";
import CreateClassForm from "./CreateClassForm";
import CreateSelfForm from "./CreateSelfForm";
import { toast } from 'react-toastify';
import {  useParams } from "react-router-dom";

function  LearningJournal() {
    let {id} = useParams();
    const [goal,setGoal]=useState([]);
    const [journalClass,setJournalClass]=useState([]);
    const [journalSelf,setJournalSelf]=useState([]);
    const [journalId, setJournalId]=useState(-1);
    const [data,setData]=useState([]);
    const [journalTimes,setJournalTimes]=useState([]);
    const [activeWeek, setActiveWeek] = useState(0);
    const [detaiStatus, setDetail] = useState([]);
    const [change, setChange] = useState(true);
    const [showAddModal, setShowAddModal] = useState('');
    const [indexProcess,setIndexProcess]=useState(0);
    const [typeTable,setTypeTable]=useState('goal');
    let currentUser= JSON.parse(sessionStorage.getItem('current_user'));
    const currentRole = currentUser.role;
    const changeTable = (e)=>{
        setTypeTable(e.target.value);
        setDetail([]);

    }
    const changeOposite = () => {
        setChange(!change);
        setDetail([])
    }
    useEffect(()=>{
        let i = 0;
        for(let e of data){
            if(e.id == journalId){
                setIndexProcess(i);
                console.log(journalTimes[i])
                return;
            }
            i++;
        }
    },[journalId])
    useEffect(()=>{

        const fetchData = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/journal/getByCourseStudentId/${id}`);
            const data = await response.json();
            setData(data.journals);
            setJournalTimes(data.journalTimes.journal_times)
        } catch (error) {
            console.error('Error fetching goals:', error);
        }
        };
        
        fetchData()
    }, [change]);
    useEffect(()=>{
        if(data.length>0){
            const numberOfData = data.length -1;
            setActiveWeek(data[numberOfData].id);
            let curentData = data.filter( (e)=> e.id == data[numberOfData].id);
            setJournalId(data[numberOfData].id);
            setJournalClass(curentData[0].journal_classes);
            setJournalSelf(curentData[0].journal_selfs);
            setGoal(curentData[0].journal_goals)
        }
    },[data]);
    useEffect(()=>{
        setShowAddModal(false)
        if(data && data.length>0){
            let curentData = data.filter( (e)=> e.id == activeWeek)[0];
            setJournalId(curentData.id);
            setJournalClass(curentData.journal_classes);
            setJournalSelf(curentData.journal_selfs);
            setGoal(curentData.journal_goals)
        }
    },[activeWeek])
    useEffect(()=>{
        console.log(journalTimes)
    },[journalId]);
    const AddJournalSubmit = async () => {
        if(data.length >= journalTimes.length ){
            toast.error('Add failed: '+'Can not add journal over current quantity');
            return;
        }
        const nextIndextProcess = data ? data.length : 0;
        const journalTimeId = journalTimes[nextIndextProcess].id;
        console.log(journalTimeId);
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/journal`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                journalTimeId : journalTimeId ,
                course_student_id : id
                }),
            });

            if (response.ok) {
                const result = await response.json();
                changeOposite();
                 toast.success('Add success ');
            } else {
                console.error("Save failed:", await response.text());
            }
        } catch (error) {
            console.error("Error saving link:", error);
        }
    }
    const smaillGoalColumns = [
        { label: "#", key: "id", width: "2.5rem" },
        { label: "Title", key: "title" },
        { label: "Date", key: "date", width: "7rem" },
        { label: "Status", key: "state", width: "5rem" },
        { label: "Created at", key: "created_at", width: "5rem" },
        { label: "Updated_at", key: "updated_at", width: "5rem" }
    ];
    const inClassColumns = [
        { label: "Date", key: "date", width: "7rem" },
        { label: "Topic", key: "topic", width: "7rem" },
        { label: "Description", key: "description" },
        { label: "Created at", key: "created_at", width: "5rem" },
        { label: "Updated_at", key: "updated_at", width: "5rem" }
    ];


return (
    <div className="w-100 h-100 d-flex justify-content-start  flex-column  position-relative" style={{overflowY: "auto"}} >
        {(showAddModal=='goal' && journalId>-1) && (<AddGoalModal changeOposite={changeOposite} setShowAddModal ={setShowAddModal} journalId={journalId}></AddGoalModal>)}
        <div className=" mb-1 mt-1  position-sticky top-0" >
            <div className="d-flex justify-content-start  align-items-center gap-2">
                <div>Processes: <span>{journalTimes ? journalTimes.length : 0}/{data ? data.length : 0}</span> </div>
                {currentRole == "student" && (
                    <button onClick={AddJournalSubmit} className="btn-sm ml-2 btn-outline-dark mr-6" type="button" >
                        <i className="fas fa-plus"></i>
                    </button>
                )}
                <div className="d-flex justify-content-start  gap-2">
                    <select onChange={changeTable} className="rounded border-dark px-2 ">
                        <option value="goal">Goal</option>
                        <option value="class">Class</option>
                        <option value="self">Self</option>
                    </select>
                    <div className="mr-2">
                        <span>Start day: <span>{journalTimes && journalTimes.length > 0 ? journalTimes[indexProcess].start_date : null}</span></span>
                    </div>
                    <div className="mr-2">
                        <span>End day: <span>{journalTimes && journalTimes.length > 0 ? journalTimes[indexProcess].end_date : null}</span></span>
                    </div>
                </div> 
            </div>
            <div className="d-flex justify-content-start mt-3">
                {data.map((week,index) => (
                <TabButton
                    key={week.id}
                    active={activeWeek === week.id}
                    onClick={() => {setDetail([]); setActiveWeek(week.id)}}
                >
                    {"Process "+(index+1)}
                </TabButton>
                ))}
            </div>
            
        </div>     
        <div className="d-flex pb-0 flex-1 justify-content-start"  >
            <div className="flex-grow d-flex justify-content-start flex-column  gap-3 pb-0 rounded-3" style={{flex:1,overflowY: "auto"}}>
                {typeTable == "goal"?(
                <TableSection
                    journalTime = {journalTimes && journalTimes.length > 0 ? journalTimes[indexProcess] : null}
                    setShowAddModal={setShowAddModal}
                    title="1"
                    columns={smaillGoalColumns}
                    rows={goal}
                    click = {setDetail}
                    detaiStatus = {detaiStatus}
                />
                ): typeTable=="class" ?(
                <TableSection
                    journalTime = {journalTimes && journalTimes.length > 0 ? journalTimes[indexProcess] : null}
                    title="2"
                    columns={inClassColumns}
                    rows={journalClass}
                    click = {setDetail}
                    setShowAddModal={setShowAddModal}
                    detaiStatus ={detaiStatus}
                />
                ): typeTable == "self" &&(
                    <TableSection
                    journalTime = {journalTimes && journalTimes.length > 0 ? journalTimes[indexProcess] : null}
                    title="3"
                    columns={inClassColumns}
                    rows={journalSelf}
                    click = {setDetail}
                    setShowAddModal={setShowAddModal}
                    detaiStatus = {detaiStatus}
                />
                )}
                {showAddModal === "class" && (
                <CreateClassForm
                    changeOposite={changeOposite} setShowAddModal ={setShowAddModal} journalId={journalId}
                    
                />
                )}
                {showAddModal === "self" && (
                <CreateSelfForm
                    changeOposite={changeOposite} setShowAddModal ={setShowAddModal} journalId={journalId}
                />
                )}
            </div>
            {/* part 2 */}
            <div className={`pl-3 ml-2${detaiStatus && detaiStatus.length > 0 ? "" : "d-none"}`} style={{ height:"400px",overflowY: "auto"}}>
                {detaiStatus[0] ==1 
                ?
                <GoalBox setDetail={setDetail} changeOposite={changeOposite} data={goal.filter((e)=> e.id == detaiStatus[1])[0]}></GoalBox>
                : detaiStatus[0] ==2 
                ?<ClassBox setDetail={setDetail} changeOposite={changeOposite} data={journalClass.filter((e)=> e.id == detaiStatus[1])[0]}></ClassBox>
                : detaiStatus[0] == 3 
                ?<DetailBox setDetail={setDetail} changeOposite={changeOposite} data={journalSelf.filter((e)=> e.id == detaiStatus[1])[0]}></DetailBox>
                : ""}

            </div>
        </div>
    </div>
);
}
export default LearningJournal;