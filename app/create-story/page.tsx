"use client";
import React, { useState, FormEvent, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from '@/components/ui/use-toast';
import { FaPen, FaSpinner } from 'react-icons/fa';

const Loading = () => (
  <div className='flex justify-center items-center min-h-screen'>
    <FaSpinner className="animate-spin text-4xl text-primary" />
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
          title: "Story created successfully",
          description: "Your tale has been added to the narrative tapestry.",
        });
        setTitle('');
        setContent('');
        setCharacterCount(0);
        router.push('/storymap');
      } else {
        toast({
          title: "Failed to submit story",
          description: "The quill faltered. Please try again.",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Error submitting story:', error);
      toast({
        title: "An error occurred",
        description: "The pages remain blank. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <Suspense fallback={<Loading />}>
      <div className='flex justify-center items-center min-h-screen'>
        <div className='p-10 w-full max-w-4xl rounded-lg shadow-2xl'>
          <div className="space-y-8 relative">
            <div className="flex items-center space-x-4">
              <FaPen className="text-5xl text-primary" />
              <h1 className="heading-primary">Craft Your Tale</h1>
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-primary to-secondary"></div>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="">
                <Input
                  className='border-none focus:outline-none text-4xl font-bold tracking-tight sm:text-6xl bg-transparent text-foreground placeholder-gray-500'
                  placeholder='Once upon a time...'
                  style={{ caretColor: 'white' }}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />

              </div>
              <Textarea
                rows={12}
                className='border-none focus:outline-none w-full text-foreground rounded-lg p-4 text-lg'
                placeholder='Your story unfolds here...'
                onChange={handleTextChange}
                maxLength={5000}
                value={content}
              />
              <div className="flex justify-between items-center mt-4">
                <span className="text-sm text-secondary-primary">
                  {characterCount}/5000 characters
                </span>
                <button
                  type="submit"
                  className='btn btn-primary px-6 py-2 rounded-full'
                >
                  Publish Your Tale
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Suspense>
  );
};

export default CreateStory;
