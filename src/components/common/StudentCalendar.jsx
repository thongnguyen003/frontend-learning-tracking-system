import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import axios from 'axios';
import { FiCalendar, FiCheck, FiX, FiLoader } from 'react-icons/fi';

const StudentCalendar = ({ studentId }) => {
    const [visitDates, setVisitDates] = useState([]);
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!studentId) {
            setError('Please select a student');
            return;
        }

        const token = localStorage.getItem('token');
        if (!token) {
            setError('Authentication required');
            return;
        }

        const fetchVisitDates = async () => {
            setLoading(true);
            try {
                const response = await axios.get(
                    `http://localhost:8000/api/student-visits/${studentId}`,
                    {
                        headers: { Authorization: `Bearer ${token}` },
                        params: { month: currentMonth.toISOString().slice(0, 7) }
                    }
                );
                setVisitDates(Array.isArray(response.data.data) ? response.data.data : []);
                setError(null);
            } catch (error) {
                setError(error.response?.data?.error || 'Failed to load data');
            } finally {
                setLoading(false);
            }
        };

        fetchVisitDates();
    }, [studentId, currentMonth]);

    const tileClassName = ({ date, view }) => {
        if (view === 'month') {
            const dateStr = date.toISOString().slice(0, 10);
            return visitDates.includes(dateStr) ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-50 text-gray-400';
        }
        return null;
    };

    const tileContent = ({ date, view }) => {
        if (view === 'month') {
            const dateStr = date.toISOString().slice(0, 10);
            return (
                <div className="absolute top-1 right-1">
                    {visitDates.includes(dateStr) ? (
                        <FiCheck className="text-emerald-500 text-xs" />
                    ) : (
                        <FiX className="text-gray-300 text-xs" />
                    )}
                </div>
            );
        }
        return null;
    };

    return (
        <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                        <FiCalendar className="mr-2 text-indigo-500" />
                        Attendance Calendar
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">
                        {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                    </p>
                </div>
                {loading && (
                    <div className="flex items-center text-sm text-gray-500">
                        <FiLoader className="animate-spin mr-2" />
                        Loading...
                    </div>
                )}
            </div>

            {error && (
                <div className="mb-4 p-3 bg-red-50 rounded-lg text-red-600 text-sm flex items-center">
                    <FiX className="mr-2" />
                    {error}
                </div>
            )}

            <div className="relative">
                <Calendar
                    onActiveStartDateChange={({ activeStartDate }) => setCurrentMonth(activeStartDate)}
                    tileClassName={tileClassName}
                    tileContent={tileContent}
                    className="border-0 w-full"
                    navigationAriaLabel="Navigate calendar"
                />
            </div>

            <div className="mt-6 flex justify-center space-x-6">
                <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-emerald-100 border border-emerald-400 mr-2"></div>
                    <span className="text-sm text-gray-600">Present</span>
                </div>
                <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-gray-50 border border-gray-200 mr-2"></div>
                    <span className="text-sm text-gray-600">Absent</span>
                </div>
            </div>

            <style jsx global>{`
                .react-calendar {
                    width: 100%;
                    background: transparent;
                    font-family: inherit;
                    line-height: 1.5;
                }
                .react-calendar__navigation {
                    display: flex;
                    margin-bottom: 1em;
                }
                .react-calendar__navigation button {
                    min-width: 44px;
                    background: none;
                    border: none;
                    font-weight: 500;
                    color: #4b5563;
                }
                .react-calendar__navigation button:enabled:hover,
                .react-calendar__navigation button:enabled:focus {
                    background-color: #f3f4f6;
                    border-radius: 6px;
                }
                .react-calendar__month-view__weekdays {
                    text-align: center;
                    text-transform: uppercase;
                    font-weight: 500;
                    font-size: 0.75rem;
                    color: #6b7280;
                }
                .react-calendar__month-view__weekdays__weekday {
                    padding: 0.5em;
                }
                .react-calendar__month-view__weekdays__weekday abbr {
                    text-decoration: none;
                }
                .react-calendar__tile {
                    max-width: 100%;
                    padding: 0.75em 0.5em;
                    background: none;
                    text-align: center;
                    border-radius: 6px;
                    position: relative;
                }
                .react-calendar__tile:enabled:hover,
                .react-calendar__tile:enabled:focus {
                    background-color: #eef2ff;
                }
                .react-calendar__tile--now {
                    background: #e0e7ff;
                    color: #4f46e5;
                    font-weight: 600;
                }
                .react-calendar__tile--active {
                    background: #4f46e5;
                    color: white;
                    font-weight: 600;
                }
            `}</style>
        </div>
    );
};

export default StudentCalendar;