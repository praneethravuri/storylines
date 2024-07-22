"use client";

import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Clock, User } from 'lucide-react';
import Story from '@/schema/storySchema';

interface StoryData {
  title: string;
  author: string;
  content: string;
  createdAt: string;
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

const StoryCard = ({ story, direction, onSelect }: { story: NodeDetails; direction: 'prev' | 'next'; onSelect: () => void }) => (
  <div className="bg-card rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
    <div className="p-5">
      <h3 className="text-xl font-semibold mb-2 text-card-foreground">{story.title}</h3>
      <div className="flex items-center text-sm text-muted-foreground mb-3">
        <User size={16} className="mr-2" />
        <span>{story.author}</span>
      </div>
      <div className="flex items-center text-sm text-muted-foreground mb-4">
        <Clock size={16} className="mr-2" />
        <span>{new Date(story.createdAt).toLocaleDateString()}</span>
      </div>
      <button
        onClick={onSelect}
        className={`btn ${direction === 'prev' ? 'btn-secondary' : 'btn-primary'} w-full`}
      >
        {direction === 'prev' ? (
          <div className='flex justify-between items-center'>
            <ChevronLeft size={20} className="mr-2" />
            Go Back
          </div>
        ) : (
          <div className='flex justify-between items-center'>
            Continue
            <ChevronRight size={20} className="ml-2" />
          </div>
        )}
      </button>
    </div>
  </div>
);

const Page = ({ params }: { params: { storyId: string } }) => {
  const [storyDetails, setStoryDetails] = useState<StoryData | null>(null);
  const [prevStories, setPrevStories] = useState<NodeDetails[]>([]);
  const [nextStories, setNextStories] = useState<NodeDetails[]>([]);

  useEffect(() => {
    const fetchStoryDetails = async () => {
      try {
        const response = await fetch(`/api/fetch-one-story?storyId=${params.storyId}`);
        if (response.ok) {
          const data: StoryData = await response.json();
          setStoryDetails(data);

          const fetchLinkedStories = async (ids: string[]): Promise<NodeDetails[]> => {
            const responses = await Promise.all(ids.map(id => fetch(`/api/fetch-one-story?storyId=${id}`)));
            const stories: StoryData[] = await Promise.all(responses.map(res => res.json()));
            return stories.map(({ title, author, createdAt, customId }) => ({ title, author, createdAt, customId }));
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
      <div className="flex items-center justify-center h-screen bg-background">
        <div className="animate-pulse text-foreground text-2xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-4xl">
        <main className="bg-card shadow-xl rounded-lg overflow-hidden mb-12">
          <div className="p-8">
            <h1 className="text-4xl font-bold mb-4 text-card-foreground">{storyDetails.title}</h1>
            <div className="flex items-center text-muted-foreground mb-6">
              <User size={20} className="mr-2" />
              <span>{storyDetails.author}</span>
            </div>
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-card-foreground leading-relaxed whitespace-pre-line">
                {storyDetails.content}
              </p>
            </div>
          </div>
        </main>

        <section className="mb-12">
          <h2 className="heading-landing mb-8 text-center">Story Timeline</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="heading-medium mb-4">Previous Stories</h3>
              {prevStories.length > 0 ? (
                prevStories.map((story, index) => (
                  <div key={index} className="mb-4">
                    <StoryCard
                      story={story}
                      direction="prev"
                      onSelect={() => handleSelectStory(story.customId)}
                    />
                  </div>
                ))
              ) : (
                <p className="text-muted-foreground italic">This is the beginning of the story.</p>
              )}
            </div>
            <div>
              <h3 className="heading-medium mb-4">Continue the Story</h3>
              {nextStories.length > 0 ? (
                nextStories.map((story, index) => (
                  <div key={index} className="mb-4">
                    <StoryCard
                      story={story}
                      direction="next"
                      onSelect={() => handleSelectStory(story.customId)}
                    />
                  </div>
                ))
              ) : (
                <p className="text-muted-foreground italic">This story has reached its conclusion.</p>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Page;