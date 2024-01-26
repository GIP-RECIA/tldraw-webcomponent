import './assets/scss/app.scss';
import MultiplayerEditor from './components/MultiplayerEditor.tsx';
import SingleplayerEditor from './components/SingleplayerEditor.tsx';
import { useState } from 'react';

function App() {
  const {
    VITE_PERSISTANCE_API_URL,
    VITE_ASSETS_API_URL,
    VITE_WEBSOCKET_API_URL,
    VITE_USER_INFO_API_URI,
    VITE_ROOM_ID,
  } = import.meta.env;

  const [mode, setMode] = useState<string>('singleplayer');

  return (
    <>
      <div>
        <div>
          Mode
          <label>
            <input
              type="radio"
              value="singleplayer"
              checked={mode === 'singleplayer'}
              onChange={() => setMode('singleplayer')}
            />
            Singleplayer
          </label>
          <label>
            <input
              type="radio"
              value="multiplayer"
              checked={mode === 'multiplayer'}
              onChange={() => setMode('multiplayer')}
            />
            Multiplayer
          </label>
        </div>
      </div>
      <main>
        <div className="app-container">
          <div className="tldraw__editor">
            {mode == 'singleplayer' && (
              <SingleplayerEditor
                persistanceApiUrl={VITE_PERSISTANCE_API_URL}
                assetsApiUrl={VITE_ASSETS_API_URL}
                userInfoApiUrl={VITE_USER_INFO_API_URI}
              />
            )}
            {mode == 'multiplayer' && (
              <MultiplayerEditor
                websocketApiUrl={VITE_WEBSOCKET_API_URL}
                roomId={VITE_ROOM_ID}
                userInfoApiUrl={VITE_USER_INFO_API_URI}
              />
            )}
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
