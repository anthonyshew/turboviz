import { Node, Edge } from "reactflow";
import "reactflow/dist/style.css";
import { Turbotask } from "../types";
import { Reactflow } from "./Reactflow";
import { TurboNodeData } from "./TurboNode";
import {
  filterEmptyTasks,
  formatTaskToNode,
  topLevelTasks,
  edgesBuilder,
  getLayoutedElements,
} from "./utils";

export const ReactFlowInner = ({ tasks }: { tasks: Turbotask[] }) => {
  const initialNodes: Node<TurboNodeData>[] = [
    {
      id: "___ROOT___",
      data: { id: "___ROOT___", title: "Build" },
      position: { x: 0, y: 0 },
      type: "turbo",
    },
    ...tasks.filter(filterEmptyTasks).map(formatTaskToNode),
  ];

  const initialEdges: Edge[] = [
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

  const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
    initialNodes,
    initialEdges
  );

  return (
    <Reactflow initialNodes={layoutedNodes} initialEdges={layoutedEdges} />
  );
};
