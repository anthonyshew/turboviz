import { Edge, Node } from "reactflow";
import { Turbotask } from "../types";
import { TurboNodeData } from "./TurboNode";

export const filterEmptyTasks = (task: Turbotask) =>
  !task.command.includes("NONEXISTENT");

export const edgesBuilder = (taskList: Turbotask[]): Edge[] => {
  const edgesArr: Edge[] = [];

  taskList.forEach((task) => {
    task.dependencies.forEach((dep: any) => {
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