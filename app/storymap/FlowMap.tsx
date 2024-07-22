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
import NodeCard from '../../components/NodeCard';
import ControlPanel from './ControlPanel';

export interface NodeData {
    title: string;
    createdAt: string;
    author: string;
    id: string;
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
    const [screenSize, setScreenSize] = useState({ width: 0, height: 0 });

    useEffect(() => {
        const updateScreenSize = () => {
            setScreenSize({ width: window.innerWidth, height: window.innerHeight });
        };

        updateScreenSize();
        window.addEventListener('resize', updateScreenSize);

        return () => window.removeEventListener('resize', updateScreenSize);
    }, []);

    useEffect(() => {
        const fetchStories = async () => {
            try {
                const response = await fetch('/api/fetch-all-stories');
                const stories = await response.json();
                const { constructedNodes, constructedEdges } = constructNodesAndEdges(stories, screenSize);

                setNodes(prevNodes => {
                    // Only update if there's a change to avoid unnecessary re-renders
                    if (JSON.stringify(prevNodes) !== JSON.stringify(constructedNodes)) {
                        return constructedNodes;
                    }
                    return prevNodes;
                });

                setEdges(prevEdges => {
                    // Only update if there's a change to avoid unnecessary re-renders
                    if (JSON.stringify(prevEdges) !== JSON.stringify(constructedEdges)) {
                        return constructedEdges;
                    }
                    return prevEdges;
                });
            } catch (error) {
                console.error('Error fetching stories:', error);
            }
        };

        fetchStories();
    }, [screenSize, setNodes, setEdges]);

    const onConnect = useCallback(
        (params: any) => setEdges((eds) => addEdge(params, eds)),
        [setEdges],
    );

    const nodeTypes = {
        custom: CustomNode,
    };

    return (
        <div style={{ width: '100vw', height: 'calc(100vh - 75px)', overflow: 'hidden' }}>

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
                {/* <ControlPanel /> */}
                <Controls className='horizontal' />
                <Background gap={12} size={1} />
            </ReactFlow>
        </div>
    );
}

function constructNodesAndEdges(stories: any[], screenSize: { width: number, height: number }) {
    const constructedNodes: any[] = [];
    const constructedEdges: any[] = [];
    const nodeWidth = 200;
    const nodeHeight = 100;
    const horizontalSpacing = Math.max(nodeWidth * 3, screenSize.width * 0.1);
    const verticalSpacing = Math.max(nodeHeight * 5, screenSize.height * 0.15);

    // Find the root node
    const rootNode = stories.find(story => story.type === 'root');
    if (!rootNode) return { constructedNodes, constructedEdges };

    // Helper function to get children of a node
    const getChildren = (nodeId: string) => stories.filter(story => story.prev.includes(nodeId));

    // Helper function to get the maximum depth of the tree
    const getMaxDepth = (node: any, depth = 0): number => {
        const children = getChildren(node.customId);
        if (children.length === 0) return depth;
        return Math.max(...children.map(child => getMaxDepth(child, depth + 1)));
    };

    const maxDepth = getMaxDepth(rootNode) + 1;
    console.log(`Depth: ${maxDepth}`);

    // Create a map to store nodes at each level
    const levelMap: Map<number, any[]> = new Map();

    // Helper function to populate the level map
    function populateLevelMap(node: any, level: number) {
        if (!levelMap.has(level)) {
            levelMap.set(level, []);
        }
        levelMap.get(level)!.push(node);

        const children = getChildren(node.customId);
        children.forEach(child => populateLevelMap(child, level + 1));
    }

    // Populate the level map starting from the root
    populateLevelMap(rootNode, 0);

    // Helper function to recursively position nodes
    function positionNodes(node: any, level: number, index: number) {
        const nodesAtLevel = levelMap.get(level)!;
        const levelWidth = (nodesAtLevel.length - 1) * horizontalSpacing;
        const x = (index - (nodesAtLevel.length - 1) / 2) * horizontalSpacing;
        const y = level * verticalSpacing;

        constructedNodes.push({
            id: node.customId,
            position: { x, y },
            data: {
                title: node.title,
                author: node.author,
                createdAt: node.createdAt,
                id: node.customId
            },
            type: 'custom'
        });

        // Create edges
        node.prev.forEach((prevId: string) => {
            constructedEdges.push({
                id: `e-${prevId}-${node.customId}`,
                source: prevId,
                target: node.customId,
                animated: true
            });
        });

        // Position child nodes
        const children = getChildren(node.customId);
        children.forEach(child => {
            const childLevel = level + 1;
            const childIndex = levelMap.get(childLevel)!.indexOf(child);
            positionNodes(child, childLevel, childIndex);
        });
    }

    // Start positioning from the root node
    positionNodes(rootNode, 0, 0);

    // Calculate the bounding box of all nodes
    const minX = Math.min(...constructedNodes.map(node => node.position.x));
    const maxX = Math.max(...constructedNodes.map(node => node.position.x));
    const totalWidth = maxX - minX + nodeWidth;

    // Center the entire tree
    const xOffset = (screenSize.width - totalWidth) / 2 - minX;
    constructedNodes.forEach(node => {
        node.position.x += xOffset;
    });

    return { constructedNodes, constructedEdges };
}