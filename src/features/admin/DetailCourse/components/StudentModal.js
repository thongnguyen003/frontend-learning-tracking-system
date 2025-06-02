import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StudentModal = ({ onClose, classId }) => {
  const [students, setStudents] = useState([]);
  const [selectedStudentId, setSelectedStudentId] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchStudents();
  }, []);

const fetchStudents = async () => {
  try {
    const response = await axios.get('http://127.0.0.1:8000/api/admin/students');
    console.log('Fetched students:', response.data); // Kiểm tra dữ liệu
    // Lấy danh sách sinh viên từ response.data.students
    setStudents(Array.isArray(response.data.students) ? response.data.students : []);
  } catch (error) {
    console.error("Error fetching students:", error);
    setStudents([]); // Đặt lại thành mảng rỗng nếu có lỗi
  }
};

const handleSubmit = async (e) => {
  e.preventDefault();
  if (!selectedStudentId) {
    setError('Please select a student.');
    return;
  }

  try {
    await axios.put(`http://127.0.0.1:8000/api/admin/users/${selectedStudentId}`, {
      class_id: classId, // Kiểm tra classId
      role: 'student',    // Phải có trường này
      // Thêm các trường cần thiết nếu cần
    });
    onClose(); // Đóng modal sau khi thêm thành công
  } catch (error) {
    console.error("Error updating student:", error);
    if (error.response) {
      console.error('Error data:', error.response.data);
      setError('Error updating student: ' + error.response.data.message);
    } else {
      setError('Error updating student.');
    }
  }
};

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-lg font-semibold mb-4">Add Student to Class</h2>
        <form onSubmit={handleSubmit}>
          {error && <div className="text-red-500 mb-2">{error}</div>}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Select Student</label>
        <select
          className="border rounded-md w-full p-2"
          value={selectedStudentId}
          onChange={(e) => setSelectedStudentId(e.target.value)}
          required
        >
          <option value="">Select a student</option>
          {students.length > 0 ? (
            students.map((student) => (
              <option key={student.id} value={student.id}>
                {student.student_name} {/* Kiểm tra trường này */}
              </option>
            ))
          ) : (
            <option disabled>No students available</option>
          )}
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

export default StudentModal;