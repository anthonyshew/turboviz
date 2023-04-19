#!/usr/bin/env node
import { execSync } from "child_process";
import express from "express";
import open from "open";
import path from "path";
import handler from "serve-handler";
import getPort, { makeRange } from 'get-port'
import cors from "cors";
import { dryVersionOnePointNine, dryVersionPreOnePointNine } from './utils/validators'
import { DryVersionOnePointNine, DryVersionPreOnePointNine, Routes } from "./utils/types";
import { createResponse } from "./utils/server";

const isDev = process.env.NODE_ENV === "development";
const isDebug = Boolean(process.env.DEBUG)

const app = express();

app.use(express.json());
app.use(cors());

const logger = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (isDev || isDebug) {
    let send = res.send;
    res.send = log => {
      console.log(`Code: ${res.statusCode}`);
      console.log("Body: ", JSON.parse(log));
      res.send = send;
      return res.send(log);
    }
  }

  next()
}

app.post("/create-dry", logger, async (
  req: express.Request<
    {},
    {},
    Routes["create-dry"]["inputs"]
  >,
  res: express.Response<Routes["create-dry"]["outputs"]>
) => {
  const taskName = req.body.taskName;

  let dryResult: unknown = null

  try {
    const graphBuffer = execSync(`turbo ${taskName} --dry=json`);
    dryResult = JSON.parse(graphBuffer.toString());
  } catch (error) {
    return createResponse(res, false, {
      message: "We weren't able to create your dry graph. Check your turbo.json for possible errors.",
      data: {}
    })

  }

  try {
    const preOnePointNine = dryVersionPreOnePointNine.parse(dryResult)
    return createResponse<DryVersionPreOnePointNine>(res, true, preOnePointNine)

  } catch (error) { }

  try {
    const onePointNine = dryVersionOnePointNine.parse(dryResult)
    return createResponse<Pick<DryVersionOnePointNine, "tasks" | "packages">>(res, true, {
      tasks: onePointNine.tasks,
      packages: onePointNine.packages,
    })
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
