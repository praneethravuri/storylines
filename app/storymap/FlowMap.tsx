"use client";
import React, { useCallback, useEffect, useState } from 'react';
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
import NodeCard from './NodeCard';

export interface NodeData {
    title: string;
    createdAt: string;
    author: string;
    id: string
}

const CustomNode: React.FC<{ data: NodeData }> = ({ data }) => {
    const { theme } = useTheme();
    const isDark = theme === 'dark';
    return (
        <>  
            <Handle type="target" position={Position.Top} className="!bg-transparent" />
            <NodeCard title={data.title} createdAt={data.createdAt} author={data.author} isDark={isDark} currId={data.id} />
            <Handle type="source" position={Position.Bottom} className="!bg-transparent" />
        </>
    );
};

export default function FlowMap() {
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const { theme } = useTheme();

    useEffect(() => {
        fetch('/api/get-stories')
            .then(response => response.json())
            .then(data => {
                setNodes(data.nodes);
                setEdges(data.edges);
            })
            .catch(error => console.error('Error fetching stories:', error));
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