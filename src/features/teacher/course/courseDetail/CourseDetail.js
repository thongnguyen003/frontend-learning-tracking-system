import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const HeaderElement = () => {
  return (
    <div className="d-flex align-items-center">
      <span className="me-3 fs-5" style={{ cursor: "pointer" }}>
        <Link to="/teacher">&larr; Teacher Dashboard</Link>
      </span>
    </div>
  );
};

const CourseDetail = () => {
  const [course, setCourse] = useState(null);
  const [journalTimes, setJournalTimes] = useState([]);

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/course/getByCourseId/9');
        setCourse(response.data.original);
      } catch (error) {
        console.error("Error fetching course data:", error);
      }
    };

    const fetchJournalTimes = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/journal-times/course/9');
        setJournalTimes(response.data); // Assuming the response is an array
      } catch (error) {
        console.error("Error fetching journal times:", error);
      }
    };

    fetchCourseData();
    fetchJournalTimes();
  }, []);

  if (!course) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-[#f0f2ff] min-h-screen p-6 font-sans">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-6">
        <div className="flex flex-col gap-6 flex-1">
          {/* First Card */}
            <div className="bg-white rounded-xl p-6 shadow-sm relative">
            <div className="flex justify-between items-start">
                <h2 className="font-extrabold text-lg leading-6">{course.course_name}</h2>
                <FontAwesomeIcon icon={faPencilAlt} className="text-2xl text-gray-800" />
            </div>
            {/* Always show Start day - End day */}
            <div className="mt-4 flex items-center gap-2 text-sm font-semibold">
                <span>Start day - End day</span>
                <FontAwesomeIcon icon={faCalendarAlt} className="text-lg" />
            </div>
            <div className="mt-2 flex gap-3">
                <span className="bg-[#00b517] text-white rounded px-3 py-1 text-sm font-medium select-none">
                {journalTimes.start_day || "N/A"}
                </span>
                <span className="bg-[#00b517] text-white rounded px-3 py-1 text-sm font-medium select-none">
                {journalTimes.end_day || "N/A"}
                </span>
            </div>
            </div>

          {/* Second Card */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="text-sm font-semibold flex items-center gap-2">
              <span>Weekly Deadline</span>
              <FontAwesomeIcon icon={faCalendarAlt} className="text-lg" />
            </div>
            {journalTimes.length > 0 ? (
              journalTimes.map((journal) => (
                <div key={journal.id} className="mt-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold">Start Date:</span>
                    <input type="text" value={journal.start_date || "N/A"} readOnly className="border border-gray-300 rounded px-2 py-1" />
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold">End Date:</span>
                    <input type="text" value={journal.end_date || "N/A"} readOnly className="border border-gray-300 rounded px-2 py-1" />
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold">Deadline:</span>
                    <input type="text" value={journal.deadline || "N/A"} readOnly className="border border-gray-300 rounded px-2 py-1" />
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold">Accept Deadline:</span>
                    <input type="text" value={journal.accept_deadline || "N/A"} readOnly className="border border-gray-300 rounded px-2 py-1" />
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold">Status:</span>
                    <input type="text" value={journal.status || "N/A"} readOnly className="border border-gray-300 rounded px-2 py-1" />
                  </div>
                </div>
              ))
            ) : (
              <div className="mt-4">No journal times found.</div>
            )}
          </div>
        </div>

        {/* Right Side Card */}
        <div className="bg-white rounded-xl p-6 shadow-sm w-full max-w-xs">
          <h3 className="font-extrabold text-base leading-6 mb-4">Edit Journal</h3>

          <label className="block text-xs font-normal mb-1" htmlFor="endday1">End day</label>
          <input
            id="endday1"
            type="text"
            placeholder={journalTimes.end_day || "N/A"}
            disabled
            className="w-full border border-black rounded px-2 py-1 text-xs text-gray-400 mb-4"
          />

          <label className="block text-xs font-normal mb-1" htmlFor="endday2">End day</label>
          <input
            id="endday2"
            type="text"
            defaultValue={journalTimes.end_day || ""}
            className="w-full border border-black rounded px-2 py-1 text-xs mb-4"
          />

          {/* Fixed checkboxes */}
          <div className="mt-4 flex gap-8 text-sm font-normal">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input type="checkbox" className="appearance-none w-5 h-5 rounded-full border border-gray-300 checked:bg-gray-300 checked:border-transparent focus:outline-none" />
              <span>In class</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input type="checkbox" className="appearance-none w-5 h-5 rounded-full border border-gray-300 checked:bg-gray-300 checked:border-transparent focus:outline-none" />
              <span>Small goals</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input type="checkbox" className="appearance-none w-5 h-5 rounded-full border border-gray-300 checked:bg-gray-300 checked:border-transparent focus:outline-none" />
              <span>Self</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;