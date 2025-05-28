import { useEffect } from 'react';
import api from '../hooks/api';

const TrackVisit = () => {
    useEffect(() => {
        const trackVisit = async () => {
            const role = localStorage.getItem('role');
            if (role === 'student') {
                try {
                    await api.post(
                        '/track-visit',
                        {},
                        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
                    );
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
