import React, { useState, useEffect, useCallback } from 'react';
import { useApi } from '../../../hooks/useApi';
import StudentCalendar from '../../../components/common/StudentCalendar';
import { useNavigate } from 'react-router-dom';
import { FiCalendar, FiUsers, FiUser, FiHome, FiTrendingUp } from 'react-icons/fi';
import { BsArrowLeftRight } from 'react-icons/bs';
import { toast } from 'react-toastify';

const AdminDashboard = () => {
  const [classes, setClasses] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedClassId, setSelectedClassId] = useState('');
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const [apiError, setApiError] = useState(null);
  const [stats, setStats] = useState(null);
  const navigate = useNavigate();
  const role = localStorage.getItem('role');
  const userId = localStorage.getItem('userId');
  const { apiCall, loading, error } = useApi();

  // Redirect unauthorized users
  useEffect(() => {
    if (!['admin', 'teacher'].includes(role)) {
      navigate('/');
    }
  }, [navigate, role]);

  // Fetch classes and stats based on user role
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch classes
        const classesUrl =
          role === 'admin'
            ? 'http://127.0.0.1:8000/api/admin/classes'
            : `http://127.0.0.1:8000/api/class/getByTeacherId/${userId}`;

        const classesData = await apiCall(classesUrl, 'GET');
        setClasses(Array.isArray(classesData.data) ? classesData.data : []);

        // Fetch dashboard stats
      } catch (err) {
        const errorMessage = err.response?.data?.message || err.message || 'Failed to fetch data';
        setApiError(errorMessage);
        toast.error(errorMessage);
        console.error('Error fetching data:', err);
      }
    };

    fetchData();
  }, [role, userId, apiCall]);

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
        setStudents(Array.isArray(data.data) ? data.data : []);
      } catch (err) {
        const errorMessage = err.response?.data?.message || err.message || 'Failed to fetch students';
        setApiError(errorMessage);
        toast.error(errorMessage);
        console.error('Error fetching students:', err);
      }
    };

    fetchStudents();
  }, [selectedClassId, apiCall]);

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
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Student Attendance Dashboard</h1>
            <p className="text-gray-600 mt-1">Track and manage student attendance records</p>
          </div>
          <div className="flex items-center space-x-2">
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
              {role === 'admin' ? 'Administrator' : 'Teacher'}
            </span>
          </div>
        </div>

        {/* Stats Cards */}
        {stats && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Total Classes</p>
                  <p className="text-2xl font-bold text-gray-800 mt-1">{stats.totalClasses}</p>
                </div>
                <div className="p-3 rounded-full bg-blue-50 text-blue-600">
                  <FiHome className="text-xl" />
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Total Students</p>
                  <p className="text-2xl font-bold text-gray-800 mt-1">{stats.totalStudents}</p>
                </div>
                <div className="p-3 rounded-full bg-green-50 text-green-600">
                  <FiUsers className="text-xl" />
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Today's Attendance</p>
                  <p className="text-2xl font-bold text-gray-800 mt-1">{stats.todayAttendance}</p>
                </div>
                <div className="p-3 rounded-full bg-purple-50 text-purple-600">
                  <FiCalendar className="text-xl" />
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Attendance Rate</p>
                  <p className="text-2xl font-bold text-gray-800 mt-1">{stats.attendanceRate}%</p>
                </div>
                <div className="p-3 rounded-full bg-amber-50 text-amber-600">
                  <FiTrendingUp className="text-xl" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Error Display */}
          {displayError && typeof displayError === 'string' && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">{displayError}</p>
                </div>
              </div>
            </div>
          )}
          {displayError && typeof displayError !== 'string' && console.error('Invalid error object:', displayError)}

          {/* Loading Indicator */}
          {loading && (
            <div className="p-8 flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          )}

          {/* Selection Panel */}
          <div className="p-6 border-b border-gray-200">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Class Selector */}
              <div>
                <label htmlFor="class-select" className="block text-sm font-medium text-gray-700 mb-2">
                  Select Class
                </label>
                <div className="relative">
                  <select
                    id="class-select"
                    onChange={handleClassChange}
                    value={selectedClassId}
                    disabled={loading}
                    className="block w-full pl-3 pr-10 py-3 text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md disabled:bg-gray-100 appearance-none transition-colors"
                  >
                    <option value="">Select a class</option>
                    {classes.map((cls) => (
                      <option key={cls.id} value={cls.id}>
                        {cls.name} ({cls.student_count} students)
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg
                      className="h-5 w-5 text-gray-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Student Selector - Only shows when class is selected */}
              {selectedClassId && (
                <div>
                  <label htmlFor="student-select" className="block text-sm font-medium text-gray-700 mb-2">
                    Select Student
                  </label>
                  <div className="relative">
                    <select
                      id="student-select"
                      onChange={handleStudentChange}
                      value={selectedStudentId || ''}
                      disabled={loading || !students.length}
                      className="block w-full pl-3 pr-10 py-3 text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md disabled:bg-gray-100 appearance-none transition-colors"
                    >
                      <option value="">Select a student</option>
                      {students.map((student) => (
                        <option key={student.id} value={student.id}>
                          {student.student_name} ({student.attendance_rate || 0}% attendance)
                        </option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <FiUser className="h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Calendar Section */}
          {selectedStudentId && (
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-800 flex items-center">
                  <FiCalendar className="mr-2 text-blue-600" />
                  Attendance Calendar
                </h2>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                  {students.find((s) => s.id === selectedStudentId)?.student_name}
                </span>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
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