"use client";
import React, { useState, useEffect } from 'react';
import { SidebarNav } from "@/components/SidebarNav";
import Link from 'next/link';
import LoadingScreen from '@/components/LoadingScreen';

const ThemeRoomsPage = () => {
    const [themeRooms, setThemeRooms] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const capitalize = (word) => {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    };

    useEffect(() => {
        const fetchThemeRooms = async () => {
            try {
                setIsLoading(true);
                const response = await fetch("/api/fetch-theme-rooms");
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const data = await response.json();
                setThemeRooms(data);
            } catch (error) {
                console.error("Error fetching theme rooms: ", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchThemeRooms();
    }, []);

    if (isLoading) {
        return <LoadingScreen />;
    }

    return (
        <div className="h-screen flex">
            <div className="flex-shrink-0">
                <SidebarNav />
            </div>
            <div className="flex-grow overflow-auto p-4">
                <h1 className="heading-secondary mb-2">Theme Rooms</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {themeRooms.map((room) => (
                        <div key={room.id}>
                            <Link href="/storymap" className="h-[300px] w-full bg-secondary rounded-xl p-4 flex flex-col transition-all duration-300 ease-in-out hover:scale-105">
                                    <h2 className="heading-secondary">{room.name}</h2>
                                    <p>{room.description}</p>
                                    <div className="tags mt-auto flex flex-wrap gap-2">
                                        {room.tags.map((tag, index) => (
                                            <p className='text-xs font-semibold text-white bg-neutral-900 px-2 py-1 rounded-full' key={index}>{capitalize(tag)}</p>
                                        ))}
                                    </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ThemeRoomsPage;
