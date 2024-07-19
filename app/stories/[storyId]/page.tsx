"use client";
import React, { useEffect, useState } from 'react';

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
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{storyDetails.title}</h1>
      <p>Author: {storyDetails.author}</p>
      <p>{storyDetails.content}</p>
      {/* Add more fields as needed */}
    </div>
  );
};

export default Page;
