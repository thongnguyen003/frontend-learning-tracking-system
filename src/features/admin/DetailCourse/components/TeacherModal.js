import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TeacherModal = ({ onClose, classId, onTeacherAdded }) => {
  const [teachers, setTeachers] = useState([]);
  const [selectedTeacherId, setSelectedTeacherId] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/admin/teachers');
        setTeachers(response.data.teachers);
      } catch (error) {
        console.error('Error fetching teachers:', error);
      }
    };

    fetchTeachers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedTeacherId) {
      setError('Please select a teacher.');
      return;
    }

    try {
      await axios.post('http://127.0.0.1:8000/api/class-teachers/', {
        class_id: classId,
        teacher_id: selectedTeacherId,
      });
      onTeacherAdded(); // Gọi hàm cập nhật danh sách giáo viên
      onClose(); // Đóng modal
    } catch (error) {
      setError('Error adding teacher to class: ' + error.response.data.message);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-lg font-semibold mb-4">Add Teacher to Class</h2>
        <form onSubmit={handleSubmit}>
          {error && <div className="text-red-500 mb-2">{error}</div>}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Select Teacher</label>
            <select
              className="border rounded-md w-full p-2"
              value={selectedTeacherId}
              onChange={(e) => setSelectedTeacherId(e.target.value)}
              required
            >
              <option value="">Select a teacher</option>
              {teachers.map((teacher) => (
                <option key={teacher.id} value={teacher.id}>
                  {teacher.name}
                </option>
              ))}
            </select>
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