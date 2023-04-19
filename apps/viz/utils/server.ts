import express from "express"

export type ErrorFormat<T> = {
  message: string
  data: T
}

export type SuccessFormat<T> = T

export const createResponse = <T>(
  ...[res, success, data]: [
    res: express.Response,
    success: true,
    data: SuccessFormat<T>
  ] | [
    res: express.Response,
    success: false,
    data?: ErrorFormat<T>
  ]
) => {
  const status = success ? 200 : 500
  return res.status(status).json({ ...data, success })
}