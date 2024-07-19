"use client";

import React, { useState, FormEvent } from 'react';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from '@/components/ui/use-toast';

const Page = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [characterCount, setCharacterCount] = useState(0);

  const {toast} = useToast();

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
          prev: null,
          next: null,
        }),
      });

      if (response.ok) {
        toast({
          title: "Post created successfully"
        })
        setTitle('');
        setContent('');
        setCharacterCount(0);
      } else {
        // Handle errors
        alert('Failed to submit story. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting story:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div className='flex flex-col items-center min-h-screen py-16'>
      <div className='p-10 w-full max-w-7xl'>
        <div className="space-y-8">
          <h1>Create your story</h1>
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
  );
};

export default Page;