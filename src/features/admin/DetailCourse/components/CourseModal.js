import React from 'react';

const CourseModal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-lg font-semibold mb-4">Add Course</h2>
        <form>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Course Name</label>
            <input type="text" className="border rounded-md w-full p-2" placeholder="Enter course name" required />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Start Day</label>
            <input type="date" className="border rounded-md w-full p-2" required />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">End Day</label>
            <input type="date" className="border rounded-md w-full p-2" required />
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

export default CourseModal;