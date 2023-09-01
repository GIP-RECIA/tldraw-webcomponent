# **tldraw-webcomponent**

tldraw WebComponent

## **Installation**

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
<script type="module">
  import './path/to/tldraw-webcomponent.js';
</script>
```

3. Ajout du composant sur une page HTML :

```js
const tldrawEditor = document.createElement('tldraw-editor');
document.body.appendChild(tldrawEditor);
```

## **Paramètres**

| Nom             |   Type    | Requis  | Default | Description                                                                                                                                                                                                                 |
| --------------- | :-------: | :-----: | :-----: | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `idb-name`      | `string`  | `true`  |         | Nom de l'indexed db                                                                                                                                                                                                         |
| `upload-api`    | `string`  | `false` |         | URL de l'API REST pour la gestion des fichiers (sauvagarde dans le local storage par défaut)                                                                                                                                |
| `ws-url`        | `string`  | `false` |         | URL du serveur de WebSocket [Yjs](https://github.com/yjs/yjs)                                                                                                                                                               |
| `user-api`      | `string`  | `false` |         | URL de l'API des infromations utilisateurs `@uportal/open-id-connect` OU informations Nextcloud WEBDAV après `/remote.php/dav/files/` (Utilisé pour l'export dans Nextcloud et les noms d'utilisateurs pour le multiplayer) |
| `nextcloud-url` | `string`  | `false` |         | URL du serveur Nextcloud                                                                                                                                                                                                    |
| `room-id`       | `string`  | `false` |         | Identifiant de la salle multiplayer courante                                                                                                                                                                                |
| `language`      | `string`  | `false` |  `en`   | Langue par défaut de l'interface (regarder [tldraw translation](https://github.com/tldraw/tldraw/tree/main/assets/translations) pour les traductions disponibles)                                                           |
| `read-only`     | `boolean` | `false` | `false` | Désactiver l'édition lors de en mode multiplayer                                                                                                                                                                            |
| `no-join`       | `boolean` | `false` | `false` | Ne pas autoriser à rejoindre une salle                                                                                                                                                                                      |
| `no-leave`      | `boolean` | `false` | `false` | Ne pas autoriser à quitter la salle                                                                                                                                                                                         |
| `no-share`      | `boolean` | `false` | `false` | Ne pas autoriser à partager la salle                                                                                                                                                                                        |

/!\ NE PAS UTILISER DE `/` A LA FIN DES URLs

```html
<tldraw-editor
  idb-name=""
  upload-api=""
  ws-url=""
  user-api=""
  nextcloud-url=""
  room-id=""
  language=""
  read-only="true"
  no-join="true"
  no-share="true"
  no-leave="true"
/>
```
