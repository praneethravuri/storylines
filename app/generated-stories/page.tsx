'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const GeneratedStoriesPage = () => {
    const searchParams = useSearchParams();
    const [stories, setStories] = useState([]);

    useEffect(() => {
        const storiesParam = searchParams.get('stories');
        if (storiesParam) {
            try {
                const decodedStories = JSON.parse(decodeURIComponent(storiesParam));
                setStories(decodedStories);
            } catch (error) {
                console.error('Error parsing stories:', error);
            }
        }
    }, [searchParams]);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Generated Stories</h1>
            {stories.length > 0 ? (
                <ul className="space-y-4">
                    {stories.map((story) => (
                        <li key={story.id} className="border p-4 rounded-md">
                            <h2 className="text-xl font-semibold">{story.title}</h2>
                            <p className="text-gray-600">Author: {story.author}</p>
                            {/* Add more story details here if needed */}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No stories to display.</p>
            )}
        </div>
    );
};

export default GeneratedStoriesPage;