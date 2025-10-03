# QueryUI

QueryUI is a cross-platform desktop client for Apache Cassandra. It provides a fast, form-driven interface for exploring keyspaces, inspecting table metadata, running CQL queries, and managing saved connections without leaving a focused Electron experience.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Quick Start](#quick-start)
- [Available Scripts](#available-scripts)
- [Packaging Electron Builds](#packaging-electron-builds)
- [Project Structure](#project-structure)
- [Technology Stack](#technology-stack)
- [Screenshots](#screenshots)
- [Release Notes](#release-notes)
- [Contributing](#contributing)
- [License](#license)

## Features

- Inspect keyspaces, tables, partition keys, clustering columns, and data types at a glance.
- Build and validate CQL queries through a guided form with inline error feedback.
- Save and switch between multiple Cassandra connections.
- Execute queries with configurable row limits and export results as JSON.
- Context menu actions for copying, saving, updating, and deleting individual rows.
- Toast notifications, tooltips, and loaders to keep the workflow responsive.

## Prerequisites

- **Node.js** 18 or newer (npm 9+ recommended).
- **Git** for cloning the repository.
- Access to an Apache Cassandra instance (local or remote) that the app can reach.

## Quick Start

```bash
# Clone the repository
git clone https://github.com/Sanjeev-Panday/QueryUI.git
cd QueryUI

# Install dependencies
npm install

# Start the React dev server
npm start

# In a second terminal, launch the Electron shell
npm run dev
```

By default the renderer runs at `http://localhost:3000`, and Electron launches once the dev server is ready. Update `src/server` to point at the Cassandra environment you want to explore.

## Available Scripts

These npm scripts cover the typical development workflow:

| Command | Description |
| --- | --- |
| `npm start` | Runs the renderer in development mode using CRACO/CRA on port 3000. |
| `npm run dev` | Starts the renderer **and** boots Electron with hot reload for local development. |
| `npm run build` | Creates an optimized production build of the renderer inside `build/`. |
| `npm run build-electron` | Copies the Electron main process and server files into the `build/` output (used before packaging). |
| `npm run package` | Builds a macOS distributable using `electron-builder`. |
| `npm run deploy` | Builds a Windows distributable via `electron-builder`. |

Refer to `package.json` for additional targets such as `build-electron-win`.

## Packaging Electron Builds

1. Ensure `npm run build` completes successfully.
2. Run `npm run build-electron` to stage the Electron assets.
3. Invoke `npm run package` (macOS) or `npm run deploy` (Windows) to generate installers under the `dist/` directory.
4. Artifacts can be distributed or uploaded to the GitHub Releases page.

Configuration for `electron-builder` resides in `package.json` under the `build` field.

## Project Structure

```
QueryUI/
├─ electron/            # Electron main process files
├─ src/
│  ├─ app/              # React components, styles, UI logic
│  ├─ redux/            # Redux store setup, actions, reducers
│  ├─ server/           # Cassandra data access helpers
│  └─ index.js          # React entry point
├─ public/              # Static assets served by CRA
├─ craco.config.js      # Custom Webpack overrides for CRA
└─ package.json
```

## Technology Stack

- **Electron 38** for cross-platform desktop packaging.
- **React 18**, **Redux**, and **React Router 7** for the UI layer.
- **React Bootstrap 2** and **Bootstrap 5** for layout and styling.
- **Cassandra Driver 4** for database connectivity.
- **CRACO** to extend Create React App without ejecting.
- **Electron Builder** for cross-platform distribution.

## Screenshots

<p align="center">
  <img src="https://github.com/Sanjeev-Panday/cassandra-explorer/blob/master/screenshots/image6.png" alt="QueryUI Connections" width="650" />
</p>
<p align="center">
  <img src="https://github.com/Sanjeev-Panday/cassandra-explorer/blob/master/screenshots/image7.png" alt="QueryUI Query Workspace" width="650" />
</p>

## Release Notes

### 1.0.0-beta

- Edit saved connections, update rows inline, and confirm destructive actions.
- Expanded context menus to copy/save rows and export query results.

### 0.1.1-beta-2

- Introduced row-level context menus and JSON export options.
- Added configurable row limits and richer tooltips across the UI.

Check the [Releases](https://github.com/Sanjeev-Panday/QueryUI/releases) page for installers and detailed changelogs.

## Contributing

Issues and pull requests are welcome. If you plan a larger contribution:

1. Open an issue to discuss the scope.
2. Create a feature branch from `master`.
3. Run `npm run build` to ensure the renderer compiles.
4. Open a pull request describing the changes and any new tests or considerations.

## License

This project is licensed under the [MIT License](LICENSE).
