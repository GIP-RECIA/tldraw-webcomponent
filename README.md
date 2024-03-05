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

| Nom                   |       Type        |       Requis       | Default | Description                                                                                                 |
| --------------------- | :---------------: | :----------------: | :-----: | ----------------------------------------------------------------------------------------------------------- |
| `mode`                | `single \| multi` |       `true`       |         | Mode de fonctionnement                                                                                      |
| `ws-destroy`          |     `boolean`     |      `false`       |         | Détruit la connecion YJS                                                                                    |
| `persistance-api-url` |     `string`      |      `false`       |         | URL du fichier (GET & PUT) \| (En mode multi, permet la sauvegarde sur le fichier)                          |
| `assets-api-url`      |     `string`      |      `false`       |         | URL des assets (GET, POST & DELETE)                                                                         |
| `user-info-api-url`   |     `string`      |       `true`       |         | URL des informations utilisateurs                                                                           |
| `dark-mode`           |     `boolean`     |      `false`       | `false` | Active le thème sombre                                                                                      |
| `read-only`           |     `boolean`     |      `false`       | `false` | Restreint l'accès en lecture seul                                                                           |
| `auto-save`           |     `boolean`     |      `false`       | `true`  | Active la sauvegarde automatique                                                                            |
| `auto-save-delay`     |     `number`      |      `false`       | 3000 ms | Délais de sauvegarde automatique                                                                            |
| `open`                |     `boolean`     |      `false`       | `false` | Possibilité d'ouvrir des fichiers externes                                                                  |
| `websocket-api-url`   |     `string`      | Pour le mode multi |         | URL du serveur de YJS                                                                                       |
| `room-id`             |     `string`      | Pour le mode multi |         | Identifiant de la salle                                                                                     |
| `init-url`            |     `string`      |      `false`       |         | URL du projet à prendre comme base de salle                                                                 |
| `owner`               |     `boolean`     |      `false`       | `false` | Propriétaire de la salle (seul le proprétaire peux sauvegarder / définir les urls de persistance et assets) |

<br/>

```html
<tldraw-editor
  mode=""
  ws-destroy
  persistance-api-url=""
  assets-api-url=""
  user-info-api-url=""
  dark-mode
  read-only
  auto-save
  auto-save-delay=""
  open
  websocket-api-url=""
  room-id=""
  init-url=""
  owner
/>
```
