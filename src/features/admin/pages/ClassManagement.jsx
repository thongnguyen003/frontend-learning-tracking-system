import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";

const ClassManagement = () => {
  const [classes, setClasses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const [name, setName] = useState("");
  const [startDay, setStartDay] = useState("");
  const [endDay, setEndDay] = useState("");

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/admin/classes");
        const data = await response.json();

        if (data && Array.isArray(data.data)) {
          setClasses(data.data);
        } else {
          console.error("Invalid data format received from server.");
        }
      } catch (error) {
        console.error("Error fetching classes:", error);
      }
    };

    fetchClasses();
  }, []);

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
      const response = await fetch(
        "http://localhost:8000/api/admin/create-classes",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const result = await response.json();

      if (response.ok && result.success) {
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
    <div className="flex flex-col p-4 w-3/4 mx-auto relative">
      {successMessage && (
        <div className="bg-green-100 text-green-700 p-4 rounded-md mb-4">
          {successMessage}
        </div>
      )}

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Classes Management</h1>
        <button
          onClick={openForm}
          className="bg-green-500 text-white px-4 py-2 rounded-full flex items-center gap-2"
        >
          <FaPlus />
        </button>
      </div>

      <div className="flex flex-wrap justify-center gap-6">
        {classes.length > 0 ? (
          classes.map((classItem) => (
            <div
              key={classItem.id}
              className="p-4 bg-white shadow-md rounded-md w-[calc(50%-1.5rem)]"
            >
              <h2 className="text-xl font-bold text-green-600">
                {classItem.name}
              </h2>
              <p className="text-black font-bold">
                {classItem.quantity} students
              </p>
              <p className="text-gray-400">
                {classItem.start_day} - {classItem.end_day}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No classes available.</p>
        )}
      </div>

      {showForm && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40"
            onClick={closeForm}
          ></div>

          <div className="fixed inset-0 flex items-center justify-center z-50 px-4">
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-md shadow-lg p-6 w-full max-w-md relative"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-xl font-bold mb-4">Create New Class</h2>

              <label className="block mb-2 font-semibold">
                Class Name
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </label>

              <label className="block mb-2 font-semibold">
                Start Day
                <input
                  type="date"
                  value={startDay}
                  onChange={(e) => setStartDay(e.target.value)}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </label>

              <label className="block mb-4 font-semibold">
                End Day
                <input
                  type="date"
                  value={endDay}
                  onChange={(e) => setEndDay(e.target.value)}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </label>

              <div className="flex justify-center gap-4">
                <button
                  type="submit"
                  className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                >
                  Create
                </button>
                <button
                  type="button"
                  onClick={closeForm}
                  className="px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-100"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default ClassManagement;
