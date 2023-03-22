import { useState, useEffect } from "react";
import { Edge, Node } from "reactflow";
import { Reactflow } from "../components/Reactflow";
import { TurboNodeData } from "../components/TurboNode";
import {
  edgesBuilder,
  filterEmptyTasks,
  formatTaskToNode,
} from "../components/utils";

// @ts-ignore
import dagre from "dagre";
import { Turbotask } from "../types";

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const nodeWidth = 275;
const nodeHeight = 40;

const fetchRoot =
  process.env.NODE_ENV === "development" ? "http://localhost:3001" : "";

const Page = () => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(`${fetchRoot}/create-dry`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        taskName: "build",
      }),
    })
      .then((res) => res.json())
      .then((res) => setTasks(res))
      .catch(() => setError(true));
  }, []);

  if (!tasks.length)
    return (
      <div className="flex flex-col items-center justify-center min-w-full min-h-screen bg-black">
        <p className="text-white">Mapping your Turboverse...</p>
      </div>
    );

  if (error) return <p>Errored.</p>;

  return <ReactFlowInner tasks={tasks} />;
};

const ReactFlowInner = ({ tasks }: { tasks: Turbotask[] }) => {
  const getLayoutedElements = (
    nodes: Node[],
    edges: Edge[],
    direction = "LR"
  ) => {
    const isHorizontal = direction === "LR";
    dagreGraph.setGraph({ rankdir: direction });

    nodes.forEach((node) => {
      dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
    });

    edges.forEach((edge) => {
      dagreGraph.setEdge(edge.source, edge.target);
    });

    dagre.layout(dagreGraph);

    nodes.forEach((node) => {
      const nodeWithPosition = dagreGraph.node(node.id);
      // @ts-ignore
      node.targetPosition = isHorizontal ? "left" : "top";
      // @ts-ignore
      node.sourcePosition = isHorizontal ? "right" : "bottom";

      // We are shifting the dagre node position (anchor=center center) to the top left
      // so it matches the React Flow node anchor point (top left).
      node.position = {
        x: nodeWithPosition.x - nodeWidth / 2,
        y: nodeWithPosition.y - nodeHeight / 2,
      };

      return node;
    });

    return { nodes, edges };
  };

  const initialNodes: Node<TurboNodeData>[] = [
    {
      id: "___ROOT___",
      data: { id: "___ROOT___", title: "Build" },
      position: { x: 0, y: 0 },
      type: "turbo",
    },
    ...tasks.filter(filterEmptyTasks).map(formatTaskToNode),
  ];

  const topLevelTasks: Node<TurboNodeData>[] = tasks
    .filter((task) => !task.dependents.length)
    .map(formatTaskToNode);

  const initialEdges: Edge[] = [
    ...topLevelTasks.map(
      (task): Edge => ({
        id: `___ROOT___-${task.id}`,
        source: "___ROOT___",
        target: task.id,
        className: "full-opacity",
      })
    ),
    ...edgesBuilder(tasks),
  ];

  const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
    initialNodes,
    initialEdges
  );

  return (
    <Reactflow initialNodes={layoutedNodes} initialEdges={layoutedEdges} />
  );
};

export default Page;
