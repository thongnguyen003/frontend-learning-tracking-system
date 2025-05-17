import React, { useEffect, useRef } from 'react';
import avatar1 from '../../assets/avatars/0000000705-giao-duc-hoc-tap-hoc-sinh-kien-thuc-hoc-nhom-tai-hinh-png-187-removebg-preview.png';
import avatar2 from '../../assets/avatars/pngtree-studying-clipart-girl-reading-and-studing-at-desk-cartoon-vector-png-image_6825673-removebg-preview.png';

function LoginSlideshow() {
    const imgRef = useRef(null);

    useEffect(() => {
        const images = [
            "https://preview.colorlib.com/theme/bootstrap/login-form-08/images/undraw_file_sync_ot38.svg",
            avatar1,
            avatar2
        ];

        let index = 0;

        const interval = setInterval(() => {
            if (imgRef.current) {
                imgRef.current.classList.add("fade-out");

                setTimeout(() => {
                    index = (index + 1) % images.length;
                    imgRef.current.src = images[index];
                    imgRef.current.classList.remove("fade-out");
                }, 800);
            }
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="login-image">
            <img
                ref={imgRef}
                id="slideshow-image"
                src="https://preview.colorlib.com/theme/bootstrap/login-form-08/images/undraw_file_sync_ot38.svg"
                alt="Login Illustration"
            />
        </div>
    );
}

export default LoginSlideshow;
