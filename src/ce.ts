import EditorSFC from './components/Editor.tsx';
import r2wc from '@r2wc/react-to-web-component';

const Editor = r2wc(EditorSFC, {
  props: {
    persistanceApiUrl: 'string',
    assetsApiUrl: 'string',
    userInfoApiUrl: 'string',
    darkMode: 'boolean',
  },
});

const register = (): void => {
  customElements.define('tldraw-editor', Editor);
};

export { Editor, register };
