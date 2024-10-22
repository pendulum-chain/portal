# Pendulum Portal

[![Netlify Status](https://api.netlify.com/api/v1/badges/aa69406a-f4a1-4693-aed0-8478f1d1fabd/deploy-status)](https://app.netlify.com/sites/pendulum-portal-alpha/deploys)
&nbsp; ![TypeScript](https://img.shields.io/badge/-TypeSript-05122A?style=flat&logo=typescript)&nbsp;
![Preact](https://img.shields.io/badge/-Preact-05122A?style=flat&logo=preact)&nbsp;
![Vite](https://img.shields.io/badge/-Vite-05122A?style=flat&logo=vite)&nbsp;
![Tailwind CSS](https://img.shields.io/badge/-Tailwind-05122A?style=flat&logo=tailwindcss)&nbsp;
![Polkadot](https://img.shields.io/badge/-Polkadot-05122A?style=flat&logo=polkadot)&nbsp;

---

Web application for Pendulum. This project was bootstrapped with [vite](https://vite.new/preact-ts)

## Run

In the project directory, you can run:

### Install yarn - corepack

Enable Corepack by executing the command `corepack enable`. Corepack is included by default in Node.js, it manages the
Yarn version specified in the `packageManager` field.

**Important:** Modern [Yarn](https://yarnpkg.com/getting-started/install) releases should not be installed globally or
via npm - use Corepack instead.

**Note:** If you are using Volta to manage your Node.js versions, you need to follow the instructions
[here](https://yarnpkg.com/corepack#volta).

### `yarn install`

Install dependencies

### `yarn dev`

Runs the app in development mode.\
Open [http://127.0.0.1:5173/](http://127.0.0.1:5173) to view it in the browser.

## Build

### `yarn build`

Builds the app for production to the `dist` folder.\
It transpiles TypeScript, bundles Preact in production mode, splits and optimizes the builds for the best performance.

The build is minified and the filenames include the hashes.\
We call on `version.cjs` to show the commit version on the sidebar.\
We also create a file, on the fly, a file named `_redirects` that will serve the index.html instead of giving a 404 no
matter what URL the browser requests.

## Troubleshooting

### Missing price information

If you are missing the price information about the assets on the dashboard page, you are probably experiencing a CORS
problem with the batching server. If you want to fetch prices locally, you can use the proxy server available at
[pendulum-tools](https://github.com/pendulum-chain/pendulum-tools). Change url in `src/hooks/usePriceFetcher.ts` file to
`http://localhost:3000`

### Fixing type issues

If you encounter issues with the IDE not detecting the type overwrites of the `@pendulum-chain/types` package properly,
make sure that all the `@polkadot/xxx` packages match the same version used in the types package. It is also important
to make sure that peer dependencies have the same version as this might also cause issues.
