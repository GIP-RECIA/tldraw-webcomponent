# Express-Yjs-tldraw

Tldraw singleplayer and mutliplayer WebComponent.

Librairies :

- [tldraw](https://www.tldraw.com)
- [Yjs](https://github.com/yjs/yjs)
- [Express](https://github.com/expressjs/express)

Based on [nimeshnayaju yjs-tldraw](https://github.com/nimeshnayaju/yjs-tldraw) POC for yjs multiplayer.

## Features

- Open `.tldr` files
- Browser save
- File upload
- Generate multiplayer empty room
- Share current page in a multiplayer room
- Join a room

## Roadmap

- [ ] Page managemnt on multiplayer room

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

### WebComponent

|  Property   |   Type    | Required | Default | Description                                                                                                                                                      |
| :---------: | :-------: | :------: | :-----: | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `idb-name`  | `string`  |  `true`  |         | Name for indexeddb                                                                                                                                               |
|  `api-url`  | `string`  |  `true`  |         | API url for file managment                                                                                                                                       |
|  `ws-url`   | `string`  | `false`  |         | [Yjs](https://github.com/yjs/yjs) WebSocket server url                                                                                                           |
|  `room-id`  | `string`  | `false`  |         | Identifier of multiplayer room                                                                                                                                   |
| `language`  | `string`  | `false`  |  `en`   | Default interface language (check [tldraw translation](https://github.com/tldraw/tldraw/tree/main/packages/tldraw/src/translations) for availables translations) |
| `read-only` | `boolean` | `false`  | `false` | Disable edition on multiplayer                                                                                                                                   |
|  `no-join`  | `boolean` | `false`  | `false` | Disallow joining room                                                                                                                                            |
| `no-leave`  | `boolean` | `false`  | `false` | Disallow leaving room                                                                                                                                            |
| `no-share`  | `boolean` | `false`  | `false` | Disallow sharing romm                                                                                                                                            |

```html
<tldraw-editor
  idb-name=""
  api-url=""
  ws-url=""
  room-id=""
  language=""
  read-only
  no-join
  no-share
  no-leave
/>
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
