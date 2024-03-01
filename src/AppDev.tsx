import './assets/scss/app.scss';
import TldrawEditor from './components/TldrawEditor.tsx';
import { useState } from 'react';

function App() {
  const {
    VITE_PERSISTANCE_API_URL,
    VITE_ASSETS_API_URL,
    VITE_WEBSOCKET_API_URL,
    VITE_USER_INFO_API_URI,
    VITE_ROOM_ID,
  } = import.meta.env;

  const [mode, setMode] = useState<'single' | 'multi'>('single');
  const [autoSave, setAutoSave] = useState<boolean>(false);
  const [isOwner, setIsOwner] = useState<boolean>(false);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  return (
    <>
      <div>
        <div>
          Mode
          <label>
            <input type="radio" value="singleplayer" checked={mode === 'single'} onChange={() => setMode('single')} />
            Singleplayer
          </label>
          <label>
            <input type="radio" value="multiplayer" checked={mode === 'multi'} onChange={() => setMode('multi')} />
            Multiplayer
          </label>
        </div>
        <div>
          Autosave
          <input type="checkbox" onChange={() => setAutoSave(!autoSave)} />
        </div>
        <div>
          Owner
          <input type="checkbox" onChange={() => setIsOwner(!isOwner)} />
        </div>
        <div>
          Dark mode
          <input type="checkbox" onChange={() => setIsDarkMode(!isDarkMode)} />
        </div>
      </div>
      <main>
        <div className="app-container">
          <div className="tldraw__editor">
            <TldrawEditor
              mode={mode}
              persistanceApiUrl={VITE_PERSISTANCE_API_URL}
              assetsApiUrl={VITE_ASSETS_API_URL}
              userInfoApiUrl={VITE_USER_INFO_API_URI}
              darkMode={isDarkMode}
              autoSave={autoSave}
              isOwner={isOwner}
              websocketApiUrl={VITE_WEBSOCKET_API_URL}
              roomId={VITE_ROOM_ID}
              initUrl={VITE_PERSISTANCE_API_URL}
            />
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
