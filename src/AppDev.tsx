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

  const [persistanceApiUrl, setPersistanceApiUrl] = useState<boolean>(false);
  const [assetsApiUrl, setAssetsApiUrl] = useState<boolean>(false);
  const [token, setToken] = useState<string>('Bearer');
  const [initUrl, setInitUrl] = useState<boolean>(false);
  const [owner, setOwner] = useState<boolean>(false);
  const [clearOnLeave, setClearOnLeave] = useState<boolean>(true);

  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [readOnly, setReadOnly] = useState<boolean>(false);
  const [autoSave, setAutoSave] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  const [leave, setLeave] = useState<boolean>(false);
  const [render, setRender] = useState<boolean>(false);

  const toggleRender = () => {
    if (render) {
      setLeave(true);
      setTimeout(() => setLeave(false), 200);
    }
    setTimeout(() => setRender(!render), 150);
  };

  return (
    <>
      <div className="settings">
        <div>
          <div>
            <b>Common settings</b>
          </div>
          <div>
            <input type="checkbox" checked disabled />
            mode :
            <label>
              <input type="radio" checked={mode === 'single'} onChange={() => setMode('single')} />
              single
            </label>
            <label>
              <input type="radio" checked={mode === 'multi'} onChange={() => setMode('multi')} />
              multi
            </label>
            <div>
              <input type="checkbox" checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
              darkMode
            </div>
            <div>
              <input type="checkbox" checked={readOnly} onChange={() => setReadOnly(!readOnly)} />
              readOnly
            </div>
            <div>
              <input type="checkbox" checked={autoSave} onChange={() => setAutoSave(!autoSave)} />
              autoSave
            </div>
            <div>
              <input type="checkbox" checked={open} onChange={() => setOpen(!open)} />
              open
            </div>
          </div>
        </div>
        <div>
          <div>
            <b>Single & Multi settings</b>
          </div>
          <div>
            <input
              type="checkbox"
              checked={persistanceApiUrl}
              onChange={() => setPersistanceApiUrl(!persistanceApiUrl)}
            />
            persistanceApiUrl : {VITE_PERSISTANCE_API_URL}
          </div>
          <div>
            <input type="checkbox" checked={assetsApiUrl} onChange={() => setAssetsApiUrl(!assetsApiUrl)} />
            assetsApiUrl : {VITE_ASSETS_API_URL}
          </div>
          <div>
            <input type="checkbox" checked={token.startsWith('Bearer ')} disabled />
            token :{' '}
            <input type="text" value={token} onChange={(e) => setToken(e.target.value)} style={{ width: '100%' }} />
          </div>
          <div>
            <input type="checkbox" checked={!token.startsWith('Bearer ')} disabled />
            userInfoApiUrl : {VITE_USER_INFO_API_URI}
          </div>
        </div>
        <div>
          <div>
            <b>Multi settings</b>
          </div>
          <div>
            <input type="checkbox" checked={mode === 'multi'} disabled />
            websocketApiUrl : {VITE_WEBSOCKET_API_URL}
          </div>
          <div>
            <input type="checkbox" checked={mode === 'multi'} disabled />
            roomId : {VITE_ROOM_ID}
          </div>
          <div>
            <input
              type="checkbox"
              checked={mode === 'single' ? false : initUrl}
              disabled={mode === 'single'}
              onChange={() => setInitUrl(!initUrl)}
            />
            initUrl : {VITE_PERSISTANCE_API_URL}
          </div>
          <div>
            <input
              type="checkbox"
              checked={mode === 'single' ? false : owner}
              disabled={mode === 'single'}
              onChange={() => setOwner(!owner)}
            />
            owner
          </div>
          <div>
            <input
              type="checkbox"
              checked={mode === 'single' ? false : clearOnLeave}
              disabled={mode === 'single'}
              onChange={() => setClearOnLeave(!clearOnLeave)}
            />
            clearOnLeave
          </div>
          <div>
            <input type="checkbox" checked={mode === 'single' ? false : leave} disabled />
            leave
          </div>
        </div>
        <div>
          <div>
            <b>Actions</b>
          </div>
          <button type="button" onClick={toggleRender}>
            {render ? 'Unmount' : 'Mount'}
          </button>
        </div>
      </div>
      <main>
        <div className="app-container">
          <div className="tldraw__editor">
            {render && (
              <TldrawEditor
                mode={mode}
                persistanceApiUrl={persistanceApiUrl ? VITE_PERSISTANCE_API_URL : undefined}
                assetsApiUrl={assetsApiUrl ? VITE_ASSETS_API_URL : undefined}
                token={token.startsWith('Bearer ') ? token : undefined}
                userInfoApiUrl={VITE_USER_INFO_API_URI}
                darkMode={darkMode}
                readOnly={readOnly}
                autoSave={autoSave}
                open={open}
                websocketApiUrl={VITE_WEBSOCKET_API_URL}
                roomId={VITE_ROOM_ID}
                initUrl={initUrl ? VITE_PERSISTANCE_API_URL : undefined}
                owner={owner}
                clearOnLeave={clearOnLeave}
                leave={leave}
              />
            )}
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
