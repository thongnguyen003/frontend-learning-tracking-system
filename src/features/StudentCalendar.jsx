import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import axios from 'axios';

const StudentCalendar = ({ studentId }) => {
    const [visitDates, setVisitDates] = useState([]);
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [error, setError] = useState(null);

    useEffect(() => {
        setVisitDates([]); // Đặt lại visitDates
        // console.log('Effect triggered with studentId:', studentId, 'currentMonth:', currentMonth.toISOString());

        if (!studentId) {
            setError('Student ID không được cung cấp.');
            return;
        }

        const token = localStorage.getItem('token');
        // console.log('Token:', token);
        if (!token) {
            setError('Không tìm thấy token. Vui lòng đăng nhập lại.');
            return;
        }

        const fetchVisitDates = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/student-visits/${studentId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                    params: { month: currentMonth.toISOString().slice(0, 7) }
                });
                // console.log('API Request Params:', { studentId, month: currentMonth.toISOString().slice(0, 7) });
                // console.log('Full API response:', response);
                // console.log('Response data:', response.data);
                const dates = Array.isArray(response.data.data) ? response.data.data : [];
                // console.log('Raw dates from API:', dates);
                setVisitDates(dates);
                // console.log('Visit dates after setting:', visitDates);
                setError(null);
            } catch (error) {
                // console.error('Error fetching visit dates:', error.response || error.message);
                setError(`Không thể tải lịch sử truy cập. ${error.response?.data?.error || 'Vui lòng kiểm tra server.'}`);
            }
        };

        fetchVisitDates();
    }, []);

    const tileClassName = ({ date, view }) => {
        if (view === 'month') {
            const dateStr = new Date(date.toLocaleString('en-US', { timeZone: 'Asia/Ho_Chi_Minh' }))
                .toISOString()
                .slice(0, 10);
            // console.log('Checking date:', dateStr, 'in visitDates:', visitDates);
            return visitDates.includes(dateStr) ? 'visited' : 'not-visited';
        }
        return null;
    };

    return (
        <div>
            <h2>Student Visit Calendar</h2>
            {error && (
                <div className="text-red-600 mb-4">
                    {error}
                    {error.response && <div>Chi tiết: {JSON.stringify(error.response.data)}</div>}
                </div>
            )}
            <Calendar
                onActiveStartDateChange={({ activeStartDate }) => setCurrentMonth(activeStartDate)}
                tileClassName={tileClassName}
            />
            <style>
                {`
                    .visited {
                        background-color: green !important;
                        color: white !important;
                    }
                    .not-visited {
                        background-color: red !important;
                        color: white !important;
                    }
                `}
            </style>
        </div>
    );
};

export default StudentCalendar;