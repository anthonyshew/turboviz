
import useSWR from "swr";
import { Routes } from "../utils/types";

const fetchRoot =
  process.env.NODE_ENV === "development" ? "http://localhost:3001" : "";

type Return = { data: Routes["create-dry"]["outputs"] }

export const useDry = ({ taskName, workspace }: Routes["create-dry"]["inputs"]) => {
  return useSWR<Return, Error>(
    `${fetchRoot}/create-dry`,
    () => fetch(`${fetchRoot}/create-dry`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ taskName, workspace })
    })
      .then(res => res.json())
      .then(res => {
        if (!res.success) {
          throw new Error(res.message)
        }

        return res
      })
  )
}
