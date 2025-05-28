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
            // Reset class_id when role is not student
            setFormData((prev) => ({
                ...prev,
                role: value,
                class_id: '',
            }));
        } else {
            // Update field based on name
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
            setMessage('Please fill in all fields correctly!');
            setMessageType('danger');
            return false;
        }

        const emails = validateEmails(formData.emails);
        if (emails.length === 0) {
            setMessage('Please enter at least one valid email!');
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
                setMessage(`Successfully added ${res.created} ${formData.role} account(s)!`);
                setMessageType('success');
            } else if (res.errors && res.errors.length > 0) {
                setMessage(`Failed to add accounts: ${res.errors.join(', ')}`);
                setMessageType('danger');
            } else if (res.message) {
                setMessage(res.message);
                setMessageType('warning');
            } else {
                setMessage('Unknown error: No error information provided');
                setMessageType('danger');
            }

            setFormData({ emails: '', password: '', role: '', class_id: '' });
            setValidated(false);
            return true;
        } catch (err) {
            const { response, request, message: errMsg } = err;
            let errorMessage = 'Unable to connect to the server';

            if (response) {
                const { status, data } = response;
                if (status === 422) {
                    errorMessage = data.errors
                        ? Object.values(data.errors).flat().join(', ')
                        : data.message || 'Invalid input data';
                } else if (status === 207 || status === 400 || status === 500) {
                    errorMessage = data.errors
                        ? data.errors.join(', ')
                        : data.message || 'Error processing request';
                } else {
                    errorMessage = `Unknown error: Status code ${status}`;
                }
            } else if (request) {
                errorMessage = 'No response received from server. Please check your network connection.';
            } else {
                errorMessage = `Error: ${errMsg}`;
            }

            setMessage(`Error: ${errorMessage}`);
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