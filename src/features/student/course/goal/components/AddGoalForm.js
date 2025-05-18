import React, { useState } from 'react';
import '../../../styles/addGoalForm.css';

export default function AddGoalForm({
  newGoalContent,
  onNewGoalChange,
  onAddGoal,
  loading,
  error
}) {
  const [showForm, setShowForm] = useState(false);

  const handleToggleForm = () => {
    setShowForm(!showForm);
  };

  const handleSubmit = () => {
    if (newGoalContent.trim() === '') return;
    onAddGoal();
    if (!error) setShowForm(false);
  };

  return (
    <div className="add-goal-form-container">
      {/* Nút + ẩn khi form đang mở */}
      <button
        onClick={handleToggleForm}
        className={`add-goal-toggle-button ${showForm ? 'hidden' : ''}`}
        title="Add Goal"
      >
        +
      </button>

      {/* Form modal nằm giữa màn hình */}
      {showForm && (
        <div className="add-goal-overlay" onClick={handleToggleForm}>
          <div className="add-goal-form" onClick={e => e.stopPropagation()}>
            <input
              type="text"
              placeholder="What's your goal?"
              value={newGoalContent}
              onChange={onNewGoalChange}
              className="add-goal-input"
              autoFocus
            />
            <div className="add-goal-buttons">
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="add-goal-button"
              >
                {loading ? 'Adding...' : 'Add Goal'}
              </button>
              <button
                onClick={handleToggleForm}
                className="add-goal-cancel-button"
              >
                Cancel
              </button>
            </div>
            {error && <div className="add-goal-error">{error}</div>}
          </div>
        </div>
      )}
    </div>
  );
}
