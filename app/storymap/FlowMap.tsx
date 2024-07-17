"use client";
import React, { useCallback, useEffect } from 'react';
import {
    ReactFlow,
    Controls,
    Background,
    useNodesState,
    useEdgesState,
    addEdge,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useTheme } from "next-themes";

export default function FlowMap() {
    const initialNodes = [
        { id: 'root', position: { x: 0, y: 0 }, data: { label: 'Root' } },
        { id: '1', position: { x: 0, y: 0 }, data: { label: '1' } },
        { id: '2', position: { x: 0, y: 0 }, data: { label: '2' } },
        { id: '3', position: { x: 0, y: 0 }, data: { label: '3' } },
    ];

    const initialEdges = [
        { id: 'e-root-1', source: '1', target: 'root', animated: true },
        { id: 'e-root-2', source: '2', target: 'root', animated: true },
        { id: 'e-root-3', source: '3', target: 'root', animated: true },
    ];

    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const { theme, setTheme } = useTheme();

    const updateNodePositions = () => {
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        const centerX = viewportWidth / 2;
        const bottomY = viewportHeight - 100;

        const updatedNodes = [
            { id: 'root', position: { x: centerX - 75, y: bottomY }, data: { label: 'Root' } },
            { id: '1', position: { x: centerX - 250, y: bottomY - 200 }, data: { label: '1' } },
            { id: '2', position: { x: centerX - 75, y: bottomY - 200 }, data: { label: '2' } },
            { id: '3', position: { x: centerX + 100, y: bottomY - 200 }, data: { label: '3' } },
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

    return (
        <div style={{ width: '100vw', height: '100vh', overflow: 'hidden' }} className=''>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                fitView
                colorMode={theme === "dark" ? "dark" : "light"}
                
            >
                <Controls />
                <Background gap={12} size={1} />
            </ReactFlow>
        </div>
    );
}
