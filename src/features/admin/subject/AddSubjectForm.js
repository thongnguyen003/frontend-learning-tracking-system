import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddSubjectForm = ({ onAdd, onClose, subjectToEdit, setSubjectToEdit }) => {
  const [subjectName, setSubjectName] = useState('');

  useEffect(() => {
    if (subjectToEdit) {
      setSubjectName(subjectToEdit.title);
    } else {
      setSubjectName('');
    }
  }, [subjectToEdit]);

  const handleSubmit = async () => {
    if (!subjectName) return;
    if (subjectToEdit) {
      // Cập nhật môn học
      await axios.put(`http://127.0.0.1:8000/api/subjects/${subjectToEdit.id}`, { title: subjectName });
    } else {
      // Thêm môn học mới
      await axios.post('http://127.0.0.1:8000/api/subjects', { title: subjectName });
    }
    setSubjectName('');
    onAdd(); // Gọi hàm onAdd để refresh danh sách
    onClose(); // Đóng form sau khi thêm hoặc cập nhật
    setSubjectToEdit(null); // Reset subjectToEdit
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded shadow-md">
        <h2 className="font-bold mb-2">{subjectToEdit ? 'Edit Subject' : 'Add New Subject'}</h2>
        <input
          type="text"
          value={subjectName}
          onChange={(e) => setSubjectName(e.target.value)}
          placeholder="Subject Name"
          className="border rounded p-2 mr-2 w-full"
        />
        <div className="flex justify-end mt-4">
          <button onClick={onClose} className="bg-gray-300 text-black rounded px-3 py-1 mr-2">Cancel</button>
          <button onClick={handleSubmit} className="bg-blue-600 text-white rounded px-3 py-1">{subjectToEdit ? 'Update' : 'Add'}</button>
        </div>
      </div>
    </div>
  );
};

export default AddSubjectForm;