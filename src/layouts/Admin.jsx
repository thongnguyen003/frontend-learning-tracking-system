import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Menu from '../features/admin/components/Menu';
import Header from '../features/admin/components/Header';

const AdminLayout = ({ HeaderElement }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen((prev) => !prev);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <div className="bigContainer bg-black">
            <Menu isOpen={isMenuOpen} onClose={closeMenu} />
            <div className="mainContainer p-0">
                {/* header */}
                <Header onToggleMenu={toggleMenu}>{HeaderElement}</Header>
                {/* main */}
                <div className="mainBody p-2">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default AdminLayout;