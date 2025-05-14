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
  const { apiCall, loading, error } = useApi();
  let { id } = useParams();

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const data = await apiCall(`/course-goals/getByCourseStudentId/${id}`, 'GET');
        setGoals(data);
      } catch (error) {
        console.error('Error fetching goals:', error);
      }
    };

    fetchGoals();
  }, [id, apiCall]);

  const addGoal = async () => {
    if (!newGoalContent.trim()) return;
    try {
      // Add default state and date fields to satisfy backend requirement
      const createdGoal = await apiCall('/course-goals', 'POST', { 
        content: newGoalContent, 
        course_student_id: id, 
        state: 'active',
        date: new Date().toISOString().split('T')[0] // format YYYY-MM-DD
      });
      setGoals(prevGoals => [...prevGoals, createdGoal]);
      setNewGoalContent('');
    } catch (error) {
      console.error('Error adding goal:', error);
    }
  };

  const startEditGoal = (goal) => {
    setEditingGoal(goal);
  };

  const cancelEdit = () => {
    setEditingGoal(null);
  };

  const saveEditGoal = async () => {
    if (!editingGoal.content.trim()) return;
    try {
      // Add required fields for update
      const updatedGoal = await apiCall(`/course-goals/${editingGoal.id}`, 'PUT', { 
        content: editingGoal.content,
        course_student_id: id,
        state: editingGoal.state || 'active',
        date: editingGoal.date || new Date().toISOString().split('T')[0]
      });
      setGoals(prevGoals => prevGoals.map(g => (g.id === updatedGoal.id ? updatedGoal : g)));
      setEditingGoal(null);
    } catch (error) {
      console.error('Error updating goal:', error);
    }
  };

  const deleteGoal = async (goalId) => {
    try {
      await apiCall(`/course-goals/${goalId}`, 'DELETE');
      setGoals(prevGoals => prevGoals.filter(g => g.id !== goalId));
    } catch (error) {
      console.error('Error deleting goal:', error);
    }
  };

  const handleEditChange = (e) => {
    setEditingGoal({ ...editingGoal, content: e.target.value });
  };

  return (
    <div className="course-goal-container">
      <div className="course-goal-content">

        {/* Main Content */}
        <div className="flex-1 flex flex-col p-4 md:p-6 lg:p-8">

          <GoalsList
            goals={goals}
            editingGoal={editingGoal}
            onEditStart={startEditGoal}
            onEditCancel={cancelEdit}
            onEditSave={saveEditGoal}
            onDelete={deleteGoal}
            onEditChange={handleEditChange}
          />

          <AddGoalForm
            newGoalContent={newGoalContent}
            onNewGoalChange={(e) => setNewGoalContent(e.target.value)}
            onAddGoal={addGoal}
            loading={loading}
            error={error}
          />
        </div>
      </div>
    </div>
  );
}
