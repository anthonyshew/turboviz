import { useState, useEffect } from "react";
import { ReactFlowInner } from "../components/ReactflowInner";

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

export default Page;
