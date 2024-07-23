import React from 'react';
import Link from 'next/link';
import { FaArrowRight, FaRegCompass, FaMap, FaUsers, FaStar, FaComments, FaPencilAlt, FaBookReader, FaRandom, FaLightbulb, FaTrophy, FaHeart } from 'react-icons/fa';
import { TbRouteSquare, TbArrowFork } from "react-icons/tb";
import { ArrowTopRightIcon } from '@radix-ui/react-icons'
import styles from "@/styles/Landingpage.module.css";
import {
  Accordion, AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import OrbitingCircles from '@/components/magicui/orbiting-circles';

const LandingPage = () => {
  return (
    <div className={`min-h-screen ${styles.landingPage}`}>
      <Hero />
      <Features />
      <StoryExperience />
      <Inspiration />
      <FAQ />
      <GitHubContribution />
      <Footer />
    </div>
  );
};

const Hero = () => (
  <main className="container min-h-screen flex flex-col justify-center items-center w-full text-center relative overflow-hidden">
    <div className="relative flex h-[450px] w-full flex-col items-center justify-center overflow-hidden rounded-lg">
      <h1 className="heading-landing mb-4 relative z-10">
        Craft Your <span className="text-primary">Infinite</span> Story
      </h1>
      <OrbitingCircles
        className="size-[30px] bg-primary/10 text-pink-400 border border-primary/20"
        duration={20}
        delay={20}
        radius={80}
      >
        <FaStar className="size-5" />
      </OrbitingCircles>
      <OrbitingCircles
        className="size-[30px] bg-primary/10 text-foreground border border-secondary/40"
        duration={20}
        delay={10}
        radius={80}
      >
        <FaComments className="size-5" />
      </OrbitingCircles>
      <OrbitingCircles
        className="size-[50px] bg-primary/10 text-blue-400 border border-accent/30"
        radius={190}
        duration={20}
        reverse
      >
        <FaUsers className="size-6" />
      </OrbitingCircles>
      <OrbitingCircles
        className="size-[50px] bg-primary/10 text-emerald-400 border border-muted/40"
        radius={190}
        duration={20}
        delay={20}
        reverse
      >
        <FaMap className="size-6" />
      </OrbitingCircles>
    </div>
    <p className="paragraph-primary mb-8 max-w-2xl mx-auto relative z-10">
      Dive into a world where every reader is a writer, and every story branches into endless possibilities. Connect, create, and explore narratives that evolve with each contribution.
    </p>
    <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 relative z-10">
      <button className="btn btn-primary">Start Writing</button>
      <Link href="/storymap" className="btn btn-outline group">
        Explore Stories <FaArrowRight className="inline-block ml-2 group-hover:translate-x-1 transition-transform" />
      </Link>
    </div>
  </main>
);

const FeatureCard = ({ icon: Icon, title, description }) => (
  <div className="flex flex-col items-center p-6">
    <Icon className="text-primary text-4xl mb-4" />
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-center text-muted-foreground">{description}</p>
  </div>
);

const Features = () => (
  <section className="container py-20">
    <div className="text-center mb-16">
      <h1 className="heading-landing mb-4">
        Your Story, <span className="text-primary">Reimagined</span>
      </h1>
      <p className="paragraph-primary mb-8 max-w-2xl mx-auto">
        Experience a new era of storytelling where every choice leads to a new adventure, and every writer can leave their mark.
      </p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <FeatureCard
        icon={FaPencilAlt}
        title="Create"
        description="Craft your story nodes and watch them bloom into intricate narratives."
      />
      <FeatureCard
        icon={FaRegCompass}
        title="Explore"
        description="Traverse through a forest of interconnected tales and discover new worlds."
      />
      <FeatureCard
        icon={TbRouteSquare}
        title="Navigate"
        description="Choose your own path and shape the story as you go, creating unique adventures."
      />
    </div>
  </section>
);

const ExperienceCard = ({ icon: Icon, title, description }) => (
  <div className="flex flex-col items-center p-6">
    <Icon className="text-primary text-4xl mb-4" />
    <h3 className="text-xl font-semibold mb-2 text-center">{title}</h3>
    <p className="text-center text-muted-foreground">{description}</p>
  </div>
);

const StoryExperience = () => (
  <section className="container py-20 relative overflow-hidden">
    <div className="">
      <h2 className="heading-landing text-center mb-12">Experience the <span className="text-primary">Story Revolution</span></h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <ExperienceCard
          icon={FaLightbulb}
          title="Endless Creativity"
          description="Unleash your imagination with unlimited story possibilities and collaborative writing."
        />
        <ExperienceCard
          icon={FaTrophy}
          title="Achieve & Grow"
          description="Earn badges, level up your writing skills, and gain recognition in our vibrant community."
        />
        <ExperienceCard
          icon={FaHeart}
          title="Connect & Inspire"
          description="Join a community of passionate storytellers, share ideas, and inspire each other."
        />
      </div>
      <p className="paragraph-primary text-center mt-12 max-w-2xl mx-auto">
        StoryLines isn&lsquo;t just a platform; it&lsquo;s a new way of experiencing narratives. Dive into a world where stories evolve, branch out, and come alive with every contribution.
      </p>
    </div>
  </section>
);

const InspirationCard = ({ icon: Icon, title, description }) => (
  <div className="flex items-center p-6 bg-card">
    <Icon className="text-primary text-3xl mr-4" />
    <div>
      <h3 className="text-lg font-semibold mb-1">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  </div>
);

const Inspiration = () => (
  <section className="container py-20 relative overflow-hidden">
    <div className="text-center mb-16">
      <h1 className="heading-landing mb-4">
        Dive into the <span className="text-primary">Story Multiverse</span>
      </h1>
      <p className="paragraph-primary mb-8 max-w-2xl mx-auto">
        Where technology meets creativity, and every reader becomes a writer. Join us in redefining the art of narrative.
      </p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <InspirationCard
        icon={FaPencilAlt}
        title="Start a New Story"
        description="Create the first node of your story and watch it grow into a vast narrative network."
      />
      <InspirationCard
        icon={TbArrowFork}
        title="Branch Out"
        description="Add multiple paths to existing stories, creating a web of infinite possibilities."
      />
      <InspirationCard
        icon={FaBookReader}
        title="Explore & Contribute"
        description="Dive into others' stories and add your own twists and turns to the narrative."
      />
      <InspirationCard
        icon={FaRandom}
        title="Random Adventure"
        description="Start a journey through randomly selected story nodes for unexpected tales."
      />
    </div>
    <div className="mt-12 text-center">
      <h3 className="text-2xl font-semibold mb-4">Ready to Start Your Journey?</h3>
      <button className="btn btn-primary">Create Your First Node</button>
    </div>
  </section>
);

const GitHubContribution = () => (
  <section className="container py-20 relative overflow-hidden">
    <div className="text-center mb-16">
      <h1 className="heading-landing mb-4">
        StoryLines is <span className="text-primary">Open Source</span>
      </h1>
      <p className="paragraph-primary mb-8 max-w-2xl mx-auto">
        We believe in the power of open-source. Learning and sharing knowledge are essential for growth and innovation. Join us and contribute to a community that values collaboration and transparency. Together, we can achieve more.
      </p>
      <Link href="https://github.com/praneethravuri/storylines" target='_blank' className="btn btn-outline group">
        Contribute to StoryLines <ArrowTopRightIcon className="inline-block ml-2 group-hover:translate-x-1 group-hover:-translate-y-1    transition-transform" />
      </Link>
    </div>
  </section>
)


const FAQ = () => (
  <section className="container py-20">
    <h1 className="heading-landing mb-8 text-center">Frequently Asked Questions</h1>
    <div className="w-full md:w-2/3 mx-auto">
      <Accordion type="single" collapsible className="w-full">
        {[
          {
            question: "How does the branching story system work?",
            answer: "Our platform allows writers to create story nodes that can branch off in multiple directions. Readers can choose which path to follow, effectively co-creating the narrative as they go."
          },
          {
            question: "Can I collaborate with other writers on a single story branch?",
            answer: "Absolutely! You can invite other writers to contribute to your story nodes or join existing collaborative projects. This creates a rich, diverse narrative tapestry."
          },
          {
            question: "How do I keep track of all the story branches I've created or explored?",
            answer: "We provide a personalized dashboard that visualizes your story map, showing all the nodes you've created or explored. It's like your own literary constellation!"
          },
          {
            question: "Is there a rating or feedback system for story contributions?",
            answer: "Yes, we have a community-driven rating system where readers can upvote their favorite story nodes and leave constructive feedback. This helps highlight quality content and encourages writers to improve their craft."
          },
          {
            question: "Can I monetize my stories on StoryLines?",
            answer: "While we currently don't have a direct monetization feature, we're exploring options for the future. For now, StoryLines is a great platform to build your audience and showcase your writing skills."
          },
          {
            question: "Are there any content guidelines or restrictions?",
            answer: "We encourage creativity but also maintain a safe and inclusive environment. We have community guidelines that prohibit explicit content, hate speech, and copyright infringement. All content should be original or properly attributed."
          },
          {
            question: "How can I get started if I'm new to creative writing?",
            answer: "StoryLines is perfect for beginners! You can start by exploring existing stories, contributing to open branches, or starting a simple story node. We also provide writing prompts and tutorials to help you get started."
          }
        ].map((faq, index) => (
          <AccordionItem key={index} value={`item-${index + 1}`}>
            <AccordionTrigger>{faq.question}</AccordionTrigger>
            <AccordionContent>{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  </section>
);

const Footer = () => (
  <footer className="border-t py-12 bg-background/50 backdrop-blur-sm">
    <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
      <div className="mb-8 md:mb-0">
        <h2 className="text-2xl font-bold">StoryLines</h2>
        <p className="text-sm text-muted-foreground mt-2">Weaving tales, one node at a time</p>
      </div>
      <nav className="flex flex-wrap justify-center md:justify-end">
        <Link href="/about" className="mx-3 nav-link">About</Link>
        <Link href="/contact" className="mx-3 nav-link">Contact</Link>
        <Link href="/privacy" className="mx-3 nav-link">Privacy Policy</Link>
        <Link href="/terms" className="mx-3 nav-link">Terms of Service</Link>
      </nav>
    </div>
    <div className="container mx-auto mt-8 text-center text-sm text-muted-foreground">
      <p>&copy; 2024 StoryLines. All rights reserved.</p>
      <p>Made by <Link href="https://www.praneethravuri.com/" className='underline text-primary font-semibold decoration-dashed' target='_blank'>Praneeth Ravuri</Link></p>
    </div>
  </footer>
);

export default LandingPage;