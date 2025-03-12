import { useState, useEffect } from "react";
import { GHAGrid } from "~/components/GHAGrid";
import { Workflow } from "~/data/Workflow"; 

export default function Index() {
  const [metadata, setMetadata] = useState<{ date: number } | null>(null);
  const [workflows, setWorkflows] = useState<Workflow[]>([]);

  useEffect(() => {
    fetch("metadata.json")
      .then((response) => response.json())
      .then((data) => setMetadata(data));
  }, []);

  useEffect(() => {
    fetch("workflows.json")
      .then((response) => response.json())
      .then((data) => setWorkflows(data));
  }, []);

  return (
    <div className="flex flex-col h-screen w-full">
      <header className="flex flex-col items-center gap-9 py-4">
        <h1 className="leading text-2xl font-bold text-gray-800 dark:text-gray-100">
          Welcome to{" "}
          <span className="text-green-500">
            Github Actions Search and Pagination
          </span>
        </h1>
        <div className="items-center gap-4">
          Generated on:{" "}
          <span className="italic">
            {new Date(Number(metadata?.date)).toLocaleString()}
          </span>
        </div>
      </header>

      {/* Make GHAGrid take full width and be pushed to the bottom */}
      <div className="flex-1 w-full overflow-hidden">
        <GHAGrid workflows={workflows} />
      </div>
    </div>
  );
}
