# ws-chat

A Node/Websocket/React chat app

## Installation
> Note: I'm using `yarn` dependency manager here but `npm` works just as well... ish.

Clone this repo:

```
$ mkdir ws-chat && cd ws-chat
$ git clone git@github.com:louisjordan/ws-chat.git
```

Install dependencies:

```
$ yarn
```

Build the code:

```
$ yarn build
```

Start the server:

```
$ yarn start
```

## Development process

The following commands start the Webpack Dev Server and WebSocket Server.

**Run them at the same time in separate console windows.**

Start Webpack Dev Server:

```
$ yarn dev:client
```

Start WebSocket Server:

```
$ yarn dev:server
```
