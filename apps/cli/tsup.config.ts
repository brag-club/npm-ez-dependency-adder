import process from 'node:process'
import { defineConfig, type Options } from 'tsup'

const isDev = process.env.NODE_ENV === 'development'

const base: Options = {
    entry: ['src/index.ts'],
    format: ['cjs', 'esm'],
    sourcemap: isDev,
    minify: false,
    splitting: true,
    clean: true,
    dts: true,
    esbuildOptions(options) {
        options.conditions = ['dev']
    },
}

export default defineConfig({
  ...base,
  format: ['esm'],
  dts: false,
  banner: {
    js: '#!/usr/bin/env node\n',
  },
})