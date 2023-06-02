# tldraw WebComponent

Tldraw singleplayer and mutliplayer WebComponent.

Librairies :

- [tldraw](https://www.tldraw.com)
- [Yjs](https://github.com/yjs/yjs)
- [Express](https://github.com/expressjs/express)

Based on [nimeshnayaju yjs-tldraw](https://github.com/nimeshnayaju/yjs-tldraw) POC for yjs multiplayer.

## Features

- Open `.tldr` files
- Realtime save on browser
- File upload on browser or with api
- Multiplayer
  - Generate an empty room
  - Share current page in room
  - Join a room
- Export and save on Nextcloud

## Roadmap

- [ ] tldraw v2

## Setup

```bash
yarn initialize
```

---

Remove `node_modules` and `dist` folders.

```bash
yarn clean
```

## How to use

### Development

```bash
yarn dev
```

OR

Launch api for image uploading.

```bash
yarn dev:api
```

Launch client to use tldraw.

```bash
yarn dev:client
```

To use multiplayer functionality.

```bash
yarn start:ws
```

## Build

Build all in `./dist`

```bash
yarn build
```

OR

Build api and client on there own folder.

```bash
yarn build:api
yarn build:client
```
