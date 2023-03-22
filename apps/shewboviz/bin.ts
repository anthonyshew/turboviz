#!/usr/bin / env node
import { execSync } from 'child_process';
import express from 'express'
import open from 'open'
import handler from 'serve-handler'
import portfinder from 'portfinder'

const app = express();

app.use(express.json())

app.post("/create-dry", (req, res) => {
  const taskName = req.body.taskName
  const graphBuffer = execSync(`turbo ${taskName} --dry=json`)
  const result = JSON.parse(graphBuffer.toString())

  return res.json(result.tasks)
})

app.get("*", (req, res) => handler(req, res, { public: "out" }));

portfinder.getPortPromise({ startPort: process.env.NODE_ENV !== "production" ? 3000 : undefined })
  .then((port) => {
    app.listen(port);
    open(`http://localhost:${port}`)
    console.log('Server started at http://localhost:' + port);
  })
  .catch((err) => {
    console.error("Could not find a free port.")
    throw new Error(err)
  });
