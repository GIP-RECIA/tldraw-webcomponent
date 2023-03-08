import Editor from "./components/Editor";
import "./App.scss";

const { VITE_API_URL, VITE_IDB_NAME, VITE_LANGUAGE, VITE_WS_URL } = import.meta
  .env;

export default function App() {
  const urlParams = window.location.pathname.slice(1).split("/");
  const roomId = urlParams[0] === "r" ? urlParams[1] : undefined;

  return (
    <div className="tldraw">
      <Editor
        idbName={VITE_IDB_NAME}
        apiUrl={VITE_API_URL}
        wsUrl={VITE_WS_URL}
        roomId={roomId}
        language={VITE_LANGUAGE}
      />
    </div>
  );
}
