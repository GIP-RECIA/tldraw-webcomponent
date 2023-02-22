# Express-Yjs-tldraw

Multiplayer implementation with image upload on [tldraw](https://www.tldraw.com) using [yjs](https://github.com/yjs/yjs) and [express](https://github.com/expressjs/express).

Based on [nimeshnayaju yjs-tldraw](https://github.com/nimeshnayaju/yjs-tldraw) POC.

## Setup

```bash
yarn initialize
```

## How to use

### Development

Launch api for image uploading.

```bash
yarn dev:api
```

Launch client to use tldraw.

```bash
yarn dev:client
```

### Multiplayer

Launch WebSocket server then add `/r/<anything>` to your url use multiplayer functionality.
Each unique url create is own room.

```bash
yarn start:ws
```

Use to use multiplayer functionality.

Remove `node_modules` and `dist` folders.

```bash
yarn clean
```

## Build

Build api and client on there own folder.

```bash
yarn build:api
yarn build:client
```

OR

```bash
yarn build:all
```

Build all in `./dist`

```bash
yarn build:all:samedir
```
