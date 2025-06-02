import React, { useEffect, useState } from "react";
import { Link,useParams } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { counter } from "@fortawesome/fontawesome-svg-core";

const CourseInfo = () => {
  const [course, setCourse] = useState({
    course_name : "",
    start_day :  "",
    end_day :  "",
    next_deadline: "",
    next_date : "",
    accept_deadline : "",
    type_process : ""
  });
  const [journalTimes, setJournalTimes] = useState(null);
  const [endDay, setEndDay] = useState();
  const [statusEdit, setEStatusEdit] = useState(false);
  const changeEdit = ()=>{
    setEStatusEdit(!statusEdit)
  }
  
  const {id}=useParams();

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/course/getByCourseId/${id}`);
         const data = await response.data;
        if(data.error){
          console.log(data.error)
        }else{
          setCourse(data)
        }
      } catch (error) {
        console.error("Error fetching course data:", error);
      }
    };
    fetchCourseData();
  }, []);
  useEffect(()=>{
    if (course && course.journal_times) {
      const journal_times = course.journal_times.find((e) => e.status == 1);
      setJournalTimes(journal_times);
    }     
    if(course.next_date) {
        const day = new Date(course.next_date);
        const numberOfWeek = course.type_process == "1week" ? 1 : (course.type_process == "2week" ? 2 : (course.type_process == "3week" ? 3 : (course.type_process == "4week" ? 4 : 1)) );    
        setEndDay(getSundayFromDate(day,(numberOfWeek-1)))
    }
  },[course])
  const submitCourseInfo = async ()=>{
    console.log("sssss")
    const id = course.id
    const body = {
      course_name : course.course_name,
      start_day : course.start_day,
      end_day : course.end_day
    }
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/course/${id}`, {
          method: "PUT",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
      });

      if (response.ok) {
          const result = await response.json();
          console.log("Save successful:", result);
          setEStatusEdit(false);
      } else {
          console.error("Save failed:", await response.text());
      }
  } catch (error) {
      console.error("Error saving link:", error);
  }
  }
  const submitJournalDuration = async ()=>{
    console.log("sssss")
    const id = course.id
    const body = {
      next_deadline:course.next_deadline,
      next_date : course.next_date,
      accept_deadline : course.accept_deadline,
      type_process : course.type_process
    }
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/course/${id}`, {
          method: "PUT",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
      });

      if (response.ok) {
          const result = await response.json();
          console.log("Save successful:", result);
      } else {
          console.error("Save failed:", await response.text());
      }
  } catch (error) {
      console.error("Error saving link:", error);
  }
  }
  if (!course) {
    return <div>Loading...</div>;
  }
  function getSundayFromDate(date, weeksToAdd = 0) {
      const currentDay = date.getDay(); 
      const diffToSunday = 7 - currentDay; 
      const sunday = new Date(date);
      sunday.setDate(date.getDate() + diffToSunday + (weeksToAdd * 7));
      const year = sunday.getFullYear();
      const month = String(sunday.getMonth() + 1).padStart(2, '0'); // Tháng bắt đầu từ 0
      const day = String(sunday.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
  }
  const handleChange = (e) => {
    const name = e.target.name;
    if(name == "deadline"){
        const isChecked = e.target.checked;
        let typeDeadline = course.accept_deadline ? course.accept_deadline.split(',') : [];
        if(isChecked){
          typeDeadline.push(e.target.value)
        }else{
          typeDeadline = typeDeadline.filter((item)=> item != e.target.value);
        }
        typeDeadline = typeDeadline.filter((item)=> item == "goal" || item =="class" || item =="self");
        setCourse({ ...course, accept_deadline: typeDeadline.join(',') });
    }else{
      setCourse({...course,[name]:e.target.value})
    }
  }
  return (
    <div className="bg-[#f0f2ff] p-6 font-sans"  style={{width:"100%",height:"100%",overflow:"auto"}}>
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-6">
        <div className="flex flex-col gap-6 flex-1">
          {/* First Card */}
            <div className="bg-white rounded-xl p-6 shadow-sm relative">
              <div className="flex justify-between items-start">
                  <div className="flex items-center justify-between mb-2">
                    <span  className="font-semibold mr-2" style={{width:"100px"}}>Course name:</span>
                   <input onChange={handleChange} type="text" name="course_name" value={course.course_name } readOnly={!statusEdit} className="border border-gray-300 rounded px-2 py-1" />
                  </div>
                  <FontAwesomeIcon onClick={changeEdit} icon={faPencilAlt} className="text-2xl text-gray-800" />
              </div>
              {/* Always show Start day - End day */}
              <div className="mt-2 flex gap-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold mr-2" style={{width:"100px"}}>Start Date:</span>
                    <input onChange={handleChange} type="date" name="start_day"  value={course.start_day } readOnly={!statusEdit} className="border border-gray-300 rounded px-2 py-1" />
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold mr-2" style={{width:"100px"}}>End Date:</span>
                    <input onChange={handleChange} type="date" name="end_day" value={course.end_day }   readOnly={!statusEdit} className="border border-gray-300 rounded px-2 py-1" />
                  </div>
              </div>
              <div className="flex items-center  mb-2">
                  <span className="font-semibold mr-2" style={{width:"130px"}}>learning jounal:</span>
                 <span className="font-semibold mr-2">{(course && course.journal_times) ? course.journal_times.length :0}</span>
                </div>
                {statusEdit ?
                (<button className="btn btn-primary px-2 mt-4" onClick={submitCourseInfo} style={{width:"140px"}}> Change</button>):
                (<button className="btn btn-secondary px-2 mt-4" style={{width:"140px"}}> Achieve course</button>)}
                
            </div>

          {/* Second Card */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="text-sm font-semibold flex items-center gap-2">
              <span>Set time</span>
              <FontAwesomeIcon icon={faCalendarAlt} className="text-lg" />
            </div>
            
            <div className="mt-4">
                <div className="flex justify-between">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold mr-2">Start Date:</span>
                    <input type="date" onChange={handleChange}  name ="next_date" value={course.next_date }  className="border border-gray-300 rounded px-2 py-1" />
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold mr-2">End Date:</span>
                    <input type="date" value={endDay }   readOnly className="border border-gray-300 rounded px-2 py-1" />
                  </div>
                </div>
                <div className="flex items-center  mb-2">
                    <span className="font-semibold mr-2">Process Duration</span>
                    <select onChange={handleChange}  value={course.type_process} name = "type_process">
                      <option value="1week" >1week</option>
                      <option value="2week" >2week</option>
                      <option value="3week" >3week</option>
                      <option value="4week" >4week</option>
                    </select>
                  </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold">Deadline:</span>
                  <input type="time" onChange={handleChange}  name="next_deadline" value={course.next_deadline }  className="border border-gray-300 rounded px-2 py-1" />
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold">Accept Deadline:</span>
                </div>
                <div className="mt-4 flex gap-8 text-sm font-normal">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input type="checkbox" checked={typeof course.accept_deadline === "string" &&  course.accept_deadline.includes("class") } name="deadline" value="class" onChange={handleChange} className="appearance-none w-5 h-5 rounded-full border border-gray-300 checked:bg-gray-300 checked:border-transparent focus:outline-none" />
                    <span>In class</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input type="checkbox" checked={typeof course.accept_deadline === "string" && course.accept_deadline.includes("goal") } name="deadline" value="goal" onChange={handleChange}  className="appearance-none w-5 h-5 rounded-full border border-gray-300 checked:bg-gray-300 checked:border-transparent focus:outline-none" />
                    <span>Small goals</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input type="checkbox" checked={typeof course.accept_deadline === "string" &&  course.accept_deadline.includes("self") } name="deadline" value="self" onChange={handleChange}  className="appearance-none w-5 h-5 rounded-full border border-gray-300 checked:bg-gray-300 checked:border-transparent focus:outline-none" />
                    <span>Self</span>
                  </label>
                </div>
            </div>
                <button className="btn btn-primary px-2 mt-4" onClick={submitJournalDuration}> Change</button>
            
          </div>
        </div>

        {/* Right Side Card */}
        <div className="bg-white rounded-xl p-6 shadow-sm w-full max-w-xs">
          <h3 className="font-extrabold text-base leading-6 mb-4">Edit Current Journal</h3>
            {(journalTimes) ?(
              <RightSideCard journalTimes={journalTimes}></RightSideCard>
            ):(
              <>There isn't the jounal that is running </>
            )}
        </div>
      </div>
    </div>
  );
};

export default CourseInfo;

const RightSideCard = ({journalTimes}) => {
  const [data,setData] = useState({
    start_date : journalTimes.start_date,
    end_date : journalTimes.end_date,
    accept_deadline : journalTimes.accept_deadline,
    deadline : journalTimes.deadline
  })
  const handleSubmit = async ()=>{
    try {
        const id = journalTimes.id;
        const response = await fetch(`http://127.0.0.1:8000/api/journal-times/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            const result = await response.json();
            console.log("Save successful:", result);
        } else {
            console.error("Save failed:", await response.text());
        }
    } catch (error) {
        console.error("Error saving link:", error);
    }
  }
  const handleChange = (e) => {
    const name = e.target.name;
    if(name == "type"){
        const isChecked = e.target.checked;
        let typeDeadline = data.accept_deadline ? data.accept_deadline.split(',') : [];
        if(isChecked){
          typeDeadline.push(e.target.value)
        }else{
          typeDeadline = typeDeadline.filter((item)=> item != e.target.value);
        }
        typeDeadline = typeDeadline.filter((item)=> item == "goal" || item =="class" || item =="self");
        setData({ ...data, accept_deadline: typeDeadline.join(',') });
    }else{
      setData({...data,[name]:e.target.value})
    }
  }
  return (
    <form>
      <label className="block text-xs font-normal mb-1" htmlFor="endday1">Start day</label>
      <input
        name="start_date"
        type="date"
        value={data.start_date}
        onChange={handleChange}
        disabled
        className="w-full border border-black rounded px-2 py-1 text-xs text-gray-400 mb-4"
      />

      <label className="block text-xs font-normal mb-1" htmlFor="endday2">End day</label>
      <input
        name="end_date"
        type="date"
        value={data.end_date}
        onChange={handleChange}
        className="w-full border border-black rounded px-2 py-1 text-xs mb-4"
      />
      <label className="block text-xs font-normal mb-1" htmlFor="endday2">Deadline</label>
      <input
        type="time"
        name="deadline"
        value={data.deadline}
        onChange={handleChange}
        className="w-full border border-black rounded px-2 py-1 text-xs mb-4"
      />

      {/* Fixed checkboxes */}
      <div className="mt-4 flex gap-8 text-sm font-normal">
        <label className="flex items-center gap-2 cursor-pointer select-none">
          <input type="checkbox" checked={typeof data.accept_deadline === "string" &&  data.accept_deadline.includes("class") } name="type" value="class" onChange={handleChange} className="appearance-none w-5 h-5 rounded-full border border-gray-300 checked:bg-gray-300 checked:border-transparent focus:outline-none" />
          <span>In class</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer select-none">
          <input type="checkbox" checked={typeof data.accept_deadline === "string" && data.accept_deadline.includes("goal") } name="type" value="goal" onChange={handleChange}  className="appearance-none w-5 h-5 rounded-full border border-gray-300 checked:bg-gray-300 checked:border-transparent focus:outline-none" />
          <span>Small goals</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer select-none">
          <input type="checkbox" checked={typeof data.accept_deadline === "string" &&  data.accept_deadline.includes("self") } name="type" value="self" onChange={handleChange}  className="appearance-none w-5 h-5 rounded-full border border-gray-300 checked:bg-gray-300 checked:border-transparent focus:outline-none" />
          <span>Self</span>
        </label>
      </div>
      <button type="button" onClick={handleSubmit} className="btn btn-primary px-2 mt-4"> Change</button>
    </form>
  );
}