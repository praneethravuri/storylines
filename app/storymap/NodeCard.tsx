import React from 'react';
import { Card } from "@/components/ui/card";
import { CalendarDays, Heart, BadgePlus, Check } from 'lucide-react';
import Link from 'next/link';
import Story from '@/schema/storySchema';

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
            <Card className={`w-72 p-4 rounded-xl ${isDark ? 'bg-surface-200 text-surface-100' : 'bg-surface-100 text-surface-800'} shadow-lg relative overflow-visible border-0 transition-all duration-300 hover:shadow-xl hover:scale-105`}>
                <div className="absolute -top-2 -right-2 flex space-x-1">
                    {['check', 'heart', 'plus'].map((icon, index) => (
                        <Link key={icon} href={icon === 'plus' ? `/create-story?currId=${currId}` : '#'} className={`w-7 h-7 rounded-full flex items-center justify-center ${isDark ? 'bg-surface-300 hover:bg-surface-400' : 'bg-surface-200 hover:bg-surface-300'} transition-all duration-200 group shadow-md hover:shadow-lg cursor-pointer`}>
                            {icon === 'check' && <Check className={`w-3.5 h-3.5 ${isDark ? 'text-surface-600 group-hover:text-primary-400' : 'text-surface-600 group-hover:text-primary-600'} transition-colors duration-200`} />}
                            {icon === 'heart' && <Heart className={`w-3.5 h-3.5 ${isDark ? 'text-surface-600 group-hover:text-red-400' : 'text-surface-600 group-hover:text-red-600'} transition-colors duration-200`} />}
                            {icon === 'plus' && <BadgePlus className={`w-3.5 h-3.5 ${isDark ? 'text-surface-600 group-hover:text-green-400' : 'text-surface-600 group-hover:text-green-600'} transition-colors duration-200`} />}
                        </Link>
                    ))}
                </div>
                <div className="flex flex-col items-start gap-3">
                    <h3 className="text-lg font-semibold leading-tight tracking-tight line-clamp-2 text-black dark:text-white">
                        {title}
                    </h3>
                    <div className="flex items-center gap-1.5 text-xs text-surface-500">
                        <CalendarDays className="h-3.5 w-3.5" />
                        <span>{formatDate(createdAt)}</span>
                    </div>
                </div>
                <div className="flex items-center justify-between mt-4 pt-3 border-t border-surface-200 dark:border-surface-700">
                    <Link href={`/stories/${currId}`} className='bg-primary-400  text-white dark:text-black p-2 rounded-full'>Read More</Link>
                    <span className="text-sm font-medium text-surface-500 hover:text-surface-600 dark:hover:text-surface-600 transition-colors duration-200">
                        {author}
                    </span>
                </div>
            </Card>
    );
}

export default NodeCard;