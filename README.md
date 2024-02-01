# tldraw-webcomponent

tldraw WebComponent

- [tldraw-webcomponent](#tldraw-webcomponent)
  - [Installation](#installation)
  - [Paramètres](#paramètres)

## Installation

1. Installation via npm :

```sh
npm install @gip-recia/tldraw-webcomponent
```

2. Importation du composant :

Dans un module JavaScript :

```js
import '@gip-recia/tldraw-webcomponent';
```

Dans une page HTML :

```html
<script src="./path/to/tldraw-webcomponent.min.js"></script>
```

3. Ajout du composant sur une page HTML :

**Singleplayer**

```js
const tldrawSingleplayer = document.createElement('tldraw-singleplayer');
document.body.appendChild(tldrawSingleplayer);
```

**Multiplayer**

```js
const tldrawMultiplayer = document.createElement('tldraw-multiplayer');
document.body.appendChild(tldrawMultiplayer);
```

## Paramètres

**Singleplayer**

| Nom                   |   Type    | Requis  | Default | Description                         |
| --------------------- | :-------: | :-----: | :-----: | ----------------------------------- |
| `persistance-api-url` | `string`  | `true`  |         | URL du fichier (GET & PUT)          |
| `assets-api-url`      | `string`  | `true`  |         | URL des assets (GET, POST & DELETE) |
| `user-info-api-url`   | `string`  | `true`  |         | URL des informations utilisateurs   |
| `dark-mode`           | `boolean` | `false` |         | Active le thème sombre              |

<br/>

```html
<tldraw-singleplayer persistance-api-url="" assets-api-url="" user-info-api-url="" dark-mode />
```

**Multiplayer**

| Nom                 |   Type    | Requis  | Default | Description                         |
| ------------------- | :-------: | :-----: | :-----: | ----------------------------------- |
| `websocket-api-url` | `string`  | `true`  |         | URL du serveur de YJS               |
| `room-id`           | `string`  | `true`  |         | Identifiant de la salle             |
| `init-url`          | `string`  | `false` |         | URL du projet à prendre pour source |
| `user-info-api-url` | `string`  | `true`  |         | URL des informations utilisateurs   |
| `dark-mode`         | `boolean` | `false` |         | Active le thème sombre              |

<br/>

```html
<tldraw-multiplayer websocket-api-url="" room-id="" init-url="" user-info-api-url="" dark-mode />
```
