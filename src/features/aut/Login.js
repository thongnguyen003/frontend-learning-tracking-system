import React, { useState } from 'react';
import { MdVisibility, MdVisibilityOff } from 'react-icons/md';
import useLoginForm from './components/UseLoginForm.js';
import DotsOutsideWrapper from '../../assets/animation/DotsOutsideWrapper.jsx';
import LoginSlideshow from '../../assets/animation/LoginSlideshow.jsx';
import './styles/login.css';

function Login() {
    const {
        email,
        setEmail,
        password,
        setPassword,
        handleSubmit,
    } = useLoginForm();
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <>
            <DotsOutsideWrapper count={10} />
            <div className="login-wrapper">
                <div className="login-card">
                    <div className="login-content">
                        <div className="logo-top">
                            <img
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8vwCh6Kbk3ejpOOLqa770YBsfTM2Vkq0M8A&s"
                                alt="Logo"
                                className="logo-image"
                            />
                        </div>

                        <h2>Sign In to Colorlib</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="input-group">
                                <input
                                    type="email"
                                    placeholder="Username"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="input-group password-group">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <button
                                    type="button"
                                    className="toggle-password"
                                    onClick={togglePasswordVisibility}
                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                >
                                    {showPassword ? <MdVisibilityOff size={20} /> : <MdVisibility size={20} />}
                                </button>
                            </div>

                            <div className="options-row">
                                <label className="remember-me">
                                    <input
                                        type="checkbox"
                                        checked={rememberMe}
                                        onChange={() => setRememberMe(!rememberMe)}
                                    />
                                    Remember me
                                </label>
                                <a href="#" className="forgot-password">Forgot Password</a>
                            </div>

                            <button type="submit" className="btn-login">
                                Log In
                            </button>
                        </form>

                        <h3 className="sign-in-with-text">
                            Every day is a new beginning. Take a deep breath and start again.
                        </h3>
                    </div>

                    <LoginSlideshow />
                </div>
            </div>
        </>
    );
}

export default Login;
