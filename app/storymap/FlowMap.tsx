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
  Node,
  Edge,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useTheme } from "next-themes";
import NodeCard from './NodeCard';
import { useRouter, useSearchParams } from 'next/navigation';
import LoadingScreen from '@/components/LoadingScreen';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { Button } from "@/components/ui/button";
import { CalendarIcon, TagIcon } from 'lucide-react';

// Interfaces
interface NodeData {
  title: string;
  createdAt: string;
  author: string;
  id: string;
  isSelected: boolean;
  isFavorited: boolean;
  onSelect: (id: string) => void;
  onFavorite: (id: string) => void;
  themeRoomId: string;
}

interface ThemeRoom {
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  tags: string[];
}

interface HoverCardComponentProps {
  themeRoomDetails: ThemeRoom;
  nodesLength: number;
}

// Custom Node Component
const CustomNode: React.FC<{ data: NodeData }> = ({ data }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <>
      <Handle type="target" position={Position.Top} className="!bg-transparent" />
      <NodeCard {...data} isDark={isDark} currId={data.id} />
      <Handle type="source" position={Position.Bottom} className="!bg-transparent" />
    </>
  );
};

// HoverCard Component
const HoverCardComponent: React.FC<HoverCardComponentProps> = ({ themeRoomDetails, nodesLength }) => (
  <div className="absolute top-4 right-4 z-10">
    <HoverCard>
      <HoverCardTrigger asChild>
        <button  className="btn btn-primary">
          {themeRoomDetails.name} 
        </button>
      </HoverCardTrigger>
      <HoverCardContent className="w-80 p-4" side="left">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">{themeRoomDetails.name} (<span>{nodesLength}</span>)</h3>
          <p className="text-sm text-muted-foreground">{themeRoomDetails.description}</p>
          {themeRoomDetails.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2 items-center">
              <TagIcon className="h-3 w-3 text-muted-foreground" />
              {themeRoomDetails.tags.map(tag => (
                <span key={tag} className="text-xs px-2 py-1 bg-secondary text-secondary-foreground rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          )}
          {nodesLength === 0 && (
            <p className="text-sm text-muted-foreground mt-2">
              Currently, there are no stories in this flow map. Create a root story to get started!
            </p>
          )}
        </div>
      </HoverCardContent>
    </HoverCard>
  </div>
);

// Main FlowMap Component
export default function FlowMap() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const { theme } = useTheme();
  const [screenSize, setScreenSize] = useState({ width: 0, height: 0 });
  const [selectedStoryIds, setSelectedStoryIds] = useState(new Set<string>());
  const [favoritedStoryIds, setFavoritedStoryIds] = useState(new Set<string>());
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [themeRoomDetails, setThemeRoomDetails] = useState<ThemeRoom | null>(null);

  const router = useRouter();
  const searchParams = useSearchParams();
  const themeRoomId = searchParams.get('themeRoomId');

  const selectedStories = useMemo(() => 
    nodes.filter(node => selectedStoryIds.has(node.id)).map(node => node.data),
    [nodes, selectedStoryIds]
  );

  const favoritedStories = useMemo(() => 
    nodes.filter(node => favoritedStoryIds.has(node.id)).map(node => node.data),
    [nodes, favoritedStoryIds]
  );

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
      newSet.has(id) ? newSet.delete(id) : newSet.add(id);
      return newSet;
    });

    setNodes(nds =>
      nds.map(node => node.id === id ? { ...node, data: { ...node.data, isSelected: !node.data.isSelected } } : node)
    );
  }, [setNodes]);

  const onFavorite = useCallback((id: string) => {
    setFavoritedStoryIds(prev => {
      const newSet = new Set(prev);
      newSet.has(id) ? newSet.delete(id) : newSet.add(id);
      return newSet;
    });

    setNodes(nds =>
      nds.map(node => node.id === id ? { ...node, data: { ...node.data, isFavorited: !node.data.isFavorited } } : node)
    );
  }, [setNodes]);

  const removeStory = useCallback((id: string, type: 'selected' | 'favorited') => {
    const setFunc = type === 'selected' ? setSelectedStoryIds : setFavoritedStoryIds;
    setFunc(prev => {
      const newSet = new Set(prev);
      newSet.delete(id);
      return newSet;
    });

    setNodes(nds =>
      nds.map(node => node.id === id ? { ...node, data: { ...node.data, [type === 'selected' ? 'isSelected' : 'isFavorited']: false } } : node)
    );
  }, [setNodes]);

  useEffect(() => {
    const fetchData = async () => {
      if (!themeRoomId) return;

      setIsLoading(true);
      try {
        const [storiesResponse, themeRoomResponse] = await Promise.all([
          fetch(`/api/theme-room-api/fetch-all-stories?themeRoomId=${themeRoomId}`),
          fetch(`/api/theme-room-api/fetch-one?themeRoomId=${themeRoomId}`)
        ]);

        const stories = await storiesResponse.json();
        const themeRoom = await themeRoomResponse.json();

        const { constructedNodes, constructedEdges } = constructNodesAndEdges(stories, screenSize);

        setNodes(constructedNodes.map(node => ({
          ...node,
          data: {
            ...node.data,
            isSelected: false,
            isFavorited: false,
            onSelect,
            onFavorite,
            themeRoomId
          }
        })));

        setEdges(constructedEdges);
        setThemeRoomDetails(themeRoom);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [screenSize, setNodes, setEdges, onSelect, onFavorite, themeRoomId]);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  const nodeTypes = { custom: CustomNode };

  if (isLoading) return <LoadingScreen />;

  return (
    <div className="h-screen relative">
      {themeRoomDetails && <HoverCardComponent themeRoomDetails={themeRoomDetails} nodesLength={nodes.length} />}
      {nodes.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full">
          <p className="text-2xl mb-4">No stories found.</p>
          <Button onClick={() => router.push(`/create-story?type=root&themeRoomId=${themeRoomId}`)}>
            Create a Root Story
          </Button>
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
            <Controls />
            <Background gap={12} size={1} />
          </ReactFlow>
        </div>
      )}
    </div>
  );
}

function constructNodesAndEdges(stories: any[], screenSize: { width: number, height: number }) {
  const constructedNodes: Node[] = [];
  const constructedEdges: Edge[] = [];
  const nodeWidth = 200;
  const nodeHeight = 100;
  const horizontalSpacing = Math.max(nodeWidth * 3, screenSize.width * 0.1);
  const verticalSpacing = Math.max(nodeHeight * 5, screenSize.height * 0.15);

  const rootNode = stories.find(story => story.type === 'root');
  if (!rootNode) return { constructedNodes, constructedEdges };

  const getChildren = (nodeId: string) => stories.filter(story => story.prev.includes(nodeId));

  const getMaxDepth = (node: any, depth = 0): number => {
    const children = getChildren(node.customId);
    if (children.length === 0) return depth;
    return Math.max(...children.map(child => getMaxDepth(child, depth + 1)));
  };

  const maxDepth = getMaxDepth(rootNode) + 1;

  const levelMap: Map<number, any[]> = new Map();

  function populateLevelMap(node: any, level: number) {
    if (!levelMap.has(level)) {
      levelMap.set(level, []);
    }
    levelMap.get(level)!.push(node);

    getChildren(node.customId).forEach(child => populateLevelMap(child, level + 1));
  }

  populateLevelMap(rootNode, 0);

  function positionNodes(node: any, level: number, index: number) {
    const nodesAtLevel = levelMap.get(level)!;
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

    node.prev.forEach((prevId: string) => {
      constructedEdges.push({
        id: `e-${prevId}-${node.customId}`,
        source: prevId,
        target: node.customId,
        animated: true
      });
    });

    getChildren(node.customId).forEach((child, childIndex) => {
      const childLevel = level + 1;
      positionNodes(child, childLevel, childIndex);
    });
  }

  positionNodes(rootNode, 0, 0);

  const minX = Math.min(...constructedNodes.map(node => node.position.x));
  const maxX = Math.max(...constructedNodes.map(node => node.position.x));
  const totalWidth = maxX - minX + nodeWidth;

  const xOffset = (screenSize.width - totalWidth) / 2 - minX;
  constructedNodes.forEach(node => {
    node.position.x += xOffset;
  });

  return { constructedNodes, constructedEdges };
}