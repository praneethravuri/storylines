import React from 'react';
import FlowMap from './FlowMap';
import {SidebarNav} from "@/components/SidebarNav"

const page = () => {
  return (
    <div className='h-screen flex'>
      <div className='flex-shrink-0'>
        <SidebarNav />
      </div>
      <div className='flex-grow overflow-auto'>
        <FlowMap />
      </div>
    </div>
  )
}

export default page