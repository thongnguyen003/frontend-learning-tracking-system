import React, { useState, useEffect, useCallback } from 'react';
import { useApi } from '../../../hooks/useApi';
import StudentCalendar from '../../../components/common/StudentCalendar';
import { useNavigate } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';

const AdminDashboard = () => {
  const [classes, setClasses] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedClassId, setSelectedClassId] = useState('');
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const [apiError, setApiError] = useState(null);
  const navigate = useNavigate();
  const role = localStorage.getItem('role');
  const userId = localStorage.getItem('userId');
  const { apiCall, loading, error } = useApi();

  // Redirect unauthorized users
  useEffect(() => {
    if (!['admin', 'teacher'].includes(role)) {
      navigate('/login');
    }
  }, [navigate, role]);

  // Fetch classes based on user role
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const url = role === 'admin'
          ? 'http://127.0.0.1:8000/api/admin/classes'
          : `http://127.0.0.1:8000/api/class/getByTeacherId/${userId}`;

        const data = await apiCall(url, 'GET');
        setClasses(data.data || []);
      } catch (err) {
        setApiError(err.message || 'Failed to fetch classes');
        console.error('Error fetching classes:', err);
      }
    };

    fetchClasses();
  }, [role, userId]); // Removed apiCall from dependencies

  // Fetch students when class is selected
  useEffect(() => {
    const fetchStudents = async () => {
      if (!selectedClassId) {
        setStudents([]);
        setSelectedStudentId(null);
        return;
      }

      try {
        const url = `http://127.0.0.1:8000/api/students/class/${selectedClassId}`;
        const data = await apiCall(url, 'GET');
        setStudents(data.data || []);
      } catch (err) {
        setApiError(err.message || 'Failed to fetch students');
        console.error('Error fetching students:', err);
      }
    };

    fetchStudents();
  }, [selectedClassId]); // Removed apiCall from dependencies

  const handleClassChange = useCallback((e) => {
    setSelectedClassId(e.target.value);
    setSelectedStudentId(null);
  }, []);

  const handleStudentChange = useCallback((e) => {
    setSelectedStudentId(e.target.value);
  }, []);

  // Combine API error and component error
  const displayError = error || apiError;

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-700 p-6 text-white">
          <h1 className="text-3xl font-bold">Student Visit Tracking</h1>
        </div>

        {/* Content */}
        <div className="p-6">
          {displayError && (
            <div className="mb-6 p-4 bg-red-200 border-l-4 border-red-600 text-red-800 rounded-md">
              <p className="font-semibold">{displayError}</p>
            </div>
          )}

          {loading && (
            <div className="mb-6 p-4 bg-blue-100 text-blue-700 text-center rounded-md">
              <Spinner animation="border" role="status" />
              <span className="ml-2">Loading...</span>
            </div>
          )}

          {/* Selection Panel */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Class Selector */}
            <div className="bg-white p-4 rounded-lg shadow-md">
              <label htmlFor="class-select" className="block text-sm font-medium text-gray-700 mb-2">
                Select Class
              </label>
              <select
                id="class-select"
                onChange={handleClassChange}
                value={selectedClassId}
                disabled={loading}
                className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
              >
                <option value="">Select a class</option>
                {classes.map((cls) => (
                  <option key={cls.id} value={cls.id}>
                    {cls.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Student Selector - Only shows when class is selected */}
            {selectedClassId && (
              <div className="bg-white p-4 rounded-lg shadow-md">
                <label htmlFor="student-select" className="block text-sm font-medium text-gray-700 mb-2">
                  Select Student
                </label>
                <select
                  id="student-select"
                  onChange={handleStudentChange}
                  value={selectedStudentId || ''}
                  disabled={loading || !students.length}
                  className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                >
                  <option value="">Select a student</option>
                  {students.map((student) => (
                    <option key={student.id} value={student.id}>
                      {student.student_name}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {/* Calendar Section */}
          {selectedStudentId && (
            <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Attendance Calendar</h2>
              <div className="bg-gray-50 p-4 rounded-lg">
                <StudentCalendar studentId={selectedStudentId} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;