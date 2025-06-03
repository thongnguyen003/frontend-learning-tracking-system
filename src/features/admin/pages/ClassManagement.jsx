import React, { useEffect, useState } from "react";
import { FaPlus, FaUsers, FaCalendarAlt } from "react-icons/fa";
import { useApi } from '../../../hooks/useApi';
import { Link } from 'react-router-dom';

const ClassManagement = () => {
  const [classes, setClasses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const [name, setName] = useState("");
  const [startDay, setStartDay] = useState("");
  const [endDay, setEndDay] = useState("");

  const { apiCall } = useApi();

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        setIsLoading(true);
        const data = await apiCall('/admin/classes', 'GET');

        if (data && Array.isArray(data.data)) {
          setClasses(data.data);
        } else {
          console.error("Invalid data format received from server.");
        }
      } catch (error) {
        console.error("Error fetching classes:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchClasses();
  }, [apiCall]);

  const openForm = () => setShowForm(true);
  const closeForm = () => setShowForm(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      name,
      start_day: startDay,
      end_day: endDay,
      quantity: 0,
      state: 0,
    };

    try {
      const result = await apiCall('/admin/create-classes', 'POST', payload);

      if (result && result.success) {
        setClasses((prev) => [...prev, result.class]);

        setName("");
        setStartDay("");
        setEndDay("");
        setShowForm(false);

        setSuccessMessage("Class created successfully!");
        setTimeout(() => setSuccessMessage(""), 3000);
      } else {
        alert("Failed to create class: " + (result.message || "Unknown error"));
      }
    } catch (error) {
      alert("Error creating class: " + error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {successMessage && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6 transition-all duration-300">
            {successMessage}
          </div>
        )}

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Class Management</h1>
            <p className="text-gray-600 mt-1">Manage all your classes in one place</p>
          </div>
          <button
            onClick={openForm}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 mt-4 sm:mt-0 transition-colors duration-200 shadow-md hover:shadow-lg"
          >
            <FaPlus className="text-sm" />
            <span>New Class</span>
          </button>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
          </div>
        ) : classes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {classes.map((classItem) => (
              <Link
                key={classItem.id}
                to={`/admin/classes/detail/${classItem.id}`}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start">
                    <h2 className="text-xl font-bold text-gray-800 mb-2">
                      {classItem.name}
                    </h2>
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                      {classItem.state === 0 ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                  
                  <div className="flex items-center text-gray-600 mt-4">
                    <FaUsers className="mr-2 text-green-500" />
                    <span className="font-semibold">{classItem.quantity} students</span>
                  </div>
                  
                  <div className="flex items-center text-gray-600 mt-2">
                    <FaCalendarAlt className="mr-2 text-green-500" />
                    <span>
                      {new Date(classItem.start_day).toLocaleDateString()} - {new Date(classItem.end_day).toLocaleDateString()}
                    </span>
                  </div>
                  
                  <div className="mt-6 pt-4 border-t border-gray-100">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full" 
                        style={{ width: `${Math.min(100, (classItem.quantity / 30) * 100)}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1 text-right">
                      {Math.min(100, Math.round((classItem.quantity / 30) * 100))}% capacity
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-md p-8 text-center">
            <div className="text-gray-400 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-700 mb-2">No classes found</h3>
            <p className="text-gray-500 mb-4">Create your first class to get started</p>
            <button
              onClick={openForm}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg inline-flex items-center gap-2 transition-colors duration-200"
            >
              <FaPlus className="text-sm" />
              <span>Create Class</span>
            </button>
          </div>
        )}
      </div>

      {showForm && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40 transition-opacity duration-300"
            onClick={closeForm}
          ></div>

          <div className="fixed inset-0 flex items-center justify-center z-50 px-4">
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md relative animate-fade-in"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={closeForm}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors duration-200"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>

              <h2 className="text-2xl font-bold text-gray-800 mb-6">Create New Class</h2>

              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Class Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
                    placeholder="e.g. Advanced Web Development"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Start Date
                    </label>
                    <input
                      type="date"
                      value={startDay}
                      onChange={(e) => setStartDay(e.target.value)}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      End Date
                    </label>
                    <input
                      type="date"
                      value={endDay}
                      onChange={(e) => setEndDay(e.target.value)}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
                    />
                  </div>
                </div>

                <div className="pt-4 flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={closeForm}
                    className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                  >
                    Create Class
                  </button>
                </div>
              </div>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default ClassManagement;