import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { useApi } from '../../../../hooks/useApi';
import GoalsList from './components/GoalsList';
import AddGoalForm from './components/AddGoalForm';
import '../../styles/courseGoal.css';
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

        <div className="flex-1 flex flex-col p-4 md:p-6 lg:p-8" style={{overflow:"hidden"}}>

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
        </div>
      </div>
    </div>
  );
}