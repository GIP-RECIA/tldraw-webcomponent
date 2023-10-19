import './assets/scss/app.scss';
import Editor from './components/Editor';

function App() {
  return (
    <div className="tldraw__editor">
      <Editor persistenceKey="my-persistence-key" />
    </div>
  );
}

export default App;
