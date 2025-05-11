import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import '../../../assets/css/GoalsList.css';

export default function GoalsList({
  goals,
  editingGoal,
  onEditStart,
  onEditCancel,
  onEditSave,
  onDelete,
  onEditChange,
}) {
  return (
    <div className="goals-list-container">
      {goals.map((goal, index) => (
        <div key={goal.id} className="goal-item">
          <div className="goal-index">
            {index + 1}
          </div>
          <div className="goal-content">
            {editingGoal && editingGoal.id === goal.id ? (
              <input
                type="text"
                value={editingGoal.content}
                onChange={onEditChange}
                className="goal-input"
              />
            ) : (
              <div className="goal-text">{goal.content}</div>
            )}
            <div className="goal-date">{goal.date}</div>
          </div>
          <div>
            <div className="goal-status">
              {goal.status}
            </div>
          </div>
          {editingGoal && editingGoal.id === goal.id ? (
            <>
              <button
                aria-label="Save"
                onClick={onEditSave}
                className="goal-button goal-button-save"
              >
                Save
              </button>
              <button
                aria-label="Cancel"
                onClick={onEditCancel}
                className="goal-button goal-button-cancel"
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <button
                aria-label="Edit"
                onClick={() => onEditStart(goal)}
                className="goal-button goal-button-edit"
              >
                <FontAwesomeIcon icon={faPencilAlt} className="text-lg" />
              </button>
              <button
                aria-label="Delete"
                onClick={() => onDelete(goal.id)}
                className="goal-button goal-button-delete"
              >
                <FontAwesomeIcon icon={faTrashAlt} className="text-lg" />
              </button>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
