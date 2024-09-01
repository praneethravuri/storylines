import React, { useState, useEffect } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import LoadingScreen from '../../components/layout/LoadingScreen';
import { ThemeRoom } from '../../types/ThemeRoom';
import { Story } from "../../types/Story"
import { getSingleThemeRoom } from '../../services/themeRoomAPI';
import { fetchStoriesByThemeRoomId } from "../../services/storyAPI";
import { PlusCircle } from 'lucide-react';
import StoryTree from './StoryTree';
import { Button } from '../../components/ui/button';

const StoryMap: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const location = useLocation();
    const [themeRoom, setThemeRoom] = useState<ThemeRoom | null>(location.state?.themeRoom || null);
    const [stories, setStories] = useState<Story[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            if (!id) {
                setError('Theme room ID is undefined');
                setIsLoading(false);
                return;
            }
            try {
                setIsLoading(true);
                let themeRoomData = themeRoom;
                if (!themeRoomData) {
                    themeRoomData = await getSingleThemeRoom(id);
                    setThemeRoom(themeRoomData);
                }
                const storiesResponse = await fetchStoriesByThemeRoomId(id);
                setStories(storiesResponse);
            } catch (err) {
                console.error('Error fetching data:', err);
                setError(err instanceof Error ? err.message : 'An error occurred while fetching data');
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, [id, themeRoom]);

    // useEffect(() => {
    //     if (themeRoom) {
    //         console.log("Theme Room details in StoryMap:", themeRoom);
    //     }
    // }, [themeRoom]);

    const handleCreateStory = () => {
        navigate(`/create-story`, { state: { themeRoom: themeRoom, rootNode: true } });
    };

    if (isLoading) return <LoadingScreen />;
    if (error) return <div>Error: {error}</div>;
    if (!themeRoom) return <div>Theme room not found</div>;

    return (
        <div className="h-screen">
            {stories.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full">
                    <p className="mb-4 text-center">No stories yet. Be the first to create one!</p>
                    <Button onClick={handleCreateStory}>
                        <PlusCircle size={20} className="mr-2" />
                        Create Your First Story
                    </Button>
                </div>
            ) : (
                <StoryTree stories={stories} themeRoom={themeRoom} />
            )}
        </div>
    );
}

export default StoryMap;