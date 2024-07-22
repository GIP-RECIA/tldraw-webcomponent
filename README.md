# tldraw-webcomponent

> ⚠️ migration du projet vers https://github.com/GIP-RECIA/recia-webcomponents/tree/main/packages/tldraw

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

| Nom                   |       Type        |           Requis           | Default | Description                                                                                                 |
| --------------------- | :---------------: | :------------------------: | :-----: | ----------------------------------------------------------------------------------------------------------- |
| `debug`               |     `boolean`     |          `false`           | `false` | Active les logs de debug                                                                                    |
| `mode`                | `single \| multi` |           `true`           |         | Mode de fonctionnement                                                                                      |
| `persistance-api-url` |     `string`      |          `false`           |         | URL du fichier (GET & PUT) \| (En mode multi, permet la sauvegarde sur le fichier)                          |
| `assets-api-url`      |     `string`      |          `false`           |         | URL des assets (GET, POST & DELETE)                                                                         |
| `token`               |     `string`      | token ou user-info-api-url |         | Token utilisateur                                                                                           |
| `user-info-api-url`   |     `string`      | token ou user-info-api-url |         | URL des informations utilisateurs                                                                           |
| `dark-mode`           |     `boolean`     |          `false`           | `false` | Active le thème sombre                                                                                      |
| `read-only`           |     `boolean`     |          `false`           | `false` | Restreint l'accès en lecture seul                                                                           |
| `auto-save`           |     `boolean`     |          `false`           | `true`  | Active la sauvegarde automatique                                                                            |
| `auto-save-delay`     |     `number`      |          `false`           | 3000 ms | Délais de sauvegarde automatique                                                                            |
| `open`                |     `boolean`     |          `false`           | `false` | Possibilité d'ouvrir des fichiers externes                                                                  |
| `websocket-api-url`   |     `string`      |     Pour le mode multi     |         | URL du serveur de YJS                                                                                       |
| `room-id`             |     `string`      |     Pour le mode multi     |         | Identifiant de la salle                                                                                     |
| `init-url`            |     `string`      |          `false`           |         | URL du projet à prendre comme base de salle                                                                 |
| `owner`               |     `boolean`     |          `false`           | `false` | Propriétaire de la salle (seul le proprétaire peux sauvegarder / définir les urls de persistance et assets) |
| `clear-on-leave`      |     `boolean`     |          `false`           | `true`  | Efface les proprétés de la salle si le propriétaire s'en va (persistance-api-url & assets-api-url)          |
| `leave`               |     `boolean`     |          `false`           | `false` | Permet de déconnecter le web socket (à utiliser avant de changer de quitter la page)                        |

<br/>

```html
<tldraw-editor
  debug
  mode=""
  persistance-api-url=""
  assets-api-url=""
  token=""
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
  clear-on-leave
  leave
/>
```
