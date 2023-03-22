#!/usr/bin/env node
import { execSync } from 'child_process';
import express from 'express'
import open from 'open'
import path from 'path'
import handler from 'serve-handler'
import portfinder from 'portfinder'
import cors from 'cors'

const isDev = process.env.NODE_ENV === "development"

const app = express();

app.use(express.json())
app.use(cors())

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
  if (isDev) return res.send("You're probably looking for port 3000.")
  handler(req, res, {
    public: path.join(__dirname + "/out"),
  })
});

console.log(process.env.NODE_ENV)

const devPort = process.env.NODE_ENV === "development" ? 3001 : undefined

portfinder.getPortPromise({ port: devPort })
  .then((port) => {
    app.listen(port);
    !isDev ? open(`http://localhost:${port}`) : null
    console.log("Opening your browser...")
    console.log("If your browser didn't open, visit http://localhost:" + port);
    console.log("Welcome to Turboviz.")
  })
  .catch((err) => {
    console.error("Could not find a free port (probably).")
    throw new Error(err)
  });
