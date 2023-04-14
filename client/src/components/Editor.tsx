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
import { ToastContainer } from "react-toastify";
import { useTranslation } from "react-i18next";

type Settings = {
  idbName: string;
  apiUrl: string;
  nextcloudUrl?: string;
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
  nextcloudUrl: PropTypes.string,
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
  nextcloudUrl,
  roomId,
  language,
  readOnly,
  noJoin,
  noLeave,
  noShare,
}: Settings) {
  const { t } = useTranslation();

  const [room, setRoom] = useState<string | undefined>(roomId);
  const [joinRoom, setJoinRoom] = useState<string | undefined>(undefined);
  const [wantJoinRoom, setWantJoinRoom] = useState<boolean>(false);
  const [useLocalDoc, setUseLocalDoc] = useState<boolean>(false);

  language = language || "en";
  readOnly = readOnly || false;

  let editor = (
    <SingleplayerEditor
      apiUrl={apiUrl}
      nextcloudUrl={nextcloudUrl}
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
      <ToastContainer />
      {wsUrl && !room && (
        <div className="sharing-container">
          {!noShare && !readOnly && !wantJoinRoom && (
            <a
              className="sharing-item"
              onClick={() => setRoom(uuidv4())}
              title={t("sharingItem.generateRoom")}
            >
              <FontAwesomeIcon icon={faUsers} />
            </a>
          )}
          {!noShare && !readOnly && !wantJoinRoom && (
            <a
              className="sharing-item"
              onClick={() => {
                setUseLocalDoc(true);
                setRoom(uuidv4());
              }}
              title={t("sharingItem.shareCurrentPage")}
            >
              <FontAwesomeIcon icon={faShareNodes} />
            </a>
          )}
          {!noJoin && !wantJoinRoom && (
            <a
              className="sharing-item"
              onClick={() => setWantJoinRoom(true)}
              title={t("sharingItem.joinRoom")}
            >
              <FontAwesomeIcon icon={faArrowRightToBracket} />
            </a>
          )}
          {!noJoin && wantJoinRoom && (
            <input
              className="sharing-item input-join"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setJoinRoom(e.target.value)
              }
              onKeyUp={(e) => e.key === "Enter" && joinRoomHandler()}
              type="text"
              placeholder={t("sharingItem.joinRoomPlaceholder")}
              maxLength={uuidv4().length}
              autoFocus
            ></input>
          )}
          {!noJoin && wantJoinRoom && (
            <a
              className="sharing-item"
              onClick={resetStates}
              title={t("sharingItem.closeJoinRoom")}
            >
              <FontAwesomeIcon icon={faXmark} />
            </a>
          )}
          {!noJoin && joinRoom && uuidValidate(joinRoom) && (
            <a
              className="sharing-item"
              onClick={joinRoomHandler}
              title={t("sharingItem.joinRoom")}
            >
              <FontAwesomeIcon icon={faArrowRightToBracket} />
            </a>
          )}
        </div>
      )}
      {wsUrl && room && (
        <div className="sharing-container">
          {!noShare && (
            <a
              className="sharing-item"
              onClick={() => navigator.clipboard.writeText(room)}
              title={t("sharingItem.roomId")}
            >
              {room}
            </a>
          )}
          {!noLeave && (
            <a
              className="sharing-item"
              onClick={resetStates}
              title={t("sharingItem.leaveRoom")}
            >
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
