#!/usr/bin / env node
import { execSync } from 'child_process';
import express from 'express'
import handler from 'serve-handler'

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json())

app.post("/create-dry", (req, res) => {
  const taskName = req.body.taskName
  const graphBuffer = execSync(`turbo ${taskName} --dry=json`)
  const result = JSON.parse(graphBuffer.toString())

  return res.json(result.tasks)
})

app.get("*", (req, res) => handler(req, res, { public: "out" }));

app.listen(port);
console.log('Server started at http://localhost:' + port);