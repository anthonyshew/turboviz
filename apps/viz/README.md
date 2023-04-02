# Turboviz

An unofficial ClI tool for a Turborepo task visualizer.

This repository is currently an unversioned work-in-progress.

You're mostly looking at a `create-next-app` starter but with two major differences:

- `main.ts` has the script for what we eventually plan on doing for the tool
- `test-turborepo` has an `npx create-turbo` starter to run the script against

To use what we have so far:

- Make sure you've got a Next.js build (`pnpm build`)
- Run the Next.js server (`pnpm start`)
- Run against the test repo (in a new terminal, `pnpm launch`)
