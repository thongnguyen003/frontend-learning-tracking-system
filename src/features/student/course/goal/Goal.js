import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { useApi } from '../../../../hooks/useApi';
import GoalsList from './GoalsList';
import AddGoalForm from './AddGoalForm';
import '../../../../assets/css/courseGoal.css';

export default function CourseGoal() {
  const [goals, setGoals] = useState([]);
  const [editingGoal, setEditingGoal] = useState(null);
  const [newGoalContent, setNewGoalContent] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { apiCall, loading } = useApi();
  let { id } = useParams();

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        setErrorMessage('');
        const data = await apiCall(`/course-goals/getByCourseStudentId/${id}`, 'GET');
        setGoals(data);
      } catch {
        setErrorMessage('Error loading goals. Please try again.');
      }
    };

    fetchGoals();
  }, [id]);

  const addGoal = async () => {
    if (!newGoalContent.trim()) return;
    try {
      setErrorMessage('');
      const createdGoal = await apiCall('/course-goals', 'POST', {
        content: newGoalContent,
        course_student_id: id,
        state: 'active',
        date: new Date().toISOString().split('T')[0]
      });
      setGoals(prevGoals => [...prevGoals, createdGoal]);
      setNewGoalContent('');
    } catch {
      setErrorMessage('Error adding new goal. Please try again.');
    }
  };

  const startEditGoal = (goal) => {
    setEditingGoal(goal);
    setErrorMessage('');
  };

  const cancelEdit = () => {
    setEditingGoal(null);
    setErrorMessage('');
  };

  const saveEditGoal = async () => {
    if (!editingGoal.content.trim()) return;
    try {
      setErrorMessage('');
      const updatedGoal = await apiCall(`/course-goals/${editingGoal.id}`, 'PUT', {
        content: editingGoal.content,
        course_student_id: id,
        state: editingGoal.state || 'active',
        date: editingGoal.date || new Date().toISOString().split('T')[0]
      });
      setGoals(prevGoals => prevGoals.map(g => (g.id === updatedGoal.id ? updatedGoal : g)));
      setEditingGoal(null);
    } catch {
      setErrorMessage('Error saving goal changes. Please try again.');
    }
  };

  const deleteGoal = async (goalId) => {
    try {
      setErrorMessage('');
      await apiCall(`/course-goals/${goalId}`, 'DELETE');
      setGoals(prevGoals => prevGoals.filter(g => g.id !== goalId));
    } catch {
      setErrorMessage('Error deleting goal. Please try again.');
    }
  };

  const toggleGoalStatus = async (goal) => {
    try {
      setErrorMessage('');
      const updatedGoal = await apiCall(`/course-goals/${goal.id}`, 'PUT', {
        content: goal.content,
        course_student_id: id,
        state: goal.state,
        date: goal.date || new Date().toISOString().split('T')[0],
      });
      setGoals(prevGoals =>
        prevGoals.map(g => (g.id === updatedGoal.id ? updatedGoal : g))
      );
    } catch {
      setErrorMessage('Error updating goal status. Please try again.');
    }
  };

  const handleEditChange = (e) => {
    if (!editingGoal) return;
    setEditingGoal({ ...editingGoal, content: e.target.value });
  };

  return (
    <div className="course-goal-containers">
      <div className="course-goal-content">

        {errorMessage && (
          <div style={{ color: 'red', marginBottom: '1rem', fontWeight: 'bold' }}>
            {errorMessage}
          </div>
        )}

        <div className="flex-1 flex flex-col p-4 md:p-6 lg:p-8">

          <GoalsList
            goals={goals}
            editingGoal={editingGoal}
            onEditStart={startEditGoal}
            onEditCancel={cancelEdit}
            onEditSave={saveEditGoal}
            onDelete={deleteGoal}
            onEditChange={handleEditChange}
            onToggleStatus={toggleGoalStatus}
          />

          <AddGoalForm
            newGoalContent={newGoalContent}
            onNewGoalChange={(e) => setNewGoalContent(e.target.value)}
            onAddGoal={addGoal}
            loading={loading}
            error={errorMessage}
          />
          {/* Goals List */}
          <div className="space-y-4 flex-1 overflow-auto pr-2">
            { goals && goals.length >0 ?
            goals.map((goal, index) => (
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
            ))
          : "Không có dữ liệu"
          }
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
