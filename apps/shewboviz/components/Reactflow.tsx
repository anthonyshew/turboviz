import { useCallback, MouseEvent } from "react";
import ReactFlow, {
  // MiniMap,
  Node,
  Edge,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  // useReactFlow,
} from "reactflow";
import "reactflow/dist/style.css";
import TurboNode, { TurboNodeData } from "./TurboNode";
import TurboEdge from "./TurboEdge";
// @ts-ignore
import dagre from "dagre";
import { Turbotask } from "../types";
import { formatTaskToNode } from "./utils";

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const nodeWidth = 275;
const nodeHeight = 40;

const nodeTypes = {
  turbo: TurboNode,
};

const edgeTypes = {
  turbo: TurboEdge,
};

export function Reactflow({
  initialNodes,
  initialEdges,
}: {
  initialNodes: Node[];
  initialEdges: Edge[];
}) {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  // const { setViewport, zoomIn, zoomOut } = useReactFlow();

  const getNeighbors = (targetId: string) => {
    // console.log({ targetId });
    const edgesToNeighbors = edges.filter((edge) => edge.id.includes(targetId));
    // console.log({ edgesToNeighbors });
    const neighbors: Node[] = [];
    edgesToNeighbors.forEach((edge) => {
      const foundNode = nodes.find(
        (node) => node.id === edge.source || node.id === edge.target
      );

      if (!foundNode) return;
      neighbors.push(foundNode);
      console.log({ neighbors });
    });

    setNodes((nodes) => [
      ...nodes,
      ...neighbors.map((node) => ({
        ...node,
        className: "full-opacity background-green",
      })),
    ]);
    console.log(neighbors);
  };

  const resetDim = () => {
    setNodes((cur) =>
      cur.map((node) => ({ ...node, className: "full-opacity" }))
    );
  };

  // const handleTransform = useCallback(() => {
  //   setViewport({ x: 0, y: 0, zoom: 1 }, { duration: 800 });
  // }, [setViewport]);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  return (
    <ReactFlow
      style={{ minHeight: "100vh" }}
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      nodeTypes={nodeTypes}
      edgeTypes={edgeTypes}
      onConnect={onConnect}
      onNodeMouseEnter={(e) =>
        // @ts-ignore
        getNeighbors(e.target.id)
      }
      onNodeMouseLeave={() => resetDim()}
      fitView
    >
      {/* <MiniMap /> */}
      <Controls />
      <Background />
      <svg>
        <defs>
          <linearGradient id="edge-gradient">
            <stop offset="0%" stopColor="#ae53ba" />
            <stop offset="100%" stopColor="#2a8af6" />
          </linearGradient>

          <marker
            id="edge-circle"
            viewBox="-5 -5 10 10"
            refX="0"
            refY="0"
            markerUnits="strokeWidth"
            markerWidth="10"
            markerHeight="10"
            orient="auto"
          >
            <circle stroke="#2a8af6" strokeOpacity="0.75" r="2" cx="0" cy="0" />
          </marker>
        </defs>
      </svg>
    </ReactFlow>
  );
}
