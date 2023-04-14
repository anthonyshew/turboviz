"use client";

import { useState, useEffect } from "react";
import { ReactFlowInner } from "../components/ReactflowInner";
import { Select } from "../components/Select";

const fetchRoot =
  process.env.NODE_ENV === "development" ? "http://localhost:3001" : "";

const Page = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(false);
  const [workspace, setWorkspace] = useState(null);
  const [workspaceList, setWorkspaceList] = useState([]);
  const [taskName, setTaskName] = useState("build");
  const [taskList, setTaskList] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    fetch(`${fetchRoot}/create-dry`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        taskName,
        workspace,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setIsLoading(false);
        setTaskList(
          // This changed in 1.9!
          // @ts-ignore
          Object.keys(res.globalCacheInputs.rootPipeline).map((t: string) => ({
            value: t,
            label: t,
          }))
        );
        setWorkspaceList(
          res.packages.map((p: string) => ({ value: p, label: p }))
        );
        setTasks(res.tasks);
      })
      .catch(() => setError(true));
  }, [workspace, taskName]);

  if (!tasks.length) {
    return (
      <div className="flex flex-col items-center justify-center min-w-full min-h-screen bg-black">
        <p className="text-white">Mapping your Turboverse...</p>
      </div>
    );
  }

  if (error) return <p>Errored.</p>;

  // if (isLoading) return null;

  return (
    <div>
      <Select options={taskList} title="Tasks" onChange={setTaskName} />
      <Select
        options={workspaceList}
        title="Workspaces"
        onChange={setWorkspace}
      />
      <ReactFlowInner tasks={tasks} activeTask={taskName} />
    </div>
  );
};

export default Page;
