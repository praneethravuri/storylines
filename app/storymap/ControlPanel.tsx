import React from 'react';
import { X } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from 'next/link';
import { useTheme } from "next-themes";
import { FaWandMagicSparkles } from "react-icons/fa6";

const StoryList = ({ stories, removeStory, type, isDark }) => (
    <div className="mb-6 w-full">
        <div className="overflow-y-auto">
            {stories.map((story) => (
                <Link href={`/stories/${story.id}`} key={story.id} className={`rounded-md p-3 mb-3 relative group flex items-center ${isDark ? 'node-card-dark' : 'node-card-light'}`}>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            removeStory(story.id, type);
                        }}
                        className="absolute top-2 right-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-200"
                    >
                        <X size={16} className="text-muted-foreground hover:text-destructive" />
                    </button>
                    <div className="flex-grow">
                        <h3 className="font-semibold mb-1 pr-6">{story.title}</h3>
                        <p className="text-sm text-muted-foreground">{story.author}</p>
                    </div>
                </Link>
            ))}
            {stories.length === 0 && (
                <p className="text-center text-muted-foreground">No stories {type}</p>
            )}
        </div>
    </div>
);

const ControlPanel = ({ selectedStories, favoritedStories, removeStory, controls }) => {
    const { theme } = useTheme();
    const isDark = theme === 'dark';
    return (
        <div className="fixed inset-x-0 bottom-0 sm:top-[calc(50%+2rem)] sm:-translate-y-1/2 z-50 p-4 w-full sm:w-80 md:w-96 h-[60vh] sm:h-[80vh] bg-background border-t sm:border sm:rounded-lg border-accent-muted shadow-lg flex flex-col items-center sm:mx-5">
            <div className="flex-grow overflow-y-auto space-y-4 w-full max-w-[400px]">
                <Tabs defaultValue="selected" className="w-full">
                    <TabsList className="w-full">
                        <TabsTrigger value="selected" className="flex-1">Selected Stories</TabsTrigger>
                        <TabsTrigger value="favorite" className="flex-1">Favorite Stories</TabsTrigger>
                    </TabsList>
                    <TabsContent value="selected">
                        <StoryList
                            stories={selectedStories}
                            removeStory={removeStory}
                            type="selected"
                            isDark={isDark}
                        />
                    </TabsContent>
                    <TabsContent value="favorite">
                        <StoryList
                            stories={favoritedStories}
                            removeStory={removeStory}
                            type="favorited"
                            isDark={isDark}
                        />
                    </TabsContent>
                </Tabs>
            </div>
            <div className="w-full mt-4 space-y-8">
                {selectedStories.length > 0 && (
                    <div className="flex justify-center mt-6">
                        <Link href="#" className="btn btn-primary flex items-center space-x-2">
                            <FaWandMagicSparkles />
                            <span>Generate</span>
                        </Link>
                    </div>
                )}
                <div className="w-full flex justify-center mt-6">
                    {controls}
                </div>
            </div>
        </div>
    );
};

export default ControlPanel;
