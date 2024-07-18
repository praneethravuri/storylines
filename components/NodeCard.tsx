import React from 'react';
import {
    Card,
} from "@/components/ui/card";
import { CalendarDays, Heart, BadgePlus, Check } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export interface NodeItems {
    isDark: boolean,
    title: string,
    creator: string,
    createdAt: string
}


const NodeCard: React.FC<NodeItems> = ({ isDark, title, creator, createdAt }) => {
    return (
        <Card className={`w-72 p-5 rounded-xl ${isDark ? 'bg-zinc-900 text-zinc-100' : 'bg-white text-zinc-900'} shadow-lg relative overflow-visible border-0`}>


            {/* Floating buttons */}
            <div className="absolute -top-3 -right-3 flex space-x-1.5">
                <button className={`w-7 h-7 rounded-full flex items-center justify-center ${isDark ? 'bg-zinc-800 hover:bg-zinc-700' : 'bg-zinc-100 hover:bg-zinc-200'
                    } transition-all duration-200 group shadow-md`}>
                    <Check className={`w-4 h-4 ${isDark ? 'text-zinc-400 group-hover:text-blue-400' : 'text-zinc-500 group-hover:text-blue-500'
                        } transition-colors duration-200`} />
                </button>
                <button className={`w-7 h-7 rounded-full flex items-center justify-center ${isDark ? 'bg-zinc-800 hover:bg-zinc-700' : 'bg-zinc-100 hover:bg-zinc-200'
                    } transition-all duration-200 group shadow-md`}>
                    <Heart className={`w-4 h-4 ${isDark ? 'text-zinc-400 group-hover:text-pink-400' : 'text-zinc-500 group-hover:text-pink-500'
                        } transition-colors duration-200`} />
                </button>
                <Link href="/create-story" className={`w-7 h-7 rounded-full flex items-center justify-center ${isDark ? 'bg-zinc-800 hover:bg-zinc-700' : 'bg-zinc-100 hover:bg-zinc-200'
                    } transition-all duration-200 group shadow-md`}>
                    <BadgePlus className={`w-4 h-4 ${isDark ? 'text-zinc-400 group-hover:text-emerald-400' : 'text-zinc-500 group-hover:text-emerald-500'
                        } transition-colors duration-200`} />
                </Link>
            </div>

            <div className="flex flex-col items-start gap-3">
                <h3 className="text-lg font-semibold leading-tight">
                    {title}
                </h3>
                <div className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
                    <CalendarDays className="h-4 w-4" />
                    <span>{createdAt}</span>
                </div>
            </div>
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-zinc-700">
                <Button
                    variant="ghost"
                    size="sm"
                    className="text-xs font-medium hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors duration-200"
                >
                    Read More
                </Button>
                <Link href="/" className="text-xs font-medium text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors duration-200 ">
                    {creator}
                </Link>
            </div>

        </Card>
    )
}

export default NodeCard