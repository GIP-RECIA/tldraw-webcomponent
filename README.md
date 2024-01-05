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

| Nom         |    Type    | Requis  | Default | Description                 |
| ----------- | :--------: | :-----: | :-----: | --------------------------- |
| `blob`      |  `string`  | `true`  |         | Fichier                     |
| `read-only` | `boolean`  | `false` |         | Lecture seule               |
| `on-change` | `function` | `true`  |         | Retourne le fichier modifié |

<br/>

```html
<tldraw-editor blob="" read-only="" on-change="" />
```
