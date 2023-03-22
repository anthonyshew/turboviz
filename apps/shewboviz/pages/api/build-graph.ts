import { execSync } from "child_process"
import { NextApiRequest, NextApiResponse } from "next"
import { Turbotask } from "../../types"

export default function handler(req: NextApiRequest, res: NextApiResponse<{ tasks: Turbotask[] }>) {
  const taskName = req.body.taskName
  const graph = execSync(`turbo ${taskName} --dry=json`)
  const result = JSON.parse(graph.toString()).tasks

  return res.status(200).json(result)
}