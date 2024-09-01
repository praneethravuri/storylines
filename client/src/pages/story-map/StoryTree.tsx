import React, { useState, useEffect } from 'react';
import {
    ReactFlow,
    Controls,
    Background,
    useNodesState,
    useEdgesState,
    Node,
    Edge
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import LoadingScreen from '../../components/layout/LoadingScreen';
import { Story } from "../../types/Story";
import { ThemeRoom } from '../../types/ThemeRoom';
import StoryNode from './StoryNode';

interface DataProps extends Story {
    themeRoom: ThemeRoom;
}


const CustomStoryNode: React.FC<{ data: DataProps }> = ({ data }) => {
    return (
        <StoryNode data={data} />
    )

};

const nodeTypes = {
    custom: CustomStoryNode,
};

interface StoryTreeProps {
    stories: Story[];
    themeRoom : ThemeRoom;
}

const StoryTree: React.FC<StoryTreeProps> = ({ stories, themeRoom }) => {

    const [screenSize, setScreenSize] = useState({ width: 0, height: 0 });
    const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        console.log("Theme Room details in StoryTree:", themeRoom);
    }, [themeRoom]);

    useEffect(() => {
        const updateScreenSize = () => {
            setScreenSize({ width: window.innerWidth, height: window.innerHeight });
        };
        updateScreenSize();
        window.addEventListener('resize', updateScreenSize);
        return () => window.removeEventListener('resize', updateScreenSize);
    }, []);

    const constructNodesAndEdges = () => {
        const newNodes: Node[] = [];
        const newEdges: Edge[] = [];
        const rootNode = stories.find(story => story.type === "root");
        if (!rootNode) return;

        const nodeMap = new Map<string, Node>();
        const levelNodes: { [key: number]: Story[] } = {};
        const nodeWidth = 250;
        const nodeHeight = 200;
        const verticalSpacing = 400;
        const horizontalSpacing = 400;

        const createNode = (story: Story, depth: number, index: number): Node => {
            const totalWidth = (levelNodes[depth].length - 1) * horizontalSpacing;
            const startX = -totalWidth / 2;
            return {
                id: story._id,
                position: {
                    x: startX + index * horizontalSpacing,
                    y: depth * verticalSpacing
                },
                data: {
                    ...story,
                    themeRoom
                },
                style: { width: nodeWidth, height: nodeHeight },
                type: "custom"
            };
        };

        const processLevel = (currentLevelNodes: Story[], depth: number) => {
            levelNodes[depth] = currentLevelNodes;
            const nextLevelNodes: Story[] = [];

            currentLevelNodes.forEach((story, index) => {
                if (nodeMap.has(story._id)) return;

                const node = createNode(story, depth, index);
                newNodes.push(node);
                nodeMap.set(story._id, node);

                story.next.forEach(nextId => {
                    const nextStory = stories.find(s => s._id === nextId);
                    if (nextStory) {
                        nextLevelNodes.push(nextStory);
                        newEdges.push({
                            id: `e${story._id}-${nextId}`,
                            source: story._id,
                            target: nextId
                        });
                    }
                });
            });

            if (nextLevelNodes.length > 0) {
                processLevel(nextLevelNodes, depth + 1);
            }
        };

        processLevel([rootNode], 0);

        setNodes(newNodes);
        setEdges(newEdges);

    };

    useEffect(() => {
        const setupStoryTree = async () => {
            setIsLoading(true);
            constructNodesAndEdges();

            const clickFitViewButton = () => {
                const fitViewButton = document.querySelector('.react-flow__controls-fitview') as HTMLButtonElement;
                if (fitViewButton) {
                    fitViewButton.click();
                }
            };

            await new Promise(resolve => requestAnimationFrame(resolve));

            clickFitViewButton();
            setIsLoading(false);
        };

        setupStoryTree();
    }, [stories, screenSize]);

    if (isLoading) {
        return <LoadingScreen />;
    }

    return (
        <div style={{ width: `${screenSize.width}px`, height: `${screenSize.height}px` }}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                fitView
                nodeTypes={nodeTypes}
            >
                <Controls />
                <Background gap={12} size={1} />
            </ReactFlow>
        </div>
    );
};

export default StoryTree;