import React, { useEffect, useState } from 'react';

const NetworkDetector = () => {
    const [isOnline, setIsOnline] = useState(navigator.onLine);

    useEffect(() => {
        const goOnline = () => setIsOnline(true);
        const goOffline = () => setIsOnline(false);

        window.addEventListener('online', goOnline);
        window.addEventListener('offline', goOffline);

        return () => {
            window.removeEventListener('online', goOnline);
            window.removeEventListener('offline', goOffline);
        };
    }, []);

    if (!isOnline) {
        return (
            <div className="bg-red-600 text-white text-center p-2">
                ⚠️ Mất kết nối mạng. Vui lòng kiểm tra internet.
            </div>
        );
    }

    return null;
};

export default NetworkDetector;
