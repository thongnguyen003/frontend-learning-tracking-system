import React, { useState, useEffect } from 'react';
import { useAddNewUser } from '../hook/useAddNewUser'; // Adjusted path
import { useApi } from '../../../hooks/useApi'; // Adjusted path


const MultiUserForm = () => {
    const {
        formData,
        setFormData,
        message,
        messageType,
        validated,
        loading,
        error,
        handleChange,
        handleSubmit,
        setMessage,
    } = useAddNewUser();

    const { apiCall } = useApi();
    const [classes, setClasses] = useState([]);

    // Fetch classes from API
    useEffect(() => {
        const fetchClasses = async () => {
            const useMock = false;
            try {
                const response = await apiCall('/admin/classes', 'GET');
                setClasses(response.data || []);
            } catch (err) {
                console.error('Error fetching classes:', err);
            }
        };
        fetchClasses();
    }, []);
    
    return (
        <div className="container mt-4">
            <div className="card shadow-sm p-4" style={{ maxWidth: '500px', margin: 'auto' }}>
                <h3 className="card-title text-primary mb-4">Add Multiple User Accounts</h3>

                {/* Display notification */}
                {message && (
                    <div
                        className={`alert alert-${messageType === 'success' ? 'success' : 'danger'} alert-dismissible fade show`}
                        role="alert"
                    >
                        {message}
                        <button
                            type="button"
                            className="btn-close"
                            onClick={() => setMessage('')}
                            aria-label="Close"
                        ></button>
                    </div>
                )}

                <form noValidate onSubmit={handleSubmit}>
                    {/* Email List */}
                    <div className="mb-3">
                        <label htmlFor="emails" className="form-label">
                            Email List (one email per line)
                        </label>
                        <textarea
                            className={`form-control ${validated && !formData.emails ? 'is-invalid' : ''}`}
                            id="emails"
                            name="emails"
                            value={formData.emails}
                            onChange={handleChange}
                            rows="3"
                            required
                            placeholder="example@gmail.com"
                        />
                        {validated && !formData.emails && (
                            <div className="invalid-feedback">Vui lòng nhập ít nhất một email.</div>
                        )}
                    </div>

                    {/* Default Password */}
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">
                            Default Password
                        </label>
                        <div className="input-group">
                            <input
                                type="password"
                                className={`form-control ${validated && !formData.password ? 'is-invalid' : ''}`}
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                minLength="6"
                            />
                            <button
                                type="button"
                                className="btn btn-outline-secondary"
                                onClick={() => {
                                    const input = document.getElementById('password');
                                    input.type = input.type === 'password' ? 'text' : 'password';
                                }}
                            >
                                <i className="bi bi-eye"></i> {/* Relies on CDN */}
                            </button>
                            {validated && !formData.password && (
                                <div className="invalid-feedback">Vui lòng nhập mật khẩu.</div>
                            )}
                            {validated && formData.password && formData.password.length < 6 && (
                                <div className="invalid-feedback">Mật khẩu phải có ít nhất 6 ký tự.</div>
                            )}
                        </div>
                    </div>

                    {/* Role */}
                    <div className="mb-3">
                        <label htmlFor="role" className="form-label">
                            Role
                        </label>
                        <select
                            className={`form-select ${validated && !formData.role ? 'is-invalid' : ''}`}
                            id="role"
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select Role</option>
                            <option value="student">Student</option>
                            <option value="teacher">Teacher</option>
                            <option value="admin">Admin</option>
                        </select>
                        {validated && !formData.role && (
                            <div className="invalid-feedback">Vui lòng chọn vai trò.</div>
                        )}
                    </div>

                    {/* Class (display if role is student) */}
                    {formData.role === 'student' && (
                        <div className="mb-3">
                            <label htmlFor="class_id" className="form-label">
                                Class
                            </label>
                            <select
                                className={`form-select ${validated && !formData.class_id ? 'is-invalid' : ''}`}
                                id="class_id"
                                name="class_id"
                                value={formData.class_id}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select Class</option>
                                {classes.map((cls) => (
                                    <option key={cls.id} value={cls.id}>
                                        {cls.name}
                                    </option>
                                ))}
                            </select>
                            {validated && !formData.class_id && (
                                <div className="invalid-feedback">Vui lòng chọn lớp học.</div>
                            )}
                        </div>
                    )}

                    {/* Submit Button */}
                    <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                        {loading ? 'Adding...' : 'Add Users'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default MultiUserForm;