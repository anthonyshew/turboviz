#!/usr/bin/env node
import { execSync } from "child_process";
import express from "express";
import open from "open";
import path from "path";
import handler from "serve-handler";
import getPort, { makeRange } from 'get-port'
import cors from "cors";
import { dryVersionOnePointNine, dryVersionPreOnePointNine } from './utils/types'
import { createResponse } from "./utils/server";

console.log(process.env.NODE_ENV)
const isDev = process.env.NODE_ENV === "development";
const isDebug = Boolean(process.env.DEBUG)

const app = express();

const logger = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (isDev || isDebug) {
    let send = res.send;
    res.send = log => {
      console.log(`Code: ${res.statusCode}`);
      console.log("Body: ", log.body);
      res.send = send;
      return res.send(log);
    }
  }

  next()
}

app.use(express.json());
app.use(cors());

app.post("/create-dry", logger, async (req, res) => {
  const taskName = req.body.taskName;

  const graphBuffer = execSync(`turbo ${taskName} --dry=json`);
  const dryResult = JSON.parse(graphBuffer.toString());

  try {
    const preOnePointNine = dryVersionPreOnePointNine.parse(dryResult)
    return createResponse(res, true, preOnePointNine)

  } catch (error) { }

  try {
    const onePointNine = dryVersionOnePointNine.parse(dryResult)
    return createResponse(res, true, {
      tasks: onePointNine.tasks,
      packages: onePointNine.tasks
    }
    )

  } catch (error) { }

  return createResponse(res, false, {
    message: "Could not parse payload as pre or post 1.9 version. Please make a Github issue with a copy of your --dry=json.",
    data: {}
  })
})

app.get("*", (req, res) => {
  if (isDev) return res.send("You're probably looking for port 3000.");
  handler(req, res, {
    public: path.join(__dirname + "/out"),
  });
});

const devPort = process.env.NODE_ENV === "development" ? 3001 : undefined;

getPort({ port: isDev ? devPort : makeRange(3000, 3999) })
  .then((port) => {
    app.listen(port);
    !isDev ? open(`http://localhost:${port}`) : null;
    console.log("If your browser didn't open, visit http://localhost:" + port);
    console.log("Welcome to Turboviz.");
  })
  .catch((err) => {
    throw new Error(err);
  });
