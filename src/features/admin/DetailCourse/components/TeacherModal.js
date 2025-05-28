import React, { useState } from 'react';
import axios from 'axios';

const TeacherModal = ({ onClose }) => {
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name) {
      setError('Name is required.');
      return;
    }

    try {
      await axios.post('http://127.0.0.1:8000/api/admin/add-user', {
        users: [{ name, avatar, role: 'teacher' }],
      });
      onClose(); // Close modal after successful addition
    } catch (error) {
      setError('Error adding teacher: ' + error.response.data.message);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-lg font-semibold mb-4">Add Teacher</h2>
        <form onSubmit={handleSubmit}>
          {error && <div className="text-red-500 mb-2">{error}</div>}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Teacher Name</label>
            <input
              type="text"
              className="border rounded-md w-full p-2"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Avatar URL</label>
            <input
              type="text"
              className="border rounded-md w-full p-2"
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
            />
          </div>
          <div className="flex justify-end">
            <button type="button" onClick={onClose} className="bg-gray-300 text-black rounded-md px-4 py-1 mr-2">Cancel</button>
            <button type="submit" className="bg-blue-500 text-white rounded-md px-4 py-1">Add</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TeacherModal;