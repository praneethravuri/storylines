import React from 'react';
import { FaArrowRight, FaPencilAlt, FaBookOpen, FaUsers, FaRandom, FaStar, FaComments } from 'react-icons/fa';
import OrbitingCircles from '@/components/magicui/orbiting-circles';
import Link from 'next/link';
import styles from "@/styles/glowAnimation.module.css";

const Hero = () => {
  return (
    <main className="container min-h-screen flex flex-col justify-center items-center w-full text-center relative overflow-hidden bg-background">
      <div className="relative flex h-[450px] w-full flex-col items-center justify-center overflow-hidden rounded-lg">
        <h1 className="heading-landing mb-4 relative z-10">
          Craft Your <span className="text-primary">Infinite</span> Story
        </h1>
        <OrbitingCircles
          className="size-[30px] bg-primary/10 text-accent-foreground border border-primary/20"
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
          className="size-[50px] bg-primary/10 text-accent-foreground border border-accent/30"
          radius={190}
          duration={20}
          reverse
        >
          <FaUsers className="size-6" />
        </OrbitingCircles>
        <OrbitingCircles
          className="size-[50px] bg-primary/10 text-accent-foreground border border-muted/40"
          radius={190}
          duration={20}
          delay={20}
          reverse
        >
          <FaPencilAlt className="size-6" />
        </OrbitingCircles>
      </div>
      <p className="paragraph-primary mb-8 max-w-2xl mx-auto relative z-10">
        Dive into a world where every reader is a writer, and every story branches into endless possibilities. Connect, create, and explore narratives that evolve with each contribution.
      </p>
      <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 relative z-10">
        <button className="btn btn-primary">Start Writing</button>
        <Link href="/home" className="btn btn-outline group">
          Explore Stories <FaArrowRight className="inline-block ml-2 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </main>
  )
}

export default Hero