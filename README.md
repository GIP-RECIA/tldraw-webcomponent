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

```js
const tldrawEditor = document.createElement('tldraw-editor');
document.body.appendChild(tldrawEditor);
```

## Paramètres

| Nom                   |   Type    | Requis  | Default | Description                         |
| --------------------- | :-------: | :-----: | :-----: | ----------------------------------- |
| `persistance-api-url` | `string`  | `true`  |         | URL du fichier (GET & PUT)          |
| `assets-api-url`      | `string`  | `true`  |         | URL des assets (GET, POST & DELETE) |
| `user-info-api-url`   | `string`  | `true`  |         | URL des informations utilisateurs   |
| `dark-mode`           | `boolean` | `false` |         | Active le thème sombre              |

<br/>

```html
<tldraw-editor persistance-api-url="" assets-api-url="" user-info-api-url="" dark-mode />
```
