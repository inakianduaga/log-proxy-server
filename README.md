Log Proxy Server
================

[![Build Status][travis-image]][travis-url] [![Coverage Status][coveralls-image]][coveralls-url]

> A nodejs express server used to proxy client logs calls through different log transports (rsyslog, hipchat, etc)

## Configuration

#### Server configuration

You can use the provided `.env.example` file to generate a `.env` file from which to set server configuration parameters, included settings filepath. Otherwise you can always use env variables.

#### Logger configuration

The server log configuration groups and transports has to be provided through a json file, see [./config/settings.json](./config/settings.json) as an example. The configuration is split
into 2 blocks:

- `baseSettings`: This is optional, and includes log transports that will be added to all configuration groups.
- `groups`: These are the different log endpoints, with the transport configuration for each one. They will overwrite any baseSettings in case of collision.

## Installation

You can either run the project installing dependencies locally, or run a dockerized container that includes all dependencies

### Local

- Node must be installed on the system
- Run `npm install` from the root folder to install all required dev/build dependencies
- (Optionally) Install *Typescript definitions manager (tsd)* `npm install tsd -g` globally to update typescript definitions when desired

### Docker

You can use the included Dockerfile to build an image that provides node and npm installed by default, and points
 to the `gulp` command as the entrypoint. You can follow these steps

1. Build the docker image, w/ some tag: `docker build -t log-proxy-server`
2. Install npm dependencies if starting from scratch
  `docker run -t --rm -v /absolute/path/to/this/folder:/app --entrypoint="npm" log-proxy-server install`.

  You can also replace `install` by `any_npm_command` in the above
3. Run any gulp task from the project:
  `docker run -t --rm -v /absolute/path/to/this/folder:/app log-proxy-server <GULP_TASK_HERE>`

The docker container includes the *tsd* node package pre-installed, which you can run through
  `docker run -t --rm -v /absolute/path/to/this/folder:/app --entrypoint="tsd" log-proxy-server <TSD_COMMAND_HERE>`

##### Launching server on docker

Remember to map the port from the host to the container to be able to access the server.

`docker run -t --rm -p 3000:3000 -v /absolute/path/to/this/folder:/app log-proxy-server serve --port=3000`

## Documentation

Visit the swagger API endpoint on `/docs` to see/interact with the API.

## Developing

- Use the `gulp watchAndServe` task (or `docker run -t --rm -p 3000:3000 -v /absolute/path/to/this/folder:/app log-proxy-server watchAndServe --port=3000` when using the dockerized container)
during development to get hot code-reloading/test running when you modify your code

## Running production server:

To make use of all your server resources, it is recommended to run the server in cluster mode (via the [PM2](https://www.npmjs.com/package/pm2) package)

#### Running on hosts local installation:

Use the `gulp serveCluster` task. You can monitor the cluster and issue commands by running pm2 command (for this you might want to install pm2 globally, `npm install pm2 -g`)

#### Running through docker container

The container image already contains PM2 globally. In order to launch the server, we need to use the wrapper script `serveCluster.sh`. It can be called by running

`docker run --rm -v /absolute/path/to/this/folder:/app -p 3000:3000 --name myRunningServer --entrypoint="bash"  log-proxy-server ./serveCluster.sh <PM2 OPTIONS HERE>`

where `<PM2 OPTIONS HERE>` can be any number of CLI options from the PM2 package, such as `--instances=4`, etc.

**Issuing commands to the cluster**

You can interact with the cluster running inside the container via PM2 using the following command

`docker exec myRunningServer pm2 <OPTIONS>`,

such as for example

`docker exec myRunningServer pm2 reload` or
`docker exec myRunningServer pm2 show 0`


[travis-url]: https://travis-ci.org/inakianduaga/log-proxy-server
[travis-image]: https://travis-ci.org/inakianduaga/log-proxy-server.svg?branch=master

[coveralls-url]: https://coveralls.io/github/inakianduaga/log-proxy-server?branch=master
[coveralls-image]: https://coveralls.io/repos/inakianduaga/log-proxy-server/badge.svg?branch=master&service=github
