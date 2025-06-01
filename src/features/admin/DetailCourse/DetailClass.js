import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import TeacherModal from './components/TeacherModal';
import StudentModal from './components/StudentModal';
import CourseModal from './components/CourseModal';
import TeacherEditModal from './components/TeacherEditModal';
import StudentEditModal from './components/StudentEditModal';

const Dashboard = () => {
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [showTeacherModal, setShowTeacherModal] = useState(false);
  const [showStudentModal, setShowStudentModal] = useState(false);
  const [showCourseModal, setShowCourseModal] = useState(false);
  const [editTeacher, setEditTeacher] = useState(null);
  const [editStudent, setEditStudent] = useState(null);
  const classId = 20;

  useEffect(() => {
    fetchStudents();
    fetchTeachers();
    fetchCourses();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/students/class/${classId}`);
      setStudents(response.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const fetchTeachers = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/class-teachers/class/${classId}/teachers`);
      setTeachers(response.data);
    } catch (error) {
      console.error("Error fetching teachers:", error);
    }
  };

  const fetchCourses = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/course/getByClassId/13`);
      setCourses(response.data.original);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };


  const saveTeacher = async (updatedTeacher) => {
    try {
      const response = await axios.put(`http://127.0.0.1:8000/api/users/${updatedTeacher.id}`, {
        name: updatedTeacher.teacher_name,
        email: updatedTeacher.email,
        role: 'teacher',
        avatar: updatedTeacher.avatar,
      });
      fetchTeachers(); // Refresh teachers list
      setShowTeacherModal(false);
    } catch (error) {
      console.error("Error updating teacher:", error);
    }
  };

  const saveStudent = async (updatedStudent) => {
    try {
      const response = await axios.put(`http://127.0.0.1:8000/api/users/${updatedStudent.id}`, {
        name: updatedStudent.student_name,
        email: updatedStudent.email,
        role: 'student',
        avatar: updatedStudent.avatar,
        class_id: updatedStudent.class_id,
      });
      fetchStudents(); // Refresh students list
      setShowStudentModal(false);
    } catch (error) {
      console.error("Error updating student:", error);
    }
  };
  const deleteStudentFromClass = async (studentId) => {
    console.log('deleteStudentFromClass called with studentId:', studentId);
    try {
      const res = await axios.put(`http://127.0.0.1:8000/api/admin/users/${studentId}`, {
        class_id: null,
        role: 'student',
      });
      console.log('API response:', res.data);
      fetchStudents();
    } catch (error) {
      if (error.response) {
        console.error("Error removing student from class:", error.response.data.message);
      } else {
        console.error("Error removing student from class:", error.message);
      }
    }
  };



const deleteUser = async (teacherId) => {
  try {
    await axios.delete(`http://127.0.0.1:8000/api/class-teachers/`, {
      data: {
        teacher_id: teacherId,
        class_id: classId, // Sử dụng classId đã có trong component
      },
    });
    fetchTeachers(); // Refresh teachers list
  } catch (error) {
    console.error("Error deleting teacher from class:", error.response.data.message);
  }
};
  const handleStudentInfo = (student) => {
  // Logic to show student info, e.g., open a modal with details
  console.log("Showing info for:", student);
};

const handleLG = (student) => {
  // Logic for the LG button action
  console.log("LG action for:", student);
};

  return (
    <div className="bg-[#f5f7fa] min-h-screen p-4">
      <div className="max-w-7xl mx-auto">
        <header className="flex items-center gap-4 border-b border-purple-400 border-[3px] pb-2 mb-4">
          <Link to='/student' aria-label="Back" className="text-black text-xl">
            <i className="fas fa-arrow-left"></i>
          </Link>
          <h1 className="text-black text-lg font-normal select-none">PNV26A</h1>
        </header>
        
        <main className="flex flex-col lg:flex-row gap-6">
          <section className="flex flex-col gap-6 lg:w-1/2">
            <div className="bg-white rounded-md shadow-md p-4">
              <h2 className="text-black font-semibold text-base mb-3 select-none">
                Teachers: <span>{teachers.length}</span>
              </h2>
              <button onClick={() => setShowTeacherModal(true)} className="bg-blue-500 text-white rounded-md px-3 py-1 mb-3">Add Teacher</button>
              <ul className="space-y-3">
                {teachers.map((teacher, index) => (
                  <li key={teacher.id} className="flex items-center justify-between bg-white shadow-md rounded-md px-3 py-1.5">
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-black select-none">{index + 1}</span>
                      <span className="text-sm text-black select-none">{teacher.teacher_name}</span>
                      <img alt="Avatar" className="w-6 h-6 rounded-full object-cover" src={teacher.avatar || "default-avatar-url.jpg"} />
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => deleteUser(teacher.id)} className="bg-red-500 text-white text-xs font-semibold rounded-md px-3 py-1">Delete</button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-md shadow-md p-4">
              <h2 className="text-black font-semibold text-base mb-3 select-none">
                Courses: <span>{courses.length}</span>
              </h2>
              <ul className="space-y-3">
                {Array.isArray(courses) && courses.map((course, index) => (
                  <li key={course.id} className="flex items-center justify-between bg-white shadow-md rounded-md px-3 py-2">
                    <div className="flex flex-col">
                      <span className="text-sm text-black select-none font-semibold">{course.course_name}</span>
                      <span className="text-xs text-gray-600 select-none">By: {course.teacher.teacher_name}</span>
                      <span className="text-xs text-gray-600 select-none">Start: {course.start_day}</span>
                      <span className="text-xs text-gray-600 select-none">End: {course.end_day}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section className="lg:w-1/2 bg-white rounded-md shadow-md p-4">
      <h2 className="text-black font-semibold text-base mb-3 select-none">
        Students: <span>{students.length}</span>
      </h2>
      <button onClick={() => setShowStudentModal(true)} className="bg-blue-500 text-white rounded-md px-3 py-1 mb-3">Add Student</button>
      <ul className="space-y-3">
        {students.map((student, index) => (
          <li key={student.id} className="flex items-center justify-between bg-white shadow-md rounded-md px-3 py-1.5">
            <div className="flex items-center gap-3">
              <span className="text-xs text-black select-none">{index + 1}</span>
              <span className="text-sm text-black select-none">{student.student_name}</span>
              <img alt="Avatar" className="w-6 h-6 rounded-full object-cover" src={student.avatar || "default-avatar-url.jpg"} />
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  console.log('Remove button clicked', student.id);
                  deleteStudentFromClass(student.id);
                }}
                className="bg-red-500 text-white text-xs font-semibold rounded-md px-3 py-1"
              >
                Remove
              </button>

              <Link to={`/profile?studentId=${student.id}`} className="bg-blue-300 text-white text-xs font-semibold rounded-md px-3 py-1">
                Info
            </Link>
            </div>
          </li>
        ))}
      </ul>
    </section>
        </main>
      </div>

      {showTeacherModal && <TeacherModal onClose={() => setShowTeacherModal(false)} classId={classId} />}
      {showStudentModal && <StudentModal onClose={() => setShowStudentModal(false)} classId={classId} />}
      {showCourseModal && <CourseModal onClose={() => setShowCourseModal(false)} />}
      {editTeacher && <TeacherEditModal teacher={editTeacher} onClose={() => setEditTeacher(null)} onSave={saveTeacher} />}
      {editStudent && <StudentEditModal student={editStudent} onClose={() => setEditStudent(null)} onSave={saveStudent} />}
    </div>
  );
};

export default Dashboard;