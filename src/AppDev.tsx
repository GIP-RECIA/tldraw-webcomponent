import './assets/scss/app.scss';
import Editor from './components/Editor.tsx';

function App() {
  const { VITE_PERSISTANCE_API_URL, VITE_ASSETS_API_URL, VITE_USER_INFO_API_URI } = import.meta.env;

  return (
    <div className="tldraw__editor">
      <Editor
        persistanceApiUrl={VITE_PERSISTANCE_API_URL}
        assetsApiUrl={VITE_ASSETS_API_URL}
        userInfoApiUrl={VITE_USER_INFO_API_URI}
      />
    </div>
  );
}

export default App;
