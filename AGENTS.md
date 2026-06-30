# AGENTS.md

## Cursor Cloud specific instructions

This repo is `tpscalls-frontend`: a Vite + React 19 + TypeScript single-page app
(Redux Toolkit, react-map-gl/Mapbox, Firebase Firestore). There is one product
(the web frontend) and no backend in this repo — data is read from a remote
Firebase Firestore project, and tiles come from Mapbox.

### Required external credentials (must be provided as secrets)

The dev environment cannot fully run without owner-controlled credentials:

- `PERSONAL_GITHUB_TOKEN` — **required for every `yarn` command**. `.npmrc`
  routes the `@rdrnt` scope (the private `@rdrnt/tps-calls-shared` types package)
  to GitHub Packages (`https://npm.pkg.github.com`) and authenticates with this
  token. It needs `read:packages` for the `rdrnt` account (the repo owner's own
  PAT works; the default Cursor `gh` token does NOT — it returns 403).
  - The token is injected as an env var in cloud sessions, so the update script
    and the agent's shells have it automatically. **Caveat:** because `.npmrc`
    uses `${PERSONAL_GITHUB_TOKEN}`, yarn (classic v1) hard-errors with
    "Failed to replace env in config" on ANY command (even `yarn start`) if the
    variable is unset in that shell. If you start a long-running process in a
    fresh `tmux` server that predates the secret, pass the var through
    (`tmux new-session ... -e "PERSONAL_GITHUB_TOKEN=$PERSONAL_GITHUB_TOKEN"`) or
    start tmux from a shell that already has it.
  - Note: the committed `.npmrc` previously used `$PERSONAL_GITHUB_TOKEN` (no
    braces), which npm/yarn never expand → install failed with 401. It is now
    `${PERSONAL_GITHUB_TOKEN}`.
- Firebase config files: `src/config/firebase/development.json` and
  `src/config/firebase/production.json` are gitignored and imported directly by
  `src/helpers/firebase/index.ts`. The app fails to build/run if they are absent.
  In dev (`yarn start`), `import.meta.env.DEV === true` so `development.json` is
  used. Each file is the standard Firebase web config object
  (`apiKey`, `authDomain`, `projectId`, `storageBucket`, `messagingSenderId`, `appId`).
  Provide them via the `FIREBASE_DEVELOPMENT_CONFIG` / `FIREBASE_PRODUCTION_CONFIG`
  secrets (write the JSON to those files during setup) or place the files
  directly. The Firestore project is `toronto-emergency-calls`; its web config
  is public (served in the live `tpscalls.live` JS bundle) and the `incidents`
  collection is public-read, so it can be recovered from the live site if needed.
- `VITE_MAPBOX_API_KEY` (in `.env`) — without a valid Mapbox token the home
  page (`/` and `/:id`, the map) stays on "Loading map…" and never finishes.
  Other env vars read in `src/helpers/environment.ts`: `VITE_SENTRY_DSN`,
  `VITE_GANALYTICS_KEY` (both optional for local dev).

### Map rendering requires WebGL (GUI test caveat)

The map uses `mapbox-gl`, which needs WebGL. The in-VM Chrome used by the
computer-use tool has no WebGL, so the map throws
`Error: Map is not supported by this browser` and stays on the loader there
(non-map routes like `/download` and `/contact` render fine). To screenshot the
working map, use headless Chrome with software WebGL, e.g.
`google-chrome --headless=new --no-sandbox --user-data-dir=/tmp/p --use-gl=angle --use-angle=swiftshader-webgl --enable-unsafe-swiftshader --virtual-time-budget=20000 --screenshot=out.png http://localhost:3000/`.
The loader only clears once BOTH the Mapbox `onLoad` fires AND at least one
incident has been fetched from Firestore (see `src/routes/Map.tsx`).

### Node / package manager

- Use the default Node 22 toolchain (`/exec-daemon/node`) with `yarn` 1.x. The
  committed `.nvmrc` pins `20.19.4`, but Node 22 is the environment default and
  builds/serves the app fine; do not fight the PATH to force Node 20.
- `node_modules` hot-reload caveat: after changing dependencies, restart
  `yarn start` (Vite dev server) — newly installed packages are not always picked
  up by an already-running dev server.

### Commands (defined in `package.json`)

- Run (dev): `yarn start` → Vite dev server on `http://localhost:3000`.
- Build: `yarn build` (prod) or `yarn build:dev` (dev mode, no Sentry upload).
- Lint: `yarn lint` (ESLint is **not** type-aware here — no `project` set).
  Note: the repo is **not** currently lint/format clean (`yarn lint` and
  `yarn format:check` report many pre-existing `prettier/prettier` issues);
  this is a repo state issue, not an environment problem.
- Type-check: `yarn type-check` (`tsc --noEmit`).
- Test: `yarn test` (Vitest + jsdom). There are currently **no** test files in
  the repo, so this is effectively a no-op until tests are added.

### Useful routes for smoke-testing without Mapbox/Firebase data

`/download` and `/contact` render full content with no map/data dependency and
are the easiest pages to confirm the app shell + routing work. `/` and `/:id`
require a working Mapbox token (and Firestore data) to fully render.

### Known dev-server quirk

Vite dev serves many unbundled ES modules; in a resource-constrained browser
this can intermittently produce `net::ERR_INSUFFICIENT_RESOURCES` and a blank
page that resolves on refresh. The production build (`yarn build`) bundles
everything and is not affected.
