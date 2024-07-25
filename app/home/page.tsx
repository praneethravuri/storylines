import React from 'react';
import { SidebarNav } from "@/components/SidebarNav";
import Link from 'next/link';

const ThemeRoomsPage = () => {
    // This could be replaced with actual data fetched from your backend
    const rooms = Array(10).fill(null).map((_, index) => ({
        id: index,
        title: `Room ${index + 1}`,
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis, eius.'
    }));

    return (
        <div className="h-screen flex">
            <div className="flex-shrink-0">
                <SidebarNav />
            </div>
            <div className="flex-grow overflow-auto p-4">
                <h1 className="heading-secondary mb-2">Theme Rooms</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {rooms.map((room, index) => (
                        <div key={index}>
                            <Link href="/storymap" className="h-[300px] w-full bg-secondary rounded-xl p-4 flex flex-col">
                                <h2 className="heading-secondary">{room.title}</h2>
                                <p className="">{room.description}</p>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ThemeRoomsPage;