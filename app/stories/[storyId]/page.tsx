"use client";
import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface StoryDetails {
  title: string;
  author: string;
  content: string;
  createdAt: Date;
  prev: string[];
  next: string[];
  type?: string;
  customId: string;
}

interface NodeDetails {
  title: string;
  author: string;
  createdAt: string;
  customId: string;
}

const StoryLink = ({ story, direction, onSelect }: { story: NodeDetails; direction: 'prev' | 'next'; onSelect: () => void }) => (
  <div className="mb-4 p-4 border rounded-lg hover:shadow-md transition-shadow duration-300">
    <div className="flex justify-between items-center mb-2">
      <h3 className="text-lg font-semibold">{story.title}</h3>
      {direction === 'prev' ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
    </div>
    <p className="text-sm text-gray-600 mb-2">By {story.author}</p>
    <div className="flex justify-between items-center">
      <span className="text-sm text-gray-500">{new Date(story.createdAt).toLocaleDateString()}</span>
      <button 
        onClick={onSelect}
        className="btn btn-secondary"
      >
        {direction === 'prev' ? 'Go Back' : 'Continue'}
      </button>
    </div>
  </div>
);

const Page = ({ params }: { params: { storyId: string } }) => {
  const [storyDetails, setStoryDetails] = useState<StoryDetails | null>(null);
  const [prevStories, setPrevStories] = useState<NodeDetails[]>([]);
  const [nextStories, setNextStories] = useState<NodeDetails[]>([]);

  useEffect(() => {
    const fetchStoryDetails = async () => {
      try {
        const response = await fetch(`/api/fetch-one-story?storyId=${params.storyId}`);
        if (response.ok) {
          const data: StoryDetails = await response.json();
          setStoryDetails(data);

          const fetchLinkedStories = async (ids: string[]) => {
            const responses = await Promise.all(ids.map(id => fetch(`/api/fetch-one-story?storyId=${id}`)));
            return await Promise.all(responses.map(res => res.json()));
          };

          if (data.prev.length > 0) {
            const prevStoriesData = await fetchLinkedStories(data.prev);
            setPrevStories(prevStoriesData);
          }

          if (data.next.length > 0) {
            const nextStoriesData = await fetchLinkedStories(data.next);
            setNextStories(nextStoriesData);
          }
        } else {
          console.error("Failed to fetch story details");
        }
      } catch (error) {
        console.error("Error fetching story details:", error);
      }
    };
    fetchStoryDetails();
  }, [params.storyId]);

  const handleSelectStory = (customId: string) => {
    window.location.href = `/stories/${customId}`;
  };

  if (!storyDetails) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-pulse text-gray-400">Loading...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Previous Stories</h2>
        {prevStories.length > 0 ? (
          prevStories.map((story, index) => (
            <StoryLink
              key={index}
              story={story}
              direction="prev"
              onSelect={() => handleSelectStory(story.customId)}
            />
          ))
        ) : (
          <p className="text-gray-500">This is the beginning of the story.</p>
        )}
      </div>

      <main className="mb-12">
        <h1 className="text-4xl font-bold mb-2">{storyDetails.title}</h1>
        <p className="text-gray-500 mb-4">By {storyDetails.author}</p>
        <div className="p-6 rounded-lg shadow-lg">
          <p className="text-gray-800 dark:text-gray-200 leading-relaxed whitespace-pre-line">
            {storyDetails.content}
          </p>
        </div>
      </main>

      <div>
        <h2 className="text-2xl font-semibold mb-4">Continue the story</h2>
        {nextStories.length > 0 ? (
          nextStories.map((story, index) => (
            <StoryLink
              key={index}
              story={story}
              direction="next"
              onSelect={() => handleSelectStory(story.customId)}
            />
          ))
        ) : (
          <p className="text-gray-500">This story has reached its conclusion.</p>
        )}
      </div>
    </div>
  );
};

export default Page;