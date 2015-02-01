Log Proxy Server
================

A nodejs express server used to log client logs, proxying calls to an rsyslog endpoint

## Installation

- Node must be installed on the system
- Run `npm install` to install all required dev/build dependencies

## Configuration

Use the provided `.env.example` file to generate a `.env` file from which to set configuration parameters. Other parameters are included in `./config/defaultSettings.js`

## Build / Development / Deployment

- Run `gulp` for list of available tasks
- Run `gulp watchAndServe` launches the server in development mode, reloads it whenever the code changes, and runs unit tests / linter


