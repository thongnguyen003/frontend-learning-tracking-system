import { useState } from 'react';
import { useAuth } from '../hook/authService.js';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function useLoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('admin');
    const navigate = useNavigate();
    const { login, logout } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await login({ email, password, role });
            toast.success(res.message);

            if (res.role === 'admin') {
                sessionStorage.setItem('current_user',JSON.stringify({'role':'admin','account':res.user}));
                navigate('/admin');
                
                toast.success('Welcome to website!');
            } else if (res.role === 'teacher') {
                sessionStorage.setItem('current_user',JSON.stringify({'role':'teacher','account':res.user}));
                navigate('/teacher');
                toast.success('Welcome teacher!');
            }
            else if (res.role === 'student') {
                sessionStorage.setItem('current_user',JSON.stringify({'role':'student','account':res.user}));
                navigate('/student');
                toast.success('Welcome student!');
            }
        } catch (err) {
            toast.error('Login failed: ' + (err.response?.data?.message || err.message));
        }
    };

    const handleLogout = async () => {
        try {
            const res = await logout(role);
            toast.success(res.message);
            navigate('/login');
        } catch (err) {
            toast.error('Logout failed: ' + (err.response?.data?.message || err.message));
        }
    };

    return {
        email,
        setEmail,
        password,
        setPassword,
        role,
        setRole,
        handleSubmit,
        handleLogout,
    };
}

export default useLoginForm;