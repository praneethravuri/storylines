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
import NodeCard from '../../components/NodeCard';

export interface NodeData {
    title: string;
    createdAt: string;
    creator: string;
}



const CustomNode: React.FC<{ data: NodeData }> = ({ data }) => {
    const { theme } = useTheme();
    const isDark = theme === 'dark';
    return (
        <>
            <Handle type="target" position={Position.Top} className="!bg-transparent" />
            <NodeCard title={data.title} createdAt={data.createdAt} creator={data.creator} isDark={isDark} />
            <Handle type="source" position={Position.Bottom} className="!bg-transparent" />
        </>

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
        (params: any) => setEdges((eds) => addEdge(params, eds)),
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
