import TldrawEditorSFC from './components/TldrawEditor.tsx';
import r2wc from '@r2wc/react-to-web-component';

const TldrawEditor = r2wc(TldrawEditorSFC, {
  props: {
    mode: 'string',
    wsDestroy: 'boolean',
    persistanceApiUrl: 'string',
    assetsApiUrl: 'string',
    userInfoApiUrl: 'string',
    darkMode: 'boolean',
    readOnly: 'boolean',
    autoSave: 'boolean',
    autoSaveDelay: 'number',
    open: 'boolean',
    websocketApiUrl: 'string',
    roomId: 'string',
    initUrl: 'string',
  },
});

const register = (): void => {
  customElements.define('tldraw-editor', TldrawEditor);
};

export { TldrawEditor, register };
