import React from 'react';
import { X } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from 'next/link';

const StoryList = ({ stories, removeStory, type }) => (
    <div className="mb-6 w-full">
        <div className="overflow-y-auto">
            {stories.map((story) => (
                <Link href={`/stories/${story.id}`} key={story.id} className="bg-accent rounded-md p-3 mb-3 relative group flex items-center">
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
    return (
        <div className="fixed inset-x-0 bottom-0 sm:top-[calc(50%+2rem)] sm:-translate-y-1/2 z-50 p-4 w-full sm:w-80 md:w-96 h-[60vh] sm:h-[80vh] bg-background border-t sm:border sm:rounded-lg border-accent-muted shadow-lg flex flex-col items-center mx-5">
            <div className="flex-grow overflow-y-auto space-y-4 w-full max-w-[400px]">
                <Tabs defaultValue="favorite" className="w-full">
                    <TabsList className="w-full">
                        <TabsTrigger value="selected" className="flex-1">Selected Stories</TabsTrigger>
                        <TabsTrigger value="favorite" className="flex-1">Favorite Stories</TabsTrigger>
                    </TabsList>
                    <TabsContent value="selected">
                        <StoryList
                            stories={selectedStories}
                            removeStory={removeStory}
                            type="selected"
                        />
                    </TabsContent>
                    <TabsContent value="favorite">
                        <StoryList
                            stories={favoritedStories}
                            removeStory={removeStory}
                            type="favorited"
                        />
                    </TabsContent>
                </Tabs>
            </div>
            {controls}
        </div>
    );
};

export default ControlPanel;
