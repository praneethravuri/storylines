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
      <div className='flex justify-center items-center min-h-screen bg-gray-50'>
        <div className='p-8 w-full max-w-2xl bg-white shadow-lg rounded-lg border border-gray-200'>
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <FaPen className="text-4xl text-primary" />
              <h1 className="text-3xl font-semibold text-gray-800">Craft Your Tale</h1>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                className='w-full border-gray-300 rounded-lg focus:border-primary focus:ring-primary'
                placeholder='Once upon a time...'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <Textarea
                rows={10}
                className='w-full border-gray-300 rounded-lg focus:border-primary focus:ring-primary'
                placeholder='Your story unfolds here...'
                onChange={handleTextChange}
                maxLength={5000}
                value={content}
              />
              <div className="flex justify-between items-center text-gray-600">
                <span className="text-sm">
                  {characterCount}/5000 characters
                </span>
                <button
                  type="submit"
                  className='px-6 py-2 bg-primary text-white rounded-full hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary'
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
