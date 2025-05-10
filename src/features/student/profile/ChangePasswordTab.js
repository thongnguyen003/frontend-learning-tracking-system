import React, { useState } from 'react';
import './ChangePasswordTab.css';
const ChangePasswordForm = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Kiểm tra mật khẩu mới và mật khẩu xác nhận có trùng nhau không
    if (newPassword !== confirmPassword) {
      setError('Mật khẩu mới và mật khẩu xác nhận không khớp');
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1:8000/api/student/change-password/1', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,  // Nếu bạn dùng token authentication
        },
        body: JSON.stringify({
          current_password: currentPassword,
          new_password: newPassword,
          new_password_confirmation: confirmPassword,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage(data.message); // Hiển thị thông báo thành công
      } else {
        setError(data.error); // Hiển thị lỗi nếu có
      }
    } catch (error) {
      setError('Có lỗi xảy ra, vui lòng thử lại.');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="input-row">
          <div className="input-box">
            <label>Current Password</label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
            {!currentPassword && (
              <p className="error-message">
                You need to enter your current password to able to change new password
              </p>
            )}
          </div>
          <div className="input-box">
            <label>New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
        </div>

        <div>
          <label>Confirm New Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        {error && <p className="error-message">{error}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
        <button type="submit">Thay đổi mật khẩu</button>
        <p className="forgot-password">Forgot Password</p>
      </form>

    </div>
  );
};

export default ChangePasswordForm;
