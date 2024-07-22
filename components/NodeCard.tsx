import React from 'react';
import { CalendarDays, Heart, BadgePlus, Check } from 'lucide-react';
import Link from 'next/link';

export interface NodeItems {
    isDark: boolean,
    title: string,
    author: string,
    createdAt: string,
    currId: string
}

const formatDate = (createdAt: string) => {
    const currDate = new Date(createdAt);
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short', year: 'numeric' };
    return currDate.toLocaleDateString(undefined, options);
}

const NodeCard: React.FC<NodeItems> = ({ isDark, title, author, createdAt, currId }) => {
    return (
        <div className={`node-card ${isDark ? 'node-card-dark' : 'node-card-light'} `}>
            <div className="absolute -top-2 -right-2 flex space-x-1">
                {['check', 'heart', 'plus'].map((icon) => (
                    <Link key={icon} href={icon === 'plus' ? `/create-story?currId=${currId}` : '#'} className={`w-8 h-8 rounded-full flex items-center justify-center ${isDark ? 'bg-secondary hover:bg-secondary/80' : 'bg-accent hover:bg-accent/80'} transition-all duration-200 group shadow-md hover:shadow-lg cursor-pointer`}>
                        {icon === 'check' && <Check className={`w-3.5 h-3.5 ${isDark ? 'text-muted-foreground group-hover:text-primary' : 'text-muted-foreground group-hover:text-primary'} transition-colors duration-200`} />}
                        {icon === 'heart' && <Heart className={`w-3.5 h-3.5 ${isDark ? 'text-muted-foreground group-hover:text-destructive' : 'text-muted-foreground group-hover:text-destructive'} transition-colors duration-200`} />}
                        {icon === 'plus' && <BadgePlus className={`w-3.5 h-3.5 ${isDark ? 'text-muted-foreground group-hover:text-primary' : 'text-muted-foreground group-hover:text-primary'} transition-colors duration-200`} />}
                    </Link>
                ))}
            </div>
            <div className="flex flex-col items-start gap-3">
                <h3 className="heading-secondary line-clamp-2">
                    {title}
                </h3>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <CalendarDays className="icon-secondary" />
                    <span className='paragraph-secondary'>{formatDate(createdAt)}</span>
                </div>
            </div>
            <div className="flex items-center justify-between mt-4 pt-3 border-t border-border">
                <Link href={`/stories/${currId}`} className="btn btn-primary">Read More</Link>
                <span className="paragraph-secondary hover:text-foreground transition-colors duration-200">
                    {author}
                </span>
            </div>
        </div>
    );
}

export default NodeCard;