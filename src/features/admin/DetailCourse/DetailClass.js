import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { FaArrowLeft, FaChalkboardTeacher, FaUserGraduate, FaBook, FaTrash, FaInfoCircle, FaPlus } from 'react-icons/fa';
import TeacherModal from './components/TeacherModal';
import StudentModal from './components/StudentModal';

const DetailClass = () => {
  const { classId } = useParams();
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [showTeacherModal, setShowTeacherModal] = useState(false);
  const [showStudentModal, setShowStudentModal] = useState(false);
  const [isLoading, setIsLoading] = useState({
    students: true,
    teachers: true,
    courses: true,
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchStudents();
    fetchTeachers();
    fetchCourses();
  }, [classId]);

  const fetchStudents = async () => {
    try {
      setIsLoading((prev) => ({ ...prev, students: true }));
      const response = await axios.get(`http://127.0.0.1:8000/api/students/classes/${classId}`);
      setStudents(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error('Error fetching students:', error);
      setError('Failed to load students');
    } finally {
      setIsLoading((prev) => ({ ...prev, students: false }));
    }
  };

  const fetchTeachers = async () => {
    try {
      setIsLoading((prev) => ({ ...prev, teachers: true }));
      const response = await axios.get(`http://127.0.0.1:8000/api/class-teachers/class/${classId}/teachers`);
      setTeachers(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error('Error fetching teachers:', error);
      setError('Failed to load teachers');
    } finally {
      setIsLoading((prev) => ({ ...prev, teachers: false }));
    }
  };

  const fetchCourses = async () => {
    try {
      setIsLoading((prev) => ({ ...prev, courses: true }));
      const response = await axios.get(`http://127.0.0.1:8000/api/course/getByClassId/${classId}`);
      setCourses(Array.isArray(response.data.original) ? response.data.original : []);
    } catch (error) {
      console.error('Error fetching courses:', error);
      setError('Failed to load courses');
    } finally {
      setIsLoading((prev) => ({ ...prev, courses: false }));
    }
  };

  const deleteStudentFromClass = async (studentId) => {
    if (isProcessing) return;
    setIsProcessing(true);
    try {
      await axios.put(`http://127.0.0.1:8000/api/admin/users/${studentId}`, {
        class_id: null,
        role: 'student',
      });
      await fetchStudents();
    } catch (error) {
      console.error('Error removing student from class:', error.message);
      setError('Failed to remove student');
    } finally {
      setIsProcessing(false);
    }
  };

  const deleteTeacher = async (teacherId) => {
    if (isProcessing) return;
    setIsProcessing(true);
    try {
      await axios.delete(`http://127.0.0.1:8000/api/class-teachers/`, {
        data: {
          teacher_id: teacherId,
          class_id: classId,
        },
      });
      await fetchTeachers();
    } catch (error) {
      console.error('Error deleting teacher from class:', error.message);
      setError('Failed to remove teacher');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleTeacherAdded = () => {
    fetchTeachers();
    setShowTeacherModal(false);
  };

  const handleStudentAdded = () => {
    fetchStudents();
    setShowStudentModal(false);
  };

  const renderTeachers = () => {
    if (isLoading.teachers) {
      return (
        <div className="p-8 flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      );
    }
    if (!Array.isArray(teachers) || teachers.length === 0) {
      return <div className="p-6 text-center text-gray-500">No teachers assigned to this class</div>;
    }
    return teachers.map((teacher, index) => (
      <div key={teacher.id} className="p-4 hover:bg-gray-50 transition-colors duration-150">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-gray-500 font-medium w-6 text-right">{index + 1}.</span>
            <img
              alt={teacher.teacher_name}
              className="w-10 h-10 rounded-full object-cover border-2 border-white shadow"
              src={teacher.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(teacher.teacher_name)}&background=random`}
            />
            <div>
              <h3 className="font-medium text-gray-800">{teacher.teacher_name}</h3>
              <p className="text-xs text-gray-500">Teacher ID: {teacher.id}</p>
            </div>
          </div>
          <button
            onClick={() => deleteTeacher(teacher.id)}
            className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-50 transition-colors duration-200"
            title="Remove teacher"
            disabled={isProcessing}
          >
            <FaTrash className="text-sm" />
          </button>
        </div>
      </div>
    ));
  };

  const renderStudents = () => {
    if (isLoading.students) {
      return (
        <div className="p-8 flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-green-500"></div>
        </div>
      );
    }
    if (!Array.isArray(students) || students.length === 0) {
      return <div className="p-6 text-center text-gray-500">No students enrolled in this class</div>;
    }
    return students.map((student, index) => (
      <div key={student.id} className="p-4 hover:bg-gray-50 transition-colors duration-150">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-gray-500 font-medium w-6 text-right">{index + 1}.</span>
            <img
              alt={student.student_name}
              className="w-10 h-10 rounded-full object-cover border-2 border-white shadow"
              src={student.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(student.student_name)}&background=random`}
            />
            <div>
              <h3 className="font-medium text-gray-800">{student.student_name}</h3>
              <p className="text-xs text-gray-500">Student ID: {student.id}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Link
              to={`/profile?studentId=${student.id}`}
              className="text-blue-600 hover:text-blue-800 p-2 rounded-full hover:bg-blue-50 transition-colors duration-200"
              title="View profile"
            >
              <FaInfoCircle className="text-sm" />
            </Link>
            <button
              onClick={() => deleteStudentFromClass(student.id)}
              className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-50 transition-colors duration-200"
              title="Remove student"
              disabled={isProcessing}
            >
              <FaTrash className="text-sm" />
            </button>
          </div>
        </div>
      </div>
    ));
  };

  const renderCourses = () => {
    if (isLoading.courses) {
      return (
        <div className="p-8 flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      );
    }
    if (!Array.isArray(courses) || courses.length === 0) {
      return <div className="p-6 text-center text-gray-500">No courses assigned to this class</div>;
    }
    return courses.map((course) => (
      <div key={course.id} className="p-4 hover:bg-gray-50 transition-colors duration-150">
        <div className="flex justify-between">
          <div>
            <h3 className="font-medium text-gray-800">{course.course_name}</h3>
            <p className="text-sm text-gray-600 mt-1">
              <span className="font-medium">Instructor:</span> {course.teacher?.teacher_name || 'Not assigned'}
            </p>
            <div className="flex gap-4 mt-2">
              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                Start: {new Date(course.start_day).toLocaleDateString()}
              </span>
              <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded">
                End: {new Date(course.end_day).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
      </div>
    ));
  };

  return (
    <div className="bg-gray-50 min-h-screen p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="flex items-center gap-4 border-b-2 border-indigo-200 pb-4 mb-6">
          <Link
            to="/admin/classes"
            className="text-indigo-600 hover:text-indigo-800 transition-colors duration-200"
            aria-label="Back"
          >
            <FaArrowLeft className="text-xl" />
          </Link>
          <h1 className="text-2xl font-bold text-gray-800">Class Details</h1>
        </header>

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded">
            <p>{error}</p>
          </div>
        )}

        <main className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Teachers Section */}
            <section className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-5 border-b border-gray-200 bg-gradient-to-r from-indigo-50 to-purple-50">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                    <FaChalkboardTeacher className="text-indigo-600" />
                    Teachers <span className="text-indigo-600">({teachers.length})</span>
                  </h2>
                  <button
                    onClick={() => setShowTeacherModal(true)}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1.5 rounded-md text-sm flex items-center gap-1 transition-colors duration-200"
                    disabled={isProcessing}
                  >
                    <FaPlus className="text-xs" />
                    Add Teacher
                  </button>
                </div>
              </div>
              <div className="divide-y divide-gray-200">{renderTeachers()}</div>
            </section>

            {/* Courses Section */}
            <section className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-5 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-cyan-50">
                <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  <FaBook className="text-blue-600" />
                  Courses <span className="text-blue-600">({courses.length})</span>
                </h2>
              </div>
              <div className="divide-y divide-gray-200">{renderCourses()}</div>
            </section>
          </div>

          {/* Right Column - Students Section */}
          <section className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-5 border-b border-gray-200 bg-gradient-to-r from-green-50 to-teal-50">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  <FaUserGraduate className="text-green-600" />
                  Students <span className="text-green-600">({students.length})</span>
                </h2>
                {/* <button
                  onClick={() => setShowStudentModal(true)}
                  className="bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded-md text-sm flex items-center gap-1 transition-colors duration-200"
                  disabled={isProcessing}
                >
                  <FaPlus className="text-xs" />
                  Add Student
                </button> */}
              </div>
            </div>
            <div className="divide-y divide-gray-200">{renderStudents()}</div>
          </section>
        </main>
      </div>

      {/* Modals */}
      {showTeacherModal && (
        <TeacherModal onClose={() => setShowTeacherModal(false)} classId={classId} onTeacherAdded={handleTeacherAdded} />
      )}
      {showStudentModal && (
        <StudentModal onClose={() => setShowStudentModal(false)} classId={classId} onStudentAdded={handleStudentAdded} />
      )}
    </div>
  );
};

export default DetailClass;