import { useEffect } from 'react';
import api from '../../hooks/api'; // Giả sử bạn đã config axios instance

const TrackVisit = () => {
    useEffect(() => {
        const trackVisit = async () => {
            const role = localStorage.getItem('role');
            const token = localStorage.getItem('token');

            if (role === 'student' && token) {
                try {
                    await api.post('/track-visit', {}, {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                } catch (error) {
                    console.error('Error tracking visit:', error);
                }
            }
        };
        trackVisit();
    }, []);

    return null;
};

export default TrackVisit;
