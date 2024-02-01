import MultiplayerEditorSFC from './components/MultiplayerEditor.tsx';
import SingleplayerEditorSFC from './components/SingleplayerEditor.tsx';
import r2wc from '@r2wc/react-to-web-component';

const SingleplayerEditor = r2wc(SingleplayerEditorSFC, {
  props: {
    persistanceApiUrl: 'string',
    assetsApiUrl: 'string',
    userInfoApiUrl: 'string',
    darkMode: 'boolean',
  },
});

const MultiplayerEditor = r2wc(MultiplayerEditorSFC, {
  props: {
    websocketApiUrl: 'string',
    roomId: 'string',
    initUrl: 'string',
    userInfoApiUrl: 'string',
    darkMode: 'boolean',
  },
});

const register = (): void => {
  customElements.define('tldraw-singleplayer', SingleplayerEditor);
  customElements.define('tldraw-multiplayer', MultiplayerEditor);
};

export { SingleplayerEditor, MultiplayerEditor, register };
