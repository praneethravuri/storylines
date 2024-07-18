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
import { CalendarDays, Heart, ThumbsDown } from 'lucide-react';
import Link from 'next/link';

const CustomNode = ({ data }) => {
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    return (
        <Card className={`w-full max-w-md p-6 space-y-4 shadow-lg rounded-lg ${isDark ? ' bg-black text-white' : 'bg-white text-black'} shadow-md`}>
            <Handle type="target" position={Position.Top} />
            <div className="flex flex-col items-start gap-2">
                <h3 className="text-2xl font-bold text-card-foreground dark:text-card-foreground-dark">
                    Minimalist Design Trends
                </h3>
                <div className="flex items-center gap-2 text-muted-foreground dark:text-muted-foreground-dark">
                    <CalendarDays className="h-4 w-4" />
                    <span className="text-sm">June 15, 2024</span>
                </div>
            </div>
            <div className="flex items-center justify-between mt-4">
                <Button
                    variant="outline"
                    size="sm"
                    className="dark:border-muted-foreground-dark dark:text-muted-foreground-dark"
                >
                    Read More
                </Button>
                <div className="flex items-center gap-2">
                    <Link href="/" className="text-sm font-medium underline">John Doe</Link>
                </div>
            </div>
            <Handle type="source" position={Position.Bottom} />
        </Card>
    );
};

export default function FlowMap() {
    const initialNodes = [
        { id: 'root', position: { x: 0, y: 0 }, data: { title: 'Root', creator: 'Admin', dueDate: '27 Apr 2020', likes: 40, dislikes: 20 }, type: 'custom' },
        { id: '1', position: { x: 0, y: 0 }, data: { title: 'Node 1', creator: 'User 1', dueDate: '27 Apr 2020', likes: 60, dislikes: 30 }, type: 'custom' },
        { id: '2', position: { x: 0, y: 0 }, data: { title: 'Node 2', creator: 'User 2', dueDate: '27 Apr 2020', likes: 70, dislikes: 10 }, type: 'custom' },
        { id: '3', position: { x: 0, y: 0 }, data: { title: 'Node 3', creator: 'User 3', dueDate: '27 Apr 2020', likes: 50, dislikes: 25 }, type: 'custom' },
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
            { id: 'root', position: { x: centerX - 75, y: centerY }, data: { title: 'Root', creator: 'Admin', dueDate: '27 Apr 2020', likes: 40, dislikes: 20 }, type: 'custom' },
            { id: '1', position: { x: centerX - nodeGap, y: centerY - nodeGap }, data: { title: 'Node 1', creator: 'User 1', dueDate: '27 Apr 2020', likes: 60, dislikes: 30 }, type: 'custom' },
            { id: '2', position: { x: centerX, y: centerY - nodeGap }, data: { title: 'Node 2', creator: 'User 2', dueDate: '27 Apr 2020', likes: 70, dislikes: 10 }, type: 'custom' },
            { id: '3', position: { x: centerX + nodeGap, y: centerY - nodeGap }, data: { title: 'Node 3', creator: 'User 3', dueDate: '27 Apr 2020', likes: 50, dislikes: 25 }, type: 'custom' },
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
