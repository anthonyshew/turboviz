"use client";

import "../components/styles.css";
import { useDry } from "./hooks";
import { useEffect, useState } from "react";

import { Input } from "../components/Input";
import { Label } from "../components/Label";
import { Select } from "../components/Select";
import { ReactFlowInner } from "../components/ReactflowInner";

export default function Page() {
  const [workspace, setWorkspace] = useState(null);
  const [taskName, setTaskName] = useState("build");
  const { data, isLoading, error, mutate } = useDry({
    taskName,
    workspace,
  });

  useEffect(() => {
    mutate();
  }, [taskName]);

  return (
    <html lang="en">
      <body className="flex flex-col items-center justify-center min-h-screen bg-black">
        <div className="flex flex-row items-center gap-2">
          <Label className="text-white" htmlFor="pipeline">
            Pipeline:
          </Label>
          <Input
            className="text-white bg-green placeholder:text-gray-400"
            placeholder="Pipeline name"
            name="pipeline"
            value={taskName}
            onChange={(e) => {
              setTaskName(e.target.value);
            }}
          />
          {data?.packages ? (
            <Select
              options={data.packages.map((pkg) => ({ label: pkg, value: pkg }))}
              title="Workspaces"
              onChange={setWorkspace}
            />
          ) : null}
        </div>
        {isLoading ? (
          <div className="flex flex-col items-center justify-center min-w-full min-h-screen bg-black">
            <p className="text-white">Mapping your Turboverse...</p>
          </div>
        ) : null}
        {error ? (
          <div className="flex flex-col justify-center min-h-screen">
            <p className="text-white">{error.message}</p>
          </div>
        ) : null}
        {data?.tasks && !error ? (
          <ReactFlowInner tasks={data.tasks} activeTask={taskName} />
        ) : null}
      </body>
    </html>
  );
}
