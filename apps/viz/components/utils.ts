import { Edge, Node, Position } from "reactflow";
import { GraphDirection, Turbotask } from "../utils/types";
import { TurboNodeData } from "./TurboNode";

// dagre doesn't have types but that's okay :)
// @ts-ignore
import dagre from "dagre";

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const nodeWidth = 350;
const nodeHeight = 50;

export const edgesBuilder = (taskList: Turbotask[]): Edge[] => {
  const edgesArr: Edge[] = [];

  taskList.forEach((task) => {
    task.dependencies.forEach((dep) => {
      edgesArr.push({
        id: `${task.taskId}-${dep}`,
        source: task.taskId,
        target: dep,
        className: "full-opacity",
      });
    });
  });

  return edgesArr;
};

export const formatTaskToNode = (
  task: Turbotask,
  index?: number
): Node<TurboNodeData> => ({
  id: task.taskId,
  position: { x: 10, y: (index ?? 1) * 150 },
  data: { id: task.taskId, title: task.taskId },
  type: "turbo",
});

export const topLevelTasks = (tasks: Turbotask[]) =>
  tasks.filter((task) => !task.dependents.length).map(formatTaskToNode);

export const getLayoutedElements = (
  nodes: Node[],
  edges: Edge[],
  direction: GraphDirection = "LR"
) => {
  dagreGraph.setGraph({ rankdir: direction });

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  const handleDirection = (dir: GraphDirection): [
    Position,
    Position
  ] => {
    if (dir === "BT") {
      return [
        Position.Top,
        Position.Bottom
      ]
    }

    if (dir === "TB") {
      return [
        Position.Bottom,
        Position.Top
      ]
    }

    if (dir === "RL") {
      return [
        Position.Left,
        Position.Right
      ]
    }
    return [Position.Right, Position.Left]
  }

  nodes.forEach((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    node.targetPosition = handleDirection(direction)[0];
    node.sourcePosition = handleDirection(direction)[1];

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
