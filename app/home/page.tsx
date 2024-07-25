"use client";
import React, { useState, useEffect } from 'react';
import { SidebarNav } from "@/components/SidebarNav";
import Link from 'next/link';
import LoadingScreen from '@/components/LoadingScreen';
import { Search, Plus } from 'lucide-react';

const ThemeRoomsPage = () => {
    const [themeRooms, setThemeRooms] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

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


    const filteredRooms = themeRooms.filter(room =>
        room.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        room.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        room.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    if (isLoading) {
        return <LoadingScreen />;
    }

    return (
        <div className="min-h-screen text-foreground overflow-y-hidden">
            <div className="flex">
                <div className="flex-shrink-0">
                    <SidebarNav />
                </div>
                <div className="flex-grow p-8 overflow-y-auto">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex justify-between items-center mb-8">
                            <h1 className="text-4xl font-bold">Theme Rooms</h1>
                            <Link href="/create-theme" className="btn btn-primary flex items-center gap-2">
                                <Plus size={20} />
                                <p className='hidden md:block'>Create Room</p>
                            </Link>
                        </div>
                        <div className="relative mb-6">
                            <input
                                type="text"
                                placeholder="Search rooms..."
                                className="w-full px-4 py-2 pl-10 bg-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredRooms.map((room) => (
                                <Link href={`/storymap?themeRoomId=${room._id}`} key={room._id} className="group">
                                    <div className="bg-secondary rounded-xl p-6 h-full flex flex-col transition-all duration-300 ease-in-out group-hover:shadow-lg group-hover:-translate-y-1">
                                        <h2 className="text-xl font-semibold mb-2">{room.name}</h2>
                                        <p className="text-muted-foreground mb-4 flex-grow">{room.description}</p>
                                        <div className="flex flex-wrap gap-2">
                                            {room.tags.map((tag, index) => (
                                                <span key={index} className="text-xs font-medium bg-background text-foreground px-2 py-1 rounded-full">
                                                    {capitalize(tag)}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ThemeRoomsPage;