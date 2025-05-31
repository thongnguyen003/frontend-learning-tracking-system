import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import axios from 'axios';

const StudentCalendar = ({ studentId }) => {
    const [visitDates, setVisitDates] = useState([]);
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!studentId) {
            setError('Student ID is not provided.');
            return;
        }

        const token = localStorage.getItem('token');
        if (!token) {
            setError('Token not found. Please log in again.');
            return;
        }

        const fetchVisitDates = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:8000/api/student-visits/${studentId}`,
                    {
                        headers: { Authorization: `Bearer ${token}` },
                        params: { month: currentMonth.toISOString().slice(0, 7) }
                    }
                );
                const dates = Array.isArray(response.data.data) ? response.data.data : [];
                setVisitDates(dates);
                setError(null);
            } catch (error) {
                setError(`Unable to load visit history. ${error.response?.data?.error || 'Please check the server.'}`);
            }
        };

        fetchVisitDates();
    }, [studentId, currentMonth]);

    const tileClassName = ({ date, view }) => {
        if (view === 'month') {
            const year = date.getFullYear();
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const day = date.getDate().toString().padStart(2, '0');
            const dateStr = `${year}-${month}-${day}`;

            return visitDates.includes(dateStr) ? 'visited' : 'not-visited';
        }
        return null;
    };

    return (
        <div>
            <h2 className="mb-4">Student Visit Calendar</h2>
            {error && (
                <div className="text-red-600 mb-4">
                    {error}
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
                        border-radius: 50%;
                    }
                    .not-visited {
                        background-color: #e74c3c !important;
                        color: white !important;
                        border-radius: 50%;
                    }
                `}
            </style>
        </div>
    );
};

export default StudentCalendar;
