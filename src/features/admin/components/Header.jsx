import React, { useState } from 'react';
import { Bell, User } from 'lucide-react';

const Header = ({ children }) => {
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    return (
        <header className="w-full max-w-7xl mx-auto h-20 bg-white shadow-sm p-3 sm:p-3 md:p-4 flex justify-between items-center">
            <div className="flex justify-center flex-grow">
                <h1 className="text-4xl font-bold text-center w-full">Welcome to Admin INAUTRA</h1>
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