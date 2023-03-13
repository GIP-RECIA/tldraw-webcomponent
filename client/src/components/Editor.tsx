import { ChangeEvent, useState } from "react";
import { cloneDoc, initProvider, newDoc } from "../utils/yjs";
import { v4 as uuidv4, validate as uuidValidate } from "uuid";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightFromBracket,
  faArrowRightToBracket,
  faShareNodes,
  faUsers,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import MultiplayerEditor from "./MultiplayerEditor";
import SingleplayerEditor from "./SingleplayerEditor";
import "../assets/scss/editor.scss";

type Settings = {
  idbName: string;
  apiUrl: string;
  wsUrl?: string;
  roomId?: string;
  language?: string;
  readOnly?: boolean;
  noJoin?: boolean;
  noLeave?: boolean;
  noShare?: boolean;
};

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
  const [room, setRoom] = useState<string | undefined>(roomId);
  const [joinRoom, setJoinRoom] = useState<string | undefined>(undefined);
  const [wantJoinRoom, setWantJoinRoom] = useState<boolean>(false);
  const [useLocalDoc, setUseLocalDoc] = useState<boolean>(false);

  language = language || "en";
  readOnly = readOnly || false;

  let editor = (
    <SingleplayerEditor
      apiUrl={apiUrl}
      idbName={idbName}
      doc={localDoc}
      language={language}
      readOnly={wantJoinRoom}
    />
  );

  if (wsUrl && room && uuidValidate(room)) {
    let doc = newDoc();
    if (useLocalDoc) doc = cloneDoc(localDoc);
    const provider = initProvider(wsUrl, room, doc);
    editor = (
      <MultiplayerEditor
        apiUrl={apiUrl}
        doc={doc}
        provider={provider}
        roomId={room}
        language={language}
        readOnly={readOnly}
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
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setJoinRoom(e.target.value)
              }
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

export default Editor;
