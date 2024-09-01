import React from 'react';
import Marquee from '../../components/magicui/marquee';
import { cn } from '../../lib/utils';

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
                "border-border bg-neutral-50 dark:bg-neutral-950",
            )}
        >
            <div className="flex flex-col text-left">
                <figcaption className="text-sm font-medium text-foreground">
                    {name}
                </figcaption>
                <p className="text-xs font-medium text-foreground/40">{username}</p>
            </div>
            <blockquote className="mt-2 text-sm text-left">{body}</blockquote>
        </figure>
    );
};

const StoryShowcase = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center text-foreground ">
            <div className="">
                <div className="text-center">
                    <div>
                        <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-foreground mb-4">
                            Dive into the <span className='text-accent'>Story Multiverse</span>
                        </h1>
                        <p className="text-lg sm:text-xl text-muted-foreground">
                            Where technology meets creativity, and every reader becomes a writer. Join us in redefining the art of narrative.
                        </p>
                    </div>
                    <div className="relative flex h-[300px] w-full flex-col items-center justify-center overflow-hidden rounded-lg ">
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
                        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-background"></div>
                        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-background"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StoryShowcase