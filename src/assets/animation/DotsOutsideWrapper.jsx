import MovingDot from './MovingDot';

function DotsOutsideWrapper({ count }) {
    const dotsProps = Array.from({ length: count }, () => ({
        size: Math.floor(Math.random() * 90) + 60,
        color: Math.random() > 0.5 ? '#4CAF50' : '#FF5722',
    }));

    return (
        <div className="dots-outside-wrapper" aria-hidden="true">
            {dotsProps.map((dot, i) => (
                <MovingDot key={i} size={dot.size} color={dot.color} />
            ))}
        </div>
    );
}

export default DotsOutsideWrapper;
