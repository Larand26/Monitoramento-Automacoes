export interface iLog {
  jobName: string;
  runId: string;
  environment: string;
  status: "success" | "error" | "warning" | "running";
  startedAt: Date;
  finishedAt?: Date;
  durationMs?: number;
  message?: string;
  details?: { [key: string]: any };
}
