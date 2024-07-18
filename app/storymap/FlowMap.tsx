"use client";
import React, { useCallback, useEffect } from 'react';
import {
    ReactFlow,
    Controls,
    Background,
    useNodesState,
    useEdgesState,
    addEdge,
    Handle,
    Position,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useTheme } from "next-themes";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { CalendarDays, Heart, ThumbsDown, BadgePlus, Check, MoreHorizontal, X } from 'lucide-react';
import Link from 'next/link';

const CustomNode = ({ data }) => {
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    return (
        <Card className={`w-72 p-5 rounded-xl ${isDark ? 'bg-zinc-900 text-zinc-100' : 'bg-white text-zinc-900'} shadow-lg relative overflow-visible border-0`}>
            <Handle type="target" position={Position.Top} className="!bg-transparent" />

            {/* Floating buttons */}
            <div className="absolute -top-3 -right-3 flex space-x-1.5">
                <button className={`w-7 h-7 rounded-full flex items-center justify-center ${
                    isDark ? 'bg-zinc-800 hover:bg-zinc-700' : 'bg-zinc-100 hover:bg-zinc-200'
                } transition-all duration-200 group shadow-md`}>
                    <Check className={`w-4 h-4 ${
                        isDark ? 'text-zinc-400 group-hover:text-blue-400' : 'text-zinc-500 group-hover:text-blue-500'
                    } transition-colors duration-200`} />
                </button>
                <button className={`w-7 h-7 rounded-full flex items-center justify-center ${
                    isDark ? 'bg-zinc-800 hover:bg-zinc-700' : 'bg-zinc-100 hover:bg-zinc-200'
                } transition-all duration-200 group shadow-md`}>
                    <Heart className={`w-4 h-4 ${
                        isDark ? 'text-zinc-400 group-hover:text-pink-400' : 'text-zinc-500 group-hover:text-pink-500'
                    } transition-colors duration-200`} />
                </button>
                <Link href="/create-story" className={`w-7 h-7 rounded-full flex items-center justify-center ${
                    isDark ? 'bg-zinc-800 hover:bg-zinc-700' : 'bg-zinc-100 hover:bg-zinc-200'
                } transition-all duration-200 group shadow-md`}>
                    <BadgePlus className={`w-4 h-4 ${
                        isDark ? 'text-zinc-400 group-hover:text-emerald-400' : 'text-zinc-500 group-hover:text-emerald-500'
                    } transition-colors duration-200`} />
                </Link>
            </div>

            <div className="flex flex-col items-start gap-3">
                <h3 className="text-lg font-semibold leading-tight">
                    {data.title}
                </h3>
                <div className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
                    <CalendarDays className="h-4 w-4" />
                    <span>{data.createdAt}</span>
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
                    John Doe
                </Link>
            </div>
            <Handle type="source" position={Position.Bottom} className="!bg-transparent" />
        </Card>
    );
};

export default function FlowMap() {
    const initialNodes = [
        { id: 'root', position: { x: 0, y: 0 }, data: { title: 'Root', creator: 'Admin', createdAt: '27 Apr 2020', likes: 40, dislikes: 20 }, type: 'custom' },
        { id: '1', position: { x: 0, y: 0 }, data: { title: 'Node 1', creator: 'User 1', createdAt: '27 Apr 2020', likes: 60, dislikes: 30 }, type: 'custom' },
        { id: '2', position: { x: 0, y: 0 }, data: { title: 'Node 2', creator: 'User 2', createdAt: '27 Apr 2020', likes: 70, dislikes: 10 }, type: 'custom' },
        { id: '3', position: { x: 0, y: 0 }, data: { title: 'Node 3', creator: 'User 3', createdAt: '27 Apr 2020', likes: 50, dislikes: 25 }, type: 'custom' },
    ];

    const initialEdges = [
        { id: 'e-root-1', source: '1', target: 'root', animated: true },
        { id: 'e-root-2', source: '2', target: 'root', animated: true },
        { id: 'e-root-3', source: '3', target: 'root', animated: true },
    ];

    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const { theme } = useTheme();

    const updateNodePositions = () => {
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        const centerX = viewportWidth / 2;
        const centerY = viewportHeight / 2;
        const nodeGap = 500; // Gap between nodes
        const updatedNodes = [
            { id: 'root', position: { x: centerX - 75, y: centerY }, data: { title: 'Root', creator: 'Admin', createdAt: '27 Apr 2020', likes: 40, dislikes: 20 }, type: 'custom' },
            { id: '1', position: { x: centerX - nodeGap, y: centerY - nodeGap }, data: { title: 'Node 1', creator: 'User 1', createdAt: '27 Apr 2020', likes: 60, dislikes: 30 }, type: 'custom' },
            { id: '2', position: { x: centerX, y: centerY - nodeGap }, data: { title: 'Node 2', creator: 'User 2', createdAt: '27 Apr 2020', likes: 70, dislikes: 10 }, type: 'custom' },
            { id: '3', position: { x: centerX + nodeGap, y: centerY - nodeGap }, data: { title: 'Node 3', creator: 'User 3', createdAt: '27 Apr 2020', likes: 50, dislikes: 25 }, type: 'custom' },
        ];
        setNodes(updatedNodes);
    };

    useEffect(() => {
        updateNodePositions();
        window.addEventListener('resize', updateNodePositions);
        return () => {
            window.removeEventListener('resize', updateNodePositions);
        };
    }, []);

    const onConnect = useCallback(
        (params) => setEdges((eds) => addEdge(params, eds)),
        [setEdges],
    );

    const nodeTypes = {
        custom: CustomNode,
    };

    return (
        <div style={{ width: '100vw', height: '100vh', overflow: 'hidden' }} >
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                fitView
                nodeTypes={nodeTypes}
                colorMode={theme === "dark" ? "dark" : "light"}
            >
                <Controls />
                <Background gap={12} size={1} />
            </ReactFlow>
        </div>
    );
}
