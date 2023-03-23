import { useCallback, useEffect } from "react";
import ReactFlow, {
  MiniMap,
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
import { Turbotask } from "../types";
import {
  edgesBuilder,
  filterEmptyTasks,
  formatTaskToNode,
  getLayoutedElements,
  topLevelTasks,
} from "./utils";

const nodeTypes = {
  turbo: TurboNode,
};

const edgeTypes = {
  turbo: TurboEdge,
};

export function Reactflow({
  initialNodes,
  initialEdges,
  tasks,
  activeTask,
}: {
  initialNodes: Node[];
  initialEdges: Edge[];
  tasks: Turbotask[];
  activeTask: string;
}) {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  // const { setViewport, zoomIn, zoomOut } = useReactFlow();

  useEffect(() => {
    const nextNodes: Node<TurboNodeData>[] = [
      {
        id: "___ROOT___",
        data: { id: "___ROOT___", title: activeTask },
        position: { x: 0, y: 0 },
        type: "turbo",
      },
      ...tasks.filter(filterEmptyTasks).map(formatTaskToNode),
    ];

    const nextEdges: Edge[] = [
      ...topLevelTasks(tasks).map(
        (task): Edge => ({
          id: `___ROOT___-${task.id}`,
          source: "___ROOT___",
          target: task.id,
          className: "full-opacity",
        })
      ),
      ...edgesBuilder(tasks),
    ];

    const { nodes, edges } = getLayoutedElements(nextNodes, nextEdges);

    setNodes(nodes);
    setEdges(edges);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tasks, activeTask]);

  const getNeighbors = (targetId: string) => {
    const edgesToNeighbors = edges.filter((edge) => edge.id.includes(targetId));
    const neighbors: Node[] = [];
    edgesToNeighbors.forEach((edge) => {
      const foundNode = nodes.find(
        (node) => node.id === edge.source || node.id === edge.target
      );

      if (!foundNode) return;
      neighbors.push(foundNode);
    });

    setNodes((nodes) => [
      ...nodes,
      ...neighbors.map((node) => ({
        ...node,
        className: "full-opacity background-green",
      })),
    ]);
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
