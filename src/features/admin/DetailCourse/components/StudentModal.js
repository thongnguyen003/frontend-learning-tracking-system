import React, { useState } from 'react';

const StudentModal = ({ onClose }) => {
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('');
  const [classId, setClassId] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !classId) {
      setError('Name and Class ID are required.');
      return;
    }
    // Add API call to save student here
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-lg font-semibold mb-4">Add Student</h2>
        <form onSubmit={handleSubmit}>
          {error && <div className="text-red-500 mb-2">{error}</div>}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Student Name</label>
            <input type="text" className="border rounded-md w-full p-2" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Avatar URL</label>
            <input type="text" className="border rounded-md w-full p-2" value={avatar} onChange={(e) => setAvatar(e.target.value)} />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Class ID</label>
            <input type="number" className="border rounded-md w-full p-2" value={classId} onChange={(e) => setClassId(e.target.value)} required />
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

export default StudentModal;