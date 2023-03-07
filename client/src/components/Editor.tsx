import { FormEvent, useState } from "react";
import { Tldraw, useFileSystem } from "@tldraw/tldraw";
import { CustomCursor } from "./Cursor";
import { useAssets } from "../hooks/useAssets";
import { useMultiplayer } from "../hooks/useMultiplayer";
import { useSingleplayer } from "../hooks/useSingleplayer";
import { initPersistence } from "../utils/y-indexeddb";
import { destroyProvider, initProvider } from "../utils/y-websocket";
import PropTypes from "prop-types";
import {
  Multiplayer,
  MultiplayerReadOnly,
  Settings,
  Singleplayer,
} from "../types/types";

Editor.propTypes = {
  idbName: PropTypes.string.isRequired,
  apiUrl: PropTypes.string.isRequired,
  wsUrl: PropTypes.string,
  roomId: PropTypes.string,
  readOnly: PropTypes.bool,
  language: PropTypes.string,
};

const components = {
  Cursor: CustomCursor,
};

function Editor({
  idbName,
  apiUrl,
  wsUrl,
  roomId,
  readOnly,
  language,
}: Settings) {
  const [room, setRoom] = useState(roomId);
  const [joinRoom, setJoinRoom] = useState(undefined);

  language = language || "en";
  initPersistence(idbName);
  let editor = <SingleplayerEditor apiUrl={apiUrl} language={language} />;
  if (wsUrl && room) {
    initProvider(wsUrl, room);
    editor = readOnly ? (
      <MultiplayerReadOnlyEditor roomId={room} language={language} />
    ) : (
      <MultiplayerEditor apiUrl={apiUrl} roomId={room} language={language} />
    );
  } else setTimeout(() => destroyProvider(), 500);

  return (
    <div>
      {wsUrl && !room && (
        <div className="share-container">
          <input
            onChange={(e: FormEvent<HTMLInputElement>) =>
              setJoinRoom(e.target.value)
            }
            className="input-join"
            type="text"
            placeholder="id of room"
          ></input>
          {joinRoom && (
            <a className="share-item" onClick={() => setRoom(joinRoom)}>
              Join
            </a>
          )}
        </div>
      )}
      {wsUrl && room && (
        <div className="leave-container">
          <a
            className="leave-item"
            onClick={() => {
              setJoinRoom(undefined);
              setRoom(undefined);
            }}
          >
            Leave
          </a>
        </div>
      )}
      {editor}
    </div>
  );
}

function SingleplayerEditor({ apiUrl, language }: Singleplayer) {
  const fileSystemEvents = useFileSystem();
  const { onAssetCreate, onAssetDelete, onAssetUpload } = useAssets(apiUrl);
  const { ...events } = useSingleplayer(language);

  return (
    <Tldraw
      autofocus
      showMultiplayerMenu={false}
      onAssetCreate={onAssetCreate}
      onAssetDelete={onAssetDelete}
      onAssetUpload={onAssetUpload}
      {...fileSystemEvents}
      {...events}
    />
  );
}

function MultiplayerEditor({ apiUrl, roomId, language }: Multiplayer) {
  const { onSaveProjectAs, onSaveProject } = useFileSystem();
  const { onAssetCreate, onAssetDelete, onAssetUpload } = useAssets(apiUrl);
  const { ...events } = useMultiplayer(roomId, language);

  return (
    <Tldraw
      autofocus
      components={components}
      showPages={false}
      showMultiplayerMenu={false}
      onAssetCreate={onAssetCreate}
      onAssetDelete={onAssetDelete}
      onAssetUpload={onAssetUpload}
      onSaveProjectAs={onSaveProjectAs}
      onSaveProject={onSaveProject}
      {...events}
    />
  );
}

function MultiplayerReadOnlyEditor({ roomId, language }: MultiplayerReadOnly) {
  const { onSaveProjectAs, onSaveProject } = useFileSystem();
  const { ...events } = useMultiplayer(roomId, language);

  return (
    <Tldraw
      autofocus
      components={components}
      showPages={false}
      showMultiplayerMenu={false}
      onSaveProjectAs={onSaveProjectAs}
      onSaveProject={onSaveProject}
      readOnly
      {...events}
    />
  );
}

export default Editor;
