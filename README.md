# Express-Yjs-tldraw

Tldraw singleplayer and mutliplayer WebComponent.

Librairies :

- [tldraw](https://www.tldraw.com)
- [yjs](https://github.com/yjs/yjs)
- [express](https://github.com/expressjs/express)

Based on [nimeshnayaju yjs-tldraw](https://github.com/nimeshnayaju/yjs-tldraw) POC for yjs multiplayer.

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

To use multiplayer functionality, launch WebSocket server then add `/r/<anything>` to your url.

```bash
yarn start:ws
```

### WebComponent

|    Prop    | Description                                                                                                                                                      |  Type  | Required | Default |
| :--------: | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----: | :------: | :-----: |
|  idb-name  | Name for indexeddb                                                                                                                                               | string |   true   |    -    |
|  api-url   | API url for file managment                                                                                                                                       | string |   true   |    -    |
|   ws-url   | WebSocket url                                                                                                                                                    | string |  false   |    -    |
|  room-id   | Identifier of multiplayer room                                                                                                                                   | string |  false   |    -    |
|  language  | Default interface language (check [tldraw translation](https://github.com/tldraw/tldraw/tree/main/packages/tldraw/src/translations) for availables translations) | string |  false   |   en    |
| read-only  | Disable edition on multiplayer                                                                                                                                   |  bool  |  false   |  false  |
| cant-join  | Disallow users to join a room                                                                                                                                    |  bool  |  false   |  false  |
| cant-leave | Disallow users to leave a room                                                                                                                                   |  bool  |  false   |  false  |
| cant-share | Disallow users to share a romm                                                                                                                                   |  bool  |  false   |  false  |

```html
<tldraw-editor
  idb-name=""
  api-url=""
  ws-url=""
  room-id=""
  language=""
  read-only
  cant-join
  cant-share
  cant-leave
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
