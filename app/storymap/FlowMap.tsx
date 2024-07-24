"use client";
import React, { useCallback, useEffect, useState, useMemo } from 'react';
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
import ControlPanel from './ControlPanel';
import { useRouter } from 'next/navigation';
import LoadingScreen from '@/components/LoadingScreen';

export interface NodeData {
  title: string;
  createdAt: string;
  author: string;
  id: string;
  isSelected: boolean;
  isFavorited: boolean;
  onSelect: (id: string) => void;
  onFavorite: (id: string) => void;
}

const CustomNode: React.FC<{ data: NodeData }> = ({ data }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  return (
    <>
      <Handle type="target" position={Position.Top} className="!bg-transparent" />
      <NodeCard
        title={data.title}
        createdAt={data.createdAt}
        author={data.author}
        isDark={isDark}
        currId={data.id}
        isSelected={data.isSelected}
        isFavorited={data.isFavorited}
        onSelect={data.onSelect}
        onFavorite={data.onFavorite}
      />
      <Handle type="source" position={Position.Bottom} className="!bg-transparent" />
    </>
  );
};

export default function FlowMap() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const { theme } = useTheme();
  const [screenSize, setScreenSize] = useState({ width: 0, height: 0 });
  const [selectedStoryIds, setSelectedStoryIds] = useState(new Set<string>());
  const [favoritedStoryIds, setFavoritedStoryIds] = useState(new Set<string>());
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const router = useRouter();

  const selectedStories = useMemo(() => {
    return nodes.filter(node => selectedStoryIds.has(node.id)).map(node => node.data);
  }, [nodes, selectedStoryIds]);

  const favoritedStories = useMemo(() => {
    return nodes.filter(node => favoritedStoryIds.has(node.id)).map(node => node.data);
  }, [nodes, favoritedStoryIds]);

  useEffect(() => {
    const updateScreenSize = () => {
      setScreenSize({ width: window.innerWidth, height: window.innerHeight });
    };

    updateScreenSize();
    window.addEventListener('resize', updateScreenSize);

    return () => window.removeEventListener('resize', updateScreenSize);
  }, []);

  const onSelect = useCallback((id: string) => {
    setSelectedStoryIds(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });

    setNodes(nds =>
      nds.map(node => {
        if (node.id === id) {
          return {
            ...node,
            data: {
              ...node.data,
              isSelected: !node.data.isSelected,
            },
          };
        }
        return node;
      })
    );
  }, [setNodes]);

  const onFavorite = useCallback((id: string) => {
    setFavoritedStoryIds(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });

    setNodes(nds =>
      nds.map(node => {
        if (node.id === id) {
          return {
            ...node,
            data: {
              ...node.data,
              isFavorited: !node.data.isFavorited,
            },
          };
        }
        return node;
      })
    );
  }, [setNodes]);

  const removeStory = useCallback((id: string, type: 'selected' | 'favorited') => {
    if (type === 'selected') {
      setSelectedStoryIds(prev => {
        const newSet = new Set(prev);
        newSet.delete(id);
        return newSet;
      });
    } else {
      setFavoritedStoryIds(prev => {
        const newSet = new Set(prev);
        newSet.delete(id);
        return newSet;
      });
    }

    setNodes(nds =>
      nds.map(node => {
        if (node.id === id) {
          return {
            ...node,
            data: {
              ...node.data,
              [type === 'selected' ? 'isSelected' : 'isFavorited']: false,
            },
          };
        }
        return node;
      })
    );
  }, [setNodes]);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/fetch-all-stories');
        const stories = await response.json();
        const { constructedNodes, constructedEdges } = constructNodesAndEdges(stories, screenSize);

        setNodes(constructedNodes.map(node => ({
          ...node,
          data: {
            ...node.data,
            isSelected: false,
            isFavorited: false,
            onSelect: onSelect,
            onFavorite: onFavorite
          }
        })));

        setEdges(constructedEdges);
      } catch (error) {
        console.error('Error fetching stories:', error);
      } finally {
        setIsLoading(false)
      }
    };

    fetchStories();
  }, [screenSize, setNodes, setEdges, onSelect, onFavorite]);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  const nodeTypes = {
    custom: CustomNode,
  };

  return (
    isLoading ? (
      <LoadingScreen />
    ) : (
      <div className="h-screen relative">
        {nodes.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full">
            <p className="text-2xl mb-4">No stories found.</p>
            <button
              className="btn btn-primary"
              onClick={() => router.push('/create-story?type=root')}
            >
              Create a Root Story
            </button>
          </div>
        ) : (
          <div style={{ width: '100vw', height: '100vh', overflow: 'hidden' }}>
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
              {/* <ControlPanel
                selectedStories={selectedStories}
                favoritedStories={favoritedStories}
                removeStory={removeStory}
                controls={<Controls className='horizontal' />}

              /> */}
              <Background gap={12} size={1} />
            </ReactFlow>
          </div>
        )}
      </div>
    )
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