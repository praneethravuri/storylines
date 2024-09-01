import React from 'react';
import Hero from './Hero';
import StoryShowcase from './StoryShowcase';
import Questions from './Questions';
import Features from './Features';

const LandingPage = () => {
  return (
    <main>
      <div className=''>
        <section>
          <Hero />
        </section>
        <section>
          <Features />
        </section>
        <section>
          <StoryShowcase />
        </section>
        <section>
          <Questions />
        </section>
      </div>
    </main>
  )
}

export default LandingPage