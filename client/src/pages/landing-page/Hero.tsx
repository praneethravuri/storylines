import React from 'react';
import { useNavigate } from "react-router-dom";
import { IconArrowRight, IconBrandX, IconBrandGithub, IconBrandDiscord } from '@tabler/icons-react';
import { Button } from '../../components/ui/button';
import AnimatedShinyText from '../../components/magicui/animated-shiny-text';
import { cn } from '../../lib/utils';

const Hero = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col justify-center px-4 sm:px-6 lg:px-8 pt-16 sm:pt-24">
      <div className="max-w-7xl mx-auto w-full">
        <div className="text-center mb-12">
          <div className="mb-8">
            <div className="inline-block">
              <div
                className={cn(
                  "group rounded-full border border-black/5 bg-neutral-100 text-base text-white transition-all ease-in hover:cursor-default hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800",
                )}
              >
                <AnimatedShinyText className="inline-flex items-center justify-center px-4 py-2 text-sm sm:text-base transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
                  <span>🐇 Go down the rabbit hole</span>
                  <IconArrowRight className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
                </AnimatedShinyText>
              </div>
            </div>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-4">
            Craft Your <span className='text-accent'>Infinite</span> Story
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Dive into a world where every reader is a writer, and every story branches into endless possibilities.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-8">
            <Button variant="default" onClick={() => navigate('/home')} className="w-full sm:w-auto">Start Writing</Button>
            {/* <Button variant="secondary" className="w-full sm:w-auto">Explore Stories</Button> */}
          </div>
          <div className="flex justify-center space-x-6">
            <a href="https://github.com/praneethravuri/storylines-v2" target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-muted-foreground transition-colors">
              <IconBrandGithub className="w-6 h-6" />
            </a>
            <a href="https://x.com/storylines_in" target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-muted-foreground transition-colors">
              <IconBrandX className="w-6 h-6" />
            </a>
            {/* <a href="https://discord.com" target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-muted-foreground transition-colors">
              <IconBrandDiscord className="w-6 h-6" />
            </a> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;