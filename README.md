# ESModulesLinkingError repro (@tanstack/react-router + React 18)

Reproduction for [rspack#14266](https://github.com/web-infra-dev/rspack/issues/14266).

TanStack compiles `(React as any)[REACT_USE]` (with `REACT_USE = 'use'`) to `React$1["use"]` in `dist/esm/utils.js`. In **production** mode, both **Rspack** and **Webpack** treat that as a static import of `use` from `react`, which React 18 does not export.

## Quick start

```bash
pnpm install
```

### Development (both bundlers succeed)

Uses `mode: "development"` in `rspack.config.mjs` (same config for webpack via `WEBPACK=1`):

```bash
pnpm run build:rspack   # OK
pnpm run build:webpack  # OK
```

### Production (both bundlers fail with the same error)

```bash
pnpm run build:rspack:prod   # ESModulesLinkingError
pnpm run build:webpack:prod  # export 'use' was not found in 'react'
```

`rsbuild build` also fails because Rsbuild uses **production** mode by default.

## Root cause (short)

| Step | What happens |
|------|----------------|
| Source | `let REACT_USE = 'use'; (React as any)[REACT_USE]` |
| Published ESM | `React$1["use"]` (literal string key) |
| Bundler | Namespace import + `["use"]` → static export `use` from `react` |
| React 18 | No `use` export → linking error in production |

The TanStack comment about avoiding Webpack static analysis does not apply once TypeScript/SWC folds the key to a string literal.

## Workarounds

- Use `module.parser.javascript.exportsPresence: 'warn'` or `'auto'` if you need production builds on React 18.
- Upgrade to React 19 if you rely on `React.use`.
- Fix upstream in `@tanstack/react-router` (non-literal property access after compile).
