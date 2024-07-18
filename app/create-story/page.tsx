import React from 'react';
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

const Page = () => {
  return (
    <div className='flex flex-col items-center min-h-screen py-16'>
      <div className='p-10 w-full max-w-7xl'>
        <div className="title space-y-8">
          <h1>Create your story</h1>
          <div className="inputs border-t border-zinc-700">
            <Input
              className='border-none focus:outline-none text-4xl font-bold tracking-tight sm:text-6xl bg-transparent text-white placeholder-gray-500'
              placeholder='Untitled'
              style={{ caretColor: 'white' }}
            />
            <Textarea rows={22} className='border-none focus:outline-none' placeholder='Write something' />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page