import { ChangeEvent, useState } from "react";
import { cloneDoc, initProvider, newDoc } from "../utils/yjs";
import { v4 as uuidv4, validate as uuidValidate } from "uuid";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightFromBracket,
  faArrowRightToBracket,
  faCloud,
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
  nextcloudSave?: boolean;
  nextcloudSaveHide?: boolean;
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
  nextcloudUrl: PropTypes.string,
  nextcloudSave: PropTypes.bool,
  nextcloudSaveHide: PropTypes.bool,
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
  nextcloudSave,
  nextcloudSaveHide,
  roomId,
  language,
  readOnly,
  noJoin,
  noLeave,
  noShare,
}: Settings) {
  const { t } = useTranslation();

  nextcloudSave = nextcloudSave || false;
  language = language || "en";
  readOnly = readOnly || false;

  const [room, setRoom] = useState<string | undefined>(roomId);
  const [joinRoom, setJoinRoom] = useState<string | undefined>(undefined);
  const [saveOnNextcloudState, setSaveOnNextcloudState] = useState<boolean>(
    (nextcloudUrl ? true : false) && nextcloudSave
  );
  const [wantJoinRoom, setWantJoinRoom] = useState<boolean>(false);
  const [useLocalDoc, setUseLocalDoc] = useState<boolean>(false);

  let editor = (
    <SingleplayerEditor
      apiUrl={apiUrl}
      nextcloudUrl={nextcloudUrl}
      saveOnNextcloudState={saveOnNextcloudState}
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
        nextcloudUrl={nextcloudUrl}
        saveOnNextcloudState={saveOnNextcloudState}
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
      <div className="sharing-container">
        {nextcloudUrl && !nextcloudSaveHide && !wantJoinRoom && (
          <a
            className={`sharing-item${saveOnNextcloudState ? "-enabled" : ""}`}
            onClick={() => setSaveOnNextcloudState(!saveOnNextcloudState)}
            title={t("sharingItem.nextcloudSave") as string}
          >
            <FontAwesomeIcon icon={faCloud} />
          </a>
        )}
        {wsUrl && !room && (
          <div>
            {!noShare && !readOnly && !wantJoinRoom && (
              <a
                className="sharing-item"
                onClick={() => setRoom(uuidv4())}
                title={t("sharingItem.generateRoom") as string}
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
                title={t("sharingItem.shareCurrentPage") as string}
              >
                <FontAwesomeIcon icon={faShareNodes} />
              </a>
            )}
            {!noJoin && !wantJoinRoom && (
              <a
                className="sharing-item"
                onClick={() => setWantJoinRoom(true)}
                title={t("sharingItem.joinRoom") as string}
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
                placeholder={t("sharingItem.joinRoomPlaceholder") as string}
                maxLength={uuidv4().length}
                autoFocus
              ></input>
            )}
            {!noJoin && wantJoinRoom && (
              <a
                className="sharing-item"
                onClick={resetStates}
                title={t("sharingItem.closeJoinRoom") as string}
              >
                <FontAwesomeIcon icon={faXmark} />
              </a>
            )}
            {!noJoin && joinRoom && uuidValidate(joinRoom) && (
              <a
                className="sharing-item"
                onClick={joinRoomHandler}
                title={t("sharingItem.joinRoom") as string}
              >
                <FontAwesomeIcon icon={faArrowRightToBracket} />
              </a>
            )}
          </div>
        )}
        {wsUrl && room && (
          <div>
            {!noShare && (
              <a
                className="sharing-item"
                onClick={() => navigator.clipboard.writeText(room)}
                title={t("sharingItem.roomId") as string}
              >
                {room}
              </a>
            )}
            {!noLeave && (
              <a
                className="sharing-item"
                onClick={resetStates}
                title={t("sharingItem.leaveRoom") as string}
              >
                <FontAwesomeIcon icon={faArrowRightFromBracket} />
              </a>
            )}
          </div>
        )}
      </div>
      {editor}
    </div>
  );
}

export default Editor;
