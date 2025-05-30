import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import JournalMessage from '../../message/JournalMessage';

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
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [messages, setMessages] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [newMessage, setNewMessage] = useState({ teacherId: '', content: '' });

  useEffect(() => {
    if (selectedGoal) {
      fetch(`http://127.0.0.1:8000/api/message/getByCourseGoal/${selectedGoal.id}`)
        .then((response) => response.json())
        .then((data) => {
          console.log('Fetched messages data:', data);
          setMessages(data[0]?.detail_messages || []);
        })
        .catch((error) => console.error('Error fetching messages:', error));
    } else {
      setMessages([]);
    }
  }, [selectedGoal]);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/teachers')
      .then((response) => response.json())
      .then((data) => setTeachers(data))
      .catch((error) => console.error('Error fetching teachers:', error));
  }, []);

  const handleAddMessage = () => {
    if (newMessage.content.trim() && newMessage.teacherId && selectedGoal) {
      const payload = {
        message_id: selectedGoal.id,
        teacher_id: newMessage.teacherId,
        content: newMessage.content,
      };
      console.log('Payload being sent:', payload);

      fetch('http://127.0.0.1:8000/api/message/detail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to add message');
          }
          return response.json();
        })
        .then((data) => {
          alert(data.message || 'Message added successfully!');
          return fetch(`http://127.0.0.1:8000/api/message/getByCourseGoal/${selectedGoal.id}`);
        })
        .then((response) => response.json())
        .then((data) => {
          setMessages(data[0]?.detail_messages || []);
          setNewMessage({ teacherId: '', content: '' });
        })
        .catch((error) => {
          console.error('Error adding message:', error);
          alert('Error adding message. Please try again.');
        });
    } else {
      alert('Please select a teacher and write a message.');
    }
  };

  return (
    <div className="goals-list-wrapper">
      <div className="goals-list-container">
        {goals.map((goal, index) => {
          const isEditing = editingGoal && editingGoal.id === goal.id;
          return (
            <div
              key={goal.id}
              className={`goal-item ${selectedGoal?.id === goal.id ? 'selected' : ''}`}
              onClick={() => setSelectedGoal(goal)}
            >
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
                  <button aria-label="Save" onClick={onEditSave} className="goal-button goal-button-save">
                    Save
                  </button>
                  <button aria-label="Cancel" onClick={onEditCancel} className="goal-button goal-button-cancel">
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button aria-label="Edit" onClick={() => onEditStart(goal)} className="goal-button goal-button-edit">
                    <FontAwesomeIcon icon={faPencilAlt} className="text-lg" />
                  </button>
                  <button aria-label="Delete" onClick={() => onDelete(goal.id)} className="goal-button goal-button-delete">
                    <FontAwesomeIcon icon={faTrashAlt} className="text-lg" />
                  </button>
                </>
              )}
            </div>
          );
        })}
      </div>

      {selectedGoal && (
        <div className="message-section">
          
            <JournalMessage type={"course" } id={selectedGoal.id}> 
              
            </JournalMessage>
        </div>
      )}
    </div>
  );
};

export default GoalsList;
