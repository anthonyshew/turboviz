export type Turbotask = {
  taskId: string;
  task: string;
  package: string;
  hash: string;
  cacheState: {
    local: boolean;
    remote: boolean;
  };
  command: string;
  outputs: string[] | null;
  excludedOutputs: string[] | null;
  logFile: string;
  directory: string;
  dependencies: string[];
  dependents: string[];
};