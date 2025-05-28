import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StudentCalendar from './StudentCalendar';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
    const [classes, setClasses] = useState([]);
    const [students, setStudents] = useState([]);
    const [selectedClassId, setSelectedClassId] = useState('');
    const [selectedStudentId, setSelectedStudentId] = useState(null);
    const navigate = useNavigate();
    const role = localStorage.getItem('role');
    const userId = localStorage.getItem('userId');

    useEffect(() => {
        if (!['admin', 'teacher'].includes(role)) {
            navigate('/login');
            return;
        }

        const fetchClasses = async () => {
            try {
                const url = role === 'admin'
                    ? 'http://127.0.0.1:8000/api/admin/classes'
                    : `http://127.0.0.1:8000/api/class/getByTeacherId/${userId}`;
                const response = await axios.get(url, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                });
                setClasses(response.data.data || []);
            } catch (error) {
                console.error('Error fetching classes:', error);
            }
        };
        fetchClasses();
    }, [navigate, role, userId]);

    useEffect(() => {
        if (selectedClassId) {
            const fetchStudents = async () => {
                try {
                    const response = await axios.get(`http://127.0.0.1:8000/api/students/class/${selectedClassId}`, {
                        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                    });
                    setStudents(response.data.data || []);
                } catch (error) {
                    console.error('Error fetching students:', error);
                }
            };
            fetchStudents();
        }
    }, [selectedClassId]);

    return (
        <div>
            <h1>Student Visit Tracking</h1>
            <div>
                <label>Select Class: </label>
                <select onChange={(e) => setSelectedClassId(e.target.value)} value={selectedClassId}>
                    <option value="">Select a class</option>
                    {classes.map((cls) => (
                        <option key={cls.id} value={cls.id}>
                            {cls.name}
                        </option>
                    ))}
                </select>
            </div>
            {selectedClassId && (
                <div>
                    <label>Select Student: </label>
                    <select onChange={(e) => setSelectedStudentId(e.target.value)} value={selectedStudentId || ''}>
                        <option value="">Select a student</option>
                        {students.map((student) => (
                            <option key={student.id} value={student.id}>
                                {student.student_name}
                            </option>
                        ))}
                    </select>
                </div>
            )}
            {selectedStudentId && <StudentCalendar studentId={selectedStudentId} />}
        </div>
    );
};

export default AdminDashboard;