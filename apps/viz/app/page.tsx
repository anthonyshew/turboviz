"use client";

import { useState, useEffect } from "react";
import { ReactFlowInner } from "../components/ReactflowInner";
import { Select } from "../components/Select";
import { useDry } from "./hooks";

const Page = () => {
  const [workspace, setWorkspace] = useState(null);
  const [workspaceList, setWorkspaceList] = useState([]);
  const [taskName, setTaskName] = useState("build");
  const [taskList, setTaskList] = useState([]);

  const { data, isLoading, error } = useDry({ taskName, workspace });

  if (error) return <p>{error.message}</p>;

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-w-full min-h-screen bg-black">
        <p className="text-white">Mapping your Turboverse...</p>
      </div>
    );
  }

  if (data?.data.tasks) {
    return (
      <div>
        <Select options={taskList} title="Tasks" onChange={setTaskName} />
        <Select
          options={workspaceList}
          title="Workspaces"
          onChange={setWorkspace}
        />
        <ReactFlowInner tasks={data.data.tasks} activeTask={taskName} />
      </div>
    );
  }

  return <p>Howdy.</p>;
};

export default Page;
