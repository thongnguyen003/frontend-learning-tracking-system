import { useState } from 'react';
import { useApi } from '../../../hooks/useApi';

export function useAddNewUser() {
    const { apiCall, loading, error } = useApi();

    const [formData, setFormData] = useState({
        emails: '',
        password: '',
        role: '',
        class_id: '',
    });
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');
    const [validated, setValidated] = useState(false);

    const handleChange = ({ target: { name, value } }) => {
        if (name === 'role' && value !== 'student') {
            // Khi chọn role khác student thì reset class_id
            setFormData((prev) => ({
                ...prev,
                role: value,
                class_id: '',
            }));
        } else {
            // Bình thường cập nhật trường theo name
            setFormData((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };
    const validateEmails = (emails) =>
        emails
            .split('\n')
            .map((e) => e.trim())
            .filter((e) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e));

    const handleSubmit = async (e) => { 
        e.preventDefault();
        if (!e.currentTarget.checkValidity()) {
            setValidated(true);
            setMessage('Vui lòng điền đầy đủ và đúng định dạng các trường!');
            setMessageType('danger');
            return false;
        }

        const emails = validateEmails(formData.emails);
        if (emails.length === 0) {
            setMessage('Vui lòng nhập ít nhất một email hợp lệ!');
            setMessageType('danger');
            return false;
        }

        const users = emails.map((email) => ({
            name: email.split('@')[0],
            email,
            password: formData.password,
            role: formData.role,
            ...(formData.role === 'student' && { class_id: parseInt(formData.class_id) || null }),
        }));

        try {
            const res = await apiCall('/admin/add-user', 'POST', { users });

            if (res.created > 0 && !res.errors) {
                setMessage(`Đã thêm ${res.created} tài khoản với vai trò ${formData.role}!`);
                setMessageType('success');
            } else if (res.errors && res.errors.length > 0) {
                setMessage(`Không thêm được tài khoản: ${res.errors.join(', ')}`);
                setMessageType('danger');
            } else if (res.message) {
                setMessage(res.message);
                setMessageType('warning');
            } else {
                setMessage('Lỗi không xác định: Không có thông tin lỗi');
                setMessageType('danger');
            }

            setFormData({ emails: '', password: '', role: '', class_id: '' });
            setValidated(false);
            return true;
        } catch (err) {
            const { response, request, message: errMsg } = err;
            let errorMessage = 'Không thể kết nối đến server';

            if (response) {
                const { status, data } = response;
                if (status === 422) {
                    errorMessage = data.errors
                        ? Object.values(data.errors).flat().join(', ')
                        : data.message || 'Dữ liệu đầu vào không hợp lệ';
                } else if (status === 207 || status === 400 || status === 500) {
                    errorMessage = data.errors
                        ? data.errors.join(', ')
                        : data.message || 'Lỗi xử lý yêu cầu';
                } else {
                    errorMessage = `Lỗi không xác định: Mã trạng thái ${status}`;
                }
            } else if (request) {
                errorMessage = 'Không nhận được phản hồi từ server. Vui lòng kiểm tra kết nối mạng.';
            } else {
                errorMessage = `Lỗi: ${errMsg}`;
            }

            setMessage(`Lỗi: ${errorMessage}`);
            setMessageType('danger');
            return false;
        }
            };

    return {
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
    };
}
