"use client";
import React, { useState, FormEvent, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from '@/components/ui/use-toast';
import { FaPen, FaSpinner } from 'react-icons/fa';
import { SidebarNav } from "@/components/SidebarNav"

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
    <div className='h-screen flex'>
      <div className='flex-shrink-0'>
        <SidebarNav />
      </div>
      <div className='flex-grow overflow-auto'>
        <Suspense fallback={<Loading />}>
          <div className='flex justify-center items-center min-h-screen bg-background'>
            <div className='p-8 w-full max-w-2xl bg-card rounded-lg shadow-lg border border-border'>
              <div className="space-y-8">
                <div className="flex items-center space-x-4">
                  <FaPen className="icon-primary text-primary" />
                  <h1 className="heading-secondary">Craft Your Tale</h1>
                </div>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <Input
                    className='w-full bg-background text-foreground placeholder-muted-foreground px-5 py-10'
                    placeholder='Once upon a time...'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <Textarea
                    rows={10}
                    className='w-full bg-background text-foreground placeholder-muted-foreground resize-none p-5'
                    placeholder='Your story unfolds here...'
                    onChange={handleTextChange}
                    maxLength={5000}
                    value={content}
                  />
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      {characterCount}/5000 characters
                    </span>
                    <button
                      type="submit"
                      className='btn btn-primary'
                    >
                      Publish Your Tale
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </Suspense>
      </div>
    </div>

  );
};

export default CreateStory;