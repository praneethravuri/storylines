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

const Page = ({ params }: { params: { storyId: string } }) => {
  const [storyDetails, setStoryDetails] = useState<StoryDetails | null>(null);

  useEffect(() => {
    const fetchStoryDetails = async () => {
      try {
        const response = await fetch(`/api/fetch-one-story?storyId=${params.storyId}`);
        const data: StoryDetails = await response.json();
        if (response.ok) {
          setStoryDetails(data);
        } else {
          console.error("Something went wrong");
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchStoryDetails();
  }, [params.storyId]);

  if (!storyDetails) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-pulse text-gray-400">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center 0 p-4 min-h-screen pt-20">
      <div className="max-w-3xl mx-auto">
        <header className="mb-12">
          <h1 className="text-4xl font-bold mb-4 ">
            {storyDetails.title}
          </h1>
          <p className="text-gray-400">By {storyDetails.author}</p>
        </header>
        
        <main className=" p-8 rounded-lg shadow-2xl backdrop-blur-sm">
          <p className="dark:text-white text-black leading-relaxed whitespace-pre-line">
            {storyDetails.content}
          </p>
        </main>
        
        {/* <footer className="mt-12 flex justify-between items-center">
          {storyDetails.prev.length > 0 && (
            <button className="flex items-center text-gray-400 hover:text-blue-400 transition-colors">
              <ChevronLeft size={20} />
              <span className="ml-2">Previous</span>
            </button>
          )}
          {storyDetails.next.length > 0 && (
            <button className="flex items-center text-gray-400 hover:text-blue-400 transition-colors">
              <span className="mr-2">Next</span>
              <ChevronRight size={20} />
            </button>
          )}
        </footer> */}
      </div>
    </div>
  );
};

export default Page;