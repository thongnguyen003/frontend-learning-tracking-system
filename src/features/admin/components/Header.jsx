import React, { useState } from 'react';
import { Bell, Search, User, Menu as MenuIcon } from 'lucide-react';

const Header = ({ onToggleMenu, children }) => {
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = () => {
        if (searchTerm.trim() === '') {
            alert('Please enter a search term!');
            return;
        }
        console.log('Searching for:', searchTerm);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <header className="w-full max-w-7xl mx-auto h-20 bg-white shadow-sm p-3 sm:p-3 md:p-4 flex justify-between items-center rounded-[15px]">
            <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4">
                {/* Hamburger icon - chỉ hiển thị trên màn hình nhỏ */}
                <button
                    className="md:hidden p-1 sm:p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
                    onClick={onToggleMenu}
                    aria-label="Toggle Menu"
                >
                    <MenuIcon className="h-5 w-5 sm:h-6 sm:w-6 text-gray-600" />
                </button>
                <div className="relative flex items-center w-32 sm:w-40 md:w-64">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="w-full pl-8 pr-10 sm:pl-10 sm:pr-12 py-1 sm:py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200 text-sm sm:text-base"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                    <Search className="absolute left-2 sm:left-3 top-1.5 sm:top-2.5 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                    <button
                        onClick={handleSearch}
                        className="absolute right-1 sm:right-2 top-1/2 transform -translate-y-1/2 p-1 rounded hover:bg-gray-200 transition"
                        aria-label="Search"
                    >
                        <Search className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600" />
                    </button>
                </div>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4">
                {children}
                <button className="p-1 sm:p-2 rounded-full hover:bg-gray-100 transition-colors duration-200">
                    <Bell className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600" />
                </button>
                <div className="relative">
                    <button
                        onClick={() => setIsProfileOpen(!isProfileOpen)}
                        className="p-1 sm:p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
                    >
                        <User className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600" />
                    </button>
                    {isProfileOpen && (
                        <div className="absolute right-0 mt-2 w-40 sm:w-48 bg-white rounded-lg shadow-lg py-2 z-10">
                            <button className="block w-full text-left px-3 sm:px-4 py-1 sm:py-2 text-sm sm:text-base text-gray-700 hover:bg-gray-100">
                                Profile
                            </button>
                            <button className="block w-full text-left px-3 sm:px-4 py-1 sm:py-2 text-sm sm:text-base text-gray-700 hover:bg-gray-100">
                                Settings
                            </button>
                            <button className="block w-full text-left px-3 sm:px-4 py-1 sm:py-2 text-sm sm:text-base text-gray-700 hover:bg-gray-100">
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;