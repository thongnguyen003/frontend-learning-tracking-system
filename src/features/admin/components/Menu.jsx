import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  AppWindow,
  BarChart,
  Box,
  ClipboardList,
  Table,
  FileText,
  ChevronDown,
  ChevronRight,
} from 'lucide-react';

const menuItems = [
  {
    section: 'MAIN MENU',
    items: [
      { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
      { name: 'Classes', path: '/admin/classes', icon: Box },
    ],
  },
  {
    section: 'FORMS',
    items: [
      {
        name: 'Forms',
        path: '/admin/forms',
        icon: ClipboardList,
        subItems: [
          { name: 'Form Elements', path: '/admin/forms/elements' },
          { name: 'Multi User Form', path: '/admin/form/add-new-user', icon: ClipboardList }
        ],
      },
    ],
  },
  {
    section: 'USERS',
    items: [
      {
        name: 'Users',
        path: '/admin/users',
        icon: AppWindow,
        subItems: [
          { name: 'UserManagement', path: '/admin/users/UserManagement' },
          { name: 'Email', path: '/admin/users/email' },
        ],
      },
      { name: 'Charts', path: '/admin/charts', icon: BarChart },
    ],
  },
  {
    section: 'TABLE',
    items: [
      { name: 'Table', path: '/admin/table', icon: Table },
    ],
  },
  {
    section: 'EXTRA',
    items: [
      { name: 'Pages', path: '/admin/pages', icon: FileText },
    ],
  },
];

const Menu = ({ isOpen, onClose }) => {
  const location = useLocation();
  const [openMenus, setOpenMenus] = useState({});

  const toggleSubMenu = (name) => {
    setOpenMenus((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  return (
    <>
      {/* Overlay trên màn hình nhỏ khi menu mở */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => onClose?.()}
        ></div>
      )}
      {/* Sidebar */}
      <aside
        className={`fixed md:static top-0 left-0 h-screen w-64 bg-gray-900 text-white p-6 overflow-auto z-50 transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'
          } md:translate-x-0 md:w-[20%]`}
      >
        <div className="text-3xl font-extrabold mb-8 bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
          INAUTRA
        </div>
        {menuItems.map((section, idx) => (
          <div key={idx} className="mb-6">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">
              {section.section}
            </h3>
            <div className="space-y-1">
              {section.items.map((item) => {
                const isActive = location.pathname === item.path;
                const hasSub = item.subItems && item.subItems.length > 0;
                const isSubOpen = openMenus[item.name];

                return (
                  <div key={item.name}>
                    <div
                      className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition-all duration-200 ${isActive ? 'bg-purple-600 text-white' : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                        }`}
                      onClick={() => (hasSub ? toggleSubMenu(item.name) : onClose?.())}
                    >
                      <div className="flex items-center space-x-3">
                        <item.icon className="h-5 w-5" />
                        {hasSub ? (
                          <span>{item.name}</span>
                        ) : (
                          <Link to={item.path}>{item.name}</Link>
                        )}
                      </div>
                      {hasSub && (
                        <span>
                          {isSubOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                        </span>
                      )}
                    </div>
                    {hasSub && isSubOpen && (
                      <div className="ml-6 mt-1 space-y-1">
                        {item.subItems.map((sub) => (
                          <Link
                            key={sub.path}
                            to={sub.path}
                            onClick={() => onClose?.()}
                            className={`block p-2 text-sm rounded hover:bg-gray-800 ${location.pathname === sub.path ? 'text-purple-400' : 'text-gray-300'
                              }`}
                          >
                            {sub.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </aside>
    </>
  );
};

export default Menu;