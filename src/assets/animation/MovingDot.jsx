import React, { useState, useEffect, useRef } from 'react';

function MovingDot({ size, color }) {
    const [pos, setPos] = useState({
        x: Math.random() * 100,
        y: Math.random() * 100,
    });

    const velocity = useRef({
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
    });

    useEffect(() => {
        let animationFrameId;

        function animate() {
            setPos((prev) => {
                let newX = prev.x + velocity.current.vx;
                let newY = prev.y + velocity.current.vy;

                if (newX <= 0 || newX >= 100) velocity.current.vx = -velocity.current.vx;
                if (newY <= 0 || newY >= 100) velocity.current.vy = -velocity.current.vy;

                newX = Math.min(Math.max(newX, 0), 100);
                newY = Math.min(Math.max(newY, 0), 100);

                return { x: newX, y: newY };
            });

            animationFrameId = requestAnimationFrame(animate);
        }

        animationFrameId = requestAnimationFrame(animate);

        return () => cancelAnimationFrame(animationFrameId);
    }, []);

    return (
        <span
            className="dot"
            style={{
                width: size,
                height: size,
                borderRadius: '50%',
                backgroundColor: color,
                position: 'fixed',
                top: `${pos.y}vh`,
                left: `${pos.x}vw`,
                opacity: 0.5,
                pointerEvents: 'none',
                transform: 'translate(-50%, -50%)',
                zIndex: 0,
                transition: 'top 0.1s linear, left 0.1s linear',
            }}
        />
    );
}

export default MovingDot;
