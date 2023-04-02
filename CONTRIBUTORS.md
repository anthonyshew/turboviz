# Contributors

Hello and thank you for your interest in contributing!

These repository might look slightly complex at first. However, it is mostly a bunch of scaffolding to help your local development experience simpler.

## The app we distribute is in `/apps/viz`

The actual application that we package up and make available at `npx @ashew/turboviz` is in `/apps/viz`.

The rest of what you gives you a Turborepo to test that experience in.

## To develop...

`pnpm dev` will give you the development server for `turboviz`. It's a Next.js app so it should feel quite familiar!

## To test what you've built...

1. `pnpm build`
2. `pnpm start`

This will run a production version of the application in this repository.

## To test with another repository...

You now have a pure Node app located at `/apps/viz/dist/bin.js`. From the Turborepo that you'd like to test in, you'll path your way here with something like `node ../turboviz/apps/viz/dist/bin.js`. You can also choose to make a symlink.
