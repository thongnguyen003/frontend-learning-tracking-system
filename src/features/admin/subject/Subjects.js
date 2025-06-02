import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AddSubjectForm from './AddSubjectForm'; // Đường dẫn đến file AddSubjectForm.js

const SubjectList = () => {
  const [subjects, setSubjects] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [subjectToEdit, setSubjectToEdit] = useState(null);

  useEffect(() => {
    fetchSubjects();
  }, []);

  const fetchSubjects = async () => {
    const response = await axios.get('http://127.0.0.1:8000/api/subjects');
    setSubjects(response.data);
  };

  const handleAdd = () => {
    fetchSubjects(); // Refresh danh sách sau khi thêm hoặc cập nhật
  };

  const handleDeleteSubject = async (id) => {
    await axios.delete(`http://127.0.0.1:8000/api/subjects/${id}`);
    fetchSubjects();
  };

  const handleEditSubject = (subject) => {
    setSubjectToEdit(subject);
    setShowForm(true); // Hiển thị form khi chỉnh sửa
  };

  return (
    <div className="bg-gray-100 p-6">
      <div className="max-w-md mx-auto">
        <div className="flex justify-between mb-4">
          <p className="font-bold text-black">Subject</p>
          <button
            onClick={() => {
              setSubjectToEdit(null);
              setShowForm(true);
            }}
            className="bg-green-600 text-white rounded px-3 py-1"
          >
            Add Subject
          </button>
        </div>
        {showForm && (
          <AddSubjectForm
            onAdd={handleAdd}
            onClose={() => setShowForm(false)}
            subjectToEdit={subjectToEdit}
            setSubjectToEdit={setSubjectToEdit}
          />
        )}
        <div className="space-y-3">
          {subjects.map((subject) => (
            <div key={subject.id} className="flex items-center justify-between shadow-lg rounded-lg bg-white p-3">
              <h2 className="font-bold text-lg text-black">{subject.title}</h2>
              <div className="flex space-x-3">
                <button onClick={() => handleEditSubject(subject)} className="bg-green-600 text-white text-sm font-medium rounded px-3 py-1">Edit</button>
                <button onClick={() => handleDeleteSubject(subject.id)} className="bg-red-800 text-white text-sm font-medium rounded px-3 py-1">Del</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubjectList;