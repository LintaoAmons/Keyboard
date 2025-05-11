# Migration to Vite from Create React App (CRA)

This document summarizes the process and issues encountered during the migration of the Lintaos Keyboard project from Create React App (CRA) to Vite, a modern frontend tooling framework that offers faster build times and a more efficient development experience.

## Why Migrate to Vite?

- **Faster Builds and Hot Module Replacement (HMR):** Vite leverages ES modules for near-instantaneous HMR and faster cold starts compared to CRA's Webpack-based setup.
- **Modern Tooling:** Vite uses native ES modules, reducing bundle size and improving performance.
- **Simplified Configuration:** Vite requires less configuration out of the box and supports modern JavaScript features without additional setup.

## Steps for Migration

1. **Update Dependencies:** Remove `react-scripts` and add `vite`, `@vitejs/plugin-react`, and `vitest` for testing.
2. **Create Vite Configuration:** Set up `vite.config.ts` with React plugin and test configurations.
3. **Update HTML Entry Point:** Move `index.html` to the root directory and ensure it points to the correct entry script (`src/index.tsx`).
4. **Update Scripts:** Replace CRA scripts (`start`, `build`, `test`) with Vite equivalents (`dev`, `build`, `vitest run`).

## Issues Encountered During Migration

### 1. Test Detection Issues with CRA
   - **Problem:** Initially, tests in the `./test` folder were not detected by Jest when using `react-scripts test`.
   - **Cause:** CRA's default Jest configuration looks for tests in `src` with specific patterns (`__tests__` or `*.spec.js`).
   - **Solution Attempted:** Updated `package.json` with custom `testMatch` patterns, but CRA did not fully respect these custom configurations without ejecting.
   - **Resolution:** Decided to migrate to Vite, which offers more flexible test configurations with Vitest.

### 2. Dependency Conflict with `@types/node`
   - **Problem:** During Vite installation, a dependency conflict arose between `@types/node@16.18.60` and the version required by `vitest`.
   - **Cause:** Vitest required a newer version of `@types/node` (18.x or 20.x).
   - **Solution:** Updated `@types/node` to `^18.15.11` in `package.json` to meet Vitest's requirements.
   - **Command:** `npm install` after updating the version.

### 3. Vitest Failing on Setup File
   - **Problem:** Vitest reported a failure on `test/setup.ts` because it was treated as a test file but contained no test suites.
   - **Cause:** The initial `vite.config.ts` included all files in `test/` as test files (`include: ['./test/**/*.{ts,tsx}']`).
   - **Solution:** Updated `vite.config.ts` to only include files with `.spec.ts` or `.test.ts` extensions (`include: ['./test/**/*.{spec,test}.{ts,tsx}']`).
   - **Command:** `npm run test` after updating the configuration.

### 4. No Content Displayed at `http://localhost:5173/`
   - **Problem:** After starting the Vite server, visiting `http://localhost:5173/` showed no content.
   - **Cause:** Vite requires the `index.html` file to be at the root directory, not in `public/`, and it must point to the correct entry script.
   - **Solution:** Created `index.html` at the root with the correct script reference (`<script type="module" src="/src/index.tsx"></script>`). Also, Vite tried port 5173 but switched to 5174 due to port conflict.
   - **Command:** `npm run dev` to start the server and check the correct port in the console output.

### 5. Missing Dependency `web-vitals`
   - **Problem:** Vite failed to resolve `web-vitals`, which was imported in `src/reportWebVitals.ts`.
   - **Cause:** The dependency was removed during the migration process.
   - **Solution:** Added `web-vitals@^2.1.4` back to `package.json`.
   - **Command:** `npm install` to install the dependency, followed by `npm run dev` to restart the server.

## Final Notes

The migration to Vite resolved the initial test detection issues and provided a faster development environment. However, it required careful handling of configuration files, dependency versions, and project structure. If you encounter similar issues, refer to the Vite documentation (https://vitejs.dev/) and ensure all dependencies are compatible with the versions specified in `package.json`.

**Command to Start Development Server:**
```bash
npm run dev
```

**Command to Run Tests:**
```bash
npm run test
```
