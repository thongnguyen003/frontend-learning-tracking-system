import React, { useState } from 'react';
import { MdEmail, MdVisibility, MdVisibilityOff } from 'react-icons/md';

import useLoginForm from './useLoginForm';
import '../../assets/css/auth.css';

function Login() {
    const {
        email,
        setEmail,
        password,
        setPassword,
        role,
        setRole,
        handleSubmit,
    } = useLoginForm();

    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="login-wrapper">
            <div className="login-card">
                <div className="login-image d-none d-md-flex">
                    <div className="image-overlay"></div>
                    <img
                        src="https://d1hjkbq40fs2x4.cloudfront.net/2017-08-21/files/landscape-photography_1645.jpg"
                        alt="Students"
                        className="login-img"
                    />
                </div>
                <div className="login-content">
                    <h3 className="login-title">Log in to Website</h3>
                    <p className="login-subtitle">Enter your details below</p>
                    <div className="login-group">
                        <div className="role-buttons">
                            <button
                                type="button"
                                className={`role-button ${role === 'student' ? 'active' : ''}`}
                                onClick={() => setRole('student')}
                            >
                                Student
                            </button>
                            <button
                                type="button"
                                className={`role-button ${role === 'teacher' ? 'active' : ''}`}
                                onClick={() => setRole('teacher')}
                            >
                                Teacher
                            </button>
                        </div>
                    </div>
                    <form className="login-form" onSubmit={handleSubmit}>
                        <div className="login-group login-input-group">
                            <label htmlFor="email" className="login-label">Email address</label>
                            <div className="input-with-icon">
                                <MdEmail className="input-icon" />
                                <input
                                    type="email"
                                    className="login-input"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                    required
                                />
                            </div>
                        </div>
                        <div className="login-group login-input-group">
                            <label htmlFor="password" className="login-label">Password</label>
                            <div className="input-with-icon">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    className="login-input"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter your password"
                                    required
                                />
                                <button
                                    type="button"
                                    className="password-toggle-button"
                                    onClick={togglePasswordVisibility}
                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                >
                                    {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
                                </button>
                            </div>
                        </div>
                        <button type="submit" className="login-button">Log In</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
