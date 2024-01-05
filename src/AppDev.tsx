import './assets/scss/app.scss';
import Editor from './components/Editor.tsx';

function App() {
  return (
    <div className="tldraw__editor">
      <Editor blob="" readOnly={false} onChange={(blob) => console.log(blob)} />
    </div>
  );
}

export default App;
