#!/usr/bin/env node
import { execSync } from 'child_process';
import express from 'express'
import open from 'open'
import path from 'path'
import handler from 'serve-handler'
import portfinder from 'portfinder'

const app = express();

app.use(express.json())

app.post("/create-dry", (req, res) => {
  const taskName = req.body.taskName
  try {
    const graphBuffer = execSync(`turbo ${taskName} --dry=json`)
    const result = JSON.parse(graphBuffer.toString())
    return res.json(result.tasks)
  }
  catch (err) {
    console.error(err)
    return res.status(500).json({ error: "Something went wrong." })
  }
})

app.get("*", (req, res) => {
  handler(req, res, {
    public: path.join(__dirname + "/out"),
  })
});

portfinder.getPortPromise({ startPort: process.env.NODE_ENV !== "production" ? 3000 : undefined })
  .then((port) => {
    app.listen(port);
    open(`http://localhost:${port}`)
    console.log("Opening your browser...")
    console.log("If your browser didn't open, visit http://localhost:" + port);
    console.log("Welcome to Turboviz.")
  })
  .catch((err) => {
    console.error("Could not find a free port (probably).")
    throw new Error(err)
  });
