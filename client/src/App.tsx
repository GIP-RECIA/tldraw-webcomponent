import "./App.scss";

const { VITE_API_URL, VITE_IDB_NAME, VITE_LANGUAGE, VITE_WS_URL } = import.meta
  .env;

export default function App() {
  const urlParams = window.location.pathname.slice(1).split("/");
  const roomId = urlParams[0] === "r" ? urlParams[1] : undefined;

  return (
    <div className="tldraw">
      <tldraw-editor
        idb-name={VITE_IDB_NAME}
        api-url={VITE_API_URL}
        ws-url={VITE_WS_URL}
        room-id={roomId}
        language={VITE_LANGUAGE}
      />
    </div>
  );
}
