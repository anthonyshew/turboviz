"use client";

import { useState, useEffect } from "react";
import { ReactFlowInner } from "../components/ReactflowInner";
import { Select } from "../components/Select";
import { useDry } from "./hooks";

const Page = () => {
  const [workspace, setWorkspace] = useState(null);
  const [taskName, setTaskName] = useState("build");

  const { data, isLoading, error } = useDry({ taskName, workspace });

  if (error) return <p className="text-white">{error.message}</p>;

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-w-full min-h-screen bg-black">
        <p className="text-white">Mapping your Turboverse...</p>
      </div>
    );
  }

  if (data?.tasks) {
    return (
      <>
        <div>
          <Select
            options={data.tasks.map((task) => {
              console.log(task);
              return {
                label: task.task,
                value: task.task,
              };
            })}
            title="Tasks"
            onChange={setTaskName}
          />
          <Select
            options={data.packages.map((pkg) => ({ label: pkg, value: pkg }))}
            title="Workspaces"
            onChange={setWorkspace}
          />
        </div>
        {/* <ReactFlowInner tasks={data.tasks} activeTask={taskName} /> */}
      </>
    );
  }

  return <p>Howdy.</p>;
};

export default Page;
