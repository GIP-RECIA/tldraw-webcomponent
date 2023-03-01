import Editor from "./components/Editor";
import "./App.css";

const { VITE_LANGUAGE } = import.meta.env;

export default function App() {
  const urlParams = window.location.pathname.slice(1).split("/");
  const roomId = urlParams[0] === "r" ? urlParams[1] : undefined;

  return (
    <div className="tldraw">
      <Editor roomId={roomId} language={VITE_LANGUAGE} />
    </div>
  );
}
