import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrashAlt, faChevronDown } from '@fortawesome/free-solid-svg-icons';

const StudentListPage = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/admin/students');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setStudents(data); // Giả sử response trả về là một mảng
      } catch (error) {
        console.error('Failed to fetch students:', error);
      }
    };

    fetchStudents();
  }, []);

  return (
    <div className="bg-[#f0f2f7] min-h-screen flex flex-col items-center pt-10 px-4">
      <div className="w-full max-w-3xl">
        <div className="flex justify-end items-center mb-6 space-x-4">
          <select aria-label="Filter" className="bg-white text-black text-xs font-semibold rounded-md shadow-md px-3 py-1 cursor-pointer focus:outline-none">
            <option>ALL</option>
          </select>
          <Link to="/add-item">
            <button aria-label="Add new item" className="bg-[#00b33c] rounded-full w-10 h-10 flex items-center justify-center shadow-md hover:bg-[#00992e] transition-colors">
              <FontAwesomeIcon icon={faPlus} className="text-white text-xl" />
            </button>
          </Link>
        </div>
        <ul className="space-y-2">
          {students.map(student => (
            <li key={student.id} className="bg-white rounded-md shadow-md flex items-center justify-between px-3 py-1.5">
              <div className="flex items-center space-x-4 min-w-0">
                <span className="font-bold text-xs whitespace-nowrap bg-white rounded px-2 py-0.5">{student.class.name}</span>
                <span className="text-xs truncate">{student.student_name}</span>
                <img alt="Avatar" className="w-6 h-6 rounded-full object-cover" src="https://storage.googleapis.com/a1aa/image/551eb16c-a986-4461-9e04-b5e0c5ccba93.jpg" />
              </div>
              <div className="flex items-center space-x-3 min-w-[140px] justify-end">
                <button className="bg-[#d94a4a] text-white text-xs font-semibold rounded-md px-2 py-0.5">Update</button>
                <button className="bg-[#d94a4a] text-white text-xs font-semibold rounded-md px-3 py-0.5">View</button>
                <button aria-label="Delete item" className="text-gray-600 hover:text-gray-900">
                  <FontAwesomeIcon icon={faTrashAlt} />
                </button>
              </div>
            </li>
          ))}
        </ul>
        <div className="flex justify-center mt-6">
          <FontAwesomeIcon icon={faChevronDown} className="text-2xl text-black" />
        </div>
      </div>
    </div>
  );
};

export default StudentListPage;