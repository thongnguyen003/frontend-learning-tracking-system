import React, { useState, useEffect } from 'react';

const CourseEditModal = ({ course, onClose, onSave }) => {
  const [name, setName] = useState(course.course_name);
  const [startDay, setStartDay] = useState(course.start_day);
  const [endDay, setEndDay] = useState(course.end_day);
  const [error, setError] = useState('');

  useEffect(() => {
    setName(course.course_name);
    setStartDay(course.start_day);
    setEndDay(course.end_day);
  }, [course]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !startDay || !endDay) {
      setError('All fields are required.');
      return;
    }
    onSave({ ...course, course_name: name, start_day: startDay, end_day: endDay });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-lg font-semibold mb-4">Edit Course</h2>
        <form onSubmit={handleSubmit}>
          {error && <div className="text-red-500 mb-2">{error}</div>}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Course Name</label>
            <input type="text" className="border rounded-md w-full p-2" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Start Day</label>
            <input type="date" className="border rounded-md w-full p-2" value={startDay} onChange={(e) => setStartDay(e.target.value)} required />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">End Day</label>
            <input type="date" className="border rounded-md w-full p-2" value={endDay} onChange={(e) => setEndDay(e.target.value)} required />
          </div>
          <div className="flex justify-end">
            <button type="button" onClick={onClose} className="bg-gray-300 text-black rounded-md px-4 py-1 mr-2">Cancel</button>
            <button type="submit" className="bg-blue-500 text-white rounded-md px-4 py-1">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CourseEditModal;