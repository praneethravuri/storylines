import React from 'react';
import { FaArrowRight, FaPencilAlt, FaBookOpen, FaUsers, FaRandom, FaStar, FaComments } from 'react-icons/fa';
import { TbArrowFork, TbBulb } from "react-icons/tb";
import Marquee from "@/components/magicui/marquee";
import { cn } from "@/lib/utils";

const stories = [
  {
    name: "Aisha Thompson",
    username: "@cosmic_scribe",
    body: "A Tale of Stardust and Dreams",
  },
  {
    name: "Leo Nakamura",
    username: "@time_weaver",
    body: "Memoirs from the 25th Century",
  },
  {
    name: "Zara Blackwood",
    username: "@shadowInk",
    body: "Heists Across Parallel Universes",
  },
  {
    name: "Finn O'Connor",
    username: "@myth_spinner",
    body: "Where Code Meets Magic",
  },
  {
    name: "Luna Chen",
    username: "@moonTales",
    body: "Stories from the Dark Side of the Moon",
  },
  {
    name: "Xavier Dubois",
    username: "@neon_wordsmith",
    body: "A Cyberpunk Odyssey",
  },
];

const firstRow = stories.slice(0, stories.length / 2);
const secondRow = stories.slice(stories.length / 2);

const ReviewCard = ({
  name,
  username,
  body,
}) => {
  return (
    <figure
      className={cn(
        "relative w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
      )}
    >
      <div className="flex flex-col">
        <figcaption className="text-sm font-medium dark:text-white">
          {name}
        </figcaption>
        <p className="text-xs font-medium dark:text-white/40">{username}</p>
      </div>
      <blockquote className="mt-2 text-sm">{body}</blockquote>
    </figure>
  );
};

const Inspiration = () => {
  return (
    <section className="container py-20 relative overflow-hidden">
      <div className="text-center mb-16">
        <h2 className="heading-landing mb-4">
          Dive into the <span className="text-primary">Story Multiverse</span>
        </h2>
        <p className="paragraph-primary max-w-2xl mx-auto">
          Where technology meets creativity, and every reader becomes a writer. Join us in redefining the art of narrative.
        </p>
      </div>
      
      <div className="relative flex h-[300px] w-full flex-col items-center justify-center overflow-hidden rounded-lg  bg-background ">
        <Marquee pauseOnHover className="[--duration:20s]">
          {firstRow.map((review) => (
            <ReviewCard key={review.username} {...review} />
          ))}
        </Marquee>
        <Marquee reverse pauseOnHover className="[--duration:20s]">
          {secondRow.map((review) => (
            <ReviewCard key={review.username} {...review} />
          ))}
        </Marquee>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-background"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-background"></div>
      </div>
    </section>
  );
};

export default Inspiration;