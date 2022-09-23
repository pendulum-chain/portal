# Pendulum WebApp

Web application for Pendulum.
This project was bootstrapped with [vite](https://vite.new/preact-ts)

## Run
In the project directory, you can run:

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
We also create a file, on the fly, a file named `_redirects` that will serve the index.html instead of giving a 404 no matter what URL the browser requests.
