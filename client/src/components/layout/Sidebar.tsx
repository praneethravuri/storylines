import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { IconHome, IconHeart, IconSettings, IconHelp, IconMenu2, IconX, IconBookmark, IconBooks } from '@tabler/icons-react';

const Sidebar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    const links = [
        { to: '/home', icon: IconHome, label: 'Home' },
        { to: '/favorites', icon: IconHeart, label: 'Favorites' },
        { to: '/bookmarks', icon: IconBookmark, label: 'Bookmarks' },
        { to: '/storybooks', icon: IconBooks, label: 'Storybooks' },
        { to: '/settings', icon: IconSettings, label: 'Settings' },
        { to: '/help', icon: IconHelp, label: 'Help' },
    ];

    const toggleSidebar = () => setIsOpen(!isOpen);

    return (
        <>
            {/* Mobile toggle button */}
            <button
                className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-background border border-border rounded-md"
                onClick={toggleSidebar}
            >
                {isOpen ? <IconX size={24} /> : <IconMenu2 size={24} />}
            </button>

            {/* Overlay for mobile */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                    onClick={toggleSidebar}
                ></div>
            )}

            {/* Sidebar */}
            <aside
                className={`
          fixed h-screen top-0 left-0 z-50 bg-neutral-50 dark:bg-neutral-950 border-r border-border
          transition-all duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0 lg:static lg:z-30
          w-64 pt-20 lg:pt-4
        `}
            >
                <nav className="p-4 h-full overflow-y-auto">
                    <ul className="space-y-2">
                        {links.map((link) => (
                            <li key={link.to}>
                                <NavLink
                                    to={link.to}
                                    className={({ isActive }) =>
                                        `flex items-center p-2 rounded-lg ${isActive
                                            ? 'bg-primary text-primary-foreground'
                                            : 'text-foreground hover:bg-secondary'
                                        }`
                                    }
                                    onClick={() => setIsOpen(false)}
                                >
                                    <link.icon className="w-5 h-5 mr-2" />
                                    {link.label}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </nav>
            </aside>
        </>
    );
};

export default Sidebar;