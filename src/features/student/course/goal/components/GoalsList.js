import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import '../../../styles/goalsList.css';
const GoalsList = ({
  goals,
  editingGoal,
  onEditStart,
  onEditCancel,
  onEditSave,
  onDelete,
  onEditChange,
  onToggleStatus,
}) => {
  return (
    <div className="goals-list-wrapper">
      <div className="goals-list-container">
        {goals.map((goal, index) => {
          const isEditing = editingGoal && editingGoal.id === goal.id;
          return (
            <div key={goal.id} className="goal-item">
              <div className="goal-index">{index + 1}</div>
              <div className="goal-content">
                {isEditing ? (
                  <input
                    type="text"
                    value={editingGoal.content}
                    onChange={onEditChange}
                    className="goal-text"
                  />
                ) : (
                  <div className="goal-text">{goal.content}</div>
                )}
                <div className="goal-date">{goal.date}</div>
              </div>

              <select
                value={goal.state}
                onChange={(e) => onToggleStatus({ ...goal, state: e.target.value })}
                className="goal-status"
                aria-label="Change status"
                title="Change goal status"
              >
                <option value="" className="text-black"></option>
                <option value="done" className="text-black">Done</option>
                <option value="not_done" className="text-black">Not Done</option>
                <option value="need_to_fix" className="text-black">Need to Fix</option>

              </select>

              {isEditing ? (
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
          );
        })}
      </div>
    </div>
  );
};

export default GoalsList;
