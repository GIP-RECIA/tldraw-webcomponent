import { FormEvent, useState } from "react";
import { Tldraw, useFileSystem } from "@tldraw/tldraw";
import { CustomCursor } from "./Cursor";
import { useAssets } from "../hooks/useAssets";
import { useMultiplayer } from "../hooks/useMultiplayer";
import { useSingleplayer } from "../hooks/useSingleplayer";
import { cloneDoc, initPersistence, initProvider, newDoc } from "../utils/yjs";
import { v4 as uuidv4, validate as uuidValidate } from "uuid";
import PropTypes from "prop-types";
import {
  Multiplayer,
  MultiplayerReadOnly,
  Settings,
  Singleplayer,
} from "../types/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightFromBracket,
  faArrowRightToBracket,
  faShareNodes,
  faUsers,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

Editor.propTypes = {
  idbName: PropTypes.string.isRequired,
  apiUrl: PropTypes.string.isRequired,
  wsUrl: PropTypes.string,
  roomId: PropTypes.string,
  language: PropTypes.string,
  readOnly: PropTypes.bool,
  noJoin: PropTypes.bool,
  noLeave: PropTypes.bool,
  noShare: PropTypes.bool,
};

const components = {
  Cursor: CustomCursor,
};

const localDoc = newDoc();

function Editor({
  idbName,
  apiUrl,
  wsUrl,
  roomId,
  language,
  readOnly,
  noJoin,
  noLeave,
  noShare,
}: Settings) {
  const [room, setRoom] = useState(roomId);
  const [joinRoom, setJoinRoom] = useState(undefined);
  const [wantJoinRoom, setWantJoinRoom] = useState(false);
  const [useLocalDoc, setUseLocalDoc] = useState(false);

  language = language || "en";
  initPersistence(idbName, localDoc);
  let editor = (
    <SingleplayerEditor
      apiUrl={apiUrl}
      doc={localDoc}
      language={language}
      readOnly={wantJoinRoom}
    />
  );
  if (wsUrl && room && uuidValidate(room)) {
    let doc = newDoc();
    if (useLocalDoc) doc = cloneDoc(localDoc);
    const provider = initProvider(wsUrl, room, doc);
    editor = readOnly ? (
      <MultiplayerReadOnlyEditor
        doc={doc}
        provider={provider}
        roomId={room}
        language={language}
      />
    ) : (
      <MultiplayerEditor
        apiUrl={apiUrl}
        doc={doc}
        provider={provider}
        roomId={room}
        language={language}
      />
    );
  }

  const joinRoomHandler = () => {
    if (joinRoom && uuidValidate(joinRoom)) setRoom(joinRoom);
  };

  const resetStates = () => {
    setRoom(undefined);
    setJoinRoom(undefined);
    setWantJoinRoom(false);
    setUseLocalDoc(false);
  };

  return (
    <div>
      {wsUrl && !room && (
        <div className="container">
          {!noShare && !readOnly && !wantJoinRoom && (
            <a
              className="item"
              onClick={() => setRoom(uuidv4())}
              title="Generate a room"
            >
              <FontAwesomeIcon icon={faUsers} />
            </a>
          )}
          {!noShare && !readOnly && !wantJoinRoom && (
            <a
              className="item"
              onClick={() => {
                setUseLocalDoc(true);
                setRoom(uuidv4());
              }}
              title="Share current document"
            >
              <FontAwesomeIcon icon={faShareNodes} />
            </a>
          )}
          {!noJoin && !wantJoinRoom && (
            <a
              className="item"
              onClick={() => setWantJoinRoom(true)}
              title="Join room"
            >
              <FontAwesomeIcon icon={faArrowRightToBracket} />
            </a>
          )}
          {!noJoin && wantJoinRoom && (
            <input
              className="item input-join"
              onChange={(e: FormEvent<HTMLInputElement>) => {
                setJoinRoom(e.target.value);
              }}
              onKeyUp={(e) => e.key === "Enter" && joinRoomHandler()}
              type="text"
              placeholder="id of room to join..."
              maxLength={uuidv4().length}
              autoFocus
            ></input>
          )}
          {!noJoin && wantJoinRoom && (
            <a
              className="item"
              onClick={resetStates}
              title="Close joining room input"
            >
              <FontAwesomeIcon icon={faXmark} />
            </a>
          )}
          {!noJoin && joinRoom && uuidValidate(joinRoom) && (
            <a className="item" onClick={joinRoomHandler} title="Join room">
              <FontAwesomeIcon icon={faArrowRightToBracket} />
            </a>
          )}
        </div>
      )}
      {wsUrl && room && (
        <div className="container">
          {!noShare && (
            <a
              className="item"
              onClick={() => navigator.clipboard.writeText(room)}
              title="Copy room id to clipboard"
            >
              {room}
            </a>
          )}
          {!noLeave && (
            <a className="item" onClick={resetStates} title="Leave room">
              <FontAwesomeIcon icon={faArrowRightFromBracket} />
            </a>
          )}
        </div>
      )}
      {editor}
    </div>
  );
}

function SingleplayerEditor({ apiUrl, doc, language, readOnly }: Singleplayer) {
  const fileSystemEvents = useFileSystem();
  const { onAssetCreate, onAssetDelete, onAssetUpload } = useAssets(apiUrl);
  const { ...events } = useSingleplayer(doc, language);

  return (
    <Tldraw
      autofocus
      showPages={false}
      showMultiplayerMenu={false}
      onAssetCreate={onAssetCreate}
      onAssetDelete={onAssetDelete}
      onAssetUpload={onAssetUpload}
      readOnly={readOnly}
      {...fileSystemEvents}
      {...events}
    />
  );
}

function MultiplayerEditor({
  apiUrl,
  doc,
  provider,
  roomId,
  language,
}: Multiplayer) {
  const { onSaveProjectAs, onSaveProject } = useFileSystem();
  const { onAssetCreate, onAssetDelete, onAssetUpload } = useAssets(apiUrl);
  const { ...events } = useMultiplayer(doc, provider, roomId, language);

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

function MultiplayerReadOnlyEditor({
  doc,
  provider,
  roomId,
  language,
}: MultiplayerReadOnly) {
  const { onSaveProjectAs, onSaveProject } = useFileSystem();
  const { ...events } = useMultiplayer(doc, provider, roomId, language);

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
