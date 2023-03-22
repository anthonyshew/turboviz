import { defineConfig, Options } from 'tsup'

export default defineConfig((options: Options) => ({
  entry: ["bin.ts"],
  format: ["cjs"],
  minify: true,
  ...options,
}));