"use client";
import React, { useCallback } from 'react';
import {
    ReactFlow,
    MiniMap,
    Controls,
    Background,
    useNodesState,
    useEdgesState,
    addEdge,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

const CustomNode = ({ data }) => {
    return (
        <div style={{
            padding: 10,
            borderRadius: 5,
            border: '1px solid var(--border)',
            backgroundColor: 'red',
            color: data.color || 'var(--secondary-foreground)',
            minWidth: 80,
            textAlign: 'center',
        }}>
            {data.label}
        </div>
    );
};

const nodeTypes = {
    custom: CustomNode,
};

const initialNodes = [
    { id: 'root', position: { x: 250, y: 0 }, data: { label: 'Root', backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' }, type: 'custom' },
    { id: '1', position: { x: 100, y: 150 }, data: { label: '1', backgroundColor: 'var(--info)', color: 'var(--info-foreground)' }, type: 'custom' },
    { id: '2', position: { x: 250, y: 150 }, data: { label: '2', backgroundColor: 'var(--success)', color: 'var(--success-foreground)' }, type: 'custom' },
    { id: '3', position: { x: 400, y: 150 }, data: { label: '3', backgroundColor: 'var(--warning)', color: 'var(--warning-foreground)' }, type: 'custom' },
    { id: '1-1', position: { x: 0, y: 300 }, data: { label: '1-1', backgroundColor: 'var(--info-accent)' }, type: 'custom' },
    { id: '1-2', position: { x: 100, y: 300 }, data: { label: '1-2', backgroundColor: 'var(--info-accent)' }, type: 'custom' },
    { id: '1-3', position: { x: 200, y: 300 }, data: { label: '1-3', backgroundColor: 'var(--info-accent)' }, type: 'custom' },
    { id: '2-1', position: { x: 150, y: 300 }, data: { label: '2-1', backgroundColor: 'var(--success-accent)' }, type: 'custom' },
    { id: '2-2', position: { x: 250, y: 300 }, data: { label: '2-2', backgroundColor: 'var(--success-accent)' }, type: 'custom' },
    { id: '2-3', position: { x: 350, y: 300 }, data: { label: '2-3', backgroundColor: 'var(--success-accent)' }, type: 'custom' },
    { id: '3-1', position: { x: 300, y: 300 }, data: { label: '3-1', backgroundColor: 'var(--warning-accent)' }, type: 'custom' },
    { id: '3-2', position: { x: 400, y: 300 }, data: { label: '3-2', backgroundColor: 'var(--warning-accent)' }, type: 'custom' },
    { id: '3-3', position: { x: 500, y: 300 }, data: { label: '3-3', backgroundColor: 'var(--warning-accent)' }, type: 'custom' },
];

const initialEdges = [
    { id: 'e-root-1', source: 'root', target: '1', animated: true, style: { stroke: 'var(--primary)' } },
    { id: 'e-root-2', source: 'root', target: '2', animated: true, style: { stroke: 'var(--primary)' } },
    { id: 'e-root-3', source: 'root', target: '3', animated: true, style: { stroke: 'var(--primary)' } },
    { id: 'e1-1', source: '1', target: '1-1', animated: true, style: { stroke: 'var(--info)' } },
    { id: 'e1-2', source: '1', target: '1-2', animated: true, style: { stroke: 'var(--info)' } },
    { id: 'e1-3', source: '1', target: '1-3', animated: true, style: { stroke: 'var(--info)' } },
    { id: 'e2-1', source: '2', target: '2-1', animated: true, style: { stroke: 'var(--success)' } },
    { id: 'e2-2', source: '2', target: '2-2', animated: true, style: { stroke: 'var(--success)' } },
    { id: 'e2-3', source: '2', target: '2-3', animated: true, style: { stroke: 'var(--success)' } },
    { id: 'e3-1', source: '3', target: '3-1', animated: true, style: { stroke: 'var(--warning)' } },
    { id: 'e3-2', source: '3', target: '3-2', animated: true, style: { stroke: 'var(--warning)' } },
    { id: 'e3-3', source: '3', target: '3-3', animated: true, style: { stroke: 'var(--warning)' } },
];

export default function FlowMap() {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

    const onConnect = useCallback(
        (params) => setEdges((eds) => addEdge(params, eds)),
        [setEdges],
    );

    return (
        <div style={{ width: '100vw', height: '100vh' }}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                nodeTypes={nodeTypes}
                fitView
            >
                <Controls />
                <MiniMap />
                <Background gap={12} size={1} />
            </ReactFlow>
        </div>
    );
}