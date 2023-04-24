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

### WebComponent

|    Property     |   Type    | Required | Default | Description                                                                                                                                                                 |
| :-------------: | :-------: | :------: | :-----: | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|   `idb-name`    | `string`  |  `true`  |         | Name for indexeddb                                                                                                                                                          |
|  `upload-api`   | `string`  | `false`  |         | API url for file managment (by default, save in local storage)                                                                                                              |
|    `ws-url`     | `string`  | `false`  |         | [Yjs](https://github.com/yjs/yjs) WebSocket server url                                                                                                                      |
|   `user-api`    | `string`  | `false`  |         | API url with `@uportal/open-id-connect` to get user info or Nextcloud WEBDAV info after `/remote.php/dav/files/` (Use for Nextcloud save and get usernames for multiplayer) |
| `nextcloud-url` | `string`  | `false`  |         | Nextcloud server url                                                                                                                                                        |
|    `room-id`    | `string`  | `false`  |         | Identifier of multiplayer room                                                                                                                                              |
|   `language`    | `string`  | `false`  |  `en`   | Default interface language (check [tldraw translation](https://github.com/tldraw/tldraw/tree/main/packages/tldraw/src/translations) for availables translations)            |
|   `read-only`   | `boolean` | `false`  | `false` | Disable edition on multiplayer                                                                                                                                              |
|    `no-join`    | `boolean` | `false`  | `false` | Disallow joining room by removing icon                                                                                                                                      |
|   `no-leave`    | `boolean` | `false`  | `false` | Disallow leaving room by removing icon                                                                                                                                      |
|   `no-share`    | `boolean` | `false`  | `false` | Disallow sharing romm by removing icon                                                                                                                                      |

/!\ DONT USE `/` AT END OF URLs

```html
<tldraw-editor
  idb-name=""
  upload-api=""
  ws-url=""
  user-api=""
  nextcloud-url=""
  nextcloud-save="true"
  nextcloud-save-hide="true"
  room-id=""
  language=""
  read-only="true"
  no-join="true"
  no-share="true"
  no-leave="true"
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
