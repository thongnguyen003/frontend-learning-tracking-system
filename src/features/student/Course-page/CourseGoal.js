import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faBell, faPencilAlt, faTrashAlt, faPlus } from '@fortawesome/free-solid-svg-icons';
import { useParams } from "react-router-dom";

export default function LearningGoals() {
  const [goals, setGoals] = useState([]);
  let {id} = useParams();
  useEffect(() => {
    

    // Fetch data from the API
    const fetchGoals = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/course-goals/${id}`);
        const data = await response.json();
        console.log('Fetched data:', data);
        setGoals(data);
      } catch (error) {
        console.error('Error fetching goals:', error);
      }
    };

    fetchGoals();
  }, []);

  return (
    <div className="bg-[#ecf5f5]  font-sans">
      <div className="flex flex-col md:flex-row ">

        {/* Main Content */}
        <div className="flex-1 flex flex-col p-4 md:p-6 lg:p-8">

          {/* Goals List */}
          <div className="space-y-4 flex-1 overflow-auto pr-2">
            {goals.map((goal, index) => (
              <div key={goal.id} className="flex items-center bg-white rounded-lg shadow-md p-4">
                <div className="flex flex-col justify-center items-center w-10 h-10 border border-gray-300 rounded-md text-sm font-normal text-black select-none">
                  {index + 1}
                </div>
                <div className="flex-1 ml-4">
                  <div className="text-sm font-normal text-black select-none">{goal.content}</div>
                  <div className="text-xs font-normal text-gray-600 select-none mt-1">{goal.date}</div>
                </div>
                <div>
                  <div className="bg-[#00b33c] text-white text-xs font-semibold rounded-full px-3 py-1 select-none">
                    {goal.status}
                  </div>
                </div>
                <button aria-label="Edit" className="ml-6 text-black hover:text-gray-700 focus:outline-none">
                  <FontAwesomeIcon icon={faPencilAlt} className="text-lg" />
                </button>
                <button aria-label="Delete" className="ml-4 text-black hover:text-gray-700 focus:outline-none">
                  <FontAwesomeIcon icon={faTrashAlt} className="text-lg" />
                </button>
              </div>
            ))}
          </div>

          {/* Add Button */}
          <button
            aria-label="Add new goal"
            className="fixed bottom-8 right-8 w-14 h-14 rounded-full bg-[#00b33c] flex items-center justify-center shadow-lg hover:bg-[#00a32a] focus:outline-none"
          >
            <FontAwesomeIcon icon={faPlus} className="text-white text-3xl leading-none" />
          </button>
        </div>
      </div>
    </div>
  );
}