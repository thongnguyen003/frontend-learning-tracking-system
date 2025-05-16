import { useState } from 'react';
import { login } from './authService';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function useLoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('student');
    const navigate = useNavigate();

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

    return {
        email,
        setEmail,
        password,
        setPassword,
        role,
        setRole,
        handleSubmit,
    };
}

export default useLoginForm;
