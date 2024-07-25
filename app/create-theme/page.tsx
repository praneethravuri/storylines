"use client";
import React, { useState, FormEvent, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from '@/components/ui/use-toast';
import { FaBookOpen } from 'react-icons/fa';
import { Button } from "@/components/ui/button";
import { SidebarNav } from "@/components/SidebarNav";
import LoadingScreen from '@/components/LoadingScreen';

const CreateThemeRoom = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [tags, setTags] = useState('');
    const { toast } = useToast();
    const router = useRouter();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch('/api/create-theme', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    description,
                    tags: tags.split(',').map(tag => tag.trim()),
                }),
            });

            if (response.ok) {
                toast({
                    title: "Theme room created successfully",
                    description: "Your new realm awaits exploration.",
                    variant : "success"
                });
                setName('');
                setDescription('');
                setTags('');
                router.push('/theme-rooms');
            } else {
                const errorData = await response.json();
                toast({
                    title: "Failed to create theme room",
                    description: errorData.message || "The realm remains uncharted. Please try again.",
                    variant: "destructive"
                });
            }
        } catch (error) {
            console.error('Error creating theme room:', error);
            toast({
                title: "An error occurred",
                description: "The mystical energies faltered. Please try again.",
                variant: "destructive"
            });
        }
    };

    return (
        <div className='h-screen flex'>
            <div className='flex-shrink-0'>
                <SidebarNav />
            </div>
            <div className='flex-grow overflow-auto'>
                <Suspense fallback={<LoadingScreen />}>
                    <div className='flex justify-center items-center min-h-screen bg-background'>
                        <div className='p-8 w-full max-w-2xl bg-card rounded-lg shadow-lg border border-border'>
                            <div className="space-y-8">
                                <div className="flex items-center space-x-4">
                                    <FaBookOpen className="icon-primary text-primary" />
                                    <h1 className="text-2xl font-bold">Create a New Theme Room</h1>
                                </div>
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-foreground">Name</label>
                                        <Input
                                            id="name"
                                            className='w-full mt-1'
                                            placeholder='Enter theme room name'
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="description" className="block text-sm font-medium text-foreground">Description</label>
                                        <Textarea
                                            id="description"
                                            rows={4}
                                            className='w-full mt-1 text-base'
                                            placeholder='Describe your theme room'
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="tags" className="block text-sm font-medium text-foreground">Tags</label>
                                        <Input
                                            id="tags"
                                            className='w-full mt-1'
                                            placeholder='Enter tags separated by commas'
                                            value={tags}
                                            onChange={(e) => setTags(e.target.value)}
                                        />
                                    </div>
                                    <Button type="submit" className='w-full'>
                                        Create Theme Room
                                    </Button>
                                </form>
                            </div>
                        </div>
                    </div>
                </Suspense>
            </div>
        </div>
    );
};

export default CreateThemeRoom;