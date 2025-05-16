import { useState } from 'react';
import { useAuth } from '../../services/authService';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function useLoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('student');
    const navigate = useNavigate();
    const { login, logout } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await login({ email, password, role });
            toast.success(res.message);

            if (res.role === 'student') {
                sessionStorage.setItem('current_user',JSON.stringify({'role':'student','account':res.user}));
                navigate('/student');
                toast.success('Wellcome to website!');
            } else if (res.role === 'teacher') {
                navigate('/teacher');
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