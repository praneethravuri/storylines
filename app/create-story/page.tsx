"use client";
import React, { useState, FormEvent, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from '@/components/ui/use-toast';

const Loading = () => (
  <div className='flex justify-center items-center min-h-screen'>
    <div className='text-white'>Loading...</div>
  </div>
);

const CreateStory = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [characterCount, setCharacterCount] = useState(0);
  const [currId, setCurrId] = useState<string | null>(null);
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const currIdParam = searchParams.get('currId');
    if (currIdParam) {
      setCurrId(currIdParam);
    }
  }, [searchParams]);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    setContent(text);
    setCharacterCount(text.length);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
   
    try {
      const response = await fetch('/api/create-story', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          content,
          prev: currId ? [currId] : [],
          next: [],
        }),
      });
      
      if (response.ok) {
        toast({
          title: "Post created successfully"
        });
        setTitle('');
        setContent('');
        setCharacterCount(0);
        
        // Redirect to /storymap
        router.push('/storymap');
      } else {
        // Handle errors
        toast({
          title: "Failed to submit story",
          description: "Please try again.",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Error submitting story:', error);
      toast({
        title: "An error occurred",
        description: "Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <Suspense fallback={<Loading />}>
      <div className='flex flex-col items-center min-h-screen py-16'>
        <div className='p-10 w-full max-w-7xl'>
          <div className="space-y-8">
            <h1 className="text-3xl font-bold">Create your story</h1>
            {currId && (
              <p className="text-sm text-gray-400">
                Creating a story connected to: {currId}
              </p>
            )}
            <form onSubmit={handleSubmit} className="space-y-4 border-t border-zinc-700 pt-8">
              <Input
                className='border-none focus:outline-none text-4xl font-bold tracking-tight sm:text-6xl bg-transparent text-white placeholder-gray-500'
                placeholder='Untitled'
                style={{ caretColor: 'white' }}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <Textarea
                rows={10}
                className='border-none focus:outline-none w-full text-white bg-transparent'
                placeholder='Write something'
                onChange={handleTextChange}
                maxLength={5000}
                value={content}
              />
              <div className="flex justify-between items-center mt-4">
                <span className="text-sm text-gray-400">
                  {characterCount}/5000 characters
                </span>
                <Button
                  type="submit"
                  className='text-tertiary bg-accent-muted hover:bg-accent-muted'
                >
                  Publish
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Suspense>
  );
};

export default CreateStory;
