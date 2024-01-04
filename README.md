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
<script src="./path/to/index.js"></script>
```

3. Ajout du composant sur une page HTML :

```js
const tldrawEditor = document.createElement('tldraw-editor');
document.body.appendChild(tldrawEditor);
```

## **Paramètres**

| Nom                   |   Type   | Requis | Default | Description                       |
| --------------------- | :------: | :----: | :-----: | --------------------------------- |
| `persistance-api-url` | `string` | `true` |         | URL du fichier (GET & PUT)        |
| `user-info-api-url`   | `string` | `true` |         | URL des informations utilisateurs |

```html
<tldraw-editor persistance-api-url="" user-info-api-url="" />
```
