# Maintainers release playbook

CI to get releases going up to `npm` are a little clunky so it's good to have this written down. Don't want to forget!

## All development work is trunk-based into main.

The bulk of the activity in this repository will happen on development branches that all point at `main`, the default branch.

## Time to cut a release?

It's a small process but it shouldn't be too bad. Ready?

1. On a development branch, create a changeset using:
   1. `npx changeset pre enter canary`
   2. `npx changeset`
   3. Merge it to `main`.
2. PR and merge `main` to `canary`. The GitHub action should pass and create a canary on `npm`.
3. Test the canary's behavior in a Turborepo you have on your machine with `npx @ashew/turboviz@canary`.
4. Once you've verified that the canary is working how you like, create a new changeset for a release using:
   1. `npx changeset pre exit`
   2. `npx changeset`
5. Commit the changes to canary (don't worry, the GHA won't create a new canary release) and PR them to the `release` branch.
6. Accept the PR and the GitHub action will create the new release on npm.
