import express from "express"

type ErrorFormat = {
  message: string
  data: Record<any, any>
}

type SuccessFormat = Record<any, any>

export const createResponse = (
  ...[res, success, data]: [
    res: express.Response,
    success: true,
    data: SuccessFormat
  ] | [
    res: express.Response,
    success: false,
    data?: ErrorFormat
  ]
) => {
  const status = success ? 200 : 500
  return res.status(status).json({ success, data })
}