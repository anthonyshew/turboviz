import { z } from 'zod'
import useSWR from "swr";
import { Routes } from "../utils/types";

const fetchRoot =
  process.env.NODE_ENV === "development" ? "http://localhost:3001" : "";

type Return = Routes["create-dry"]["outputs"]

export const useDry = ({ taskName, workspace }: Routes["create-dry"]["inputs"]) => {
  const requestBody = z.object({
    taskName: z.string(),
    workspace: z.string().nullable()
  })

  return useSWR<Return, Error>(
    `${fetchRoot}/create-dry`,
    () => fetch(`${fetchRoot}/create-dry`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(requestBody.parse({ taskName, workspace }))
    })
      .then(res => res.json())
      .then(res => {
        if (!res.success) {
          throw new Error(res.message)
        }

        return res
      }), { refreshInterval: 1000 }
  )
}

export const useResolvedDry = () => {
  return useSWR<Return, Error>(`${fetchRoot}/create-dry`)
}
