import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Story } from '../../types/Story';
import { ThemeRoom } from '../../types/ThemeRoom';
import LoadingScreen from '../../components/layout/LoadingScreen';
import { fetchFilteredStories } from '../../services/storyAPI';
import { sanitizeHtml } from '../../utils/htmlSanitizer';
import { formatDate } from "../../utils/formatDate";
import { IconArrowLeft, IconArrowRight, IconCalendar, IconPlus } from '@tabler/icons-react';
import { Button } from '../../components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";

const DisplayStory: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [story, setStory] = useState<Story | null>(null);
    const [fetchedStories, setFetchedStories] = useState<Story[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [themeRoom, setThemeRoom] = useState<ThemeRoom | null>(location.state?.themeRoom || null);

    useEffect(() => {
        if (location.state as Story) {
            setStory(location.state as Story);
        }
    }, [location.state]);

    useEffect(() => {
        const fetchRelatedStories = async () => {
            if (story) {
                try {
                    setIsLoading(true);
                    const relatedStories = [...story.prev, ...story.next];
                    const storiesToFetch = await fetchFilteredStories(relatedStories);
                    setFetchedStories(storiesToFetch);
                } catch (error) {
                    setError("Unable to fetch related stories");
                } finally {
                    setIsLoading(false);
                }
            }
        };
        fetchRelatedStories();
    }, [story]);

    // useEffect(() => {
    //     if (themeRoom) {
    //         console.log("Theme Room details in DisplayStory:", themeRoom);
    //     }
    // }, [themeRoom]);

    if (isLoading) return <LoadingScreen />;
    if (error) return <div className="text-red-500 text-center mt-20">{error}</div>;
    if (!story) return <div className="text-center mt-20">No story found</div>;

    const prevStories = fetchedStories.filter(fetchedStory => story.prev.includes(fetchedStory._id));
    const nextStories = fetchedStories.filter(fetchedStory => story.next.includes(fetchedStory._id));

    return (
        <div className="container mx-auto px-4 py-8 mt-16 md:mt-24 min-h-screen">
            <div className="flex flex-col md:flex-row gap-8">
                <MainContent story={story} handleCreateStoryClick={handleCreateStoryClick} />
                <Sidebar
                    themeRoom={themeRoom}
                    prevStories={prevStories}
                    nextStories={nextStories}
                    handleStoryClick={handleStoryClick}
                />
            </div>
        </div>
    );

    function handleStoryClick(clickedStory: Story) {
        navigate(`/story`, { state: { ...clickedStory, themeRoom } });
    }

    function handleCreateStoryClick() {
        navigate(`/create-story`, { state: { prevStoryId: story?._id, themeRoom } });
    }
};

interface MainContentProps {
    story: Story;
    handleCreateStoryClick: () => void;
}

const MainContent: React.FC<MainContentProps> = ({ story, handleCreateStoryClick }) => (
    <div className="w-full md:w-3/4 space-y-6 border-r px-5">
        <BackToThemeRoomLink themeRoomId={story.themeRoomId} />
        <StoryHeader story={story} handleCreateStoryClick={handleCreateStoryClick} />
        <StoryContent content={story.content} />
    </div>
);

const BackToThemeRoomLink: React.FC<{ themeRoomId: string }> = ({ themeRoomId }) => (
    <Link
        to={`/story-map/${themeRoomId}`}
        className="inline-flex items-center gap-2 text-sm font-medium hover:text-foreground text-muted-foreground"
    >
        <IconArrowLeft className="w-4 h-4" />
        Back
    </Link>
);

const StoryHeader: React.FC<MainContentProps> = ({ story, handleCreateStoryClick }) => (
    <>
        <div className="flex items-center justify-between">
            <h1 className="text-3xl md:text-4xl font-bold">{story.title}</h1>
            <Button
                className="mr-2"
                onClick={handleCreateStoryClick}
                variant="custom2"
            >
                <IconPlus className="w-4 h-4" />
                Add Story
            </Button>
        </div>
        <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
                <IconCalendar className="w-4 h-4" />
                <span>{formatDate(story.createdAt)}</span>
            </div>
        </div>
    </>
);

const StoryContent: React.FC<{ content: string }> = ({ content }) => (
    <div className="prose prose-lg max-w-none">
        <div dangerouslySetInnerHTML={{ __html: sanitizeHtml(content) }} />
    </div>
);

interface SidebarProps {
    themeRoom: ThemeRoom | null;
    prevStories: Story[];
    nextStories: Story[];
    handleStoryClick: (story: Story) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ themeRoom, prevStories, nextStories, handleStoryClick }) => (
    <div className="w-full md:w-1/4 space-y-8">
        <AuthorInfo />
        {themeRoom && <ThemeRoomInfo themeRoom={themeRoom} />}
        <RelatedStories title="Previous Stories" stories={prevStories} handleStoryClick={handleStoryClick} />
        <RelatedStories title="Next Stories" stories={nextStories} handleStoryClick={handleStoryClick} />
    </div>
);

const AuthorInfo: React.FC = () => (
    <div className='border-b p-6'>
        <h4 className="text-lg font-medium mb-2">Written by</h4>
        <div className='flex items-center space-x-4 w-full'>
            <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="username">
                <p className='text-base text-muted-foreground'>Praneeth Ravuri</p>
            </div>
        </div>
    </div>
);

const ThemeRoomInfo: React.FC<{ themeRoom: ThemeRoom }> = ({ themeRoom }) => (
    <div className="space-y-4 border rounded-lg p-4">
        <h3 className="text-xl font-semibold">{themeRoom.name}</h3>
        <p className="text-sm text-muted-foreground">{themeRoom.description}</p>
        {themeRoom.tags && themeRoom.tags.length > 0 && (
            <div>
                <h4 className="text-sm font-semibold mb-2">Tags:</h4>
                <div className="flex flex-wrap gap-2">
                    {themeRoom.tags.map((tag, index) => (
                        <span key={index} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        )}
    </div>
);

interface RelatedStoriesProps {
    title: string;
    stories: Story[];
    handleStoryClick: (story: Story) => void;
}

const RelatedStories: React.FC<RelatedStoriesProps> = ({ title, stories, handleStoryClick }) => (
    stories.length > 0 && (
        <div className="space-y-4">
            <h3 className="text-xl font-semibold">{title}</h3>
            {stories.map((relatedStory) => (
                <div key={relatedStory._id} className="border rounded-lg p-4 space-y-2 hover:shadow-md transition-shadow">
                    <h4 className="text-lg font-medium">{relatedStory.title}</h4>
                    <button
                        onClick={() => handleStoryClick(relatedStory)}
                        className="text-sm font-medium hover:text-foreground text-muted-foreground"
                    >
                        Read More <IconArrowRight className="inline" />
                    </button>
                </div>
            ))}
        </div>
    )
);

export default DisplayStory;