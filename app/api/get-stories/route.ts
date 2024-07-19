import Story from "@/schema/storySchema";
import { connectToDB } from "@/utils/connectToDb";

export async function GET() {
    try {
        await connectToDB();
        const nodes = await Story.find().lean();
        const formattedData = constructNodesAndEdges(nodes);
        return new Response(JSON.stringify(formattedData), { status: 200 });
    } catch (err) {
        console.error(err);
        return new Response(JSON.stringify({ message: "Error fetching stories", err }), { status: 500 });
    }
}

function constructNodesAndEdges(nodes: any[]) {
    const formattedNodes: any[] = [];
    const edges: any[] = [];
    const nodePositions: { [key: string]: { x: number, y: number } } = {};

    // Find the root node
    const rootNode = nodes.find(node => node.type === 'root');
    if (!rootNode) return { nodes: formattedNodes, edges };

    // Position the root node
    nodePositions[rootNode.customId] = { x: 0, y: 0 };

    // Helper function to recursively position nodes
    function positionNodes(node: any, level: number, index: number, siblingCount: number) {
        const xSpacing = 300;
        const ySpacing = 200;
        const x = (index - (siblingCount - 1) / 2) * xSpacing;
        const y = level * ySpacing;

        nodePositions[node.customId] = { x, y };

        formattedNodes.push({
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
            edges.push({
                id: `e-${prevId}-${node.customId}`,
                source: prevId,
                target: node.customId,
                animated: true
            });
        });

        // Position child nodes
        const childNodes = nodes.filter(n => n.prev.includes(node.customId));
        childNodes.forEach((childNode, childIndex) => {
            positionNodes(childNode, level + 1, childIndex, childNodes.length);
        });
    }

    // Start positioning from the root node
    positionNodes(rootNode, 0, 0, 1);

    return { nodes: formattedNodes, edges };
}