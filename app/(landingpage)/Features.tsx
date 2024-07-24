import React from 'react';
import { BentoCard, BentoGrid } from '@/components/magicui/bento-grid';

const features = [
    {
      name: "Write & Branch",
      description: "Create the first node of your story and watch it branch into infinite possibilities.",
      href: "/write",
      cta: "Start Writing",
      background: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" className="absolute inset-0 w-full h-full opacity-10">
        <path d="M50,100 Q100,50 150,100 T250,100" fill="none" stroke="currentColor" strokeWidth="4"/>
        <circle cx="50" cy="100" r="10" fill="currentColor"/>
        <circle cx="150" cy="100" r="10" fill="currentColor"/>
        <path d="M70,20 L90,40 L70,60 Z" fill="currentColor"/>
      </svg>,
      className: "lg:row-start-1 lg:row-end-4 lg:col-start-2 lg:col-end-3",
    },
    {
      name: "Explore Stories",
      description: "Dive into a vast universe of interconnected tales crafted by our community.",
      href: "/explore",
      cta: "Discover",
      background: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" className="absolute inset-0 w-full h-full opacity-10">
        <circle cx="100" cy="100" r="80" fill="none" stroke="currentColor" strokeWidth="4"/>
        <circle cx="100" cy="100" r="40" fill="none" stroke="currentColor" strokeWidth="4"/>
        <circle cx="100" cy="100" r="10" fill="currentColor"/>
        <path d="M100,20 L100,40 M100,160 L100,180 M20,100 L40,100 M160,100 L180,100" stroke="currentColor" strokeWidth="4"/>
      </svg>,
      className: "lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-3",
    },
    {
      name: "Choose Your Path",
      description: "Navigate through branching narratives and shape the story as you read.",
      href: "/read",
      cta: "Choose Wisely",
      background: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" className="absolute inset-0 w-full h-full opacity-10">
        <path d="M100,20 L100,80 M100,80 L60,180 M100,80 L140,180" fill="none" stroke="currentColor" strokeWidth="4"/>
        <circle cx="100" cy="20" r="10" fill="currentColor"/>
        <circle cx="60" cy="180" r="10" fill="currentColor"/>
        <circle cx="140" cy="180" r="10" fill="currentColor"/>
      </svg>,
      className: "lg:col-start-1 lg:col-end-2 lg:row-start-3 lg:row-end-4",
    },
    {
      name: "Collaborate",
      description: "Join forces with other writers to create expansive story worlds.",
      href: "/collaborate",
      cta: "Team Up",
      background: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" className="absolute inset-0 w-full h-full opacity-10">
        <circle cx="60" cy="60" r="30" fill="none" stroke="currentColor" strokeWidth="4"/>
        <circle cx="140" cy="60" r="30" fill="none" stroke="currentColor" strokeWidth="4"/>
        <circle cx="100" cy="140" r="30" fill="none" stroke="currentColor" strokeWidth="4"/>
        <path d="M60,90 L100,110 M140,90 L100,110" fill="none" stroke="currentColor" strokeWidth="4"/>
      </svg>,
      className: "lg:col-start-3 lg:col-end-3 lg:row-start-1 lg:row-end-2",
    },
    {
      name: "Get Inspired",
      description: "Spark your creativity with unique narratives",
      href: "/prompts",
      cta: "Find Inspiration",
      background: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" className="absolute inset-0 w-full h-full opacity-10">
        <path d="M100,20 Q140,60 100,100 T100,180" fill="none" stroke="currentColor" strokeWidth="4"/>
        <circle cx="100" cy="20" r="10" fill="currentColor"/>
        <path d="M80,180 L120,180" stroke="currentColor" strokeWidth="4"/>
      </svg>,
      className: "lg:col-start-3 lg:col-end-3 lg:row-start-2 lg:row-end-4",
    },
  ];

const Features = () => {
  return (
<section className="container py-20">
    <div className="text-center mb-16">
      <h2 className="heading-landing mb-4">
        Your Story, <span className="text-primary">Reimagined</span>
      </h2>
      <p className="paragraph-primary mb-8 max-w-2xl mx-auto">
      Experience a new era of storytelling where every choice leads to a new adventure, and every writer can leave their mark.
      </p>
    </div>
    <BentoGrid className="lg:grid-rows-3">
      {features.map((feature) => (
        <BentoCard key={feature.name} {...feature} />
      ))}
    </BentoGrid>
  </section>
  )
}

export default Features