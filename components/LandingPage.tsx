import React from 'react';
import Link from 'next/link';
import { FaArrowRight, FaPencilAlt, FaRegCompass, FaMap, FaUsers, FaStar, FaComments } from 'react-icons/fa';
import { TbRouteSquare } from "react-icons/tb";
import styles from "@/styles/Landingpage.module.css";
import {
  Accordion, AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import OrbitingCircles from '@/components/magicui/orbiting-circles';

const cardContent = [
  { icon: FaPencilAlt, title: "Create", tagline: "Unleash your imagination and bring stories to life" },
  { icon: FaRegCompass, title: "Explore", tagline: "Embark on literary journeys through captivating narratives" },
  { icon: TbRouteSquare, title: "Navigate", tagline: "Chart your course through a sea of endless possibilities" },
];

const faqContent = [
  {
    question: "What makes this platform unique?",
    answer: "Our platform combines collaborative storytelling with choose-your-own-adventure elements, offering a truly immersive and interactive writing experience."
  },
  {
    question: "Can I collaborate with other writers?",
    answer: "Absolutely! You can invite other writers to contribute to your stories or join existing collaborative projects."
  },
  {
    question: "Is there a mobile app available?",
    answer: "We're currently developing mobile apps for iOS and Android. Stay tuned for their release!"
  },
];

const LandingPage = () => {
  return (
    // Use ${styles.landingPage} when animated glow background is required
    <div className={`min-h-screen `}>
      <Hero />
      <Features />
      <Inspiration />
      <FAQ />
      <Footer />
    </div>
  );
};

const Hero = () => (
  <main className="container min-h-screen flex flex-col justify-center items-center w-full text-center relative overflow-hidden">
    <div className="relative flex h-[450px] w-full flex-col items-center justify-center overflow-hidden rounded-lg bg-background">
      <h1 className="heading-landing mb-4 relative z-10">
        Write your tales <br />
        <span className="text-primary">Weave your own adventures</span>
      </h1>

      {/* Inner Circles */}
      <OrbitingCircles
        className="size-[30px] bg-primary/10 text-pink-400 border border-primary/20"
        duration={20}
        delay={20}
        radius={80}
      >
        <FaStar className="size-5" />
      </OrbitingCircles>
      <OrbitingCircles
        className="size-[30px] bg-secondary/30 text-foreground border border-secondary/40"
        duration={20}
        delay={10}
        radius={80}
      >
        <FaComments className="size-5" />
      </OrbitingCircles>

      {/* Outer Circles (reverse) */}
      <OrbitingCircles
        className="size-[50px] bg-accent/20 text-blue-400 border border-accent/30"
        radius={190}
        duration={20}
        reverse
      >
        <FaUsers className="size-6" />
      </OrbitingCircles>
      <OrbitingCircles
        className="size-[50px] bg-muted/30 text-emerald-400 border border-muted/40"
        radius={190}
        duration={20}
        delay={20}
        reverse
      >
        <FaMap className="size-6" />
      </OrbitingCircles>
    </div>
    <p className="paragraph-primary mb-8 max-w-2xl mx-auto relative z-10">
      Embark on a literary journey where your imagination knows no bounds. Create, collaborate, and captivate!
    </p>
    <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 relative z-10">
      <button className="btn btn-primary">Learn more</button>
      <Link href="/storymap" className="btn btn-outline group">
        Get started <FaArrowRight className="inline-block ml-2 group-hover:translate-x-1 transition-transform" />
      </Link>
    </div>
  </main>
);

const Features = () => (
  <section className="container py-20">
    <div className="text-center mb-16">
      <h1 className="heading-landing mb-4">
        Your imagination <br />
        <span className="text-primary">Knows no bounds</span>
      </h1>
      <p className="paragraph-primary mb-8 max-w-2xl mx-auto">
        Discover a world where every word paints a picture and every story opens a door to new realms.
      </p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {cardContent.map(({ icon: Icon, title, tagline }, index) => (
        <div key={index} className="card flex flex-col items-center text-center p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 bg-card">
          <Icon className="icon-primary mb-4" />
          <h2 className="heading-secondary">{title}</h2>
          <p className="paragraph-secondary">{tagline}</p>
        </div>
      ))}
    </div>

  </section>
);

const Inspiration = () => (
  <section className="container py-20 relative overflow-hidden">
    <div className="">
      <h1 className="heading-landing mb-4 text-center">
        The new era of<br />
        <span className="text-primary">Storytelling</span>
      </h1>
      <p className="paragraph-primary mb-8 max-w-2xl mx-auto text-center">
        Where technology meets creativity, and every reader becomes a writer. Join us in redefining the art of narrative.
      </p>
    </div>
  </section>
);

const FAQ = () => (
  <section className="container py-20">
    <h1 className="heading-landing mb-8 text-center">FAQs</h1>
    <div className="w-full md:w-2/3 mx-auto">
      <Accordion type="single" collapsible className="w-full">
        {faqContent.map((faq, index) => (
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
  <footer className="border-t py-12">
    <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
      <div className="mb-8 md:mb-0">
        <h2 className="text-2xl font-bold">StoryLines</h2>
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
      <p>Made by Praneeth Ravuri</p>
    </div>
  </footer>
);



export default LandingPage;