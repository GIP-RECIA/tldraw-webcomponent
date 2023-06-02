import "../assets/scss/editor.scss";
import { useSave } from "../hooks/useSave";
import { donwloadImageFile } from "../utils/tldraw";
import { cloneDoc, initProvider, newDoc } from "../utils/yjs";
import MultiplayerEditor from "./MultiplayerEditor";
import NextcloudModal from "./NextcloudModal";
import SingleplayerEditor from "./SingleplayerEditor";
import {
  faArrowRightFromBracket,
  faArrowRightToBracket,
  faShareNodes,
  faUsers,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TDExport, TldrawApp, useFileSystem } from "@tldraw/tldraw";
import PropTypes from "prop-types";
import { ChangeEvent, useState } from "react";
import { useTranslation } from "react-i18next";
import { ToastContainer } from "react-toastify";
import { v4 as uuidv4, validate as uuidValidate } from "uuid";

type Settings = {
  idbName: string;
  uploadApi?: string;
  wsUrl?: string;
  userApi?: string;
  nextcloudUrl?: string;
  roomId?: string;
  language?: string;
  readOnly?: boolean;
  noJoin?: boolean;
  noLeave?: boolean;
  noShare?: boolean;
};

Editor.propTypes = {
  idbName: PropTypes.string.isRequired,
  uploadApi: PropTypes.string,
  wsUrl: PropTypes.string,
  userApi: PropTypes.string,
  nextcloudUrl: PropTypes.string,
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
  uploadApi,
  wsUrl,
  userApi,
  nextcloudUrl,
  roomId,
  language,
  readOnly,
  noJoin,
  noLeave,
  noShare,
}: Settings) {
  const { t } = useTranslation();
  const { onSaveProject } = useFileSystem();
  const { onSaveProject: ncOnSaveProject, onExport } = useSave(
    nextcloudUrl,
    userApi
  );

  language = language ?? "en";
  readOnly = readOnly ?? false;
  const isNextcloudConfigured = nextcloudUrl && userApi;

  const [room, setRoom] = useState<string | undefined>(roomId);
  const [joinRoom, setJoinRoom] = useState<string | undefined>(undefined);
  const [wantJoinRoom, setWantJoinRoom] = useState<boolean>(false);
  const [useLocalDoc, setUseLocalDoc] = useState<boolean>(false);
  const [nextcloudModal, setNextcloudModal] = useState<any>(undefined);

  const handleSave = (app: TldrawApp) => {
    if (!isNextcloudConfigured) {
      onSaveProject(app);
      return;
    }
    if (nextcloudModal) return;
    setNextcloudModal(
      <NextcloudModal
        document={app.document}
        onNextcloud={() => {
          ncOnSaveProject(app);
          resetNextcloudModal();
        }}
        onDownload={() => {
          onSaveProject(app);
          resetNextcloudModal();
        }}
        onCancel={resetNextcloudModal}
      />
    );
  };

  const handleExport = async (app: TldrawApp, info: TDExport) => {
    if (!isNextcloudConfigured) {
      donwloadImageFile(app, info);
      return;
    }
    if (nextcloudModal) return;
    setNextcloudModal(
      <NextcloudModal
        document={app.document}
        onNextcloud={() => {
          onExport(app, info);
          resetNextcloudModal();
        }}
        onDownload={() => {
          donwloadImageFile(app, info);
          resetNextcloudModal();
        }}
        onCancel={resetNextcloudModal}
      />
    );
  };

  const resetNextcloudModal = () => {
    setNextcloudModal(undefined);
  };

  let editor = (
    <SingleplayerEditor
      uploadApi={uploadApi}
      idbName={idbName}
      doc={localDoc}
      language={language}
      readOnly={wantJoinRoom}
      onSaveProject={handleSave}
      onExport={handleExport}
    />
  );

  if (wsUrl && room && uuidValidate(room)) {
    let doc = newDoc();
    if (useLocalDoc) doc = cloneDoc(localDoc);
    const provider = initProvider(wsUrl, room, doc);
    editor = (
      <MultiplayerEditor
        uploadApi={uploadApi}
        userApi={userApi}
        doc={doc}
        provider={provider}
        roomId={room}
        language={language}
        readOnly={readOnly}
        onSaveProject={handleSave}
        onExport={handleExport}
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
        {wsUrl && !room && (
          <div>
            {!noShare && !readOnly && !wantJoinRoom && (
              <button
                type="button"
                className="sharing-item"
                onClick={() => setRoom(uuidv4())}
                title={t("sharingItem.generateRoom") as string}
              >
                <FontAwesomeIcon icon={faUsers} />
              </button>
            )}
            {!noShare && !readOnly && !wantJoinRoom && (
              <button
                type="button"
                className="sharing-item"
                onClick={() => {
                  setUseLocalDoc(true);
                  setRoom(uuidv4());
                }}
                title={t("sharingItem.shareCurrentPage") as string}
              >
                <FontAwesomeIcon icon={faShareNodes} />
              </button>
            )}
            {!noJoin && !wantJoinRoom && (
              <button
                type="button"
                className="sharing-item"
                onClick={() => setWantJoinRoom(true)}
                title={t("sharingItem.joinRoom") as string}
              >
                <FontAwesomeIcon icon={faArrowRightToBracket} />
              </button>
            )}
            {!noJoin && wantJoinRoom && (
              <button
                type="button"
                className="sharing-item"
                onClick={resetStates}
                title={t("sharingItem.closeJoinRoom") as string}
              >
                <FontAwesomeIcon icon={faXmark} />
              </button>
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
            {!noJoin && joinRoom && uuidValidate(joinRoom) && (
              <button
                type="button"
                className="sharing-item"
                onClick={joinRoomHandler}
                title={t("sharingItem.joinRoom") as string}
              >
                <FontAwesomeIcon icon={faArrowRightToBracket} />
              </button>
            )}
          </div>
        )}
        {wsUrl && room && (
          <div>
            {!noShare && (
              <button
                type="button"
                className="sharing-item"
                onClick={() => navigator.clipboard.writeText(room)}
                title={t("sharingItem.roomId") as string}
              >
                {room}
              </button>
            )}
            {!noLeave && (
              <button
                type="button"
                className="sharing-item"
                onClick={resetStates}
                title={t("sharingItem.leaveRoom") as string}
              >
                <FontAwesomeIcon icon={faArrowRightFromBracket} />
              </button>
            )}
          </div>
        )}
      </div>
      {nextcloudModal}
      {editor}
    </div>
  );
}

export default Editor;
