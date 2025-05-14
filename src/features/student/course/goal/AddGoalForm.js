import React from 'react';
import '../../../../assets/css/AddGoalForm.css'; // Import your CSS file here

export default function AddGoalForm({ newGoalContent, onNewGoalChange, onAddGoal, loading, error }) {
  return (
    <div className="add-goal-form-container">
      <input
        type="text"
        placeholder="Add new goal"
        value={newGoalContent}
        onChange={onNewGoalChange}
        className="add-goal-input"
      />
      <button
        onClick={onAddGoal}
        disabled={loading}
        className="add-goal-button"
      >
        {loading ? 'Adding...' : 'Add Goal'}
      </button>
      {error && <div className="add-goal-error">{error}</div>}
    </div>
  );
}
