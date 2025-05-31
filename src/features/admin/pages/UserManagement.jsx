import React, { useState, useEffect } from 'react';
import { useApi } from '../../../hooks/useApi';

const UserManagement = () => {
    const { apiCall, loading, error } = useApi();
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState('');
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');
    const [editUser, setEditUser] = useState(null);
    const [userType, setUserType] = useState('all');

    const fetchUsers = async () => {
        try {
            let url = `http://localhost:8000/api/admin/users?search=${encodeURIComponent(search)}`;
            if (userType === 'students') url = `http://localhost:8000/api/admin/students?search=${encodeURIComponent(search)}`;
            if (userType === 'teachers') url = `http://localhost:8000/api/admin/teachers?search=${encodeURIComponent(search)}`;
            if (userType === 'admins') url = `http://localhost:8000/api/admin/admins?search=${encodeURIComponent(search)}`;

            const response = await apiCall(url, 'GET');

            // Lấy dữ liệu user phù hợp
            let usersData = userType === 'all' ? response.users : response[userType];
            if (!Array.isArray(usersData)) usersData = [];

            usersData = usersData.map((user) => ({
                ...user,
                name: user.name || user.student_name || 'No name',
            }));

            setUsers(usersData);
            setMessage(response.message || '');
            setMessageType('success');
        } catch (err) {
            setMessage(`Error: ${err.message}`);
            setMessageType('danger');
        }
    };

    const handleDelete = async (id, role) => {
        if (!window.confirm(`Are you sure you want to delete this ${role}?`)) return;
        try {
            const response = await apiCall(`http://localhost:8000/api/admin/users/${id}`, 'DELETE', { role });
            setMessage(response.message);
            setMessageType('success');
            fetchUsers();
        } catch (err) {
            setMessage(`Error: ${err.message}`);
            setMessageType('danger');
        }
    };

    const handleUpdateSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = { ...editUser };
            if (!payload.password) delete payload.password; // Nếu password rỗng thì không gửi

            const response = await apiCall(`http://localhost:8000/api/admin/users/${editUser.id}`, 'PUT', payload);
            setMessage(response.message);
            setMessageType('success');
            setEditUser(null);
            fetchUsers();
        } catch (err) {
            setMessage(`Error: ${err.message}`);
            setMessageType('danger');
        }
    };

    const handleUpdate = (user) => {
        setEditUser({ ...user, password: '' });
    };

    useEffect(() => {
        fetchUsers();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search, userType]);

    return (
        <div className="min-h-screen w-full">
            <div className="w-full h-full mx-auto">
                {/* Message */}
                {message && (
                    <div
                        className={`text-center ${messageType === 'success'
                            ? 'border-green-400 text-green-700'
                            : 'border-red-400 text-red-700'
                            }`}
                    >
                        {message}
                    </div>
                )}

                {/* Controls */}
                <div className="flex flex-col sm:flex-row gap-4 mb-1 items-center">
                    <select
                        value={userType}
                        onChange={(e) => setUserType(e.target.value)}
                        className="w-full sm:w-1/4 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="all">All Users</option>
                        <option value="students">Students</option>
                        <option value="teachers">Teachers</option>
                        <option value="admins">Admins</option>
                    </select>
                    <input
                        type="text"
                        placeholder="Search by name or email"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full sm:w-3/4 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* User Table */}
                <div className="overflow-auto max-h-screen border rounded">
                    <table className="w-full border-collapse text-left">
                        <thead className="bg-gray-100 sticky top-0 z-10">
                            <tr>
                                <th className="p-3 border-b">Name</th>
                                <th className="p-3 border-b">Email</th>
                                <th className="p-3 border-b">Role</th>
                                <th className="p-3 border-b">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan="4" className="p-4 text-center text-gray-600">
                                        Loading...
                                    </td>
                                </tr>
                            ) : users.length === 0 ? (
                                <tr>
                                    <td colSpan="4" className="p-4 text-center text-gray-600">
                                        No users found.
                                    </td>
                                </tr>
                            ) : (
                                users.map((user) => (
                                    <tr
                                        key={`${user.role}-${user.id}`}
                                        className="hover:bg-gray-50 border-b"
                                    >
                                        <td className="p-3">{user.name}</td>
                                        <td className="p-3">{user.email}</td>
                                        <td className="p-3 capitalize">{user.role}</td>
                                        <td className="p-3 space-x-2">
                                            <button
                                                onClick={() => handleUpdate(user)}
                                                className="text-blue-600 hover:underline"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(user.id, user.role)}
                                                className="text-red-600 hover:underline"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Edit Modal */}
                {editUser && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                            <h3 className="text-xl font-semibold mb-4 text-gray-800">Edit User</h3>
                            <form onSubmit={handleUpdateSubmit}>
                                <div className="mb-4">
                                    <label className="block mb-1 font-medium text-gray-700">Name</label>
                                    <input
                                        type="text"
                                        value={editUser.name}
                                        onChange={(e) =>
                                            setEditUser({ ...editUser, name: e.target.value })
                                        }
                                        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="block mb-1 font-medium text-gray-700">Email</label>
                                    <input
                                        type="email"
                                        value={editUser.email}
                                        onChange={(e) =>
                                            setEditUser({ ...editUser, email: e.target.value })
                                        }
                                        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="block mb-1 font-medium text-gray-700">Password</label>
                                    <input
                                        type="password"
                                        value={editUser.password || ''}
                                        onChange={(e) =>
                                            setEditUser({ ...editUser, password: e.target.value })
                                        }
                                        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Leave blank to keep unchanged"
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="block mb-1 font-medium text-gray-700">Role</label>
                                    <select
                                        value={editUser.role}
                                        onChange={(e) =>
                                            setEditUser({ ...editUser, role: e.target.value })
                                        }
                                        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    >
                                        <option value="student">Student</option>
                                        <option value="teacher">Teacher</option>
                                        <option value="admin">Admin</option>
                                    </select>
                                </div>

                                <div className="mb-4">
                                    <label className="block mb-1 font-medium text-gray-700">Class</label>
                                    <select
                                        value={editUser.class_id || ''}
                                        onChange={(e) =>
                                            setEditUser({ ...editUser, class_id: e.target.value })
                                        }
                                        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        disabled={editUser.role !== 'student'}
                                    >
                                        <option value="">No Class</option>
                                        <option value="1">PNV26</option>
                                        <option value="2">PNV27</option>
                                        <option value="3">PNV28</option>
                                    </select>
                                </div>

                                <div className="flex justify-end space-x-3">
                                    <button
                                        type="button"
                                        onClick={() => setEditUser(null)}
                                        className="px-4 py-2 border rounded text-gray-600 hover:bg-gray-100"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                                    >
                                        Save
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserManagement;
